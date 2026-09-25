# Relatório de Qualidade

## Capturas anteriores (histórico)

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

## Acompanhamento da Guideline 4.2 — 2026-09

- O app nativo agora abre diretamente no mapa e mantém a landing page apenas na
  versão web.
- Rotas de bicicleta são desenhadas no mapa interno; a estação também pode ser
  compartilhada pela folha nativa de compartilhamento.
- Capturas nativas aprovadas pelo workflow `CityBikes iOS Screenshots`, run
  `36167464622`: iPhone 17 (1206×2622, iOS 26.5) e iPad Air 11-inch (M3)
  (1640×2360, iOS 26.2).
- A busca por San Francisco, seleção de rede/estação, localização, rota real,
  desenho de linha, estimativa e compartilhamento por clipboard foram conferidos
  em previews web responsivos de 390×844 e 820×1180.
- Os previews levaram a correções no posicionamento do cartão de rede no iPad,
  na largura/ordem do resumo de rota no iPhone e no fechamento do popup ao
  mostrar uma rota.
- Os seis PNGs estão em `store-kit/submission-1.0-screenshots/{iphone,ipad}/`,
  prontos para a submissão manual da versão 1.0.
