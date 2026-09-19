import sharp from 'sharp';
import { mkdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'assets', 'brand-source');
const logo = readFileSync(join(source, 'bikes-logo.png'));
const splash = readFileSync(join(source, 'bikes-splash.png'));

const output = (...parts) => join(root, ...parts);
const ensure = (path) => mkdirSync(path, { recursive: true });

ensure(output('public/icons'));
await sharp(logo).resize(1024, 1024, { fit: 'cover' }).png().toFile(output('public/icons/icon-1024x1024.png'));
await sharp(logo).resize(512, 512, { fit: 'cover' }).png().toFile(output('public/icons/icon-512x512.png'));
await sharp(logo).resize(192, 192, { fit: 'cover' }).png().toFile(output('public/icons/icon-192x192.png'));

const iosIcon = output('ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-1024.png');
await sharp(logo).resize(1024, 1024, { fit: 'cover' }).png().toFile(iosIcon);

const splashImage = await sharp(splash).resize(2732, 2732, { fit: 'contain', background: '#0a0a0f' }).png().toBuffer();
for (const filename of ['splash-2732x2732.png', 'splash-2732x2732-1.png', 'splash-2732x2732-2.png']) {
  await sharp(splashImage).toFile(output('ios/App/App/Assets.xcassets/Splash.imageset', filename));
}

const androidSizes = { 'mipmap-mdpi': 48, 'mipmap-hdpi': 72, 'mipmap-xhdpi': 96, 'mipmap-xxhdpi': 144, 'mipmap-xxxhdpi': 192 };
for (const [folder, size] of Object.entries(androidSizes)) {
  const dir = output('android/app/src/main/res', folder);
  ensure(dir);
  await sharp(logo).resize(size, size, { fit: 'cover' }).png().toFile(join(dir, 'ic_launcher.png'));
  await sharp(logo).resize(size, size, { fit: 'cover' }).png().toFile(join(dir, 'ic_launcher_round.png'));
}

for (const folder of ['drawable', 'drawable-port-xhdpi', 'drawable-port-xxhdpi', 'drawable-land-hdpi', 'drawable-land-xhdpi', 'drawable-land-xxhdpi']) {
  const dir = output('android/app/src/main/res', folder);
  ensure(dir);
  await sharp(splashImage).toFile(join(dir, 'splash.png'));
}

console.log('Generated branded web, iOS, Android icon and splash assets');
