# CityBikes Premium

Guia de onboarding, desenvolvimento e release para manter, corrigir ou evoluir
este projeto.

> Atualizado em 2026-09-27. Informações de release devem ser conferidas em
> `RELEASE.md` e `store-kit/APP_STORE.md` antes de cada publicação.

## 1. Visao Geral

O CityBikes Premium e uma aplicacao React/TypeScript que mostra redes e
estacoes de bicicletas em um mapa Leaflet. O projeto tambem agrega dados de
clima, qualidade do ar, terremotos, carregadores de veiculos eletricos e POIs.

Ele é distribuído como aplicativo híbrido por meio do Capacitor. O repositório
mantém projetos Android e iOS; ambos exibem a interface React dentro de uma
WebView e usam plugins nativos quando necessário.

- Recursos nativos usados hoje: geolocalização, splash screen, status bar e
  compartilhamento do sistema.
- O código de produto é compartilhado entre web, Android e iOS; os fluxos de
  build e metadados nativos permanecem específicos por plataforma.

Repositório: `https://github.com/socialbot114-cell/encontrar-bicicleta-eletrica`

Package Android: `com.citybikes`

## 2. Stack e Versoes

- Node: `20.20.2`, definido em `.nvmrc`.
- Java: `21`.
- React: `19.2.0`.
- TypeScript: `5.9.x`.
- Vite: `5.4.x`.
- Capacitor CLI/core/Android: `7.6.8`; iOS: `7.6.9`.
- Capacitor Geolocation: `7.1.8`.
- Capacitor Splash Screen: `7.0.5`.
- Capacitor Status Bar: `7.0.6`.
- Android compile/target SDK: `36`.
- Android minimum SDK: `23`.
- Leaflet: `1.9.4`.
- React Leaflet: `5.x`.
- TanStack React Query: `5.x`.

Arquivos de configuracao principais:

- `package.json`: scripts, dependencias e versao web.
- `package-lock.json`: lockfile. Preferir `npm ci` em ambientes limpos.
- `capacitor.config.ts`: nome do app, package ID, `dist` e splash screen.
- `android/app/build.gradle`: `applicationId`, `versionCode`, `versionName` e
  assinatura do release.
- `android/variables.gradle`: SDKs e versoes AndroidX.
- `tailwind.config.js`, `postcss.config.js` e `src/index.css`: estilos.
- `vite.config.ts`: configuracao de build/dev server.

## 3. Como Rodar Localmente

Requisitos:

- Node na versao de `.nvmrc`.
- Java 21 para tarefas Android.
- Android SDK com API 36 para gerar o pacote Android.
- Dependencias instaladas com `npm ci`.

Inicializacao web:

```bash
nvm use
npm ci
npm run dev
```

O Vite normalmente abre em `http://localhost:5173`.

Build de verificacao:

```bash
npm run build
```

O build executa `tsc -b` antes do Vite. Portanto, erros de TypeScript fazem o
processo falhar antes de gerar `dist`.

Preview da build:

```bash
npm run preview
```

Lint disponivel:

```bash
npm run lint
```

Vitest cobre atualmente funções de navegação, formatação de disponibilidade e
configuração das capturas. Ainda não há uma suite de testes de componentes ou de
fluxo nativo. Execute build e verificação manual das telas principais antes de
publicar.

## 4. Arquitetura do Frontend

### Entrada e rotas

- `src/main.tsx`: monta React Query, tema, i18n e o `App`.
- `src/App.tsx`: define `HashRouter`, deep links nativos e carregamento lazy.
- `/`: landing page na web; no app nativo redireciona para o mapa.
- `/app`: aplicacao do mapa.
- `/privacy`: politica de privacidade.

O mapa e as telas mais pesadas sao carregados com `lazy`/`Suspense` em
`src/App.tsx`.

### Shell da aplicacao

- `src/components/Layout.tsx`: shell geral, sidebar desktop e entrada da
  navegacao mobile.
- `src/components/MobileBottomNav.tsx`: barra inferior mobile.
- `src/components/NetworkSearch.tsx`: busca de redes sobre o mapa.
- `src/components/Map/MapComponent.tsx`: mapa, controles, popups, selecao de
  rede, prévia de rota e cartão contextual recolhível.
- `src/components/Map/CustomMarkers.tsx`: marcadores Leaflet customizados.
- `src/components/Map/SmartLayers.tsx`: camadas de smart city.
- `src/components/Dashboard/SmartDashboard.tsx`: analytics da rede escolhida.
- `src/components/AppHome.tsx`: redes próximas/sugeridas e tela de favoritos.

### Estado global

`src/context/CityBikesContext.tsx` concentra:

- Lista de redes e detalhes da rede selecionada.
- Localizacao do usuario e estado de permissao.
- Favoritos persistidos em `localStorage` na chave
  `citybikes_favorites`; resumos de estações favoritas ficam em
  `citybikes_favorite_station_details`.
