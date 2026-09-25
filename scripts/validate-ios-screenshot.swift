import Foundation
import Vision
import Darwin

guard CommandLine.arguments.count >= 3 else {
    fputs("Usage: validate-ios-screenshot.swift <image.png> <expected text>...\n", stderr)
    exit(2)
}

let imageURL = URL(fileURLWithPath: CommandLine.arguments[1])
let expectedText = Array(CommandLine.arguments.dropFirst(2))
let request = VNRecognizeTextRequest()
request.recognitionLevel = .accurate
request.usesLanguageCorrection = true
request.recognitionLanguages = ["pt-BR", "en-US"]

do {
    try VNImageRequestHandler(url: imageURL, options: [:]).perform([request])
    let recognizedText = request.results?.compactMap { $0.topCandidates(1).first?.string } ?? []
    let searchableText = recognizedText
        .joined(separator: "\n")
        .folding(options: [.caseInsensitive, .diacriticInsensitive], locale: Locale(identifier: "pt_BR"))

    let missingText = expectedText.filter { expected in
        !searchableText.contains(expected.folding(
            options: [.caseInsensitive, .diacriticInsensitive],
            locale: Locale(identifier: "pt_BR"),
        ))
    }

    guard missingText.isEmpty else {
        fputs("Screenshot text validation failed for \(imageURL.lastPathComponent). Missing: \(missingText.joined(separator: ", "))\n", stderr)
        fputs("Recognized text: \(recognizedText.joined(separator: " | "))\n", stderr)
        exit(1)
    }

    print("Validated \(imageURL.lastPathComponent): \(recognizedText.joined(separator: " | "))")
} catch {
    fputs("Could not inspect \(imageURL.path): \(error)\n", stderr)
    exit(1)
}
