# Relatório de Qualidade

## Estado aprovado

- Run validado: `35676433885`.
- Resolução iPhone: `1206x2622`, captura nativa do iPhone 17.
- Resolução iPad: `2048x2732`, captura nativa do iPad Air 13-inch (M4).
- Formato: PNG RGBA, captura nativa do simulador.
- `01-landing.png`: landing page carregada.
- `02-map.png`: mapa claro carregado com redes e controles visíveis.
- `03-map-dark.png`: mapa carregado com tema escuro aplicado.

## Validação

- A captura usa argumentos de processo e navegação persistente do `HashRouter`.
- A captura dark reinstala o app para limpar o tema persistido.
- Não houve diálogo nativo, notificação ou tela branca nos seis artefatos.
- Dimensões e hashes foram validados pelo workflow.

## Fluxo atual

- Build único do `.app` no GitHub Actions.
- Captura nativa via `simctl screenshot` para iPhone e iPad.
- Fixtures locais para redes, sem depender da API CityBikes.
- Tema claro e escuro controlados pelo estado de captura.

Os vídeos locais `iphone-current-captures-reference.mp4` e
`ipad-current-captures-reference.mp4` são uma montagem dos PNGs atuais para
facilitar a auditoria histórica; não são artefatos oficiais da execução atual.