- Prévia de rota ciclável exibida no mapa e calculada pelo serviço público de rotas do OpenStreetMap.
- Dados e toggles das camadas smart city.

`src/context/ThemeContext.tsx` controla tema claro/escuro, persiste a escolha
na chave `theme` e atualiza a status bar quando executado nativamente.

`QueryClient` em `src/main.tsx` usa `staleTime` de 5 minutos e duas tentativas
de retry por consulta.

## 5. APIs Externas

As URLs ficam em `src/api` e nao dependem de arquivo `.env` atualmente.

### CityBik.es

Arquivo: `src/api/citybikes.ts`

- `https://api.citybik.es/v2/networks`
- Lista redes.
- `https://api.citybik.es/v2/networks/{id}`
- Busca detalhes e estacoes.

Timeout padrao: 15 segundos. Erros sao convertidos para `ApiError`.

### Smart City

Arquivo: `src/api/smartCity.ts`

- Open-Meteo: clima.
- Open-Meteo Air Quality: qualidade do ar.
- USGS: terremotos recentes.
- Open Charge Map: estacoes de carregamento.
- Overpass API: POIs como agua e banheiros.

Todas as chamadas smart city usam timeout de 15 segundos e convertem falhas
para `SmartCityError`.

### Rotas

O trajeto de bicicleta é solicitado pelo usuário no cartão da estação e exibido
no próprio mapa. A integração está em `src/api/cyclingRouting.ts`.

- Endpoint: `https://routing.openstreetmap.de/routed-bike/route/v1/driving/...`
- Timeout: 15 segundos.
- A resposta GeoJSON é validada e convertida para coordenadas do Leaflet.
- O app solicita localização quando o usuário escolhe `Use location` e não a possui.

Ao adicionar uma API nova, manter timeout, validacao de resposta e uma classe
de erro tipada. Nunca colocar segredo ou chave privada diretamente no Git.

## 6. Regras de UX Mobile

O app deve ser tratado como mobile-first, mesmo sendo uma interface web.

Regras importantes:

- Testar no minimo em larguras de `320`, `360`, `390` e `430px`.
- Respeitar `env(safe-area-inset-top)` e `env(safe-area-inset-bottom)`.
- Manter alvos de toque com pelo menos aproximadamente 44px.
- Nao empilhar muitos controles sobre o mapa.
- Preferir bottom sheets ou modais fullscreen no mobile para detalhes, busca,
  camadas e analytics.
- Evitar popups menores que a largura disponivel.
- Manter a barra inferior fora do conteudo interativo.
- Preservar suporte a `prefers-reduced-motion`.
- Usar marcadores pequenos e clusters para nao esconder o mapa.

Estado atual da experiência:

- Há acesso às favoritas na navegação mobile e na sidebar para telas médias e
  grandes; a marca também retorna ao mapa.
- Busca tem safe area e campo com altura minima de 48px.
- O cartão de descoberta começa compacto no mobile; detalhes da rede também
  podem ser recolhidos para liberar área do mapa.
- Favoritos têm acesso próprio pelo menu e permitem abrir redes e estações
  salvas diretamente no mapa.
- Camadas e Smart Data ficam agrupados em um painel identificado; o tema escuro
  aplica um filtro visual aos tiles do OpenStreetMap e mantém sua atribuição.
- O mapa usa controles responsivos e zoom reposicionado acima da barra.
- Analytics abre fullscreen no mobile.
- Marcadores basicos foram reduzidos para diminuir poluicao visual.
- Os assets de marca têm origem em `assets/brand-source/` e são gerados pelo
  script `scripts/generate-brand-assets.mjs`.

Ao fazer uma mudanca de layout, verificar simultaneamente modo claro e escuro,
mapa sem dados, mapa com dados, permissao negada e rede selecionada.

## 7. Android e iOS com Capacitor

Config atual em `capacitor.config.ts`:

- App name: `CityBikes Premium`.
- App ID: `com.citybikes`.
- Web directory: `dist`.
- Android scheme: `https`.
- Bundle ID iOS: `br.com.citybikes`; workflows iOS ficam em
  `.github/workflows/ios*.yml` e o projeto nativo em `ios/App/`.
- Splash sem spinner, com duracao configurada de 2 segundos.

Fluxo correto depois de alterar frontend:

```bash
npm run build
npx cap sync android
npx cap sync ios
```

O `cap sync` copia `dist` para
`android/app/src/main/assets/public`. Sem esse comando, o Android pode conter
uma build web antiga.

Permissoes e seguranca relevantes:

- Geolocalizacao esta declarada no Android Manifest.
- `FileProvider` esta restrito ao caminho necessario.
- `android:allowBackup` esta desabilitado.
- A keystore e `android/keystore.properties` sao ignorados pelo Git.
- Nunca commitar keystore, senhas ou arquivos de assinatura.

## 8. Gerar o AAB de Release

Antes do release:

