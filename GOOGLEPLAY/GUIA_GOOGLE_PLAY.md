# Guia Google Play para Novos Aplicativos

Guia pratico para criar, preparar, testar e publicar aplicativos Android na
Google Play. Ele registra o que aprendemos no CityBikes Premium e generaliza o
processo para outros projetos.

> As politicas, formularios e requisitos da Google Play mudam. Use este guia
> como checklist operacional, mas confirme os requisitos atuais no Play
> Console e na documentacao oficial antes de cada envio.

## 1. Principio Principal

A aprovacao nao depende apenas de o AAB compilar. A Google avalia quatro areas:

- O pacote tecnico e a assinatura precisam estar corretos.
- O app precisa cumprir as politicas de conteudo, privacidade e permissoes.
- A ficha da loja precisa descrever exatamente o comportamento real.
- O revisor precisa conseguir abrir e testar o app sem bloqueios.

Um app pode funcionar localmente e ainda ser rejeitado por declaracoes
incompletas, login impossivel, politica de privacidade ausente, metadados
enganosos, permissao excessiva ou experiencia quebrada em algum dispositivo.

## 2. Estrutura Tecnica Minima

Todo projeto Android publicado deve ter:

- `applicationId`/package ID unico.
- `versionCode` inteiro sempre crescente.
- `versionName` legivel para o usuario.
- Target SDK dentro do requisito atual da Google Play.
- AAB de release assinado corretamente.
- Keystore de upload guardada com backup seguro.
- Politica de privacidade publicada em URL HTTPS acessivel sem login.
- Icone, nome, splash e identidade consistentes.
- Tela funcional em celulares pequenos e grandes.
- Tratamento de loading, erro, estado vazio e perda de conexao.

No CityBikes Premium:

- Package: `com.citybikes`.
- Nome: `CityBikes Premium`.
- Capacitor: `7.6.8`.
- Min SDK: `23`.
- Compile/target SDK no momento: `36` (Android 16).
- A interface e React em WebView, empacotada por Capacitor.
- O release atual e `versionCode 10`, `versionName 1.0.6`.

## 3. Conta de Desenvolvedor

Antes de desenvolver para producao:

1. Criar ou acessar a conta correta no Google Play Console.
2. Concluir verificacao de identidade e dados de contato.
3. Ativar Play App Signing quando solicitado.
4. Confirmar quem tera acesso administrativo e quem apenas fara upload.
5. Ativar autenticacao em dois fatores nas contas importantes.
6. Manter recuperacao de conta e contatos da empresa atualizados.

Nao compartilhar senha. Use convites e permissoes por funcao no Play Console.

Para contas pessoais novas, a Google pode exigir um teste fechado com um
numero minimo de testers durante um periodo minimo antes de liberar producao.
O requisito conhecido de 12 testers por 14 dias deve ser confirmado no Console
da conta, pois pode mudar por regiao, tipo de conta ou data de criacao.

## 4. Criacao do Aplicativo no Console

Ao criar o app:

- Escolher o idioma padrao correto.
- Usar o nome real do produto.
- Marcar corretamente se e app ou jogo.
- Escolher se e gratuito ou pago. Essa escolha pode ter restricoes depois.
- Informar se existe publicidade.
- Aceitar as declaracoes exigidas.
- Criar o app no mesmo package ID usado no projeto.

O package ID e uma identidade permanente. Nao reutilizar o package de outro app
sem entender o impacto em atualizacoes, assinatura e usuarios instalados.

## 5. Assinatura e Versionamento

### VersionCode

Cada AAB enviado deve ter um `versionCode` maior que qualquer pacote anterior.

Exemplo:

```text
1 -> primeiro release
2 -> primeira atualizacao
3 -> release seguinte
4 -> proximo upload
```

Se o Play Console informar que o codigo ja foi usado, nao reutilize o mesmo
numero. Incremente para o proximo valor disponivel.

### Keystore

- A keystore de upload e um segredo critico.
- Guardar uma copia criptografada em local seguro.
- Registrar alias e procedimento de recuperacao, nunca a senha em Git.
- Nunca enviar `*.keystore`, `keystore.properties` ou senhas para o repositorio.
- Nao criar outra keystore para substituir a atual sem verificar o impacto no
  Play App Signing.

