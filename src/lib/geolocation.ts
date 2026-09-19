import { Geolocation } from '@capacitor/geolocation';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

function isNative(): boolean {
  return !!window.Capacitor?.isNativePlatform?.();
}

export async function getCurrentPosition(): Promise<LocationCoords> {
  if (isNative()) {
    const pos = await Geolocation.getCurrentPosition();
    return {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    };
  }

  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }),
      reject,
    );
  });
}
