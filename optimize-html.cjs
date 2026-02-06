#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const INDEX_HTML_PATH = path.join(__dirname, 'dist', 'index.html');
const BACKUP_PATH = path.join(__dirname, 'dist', 'index.html.backup');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function readIndexHtml() {
  try {
    const html = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');
    log('✓ Read index.html', colors.green);
    return html;
  } catch (error) {
    log(`✗ Error reading index.html: ${error.message}`, colors.red);
    process.exit(1);
  }
}

function extractAssets(html) {
  const assets = {
    scripts: [],
    styles: [],
    fonts: []
  };

  const scriptRegex = /<script[^>]+src="([^"]+)"[^>]*>/gi;
  const cssRegex = /<link[^>]+rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/gi;
  const fontRegex = /<link[^>]+rel="preload"[^>]*href="([^"]+\.woff2?)"[^>]*>/gi;

  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    const src = match[1];
    if (src && !src.startsWith('http') && !src.includes('data:')) {
      assets.scripts.push(src);
    }
  }

  while ((match = cssRegex.exec(html)) !== null) {
    const href = match[1];
    if (href && !href.startsWith('http') && !href.includes('data:')) {
      assets.styles.push(href);
    }
  }

  while ((match = fontRegex.exec(html)) !== null) {
    const href = match[1];
    if (href) {
      assets.fonts.push(href);
    }
  }

  log(`  Found ${assets.scripts.length} scripts`, colors.blue);
  log(`  Found ${assets.styles.length} styles`, colors.blue);
  log(`  Found ${assets.fonts.length} fonts`, colors.blue);

  return assets;
}

function addPreloadAttributes(html, assets) {
  let optimizedHtml = html;

  // Add critical performance hints before main content
  const performanceHints = `
    <!-- Critical Performance Optimization -->
    <link rel="preconnect" href="/fonts/" crossorigin />
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
  `;
  optimizedHtml = optimizedHtml.replace('<head>', `<head>${performanceHints}`);

  // Preload main script
  const mainScript = assets.scripts.find(s => s.includes('index-')) || assets.scripts[0];
  if (mainScript && !optimizedHtml.includes(`href="${mainScript}" as="script"`)) {
    const preloadTag = `    <link rel="preload" href="${mainScript}" as="script" importance="high" crossorigin />\n`;
    optimizedHtml = optimizedHtml.replace('</head>', `${preloadTag}</head>`);
  }

  // Preload main styles
  const mainStyles = assets.styles.filter(s => s.includes('index-'));
  mainStyles.forEach(style => {
    if (!optimizedHtml.includes(`href="${style}" as="style"`)) {
      const preloadTag = `    <link rel="preload" href="${style}" as="style" importance="high" />\n`;
      optimizedHtml = optimizedHtml.replace('</head>', `${preloadTag}</head>`);
    }
  });

  // Optimize font loading
  optimizedHtml = optimizedHtml.replace(
    /<link([^>]+)href="([^"]+\.woff2?)"([^>]*)\s*\/?>/gi,
    (match, before, href, after) => {
      return `<link${before}href="${href}" rel="preload" as="font" type="font/woff2" font-display="swap" importance="high" crossorigin />`;
    }
  );

  // Add font loading performance style
  const fontPerformanceStyle = `
    <style>
      /* Font Loading Performance Optimization */
      @font-face {
        font-display: swap;
        font-weight: normal;
      }
    </style>
  `;
  optimizedHtml = optimizedHtml.replace('</head>', `${fontPerformanceStyle}</head>`);

  return optimizedHtml;
}

function writeOptimizedHtml(html) {
  try {
    if (fs.existsSync(INDEX_HTML_PATH)) {
      fs.copyFileSync(INDEX_HTML_PATH, BACKUP_PATH);
      log('✓ Backed up original index.html', colors.green);
    }

    fs.writeFileSync(INDEX_HTML_PATH, html, 'utf-8');
    log('✓ Wrote optimized index.html', colors.green);
  } catch (error) {
    log(`✗ Error writing index.html: ${error.message}`, colors.red);
    process.exit(1);
  }
}

function optimizeHtml() {
  log('🚀 Starting HTML optimization...', colors.blue);
  
  const html = readIndexHtml();
  const assets = extractAssets(html);
  
  log('Applying performance optimizations...', colors.yellow);
  
  const optimizedHtml = addPreloadAttributes(html, assets);
  
  writeOptimizedHtml(optimizedHtml);
  
  log('✨ Optimization complete!', colors.green);
  log('  Added dynamic preloads for critical assets', colors.blue);
  log('  Optimized font loading performance', colors.blue);
}

// Execute optimization
optimizeHtml();