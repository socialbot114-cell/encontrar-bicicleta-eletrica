# Release Information

## iOS App Store Connect

- App Store ID: `6810899424`
- App Store Connect name: `Encontrar Bicicleta Eletrica`
- iOS display name: `Encontrar Bicicleta Elétrica`
- Bundle ID: `br.com.citybikes`
- SKU: `br.comcitybikes`
- Target marketing version: `1.0`
- Latest TestFlight upload: version `1.0`, build `9` (workflow run `36169044202`); App Store Connect showed `Processing` after upload.
- Rejected review: version `1.0` (build `8`), Guideline 4.2, September 23, 2026.

The TestFlight workflow uploads only to TestFlight; App Review submission remains manual. The iOS workflow builds the web assets, synchronizes Capacitor, archives with `xcodebuild`, exports using `ExportOptions.plist`, and validates the archive and exported IPA. It does not create an IPA by manually zipping an `.app`.

## Identidade

- Package ID: `com.citybikes`
- Version code atual: `10`
- Version name atual: `1.0.6`
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
