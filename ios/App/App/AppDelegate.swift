import UIKit
import Capacitor

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        dispatchCaptureModeIfRequested()
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        // Called when the app was launched with a url. Feel free to add additional processing here,
        // but if you want the App API to support tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Called when the app was launched with an activity, including Universal Links.
        // Feel free to add additional processing here, but if you want the App API to support
        // tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }

    private func dispatchCaptureModeIfRequested(attempt: Int = 0) {
        let mode = ProcessInfo.processInfo.arguments
            .first(where: { $0.hasPrefix("--citybikes-capture=") })?
            .replacingOccurrences(of: "--citybikes-capture=", with: "")
        guard mode == "landing" || mode == "map" || mode == "dark-map" || mode == "video-search" else { return }
        guard let viewController = window?.rootViewController as? CAPBridgeViewController,
              let webView = viewController.webView,
              !webView.isLoading else {
            retryCaptureMode(attempt: attempt)
            return
        }

        let route = mode == "landing" || mode == "video-search" ? "/" : "/app?capture=\(mode)"
        let script = "window.location.hash = '#\(route)'; window.dispatchEvent(new CustomEvent('citybikes:native-capture',{detail:{mode:'\(mode)'}}));"
        webView.evaluateJavaScript(script) { _, error in
            if error != nil {
                self.retryCaptureMode(attempt: attempt)
            }
        }
    }

    private func retryCaptureMode(attempt: Int) {
        guard attempt < 60 else { return }
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            self.dispatchCaptureModeIfRequested(attempt: attempt + 1)
        }
    }

}
