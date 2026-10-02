# Release Information

## iOS App Store Connect

- App Store ID: `6810899424`
- App Store Connect name: `Encontrar Bicicleta Eletrica`
- iOS display name: `Encontrar Bicicleta Elétrica`
- Bundle ID: `br.com.citybikes`
- SKU: `br.comcitybikes`
- Target marketing version: `1.1.0`, read from `package.json` by the TestFlight workflow (`1.0` is already approved).
- Latest TestFlight upload: version `1.0.1`, build `12` (workflow run `37005333313`, branch `feat/map-navigation-actions`, commit `2d7499f`; `UPLOAD SUCCEEDED`, Delivery UUID `17dc056b-2b5b-4d58-bfd3-9e7395d95f67`). App Store Connect processing is still pending confirmation.
- Previous TestFlight upload: version `1.0`, build `10` (workflow run `36214421425`; `UPLOAD SUCCEEDED`, Delivery UUID `afd9b41c-26c5-442b-995d-82458b7677dc`). App Store Connect reported version `1.0` as approved on October 2, 2026.
- Rejected review: version `1.0` (build `8`), Guideline 4.2, September 23, 2026.

The PT-BR localization and iPhone screenshot update shipped as version `1.0`, build `10`. The workflow uploads only to TestFlight; App Review submission remains manual.

The TestFlight workflow uploads only to TestFlight; App Review submission remains manual. The iOS workflow builds the web assets, synchronizes Capacitor, archives with `xcodebuild`, exports using `ExportOptions.plist`, and validates the archive and exported IPA. It does not create an IPA by manually zipping an `.app`.

## Identidade

- Package ID: `com.citybikes`
- Version code atual: `11`
- Version name atual: `1.1.0`
- Compile/target SDK: `36` (Android 16)
- Capacitor: `7.6.8` (CLI, core e Android)
- Node: `20.20.2`
- Java: `21`

## Gerar AAB

O arquivo `android/keystore.properties` e a keystore ficam fora do Git. Sem esses arquivos o build de release deve falhar, por segurança.

```bash
npm ci
npm run build
npx cap sync android
cd android
./gradlew clean bundleRelease
```

O resultado fica em:

```text
android/app/build/outputs/bundle/release/app-release.aab
```

## Checklist antes do upload

1. Incrementar `versionCode` em `android/app/build.gradle`.
2. Atualizar `versionName` no mesmo arquivo e `version` no `package.json`.
3. Confirmar `applicationId "com.citybikes"`.
4. Confirmar que o Play App Signing está ativo.
5. Comparar a impressão digital da chave de upload com a cadastrada no Play Console.
6. Fazer upload somente do AAB gerado por `bundleRelease`.
7. Publicar a faixa e confirmar que o tester fez opt-in usando a conta Google correta.

## Teste interno

O tester precisa estar na lista do teste interno, abrir o link de opt-in, aceitar participar e instalar usando a mesma conta Google. Um lançamento inicial pode levar algum tempo para ficar disponível na Play Store.