1. Confirmar que a keystore de upload e `android/keystore.properties` existem.
2. Confirmar package ID `com.citybikes`.
3. Incrementar `versionCode`.
4. Atualizar `versionName` em `android/app/build.gradle`.
5. Atualizar a versao em `package.json` e `package-lock.json`.
6. Gerar a build web.
7. Sincronizar o Capacitor.
8. Gerar o bundle release.

Comandos recomendados:

```bash
npm ci
npm run build
npx cap sync android
cd android
./gradlew clean bundleRelease
```

O arquivo gerado fica em:

```text
android/app/build/outputs/bundle/release/app-release.aab
```

Para builds incrementais, `./gradlew bundleRelease` e suficiente. O `clean`
deve ser usado quando houver suspeita de assets Android antigos ou problemas
de cache.

Verificar checksum:

```bash
sha256sum android/app/build/outputs/bundle/release/app-release.aab
```

Release Android atual:

- Version code: `10`.
- Version name: `1.0.6`.
- Calcule o SHA-256 do AAB recém-gerado; não reutilize checksum de um release
  anterior.

O arquivo `RELEASE.md` possui o checklist resumido de publicacao.

## 9. Google Play Console

- Enviar somente o AAB assinado gerado por `bundleRelease`.
- Cada upload precisa de `versionCode` maior que o anterior.
- Os códigos até `10` já foram usados. O próximo release deve iniciar em `11` ou maior.
- Manter Play App Signing ativo.
- Comparar a chave de upload local com a cadastrada no Play Console.
- Para teste interno, adicionar o tester, concluir opt-in e instalar com a
  mesma conta Google.
- O aviso de R8/mapping nao e motivo para ativar minificacao automaticamente.
  Atualmente `minifyEnabled false`; se isso mudar, validar regressao e
  preservar o arquivo de mapping do release.

## 10. Diagnostico Rapido

### A build TypeScript falha

```bash
npm run build
```

Corrigir o primeiro erro reportado pelo `tsc`. Evitar esconder erros com
casts amplos ou desativando verificacao no tsconfig.

### O app Android mostra tela antiga

Executar novamente:

```bash
npm run build
npx cap sync android
```

Depois gerar um novo AAB. A WebView usa os assets copiados para Android, nao o
codigo fonte diretamente.

### O release falha na assinatura

Verificar, sem imprimir valores secretos:

- `android/keystore.properties` existe.
- `storeFile` aponta para a keystore correta.
- Alias e senhas estao corretos.
- A keystore nao foi movida ou renomeada.

Nao criar uma nova keystore para substituir a atual sem confirmar o impacto no
Play Console.

### Dados nao aparecem

Verificar rede, status HTTP e console do navegador. As APIs sao publicas e
podem sofrer limite, indisponibilidade ou CORS. O app deve continuar mostrando
estado de erro e permitir retry, em vez de assumir que a resposta sempre
existe.

### Localizacao nao funciona

Verificar permissao do sistema, HTTPS/WebView, Manifest e o estado exibido pelo
`locationStatus`. O app possui fallback para a visualizacao mundial quando a
permissao e negada.

## 11. Checklist para Novas Funcionalidades

- Entender se a mudanca e web, Android nativa ou ambas.
- Atualizar tipos em `src/types` antes de espalhar casts.
- Centralizar chamadas externas em `src/api`.
- Usar React Query para dados remotos e o contexto apenas para estado de
  aplicacao compartilhado.
- Adicionar loading, erro, retry e estado vazio.
- Testar light/dark, mobile/desktop e reduced motion.
- Verificar safe areas e barra inferior no mobile.
- Rodar `npm run build`.
- Rodar `npx cap sync android` se a mudanca afetar o app Android.
- Atualizar documentacao quando mudar fluxo, versao, permissao ou release.
- Nunca commitar segredos, keystores ou arquivos locais de ambiente.

## 12. Próximas melhorias conhecidas

Itens que podem ser tratados por novos devs:

- Expandir testes automatizados para busca, favoritos, seleção de rede,
  localização e estados de erro.
- Avaliar orientação passo a passo; o recurso atual é somente uma prévia da rota.
- Explorar dados de segurança ciclável e transporte público com fontes e
  cobertura confiáveis.
- Adicionar validacao de AAB automatizada no pipeline.
- Avaliar code splitting adicional para reduzir os chunks grandes do mapa e do
  bundle principal.
- Documentar e testar fisicamente em dispositivos Android e iOS reais.
- Avaliar R8 somente com regras, mapping e regressao controlados.

## 13. Arquivos de Referencia

- `README.md`: visão geral, comandos e mapa dos módulos.
- `RELEASE.md`: estado de release iOS e Android.
- `PROJECT_ANALYSIS.md`: estado implementado e prioridades de produto.
- `Urban data api roadmap.md`: ideias de evolucao de dados urbanos.
- `ONBOARDING.md`: este guia operacional central.
