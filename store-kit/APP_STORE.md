# Kit de Submissão — App Store Connect

App Store Connect: **Encontrar Bicicleta Eletrica**

Use este arquivo para preencher o App Store Connect. As imagens atualmente em `store-kit/screenshots/` são da captura aprovada anterior; gere e revise a nova captura nativa antes de substituir os arquivos para a resposta à Guideline 4.2.

## Informações do App

- Nome no App Store Connect: `Encontrar Bicicleta Eletrica`
- Nome de exibição no iOS: `Encontrar Bicicleta Elétrica`
- Subtítulo atual no App Store Connect: (vazio)
- Categoria principal: `Navigation`
- Categoria secundária: `Travel`
- Preço: `Gratuito`
- Bundle ID: `br.com.citybikes`
- SKU: `br.comcitybikes`
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
- Prévia de rota ciclável no próprio mapa, da sua localização até a estação.
- Compartilhamento de estações pela folha nativa de compartilhamento do dispositivo.

Funciona com dados públicos de CityBikes e OpenStreetMap. Requer conexão para atualizar disponibilidade e mapas.

## Palavras-chave

bicicleta,bike,compartilhada,citybikes,mapa,estacao,eletrica,mobilidade

## Novidades desta versão

- O app abre diretamente no mapa de redes e estações.
- Rotas cicláveis são pré-visualizadas no próprio mapa.
- Compartilhamento de estações pela folha nativa do dispositivo.

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

1. Abra o app: o mapa de redes e a busca ficam disponíveis imediatamente.
2. Use a busca para encontrar uma cidade ou rede e toque em um pin.
3. Toque em "Use location" / "Usar localização" para autorizar localização, se desejar.
4. Em uma estação, confira a disponibilidade atual, toque em "Plan route" para ver a rota no mapa ou use o botão de compartilhar.
5. Alterne o tema claro/escuro pela navegação inferior.

Não é necessário criar conta. A localização é opcional; conexão com a internet é necessária para carregar mapas, disponibilidade e rotas. Não há compras, anúncios ou rastreamento.

Obrigado.

## Screenshots

Pasta: `store-kit/screenshots/`

- Os PNGs atualmente no diretório são históricos: `01-landing.png`, `02-map.png` e `03-map-dark.png`.
- O iPad histórico é o Air 13-inch (M4), 2048×2732. Ele não corresponde ao Air 11-inch (M3) usado na revisão.
- A nova execução do workflow deve gerar `01-explore.png`, `02-map.png` e `03-map-dark.png` para iPhone 17 (1206×2622) e iPad Air 11-inch (M3) (1640×2360).

**Ordem recomendada App Store:** explorar → mapa claro → mapa escuro. Não substitua os PNGs históricos até revisar a nova execução nativa no workflow `CityBikes iOS Screenshots`.

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

- **iOS 1.0 (8), Guideline 4.2** — rejeitado em 23/09/2026 no iPad Air 11-inch (M3), por experiência percebida como web app sem funcionalidades iOS suficientes. A atualização abre diretamente no mapa, mantém a prévia de rota ciclável dentro do app e adiciona compartilhamento nativo.
- O último upload TestFlight foi `1.0.1 (8)`. Para esta resposta à rejeição, a versão escolhida é `1.0`; o próximo workflow TestFlight deve gerar build `9`.

## Build atual

- Marketing version: `1.0`
- Build: `${{ github.run_number }}` (auto)
- Bundle: `br.com.citybikes`
- SKU: `br.comcitybikes`
- SDK: iOS 26