No CityBikes, estes arquivos sao ignorados pelo Git:

```text
android/keystore.properties
android/app/citybikes-release.keystore
*.keystore
```

### Play App Signing

Em geral, o Google Play App Signing deve ser usado. O desenvolvedor envia um
AAB assinado com a chave de upload e a Play administra a chave de assinatura de
distribuicao. Confirme no Console qual chave esta sendo usada antes de trocar
computador ou pipeline.

## 6. Build de um App Capacitor

Fluxo recomendado para projetos como CityBikes:

```bash
nvm use
npm ci
npm run build
npx cap sync android
cd android
./gradlew clean bundleRelease
```

O AAB normalmente fica em:

```text
android/app/build/outputs/bundle/release/app-release.aab
```

Para uma build incremental:

```bash
npm run build
npx cap sync android
cd android
./gradlew bundleRelease
```

O `npx cap sync android` e obrigatorio depois de alterar o frontend. Ele copia
`dist` para os assets Android. Sem ele, o AAB pode conter uma interface antiga.

Verificar o checksum do arquivo final:

```bash
sha256sum android/app/build/outputs/bundle/release/app-release.aab
```

Guardar o checksum junto do registro do release facilita confirmar exatamente
qual arquivo foi enviado.

## 7. Checklist Tecnico Antes do Upload

- `npm ci` conclui sem erro.
- `npm run build` conclui sem erro de TypeScript.
- `npx cap sync android` conclui sem erro.
- `./gradlew bundleRelease` conclui sem erro.
- O AAB e o arquivo de release, nao um APK debug.
- O package ID esta correto.
- O `versionCode` e maior que o ultimo publicado.
- O `versionName` foi atualizado quando necessario.
- O target SDK atende ao requisito vigente da Play.
- O AAB esta assinado com a chave correta.
- O icone aparece corretamente no launcher.
- O splash screen nao fica travado.
- Back button, teclado, rotacao e retomada do app foram testados.
- O app funciona sem dados, com API lenta e com erro de API.
- Nao existem endpoints locais, hosts de desenvolvimento ou credenciais de
  teste embutidas na build.
- Logs de debug, menus internos e React Query Devtools nao estao visiveis para
  usuarios finais.

## 8. Teste Manual Obrigatorio

Testar em pelo menos um dispositivo real e, quando possivel, em mais de um
tamanho de tela.

### Primeiro uso

- Instalar do canal de teste.
- Abrir pela primeira vez.
- Aceitar ou recusar cada permissao.
- Fechar e reabrir o app.
- Confirmar que o estado inicial faz sentido.

### Estados de rede

- Wi-Fi funcionando.
- Dados moveis funcionando.
- Modo aviao.
- API lenta.
- API indisponivel.
- Resposta vazia.
- Erro e retry.

### Interface

- Celular pequeno, aproximadamente 320-360px.
- Celular comum, aproximadamente 390px.
- Tela grande e tablet, se suportado.
- Modo claro e escuro.
- Fonte do sistema aumentada.
- Teclado aberto.
- Barra de navegacao e notch.
- Gestos de voltar e sair.
- Links externos e politica de privacidade.

### CityBikes

- Mapa inicial.
- Busca de rede.
- Selecao de rede.
- Lista de estacoes.
- Favoritar e desfavoritar.
- Localizacao permitida.
- Localizacao negada.
- Gerar rota.
- Alternar camadas.
- Abrir analytics.
- Fechar analytics.
- Navegar ate a politica de privacidade.

Registrar problemas com dispositivo, versao Android, passos e screenshot.

## 9. Ficha da Loja

### Nome e descricao

O nome, descricao curta e descricao completa devem corresponder ao produto.

Evitar:

- Promessas que o app nao cumpre.
- Superlativos sem evidencia, como "o melhor" ou "100% preciso".
- Repeticao artificial de palavras-chave.
- Texto copiado de outro produto.
- Informacao de preco ou recurso que nao existe.

Explicar claramente o valor do app e suas limitacoes.

### Icone e imagens

Preparar:

