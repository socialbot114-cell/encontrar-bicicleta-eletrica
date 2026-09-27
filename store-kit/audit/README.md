# Auditoria do Kit de Screenshots

Esta pasta documenta a qualidade das capturas e o novo fluxo de auditoria.

Ela contém uma cópia histórica dos PNGs em `current/` e vídeos de referência.
Os PNGs em `../screenshots/` são da execução anterior. As capturas nativas novas
para a versão 1.0 ficam em `../submission-1.0-screenshots/`.

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

O workflow `.github/workflows/ios-screenshots.yml` publica cinco PNGs nativos
do iPhone 17: exploração, estação e rota (capturas para a loja), mais tema
escuro/camadas e favoritos (capturas de revisão). O Maestro permanece apenas
como fluxo opcional e não bloqueia as capturas.

## Como gerar uma nova auditoria

1. Execute manualmente o workflow `CityBikes iOS Screenshots` no GitHub.
2. Baixe o artefato `citybikes-store-screenshots-iphone`.
3. Revise os cinco PNGs nativos; use apenas `01`–`03` na submissão da loja.
4. As capturas aprovadas para a loja ficam em `../submission-1.0-screenshots/`; os arquivos históricos em `../screenshots/` permanecem separados.

O fluxo não cria mockups nem redimensiona a tela nativa do simulador.
