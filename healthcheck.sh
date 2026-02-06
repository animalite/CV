#!/bin/sh

# Comprehensive Health Check Script for Nginx Docker Container

# Exit immediately on any error
set -e

# Function to log messages
log() {
    echo "[HEALTHCHECK] $*" >&2
}

# Perform multiple health checks
main() {
    log "Starting health check..."

    # 1. Check Nginx process
    if ! pgrep nginx > /dev/null; then
        log "ERROR: Nginx process not running"
        exit 1
    fi

    # 2. HTTP Request Check
    response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:80/)
    
    log "HTTP Response Code: ${response}"

    # Consider 200 and 30x (redirects) as healthy
    if [ "${response}" -eq 200 ] || 
       [ "${response}" -ge 300 ] && 
       [ "${response}" -lt 400 ]; then
        log "Health check passed successfully"
        exit 0
    else
        log "HTTP health check failed"
        exit 1
    fi
}

# Execute main function with timeout
timeout 5 main

# If timeout occurs, exit with error
exit_code=$?
if [ ${exit_code} -eq 124 ]; then
    log "Health check timed out"
    exit 1
fi

exit ${exit_code}
```

This script provides a comprehensive health check by:
1. Verifying the Nginx process is running
2. Checking HTTP response status
3. Logging detailed information
4. Handling timeouts
5. Supporting both 200 OK and redirect responses