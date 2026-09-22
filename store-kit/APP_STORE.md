# Kit de Submissão — App Store Connect

App: **Encontrar Bicicleta Elétrica**

Use este arquivo para preencher o App Store Connect. Os screenshots prontos estão em `store-kit/screenshots/`.

## Informações do App

- Nome: `Encontrar Bicicleta Elétrica`
- Subtítulo: `Bikes compartilhadas perto de você`
- Categoria principal: `Navigation`
- Categoria secundária: `Travel`
- Preço: `Gratuito`
- Bundle ID: `br.com.citybikes`
- Apple ID: `6810899424`
- Copyright: `2026 <CONFERIR titular>`

## Texto promocional

Encontre a bicicleta elétrica compartilhada mais próxima, veja disponibilidade em tempo real e trace sua rota.

## Descrição

Encontrar Bicicleta Elétrica ajuda você a localizar estações e bicicletas de redes de compartilhamento ao redor do mundo.

Veja no mapa estações próximas, disponibilidade de bikes e vagas, distância, atualização em tempo real e trace rotas para retirada.

Recursos:

- Mapa interativo com 800+ redes globais.
- Disponibilidade de bicicletas, vagas e e-bikes.
- Busca por cidade ou rede.
- Filtros por estação e favoritas.
- Modos claro e escuro.
- Rotas para a estação.

Funciona com dados públicos de CityBikes e OpenStreetMap. Requer conexão para atualizar disponibilidade e mapas.

## Palavras-chave

bicicleta,bike,compartilhada,citybikes,mapa,estacao,eletrica,mobilidade

## Novidades desta versão

- Correção de binário inválido (armv7 → arm64).
- Build auto-incrementado para TestFlight.

## URLs

- Suporte: `<CONFERIR — ex.: https://socialbot114-cell.github.io/encontrar-bicicleta-eletrica-site/>`
- Política de privacidade: `<CONFERIR — precisa estar publicada antes da revisão>`

## Privacidade

O app declara `NSPrivacyTracking = false` e `NSPrivacyCollectedDataTypes = []` (não coleta dados), mas usa `NSPrivacyAccessedAPICategoryUserDefaults` razão `CA92.1`. Confirme que nenhum SDK adicional coleta dados. Se usar Geolocation, declare `NSLocationWhenInUseUsageDescription` (já declarado: "usa sua localização para mostrar redes e estações próximas").

## Conformidade de exportação

Declare que o app não usa criptografia além da padrão do sistema (`ITSAppUsesNonExemptEncryption = false`).

## Classificação etária

Conteúdo de navegação, sem material sensível. Classificação esperada: 4+.

## Notas de revisão

Olá,

O Encontrar Bicicleta Elétrica é um aplicativo de navegação totalmente funcional que mostra redes de bicicletas compartilhadas no mapa.

Para testar:

1. Abra o app (tela inicial com hero).
2. Toque em "Explorar Mapa" para abrir o mapa.
3. Use a busca para encontrar uma cidade ou rede.
4. Toque em um pin para ver disponibilidade.
5. Alterne para modo escuro no topo.

Não é necessário criar conta, conceder permissões obrigatórias ou conectar-se à internet além dos mapas. Não há compras, anúncios ou rastreamento.

Obrigado.

## Screenshots

Pasta: `store-kit/screenshots/`

- `iphone/` — 3 imagens 1206×2622 (captura nativa do iPhone 17 no runtime iOS 26.5)
  - `01-landing.png` — Landing (hero)
  - `02-map.png` — Mapa claro
  - `03-map-dark.png` — Mapa escuro
- `ipad/` — 3 imagens 2048×2732 (slot 12,9")
  - `01-landing.png`
  - `02-map.png`
  - `03-map-dark.png`

**Ordem recomendada App Store:** landing → mapa claro → mapa escuro. As capturas são **reais de iPhone/iPad via simctl** (GitHub Actions, iOS 26.5, iPhone 17 / iPad Air 13" M4), capturadas em `CityBikes iOS Screenshots` workflow (run 35676433885). Não são mockups.

## Prints Android reais

Os prints Android reais são capturados separadamente via `./gradlew assembleDebug` + emulator. Use `adb exec-out screencap` ou workflow Android equivalente. A pasta `android/` gera APK em `android/app/build/outputs/apk/debug/app-debug.apk`.

## Validação local

```bash
npm ci && npm run build
npx cap sync ios && pod install --project-directory=ios/App
xcodebuild build -workspace ios/App/App.xcworkspace -scheme App -destination 'generic/platform=iOS Simulator' CODE_SIGNING_ALLOWED=NO
python3 -c "import plistlib; plistlib.load(open('ios/App/App/Info.plist','rb')); print('Info.plist ok')"
```

## Estado da revisão anterior

- **iOS 1.0 Binário inválido** — corrigido (armv7 → arm64, build 3 → auto-incrementado). Novo build enviado via `iOS TestFlight` workflow, status `UPLOAD SUCCEEDED`.

## Build atual

- Marketing version: `1.0.1`
- Build: `${{ github.run_number }}` (auto)
- Bundle: `br.com.citybikes`
- SDK: iOS 26
