# Análise do Projeto & Próximas Melhorias

## Estado implementado

- App React/TypeScript com `HashRouter`, Vite e Capacitor para web, Android e iOS.
- Mapa Leaflet de redes globais, busca por cidade/rede e agrupamento de
  marcadores.
- Localização opcional, redes próximas, favoritos persistidos e abertura direta
  de redes/estações favoritas no mapa, com acesso em navegação mobile e desktop.
- Detalhes de disponibilidade, filtro de bicicletas elétricas, prévia de rota
  ciclável e compartilhamento nativo de estações.
- Camadas Smart City, dashboard, tema claro/escuro com estilos de mapa
  correspondentes e recursos de idioma em inglês, português, espanhol e francês;
  a cobertura ainda precisa ser revisada nos textos legados.
- TanStack Query com cache e retry; dados smart atualizados após movimentos do
  mapa com debounce e arredondamento do centro.

## Melhorias prioritárias

1. **Experiência de navegação:** validar em dispositivos reais o painel
   recolhível, acesso a favoritos e fluxo de localização; cobrir tela pequena,
   tablet e permissões negadas.
2. **Orientação ciclável:** decidir se o produto deve evoluir da prévia atual
   (linha, distância e duração) para instruções passo a passo.
3. **Mapa e dados:** avaliar indicadores visuais de disponibilidade nos
   marcadores e fontes de ciclovias/segurança e transporte público antes de
   expandir as camadas.
4. **Qualidade:** ampliar testes de componentes e fluxos, além dos testes de
   funções já existentes em `src/lib/navigation.test.ts`.
5. **Manutenção:** acompanhar limites, atribuições e disponibilidade de APIs e
   tiles externos; manter onboarding, roadmap e documentação de release
   alinhados ao estado publicado.

## Referências

- `ONBOARDING.md`: comandos, arquitetura, APIs e fluxos nativos.
- `Urban data api roadmap.md`: funcionalidades de dados urbanos e ideias
  futuras.
- `store-kit/audit/`: evidências e relatórios das capturas de loja.
