# Auditoria do Kit de Screenshots

Esta pasta documenta a qualidade das capturas e o novo fluxo de auditoria.

Ela contém uma cópia histórica dos PNGs em `current/` e vídeos de referência.
Os PNGs em `../screenshots/` ainda são da execução anterior; não foram geradas
novas capturas nativas para a resposta à rejeição.

## Capturas históricas atualmente aprovadas

Os arquivos em `../screenshots/` ainda são da execução anterior:

- `iphone/01-landing.png`
- `iphone/02-map.png`
- `iphone/03-map-dark.png`
- `ipad/01-landing.png`
- `ipad/02-map.png`
- `ipad/03-map-dark.png`

O conjunto do iPad é 2048×2732, capturado no iPad Air 13-inch (M4); não é o
dispositivo usado na rejeição.

As cópias usadas nesta auditoria ficam em:

- `current/iphone/`
- `current/ipad/`

Vídeos locais de referência:

- `iphone-current-captures-reference.mp4`
- `ipad-current-captures-reference.mp4`

O workflow `.github/workflows/ios-screenshots.yml` publica três PNGs nativos por
dispositivo. O Maestro permanece apenas como fluxo opcional e não bloqueia a
captura oficial.

## Como gerar uma nova auditoria

1. Execute manualmente o workflow `CityBikes iOS Screenshots` no GitHub.
2. Baixe `citybikes-store-screenshots-iphone` e `citybikes-store-screenshots-ipad`.
3. Revise os seis PNGs para verificar carregamento, navegação e tema no iPad Air 11-inch (M3), usado na revisão.
4. O novo workflow nomeia a primeira tela `01-explore.png`; substitua os PNGs em `store-kit/screenshots/` somente após aprovar a execução.

O fluxo não cria mockups nem redimensiona a tela nativa do simulador.