- Icone em alta qualidade no formato exigido pelo Console.
- Screenshots reais do app, sem mockup enganoso.
- Screenshots de telas atuais, nao prototipos antigos.
- Textos legiveis em celulares.
- Arte que nao imite botao de instalacao ou alerta do sistema.

O icone do launcher, o splash e a marca dentro do app devem parecer parte do
mesmo produto.

### Categoria e tags

Escolher categoria, tags e contato de suporte de forma honesta. Uma categoria
errada pode gerar revisao adicional ou rejeicao por metadados enganosos.

### Contato

Fornecer e-mail de suporte que seja lido. Adicionar website ou telefone quando
for aplicavel. O revisor pode usar esses dados para entender o produto.

## 10. App Access e Login

Se o app exigir login, assinatura, convite, localizacao especial ou qualquer
fluxo que bloqueie o revisor:

- Criar credenciais de revisao no Play Console.
- Explicar passo a passo como entrar.
- Informar PIN, MFA, codigo temporario ou instrucao especial.
- Garantir que a conta nao expire durante a revisao.
- Nao exigir contato com o desenvolvedor para liberar o acesso.

Se o app nao exige login, declarar isso corretamente. Nao adicionar uma tela de
login apenas para parecer mais completo.

## 11. Politica de Privacidade e Dados

Toda coleta, acesso, compartilhamento e armazenamento precisa ser coerente
entre o codigo, a politica de privacidade, o formulario Data safety e a ficha
da loja.

Para cada dado perguntar:

- O app acessa esse dado?
- O dado e coletado ou apenas processado no dispositivo?
- E armazenado?
- E compartilhado com terceiros?
- Qual a finalidade?
- O usuario pode recusar?
- O app continua funcional quando recusa?
- Existe exclusao de conta ou dados?

No CityBikes, tratar com cuidado:

- Localizacao do dispositivo.
- Favoritos salvos localmente.
- Dados recebidos de APIs publicas.
- Informacoes de rede e estacoes exibidas no mapa.
- Politica publica em `public/privacy.html` e rota `/privacy`.

Nao declarar que o app nao coleta dados se ele envia dados para um servidor ou
servico de terceiros. Data safety deve ser revisado por alguem que conheca o
codigo e as APIs usadas.

Se houver conta de usuario, incluir no produto e na politica um caminho claro
para exclusao da conta e dos dados, conforme os requisitos vigentes.

## 12. Permissoes

Solicitar somente permissoes necessarias e no momento em que o recurso for
usado.

Para cada permissao:

- Confirmar necessidade funcional.
- Declarar a finalidade correta no Play Console.
- Mostrar contexto para o usuario antes do dialogo do sistema.
- Implementar estado negado e estado "permissao revogada".
- Nao pedir permissao em loop.

Permissoes sensiveis, como localizacao em segundo plano, SMS, chamadas,
contatos, armazenamento amplo, acessibilidade e notificacoes, podem exigir
declaracao e justificativa adicional. Nunca adicionar uma permissao apenas
porque ela pode ser util no futuro.

## 13. Publicidade, Pagamentos e Conteudo

Declarar corretamente se o app:

- Exibe anuncios.
- Possui compras ou assinatura.
- Usa billing externo.
- Tem conteudo gerado por usuarios.
- Tem conteudo de saude, financeiro, criancas ou relacionado a idade.
- Permite comunicacao entre usuarios.
- Exibe mapas, imagens ou dados de terceiros.

Recursos com requisitos especiais devem ser avaliados antes de implementar a
interface. Nao tentar contornar o Play Billing quando a politica exige seu uso.

Para conteudo de terceiros, verificar licenca, atribuicao e termos de uso. O
CityBikes usa servicos publicos externos; manter atribuicoes exigidas pelo
provedor e revisar limites e termos antes de escalar o produto.

## 14. Testes na Google Play

Canais comuns:

- Internal testing: equipe pequena e validacao rapida.
- Closed testing: grupo controlado, frequentemente necessario para contas
  novas antes de producao.
- Open testing: beta publico, quando disponivel e apropriado.
- Production: distribuicao geral.

Fluxo recomendado:

