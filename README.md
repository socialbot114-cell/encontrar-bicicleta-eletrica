# CityBikes Premium

Aplicativo híbrido para explorar redes de bicicletas compartilhadas, consultar
disponibilidade de estações e pré-visualizar rotas cicláveis no mapa.

## Desenvolvimento

Requer Node `20.20.2` (use `nvm use`).

```bash
npm ci
npm run dev
```

O Vite inicia normalmente em `http://localhost:5173`. A rota `/` mostra a
landing page web; `/app` abre o mapa.

## Verificações

```bash
npm test
npm run lint
npm run build
```

Para sincronizar assets web com uma plataforma Capacitor:

```bash
npx cap sync ios
npx cap sync android
```

## Navegação do código

- `src/App.tsx`: rotas com `HashRouter` e deep links nativos.
- `src/context/CityBikesContext.tsx`: redes, localização, favoritos e camadas.
- `src/components/Map/MapComponent.tsx`: Leaflet, estações, controles e rotas.
- `src/components/AppHome.tsx`: descoberta e lista de favoritos.
- `src/api/`: integrações CityBikes, dados urbanos e rotas cicláveis.
- `ONBOARDING.md`: arquitetura, fluxos mobile e releases.
