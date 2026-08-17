import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// SVG Definition for Monitor VE Official Circular App Icon
const generateSvg = (size: number, isMaskable = false) => {
  const padding = isMaskable ? size * 0.12 : 0; // 12% padding for Android adaptive maskable safe zone
  const innerSize = size - padding * 2;
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = innerSize * 0.46;
  const rInner = innerSize * 0.41;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#18181b" />
      <stop offset="60%" stop-color="#09090b" />
      <stop offset="100%" stop-color="#000000" />
    </radialGradient>

    <!-- Outer Gold Ring Gradient -->
    <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="25%" stop-color="#FACC15" />
      <stop offset="50%" stop-color="#CA8A04" />
      <stop offset="75%" stop-color="#EAB308" />
      <stop offset="100%" stop-color="#FDE047" />
    </linearGradient>

    <!-- Shiny Central Dollar Sign Gradient -->
    <linearGradient id="dollarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="20%" stop-color="#FEF08A" />
      <stop offset="50%" stop-color="#FACC15" />
      <stop offset="85%" stop-color="#CA8A04" />
      <stop offset="100%" stop-color="#854D0E" />
    </linearGradient>

    <!-- Tricolor Flag Ribbon Gradients -->
    <linearGradient id="flagYellow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="50%" stop-color="#FACC15" />
      <stop offset="100%" stop-color="#EAB308" />
    </linearGradient>

    <linearGradient id="flagBlue" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3B82F6" />
      <stop offset="50%" stop-color="#1D4ED8" />
      <stop offset="100%" stop-color="#1E40AF" />
    </linearGradient>

    <linearGradient id="flagRed" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EF4444" />
      <stop offset="50%" stop-color="#DC2626" />
      <stop offset="100%" stop-color="#991B1B" />
    </linearGradient>

    <!-- Deep Drop Shadows -->
    <filter id="shadowHeavy" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="${size * 0.015}" stdDeviation="${size * 0.02}" flood-color="#000000" flood-opacity="0.9" />
    </filter>

    <filter id="glowGold" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="${size * 0.03}" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Solid Container Canvas (Required for PWA maskable) -->
  <rect width="${size}" height="${size}" rx="${isMaskable ? '0' : size * 0.22}" fill="#09090b" />

  <!-- Outer Ambient Gold Glow -->
  <circle cx="${cx}" cy="${cy}" r="${rOuter * 0.95}" fill="#EAB308" opacity="0.12" filter="url(#glowGold)" />

  <!-- Outer Emblem Circle with Gold Stroke -->
  <circle cx="${cx}" cy="${cy}" r="${rOuter}" fill="url(#bgGrad)" stroke="url(#goldRing)" stroke-width="${size * 0.022}" filter="url(#shadowHeavy)" />
  
  <!-- Inner Subtle Accent Ring -->
  <circle cx="${cx}" cy="${cy}" r="${rInner}" fill="none" stroke="#27272a" stroke-width="${size * 0.008}" stroke-dasharray="${size * 0.02} ${size * 0.012}" />

  <!-- 3 Curved Tricolor Venezuelan Flag Waves -->
  <!-- Top Yellow Wave -->
  <path d="M ${cx - rInner * 0.92} ${cy - rInner * 0.08} 
           C ${cx - rInner * 0.35} ${cy - rInner * 0.42}, ${cx + rInner * 0.35} ${cy + rInner * 0.25}, ${cx + rInner * 0.92} ${cy - rInner * 0.08}
           L ${cx + rInner * 0.88} ${cy + rInner * 0.08}
           C ${cx + rInner * 0.35} ${cy + rInner * 0.41}, ${cx - rInner * 0.35} ${cy - rInner * 0.26}, ${cx - rInner * 0.88} ${cy + rInner * 0.08} Z" 
        fill="url(#flagYellow)" opacity="0.95" />

  <!-- Middle Blue Wave -->
  <path d="M ${cx - rInner * 0.88} ${cy + rInner * 0.08} 
           C ${cx - rInner * 0.35} ${cy - rInner * 0.26}, ${cx + rInner * 0.35} ${cy + rInner * 0.41}, ${cx + rInner * 0.88} ${cy + rInner * 0.08}
           L ${cx + rInner * 0.82} ${cy + rInner * 0.24}
           C ${cx + rInner * 0.35} ${cy + rInner * 0.57}, ${cx - rInner * 0.35} ${cy - rInner * 0.10}, ${cx - rInner * 0.82} ${cy + rInner * 0.24} Z" 
        fill="url(#flagBlue)" opacity="0.95" />

  <!-- Bottom Red Wave -->
  <path d="M ${cx - rInner * 0.82} ${cy + rInner * 0.24} 
           C ${cx - rInner * 0.35} ${cy - rInner * 0.10}, ${cx + rInner * 0.35} ${cy + rInner * 0.57}, ${cx + rInner * 0.82} ${cy + rInner * 0.24}
           L ${cx + rInner * 0.74} ${cy + rInner * 0.40}
           C ${cx + rInner * 0.35} ${cy + rInner * 0.73}, ${cx - rInner * 0.35} ${cy + rInner * 0.06}, ${cx - rInner * 0.74} ${cy + rInner * 0.40} Z" 
        fill="url(#flagRed)" opacity="0.95" />

  <!-- 8 White Stars Arc in the Blue Band -->
  <g fill="#FFFFFF" opacity="0.9" filter="url(#shadowHeavy)">
    ${[
      { dx: -0.55, dy: 0.03 },
      { dx: -0.38, dy: 0.09 },
      { dx: -0.22, dy: 0.14 },
      { dx: -0.07, dy: 0.17 },
      { dx: 0.07, dy: 0.17 },
      { dx: 0.22, dy: 0.14 },
      { dx: 0.38, dy: 0.09 },
      { dx: 0.55, dy: 0.03 }
    ].map(pt => `
      <circle cx="${cx + pt.dx * rInner}" cy="${cy + pt.dy * rInner}" r="${size * 0.011}" />
    `).join('')}
  </g>

  <!-- Central 3D Embossed Golden Dollar Sign '$' -->
  <!-- Dollar drop shadow backplate -->
  <text x="${cx}" y="${cy + size * 0.015}" 
        fill="#000000" 
        opacity="0.8"
        font-size="${innerSize * 0.52}" 
        font-weight="900" 
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        text-anchor="middle" 
        dominant-baseline="central">$</text>

  <!-- Main Dollar Text with Gold Gradient and Stroke -->
  <text x="${cx}" y="${cy}" 
        fill="url(#dollarGrad)" 
        stroke="#78350F" 
        stroke-width="${size * 0.01}"
        font-size="${innerSize * 0.52}" 
        font-weight="900" 
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        text-anchor="middle" 
        dominant-baseline="central"
        filter="url(#shadowHeavy)">$</text>

  <!-- Subtle Specular Highlight -->
  <ellipse cx="${cx}" cy="${cy - rOuter * 0.6}" rx="${rOuter * 0.45}" ry="${rOuter * 0.15}" fill="#FFFFFF" opacity="0.08" />
</svg>`;
};

async function buildIcons() {
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('Generating Monitor VE PWA SVG and PNG assets...');

  // 1. Save base SVG
  const masterSvg = generateSvg(512, false);
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), masterSvg);
  console.log('✓ /public/icon.svg generated');

  // 2. Generate PNG 512x512
  const svg512 = Buffer.from(generateSvg(512, false));
  await sharp(svg512).resize(512, 512).png({ quality: 100 }).toFile(path.join(publicDir, 'icon-512.png'));
  console.log('✓ /public/icon-512.png generated');

  // 3. Generate PNG 192x192
  const svg192 = Buffer.from(generateSvg(192, false));
  await sharp(svg192).resize(192, 192).png({ quality: 100 }).toFile(path.join(publicDir, 'icon-192.png'));
  console.log('✓ /public/icon-192.png generated');

  // 4. Generate Maskable Icon 512x512 (with safe zone margin)
  const svgMaskable512 = Buffer.from(generateSvg(512, true));
  await sharp(svgMaskable512).resize(512, 512).png({ quality: 100 }).toFile(path.join(publicDir, 'icon-maskable-512.png'));
  console.log('✓ /public/icon-maskable-512.png generated');

  // 5. Generate Maskable Icon 192x192
  const svgMaskable192 = Buffer.from(generateSvg(192, true));
  await sharp(svgMaskable192).resize(192, 192).png({ quality: 100 }).toFile(path.join(publicDir, 'icon-maskable-192.png'));
  console.log('✓ /public/icon-maskable-192.png generated');

  // 6. Generate Apple Touch Icon 180x180
  const svgApple = Buffer.from(generateSvg(180, false));
  await sharp(svgApple).resize(180, 180).png({ quality: 100 }).toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ /public/apple-touch-icon.png generated');

  // 7. Generate Favicon 64x64 and 32x32
  const svgFavicon = Buffer.from(generateSvg(64, false));
  await sharp(svgFavicon).resize(64, 64).png({ quality: 100 }).toFile(path.join(publicDir, 'favicon-64x64.png'));
  await sharp(svgFavicon).resize(32, 32).png({ quality: 100 }).toFile(path.join(publicDir, 'favicon-32x32.png'));
  await sharp(svgFavicon).resize(32, 32).png({ quality: 100 }).toFile(path.join(publicDir, 'favicon.png'));
  console.log('✓ /public/favicon.png generated');

  console.log('All PWA assets successfully created in /public!');
}

buildIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
