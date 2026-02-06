#!/bin/bash

# ==============================================================================
# Automated Deployment Script for CV Application
# ==============================================================================
# This script automates the deployment process using Docker and Docker Compose
# It can be used with git post-receive hooks or any other automation system
# ==============================================================================

set -e  # Exit on error
set -o pipefail  # Exit on pipe failure

# ==============================================================================
# Configuration
# ==============================================================================
PROJECT_NAME="dev-cv"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="${PROJECT_DIR}/backups"
LOG_FILE="${PROJECT_DIR}/deployment.log"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Docker configuration
CONTAINER_NAME="${PROJECT_NAME}"
IMAGE_NAME="${PROJECT_NAME}:latest"

# Docker Bake configuration
USE_DOCKER_BAKE="${USE_DOCKER_BAKE:-false}"
BAKE_TARGET="${BAKE_TARGET:-web}"
BUILDKIT_CACHE="${BUILDKIT_CACHE:-true}"

# ==============================================================================
# Colors for output
# ==============================================================================
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ==============================================================================
# Logging functions
# ==============================================================================
log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] ✓${NC} $1"
}

warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] ⚠${NC} $1"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ✗${NC} $1" >&2
}

# ==============================================================================
# Pre-deployment checks
# ==============================================================================
check_prerequisites() {
    log "Checking prerequisites..."

    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed. Please install Docker first."
        exit 1
    fi

    # Check if Docker Compose is installed
        if ! command -v docker compose &> /dev/null; then
            error "Docker Compose is not installed. Please install Docker Compose first."
            exit 1
        fi

        # Check if Docker Buildx is available (for Docker Bake)
        if [[ "$USE_DOCKER_BAKE" == "true" ]]; then
            if ! command -v docker buildx &> /dev/null; then
                warning "Docker Buildx not found. Falling back to Docker Compose build."
                USE_DOCKER_BAKE="false"
            else
                log "Using Docker Bake for faster builds"
            fi
        fi

    # Check if we're in the correct directory
    if [[ ! -f "${PROJECT_DIR}/docker-compose.yml" ]]; then
        error "docker compose.yml not found in ${PROJECT_DIR}"
        exit 1
    fi

    # Check if .env file exists (optional)
    if [[ -f "${PROJECT_DIR}/.env" ]]; then
        log "Found .env file"
    fi

    success "All prerequisites met"
}

# ==============================================================================
# Backup current deployment
# ==============================================================================
backup_deployment() {
    log "Creating backup of current deployment..."

    mkdir -p "${BACKUP_DIR}"

    # Backup current container state if running
    if docker ps -a | grep -q "${CONTAINER_NAME}"; then
        docker commit "${CONTAINER_NAME}" "${IMAGE_NAME}-backup-${TIMESTAMP}" 2>/dev/null || warning "Could not create container backup"

        # Export container configuration
        docker inspect "${CONTAINER_NAME}" > "${BACKUP_DIR}/container_config_${TIMESTAMP}.json" 2>/dev/null || warning "Could not export container config"
    fi

    # Backup dist directory if it exists
    if [[ -d "${PROJECT_DIR}/dist" ]]; then
        cp -r "${PROJECT_DIR}/dist" "${BACKUP_DIR}/dist_${TIMESTAMP}" 2>/dev/null || warning "Could not backup dist directory"
    fi

    success "Backup created successfully"
}

# ==============================================================================
# Build Docker image
build_image() {
    log "Building Docker image..."

    cd "${PROJECT_DIR}"

    # Pull latest base images first
    log "Pulling latest base images..."
    docker compose pull 2>/dev/null || warning "Could not pull base images, will use cached versions"

    # Build the image
    log "Building application image..."

    if [[ "$USE_DOCKER_BAKE" == "true" ]]; then
        log "Using Docker Bake (buildx) for optimized caching..."

        # Create cache directory if it doesn't exist
        mkdir -p /tmp/.buildx-cache

        # Build with Docker Bake
        if docker buildx bake "$BAKE_TARGET" --load; then
            success "Docker image built successfully with Docker Bake"
        else
            error "Docker Bake build failed, falling back to Docker Compose..."
            if docker compose build --no-cache; then
                success "Docker image built successfully with Docker Compose (fallback)"
            else
                error "Docker image build failed"
                return 1
            fi
        fi
    else
        log "Using Docker Compose for building..."

        if docker compose build --no-cache; then
            success "Docker image built successfully"
        else
            error "Docker image build failed"
            return 1
        fi
    fi
}

# ==============================================================================
# Stop and remove old container
# ==============================================================================
stop_container() {
    log "Stopping old container..."

    if docker ps -q -f name="${CONTAINER_NAME}" | grep -q .; then
        docker stop "${CONTAINER_NAME}"
        success "Container stopped successfully"
    else
        log "Container was not running"
    fi

    log "Removing old container..."
    if docker ps -aq -f name="${CONTAINER_NAME}" | grep -q .; then
        docker rm "${CONTAINER_NAME}"
        success "Old container removed"
    fi
}

