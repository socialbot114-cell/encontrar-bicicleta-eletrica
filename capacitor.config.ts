import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.citybikes',
  appName: 'Encontrar Bicicleta Eletrica',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0a0a0f",
      showSpinner: false,
      androidSplashResourceName: "splash",
    },
  },
};

export default config;