1. Enviar primeiro para teste interno.
2. Instalar pela Play Store, nao apenas por APK local.
3. Validar atualizacao sobre a versao anterior.
4. Corrigir problemas de assinatura, permissao e asset.
5. Passar para teste fechado quando necessario.
6. Observar crashes, ANRs, reviews e feedback.
7. Promover para producao somente quando o fluxo principal estiver estavel.

O tester precisa usar a conta Google correta, participar do canal e concluir
opt-in. Se a instalacao nao aparece, confirmar conta, link, pais, faixa e
propagacao do release.

## 15. Erros Frequentes e Solucoes

### Version code ja usado

Incrementar `versionCode` em `android/app/build.gradle`. Em projetos web,
sincronizar tambem a versao do `package.json` e documentar o release.

### Tela antiga no AAB

Executar build web e sincronizar:

```bash
npm run build
npx cap sync android
```

### Assinatura invalida

Verificar keystore, alias, senha e `storeFile`. Nao substituir a keystore sem
confirmar o Play App Signing.

### Politica de privacidade inacessivel

Testar a URL em janela anonima, sem login, usando HTTPS. Confirmar que ela
explica os dados realmente acessados pelo app.

### App Access incompleto

Fornecer credenciais e instrucoes no campo correto do Play Console. O revisor
nao deve precisar adivinhar como chegar ao recurso principal.

### Permissao rejeitada pelo review

Remover permissoes nao essenciais, pedir somente durante o uso e ajustar a
declaracao de politica para refletir o comportamento real.

### R8 ou mapping

Nao ativar minificacao somente para remover um warning. Quando `minifyEnabled`
for habilitado, criar regras, gerar e guardar mapping, testar todos os fluxos e
verificar que plugins Capacitor continuam funcionando.

### Rejeicao por metadata

Comparar screenshots, descricao, icone e comportamento real. Remover promessas,
palavras-chave ou imagens que nao representem o app atual.

## 16. Checklist Final de Envio

### Codigo

- [ ] Branch ou commit do release identificado.
- [ ] Sem segredos ou keystores no Git.
- [ ] Build limpa concluida.
- [ ] Lint executado ou pendencias documentadas.
- [ ] `versionCode` incrementado.
- [ ] Package ID confirmado.
- [ ] Target SDK confirmado.

### Produto

- [ ] Fluxo principal funciona em dispositivo real.
- [ ] Login e App Access resolvidos, se aplicavel.
- [ ] Permissoes justificadas e testadas.
- [ ] Offline, loading, erro e retry tratados.
- [ ] Back button e lifecycle testados.
- [ ] Modo claro/escuro e telas pequenas testados.
- [ ] Crash e ANR conhecidos investigados.

### Console

- [ ] Data safety preenchido com base no codigo.
- [ ] Politica de privacidade publicada e acessivel.
- [ ] Categoria, tags e classificacao etaria preenchidas.
- [ ] Declaracao de anuncios preenchida.
- [ ] Declaracoes especiais respondidas.
- [ ] Descricao e screenshots correspondem ao app.
- [ ] E-mail de suporte monitorado.
- [ ] Canal de teste configurado.
- [ ] AAB correto anexado.

## 17. Registro de Release

Manter um registro por versao com:

```text
Produto:
Package ID:
Version code:
Version name:
Commit:
Data:
AAB:
SHA-256:
Canal:
Testes realizados:
Pendencias conhecidas:
Responsavel:
```

Registro atual do CityBikes:

- Produto: `CityBikes Premium`.
- Package ID: `com.citybikes`.
- Version code: `6`.
- Version name: `1.0.6`.
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`.
- SHA-256: `d20023d0756680d8361ca2aabf9800a7d5e51f422365ac150a8bf081326f01a4`.

## 18. Fontes Oficiais para Conferencia

Antes de um novo envio, consultar diretamente:

- Play Console: requisitos e tarefas pendentes da conta.
- Android Developers: requisitos de target SDK e comportamento do Android.
- Google Play Developer Program Policies: conteudo, dados, permissoes e
  metadata.
- Play Console Help: assinatura, testes, Data safety e App Access.
- Capacitor Android docs: sincronizacao e configuracao nativa.

Este arquivo ajuda o time a repetir um processo seguro, mas nao substitui a
leitura da politica aplicavel ao tipo especifico de aplicativo.