# ==============================================================================
# Start new container
# ==============================================================================
start_container() {
    log "Starting new container..."

    cd "${PROJECT_DIR}"

    # Start container with Docker Compose
    if docker compose up -d; then
        success "Container started successfully"
    else
        error "Failed to start container"
        return 1
    fi
}

# ==============================================================================
# Health check
# ==============================================================================
health_check() {
    log "Performing health check..."

    local max_attempts=10
    local attempt=1

    while [[ $attempt -le $max_attempts ]]; do
        log "Health check attempt ${attempt}/${max_attempts}..."

        # Use Docker's health check command
        if docker compose ps | grep -q "healthy"; then
            success "Container health check passed"
            return 0
        elif docker compose ps | grep -q "starting"; then
            log "Container is still starting up..."
        else
            error "Container health check failed"
            return 1
        fi

        sleep 5
        ((attempt++))
    done

    error "Health check failed after ${max_attempts} attempts"
    return 1
}

# ==============================================================================
# Cleanup old resources
# ==============================================================================
cleanup() {
    log "Cleaning up old resources..."

    # Remove dangling images
    docker image prune -f > /dev/null 2>&1 || warning "Could not prune dangling images"

    # Remove unused volumes (be careful with this!)
    # docker volume prune -f > /dev/null 2>&1 || warning "Could not prune unused volumes"

    # Remove old backups (keep last 5)
    ls -t "${BACKUP_DIR}" 2>/dev/null | tail -n +6 | xargs -I {} rm -rf "${BACK_DIR}/{}" 2>/dev/null || true

    success "Cleanup completed"
}

# ==============================================================================
# Show deployment status
# ==============================================================================
show_status() {
    log "Deployment status:"
    echo ""

    if docker compose ps | grep -q "Up"; then
        success "Container is running"
        docker compose ps
    else
        error "Container is not running"
        docker compose ps
    fi

    echo ""
    log "Container logs (last 20 lines):"
    docker compose logs --tail=20
}

# ==============================================================================
# Rollback function
# ==============================================================================
rollback() {
    error "Deployment failed. Initiating rollback..."

    # Find the most recent backup
    local latest_backup=$(ls -t "${BACKUP_DIR}" 2>/dev/null | head -1)

    if [[ -n "$latest_backup" ]]; then
        log "Rolling back to backup: ${latest_backup}"

        cd "${PROJECT_DIR}"
        docker compose down

        # Restore from backup if it exists
        if [[ -d "${BACKUP_DIR}/${latest_backup}" ]]; then
            cp -r "${BACKUP_DIR}/${latest_backup}" "${PROJECT_DIR}/dist" 2>/dev/null || warning "Could not restore dist directory"
        fi

        # Restart with previous image
        docker compose up -d

        warning "Rollback completed. Please verify the application."
    else
        error "No backup found for rollback"
        exit 1
    fi
}

# ==============================================================================
# Main deployment flow
# ==============================================================================
main() {
    log "=============================================================================="
    log "Starting deployment for ${PROJECT_NAME}"
    log "Timestamp: ${TIMESTAMP}"

    # Check if Docker Bake is enabled
    if [[ "$USE_DOCKER_BAKE" == "true" ]]; then
        log "Build Mode: Docker Bake (optimized caching)"
    else
        log "Build Mode: Docker Compose (standard)"
    fi

    log "=============================================================================="
    echo ""

    # Set environment variable for BuildKit if requested
    if [[ "$BUILDKIT_CACHE" == "true" ]]; then
        export DOCKER_BUILDKIT=1
        export COMPOSE_DOCKER_CLI_BUILD=1
    fi

    # Execute deployment steps
    check_prerequisites || exit 1
    backup_deployment || warning "Backup failed, continuing with deployment"
    stop_container || exit 1
    build_image || { error "Build failed, initiating rollback..."; rollback; exit 1; }
    start_container || { error "Start failed, initiating rollback..."; rollback; exit 1; }
    health_check || { error "Health check failed, initiating rollback..."; rollback; exit 1; }
    cleanup || warning "Cleanup encountered some issues"
    show_status

    echo ""
    success "=============================================================================="
    success "Deployment completed successfully!"
    success "=============================================================================="
    echo ""
    log "Access your application at: https://dev.animalite.org"
    log "Logs: docker compose logs -f"
}

# ==============================================================================
# Script execution
# ==============================================================================

# Check if running as root (warn but don't fail)
if [[ $EUID -eq 0 ]]; then
    warning "Running as root is not recommended"
fi

# Check if project directory is writable
if [[ ! -w "${PROJECT_DIR}" ]]; then
    error "Project directory ${PROJECT_DIR} is not writable"
    exit 1
fi

# Create backup directory if it doesn't exist
mkdir -p "${BACKUP_DIR}"

# Trap signals for cleanup
trap 'error "Deployment interrupted"; exit 130' INT TERM

# Run main function
main

# Exit with success
exit 0
