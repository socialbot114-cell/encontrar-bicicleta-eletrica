import sharp from 'sharp';
import { readFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const svgBuffer = readFileSync(join(root, 'public/icons/bike-icon.svg'));

// Android mipmap sizes
const ANDROID_ICONS = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192,
};

const androidRes = join(root, 'android', 'app', 'src', 'main', 'res');

for (const [folder, size] of Object.entries(ANDROID_ICONS)) {
  const dir = join(androidRes, folder);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(join(dir, 'ic_launcher.png'));

  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(join(dir, 'ic_launcher_round.png'));

  console.log(`Generated ${folder}/ic_launcher.png (${size}x${size})`);
}

// Also generate foreground icon for adaptive icons
await sharp(svgBuffer)
  .resize(108, 108)
  .png()
  .toFile(join(androidRes, 'mipmap-xxxhdpi', 'ic_launcher_foreground.png'));

console.log('Android icons generated successfully!');
