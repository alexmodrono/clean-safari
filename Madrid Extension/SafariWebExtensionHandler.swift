//
//  SafariWebExtensionHandler.swift
//  Madrid Extension
//
//  Created by Alejandro Modroño Vara on 27/11/25.
//

import SafariServices
import os.log
#if os(macOS)
import AppKit
#endif

@available(macOS 10.15, *)
class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {

    func beginRequest(with context: NSExtensionContext) {
        let request = context.inputItems.first as? NSExtensionItem

        let profile: UUID?
        if #available(iOS 17.0, macOS 14.0, *) {
            profile = request?.userInfo?[SFExtensionProfileKey] as? UUID
        } else {
            profile = request?.userInfo?["profile"] as? UUID
        }

        let message: Any?
        if #available(iOS 15.0, macOS 11.0, *) {
            message = request?.userInfo?[SFExtensionMessageKey]
        } else {
            message = request?.userInfo?["message"]
        }

        os_log(.default, "Received message from browser.runtime.sendNativeMessage: %@ (profile: %@)", String(describing: message), profile?.uuidString ?? "none")

        // Handle openApp action
        if let messageDict = message as? [String: Any],
           let action = messageDict["action"] as? String,
           action == "openApp" {
            openContainingApp()
        }

        let response = NSExtensionItem()
        if #available(iOS 15.0, macOS 11.0, *) {
            response.userInfo = [ SFExtensionMessageKey: [ "success": true ] ]
        } else {
            response.userInfo = [ "message": [ "success": true ] ]
        }

        context.completeRequest(returningItems: [ response ], completionHandler: nil)
    }
    
    private func openContainingApp() {
        #if os(macOS)
        // Get the bundle identifier of the containing app
        let bundleId = Bundle.main.bundleIdentifier ?? ""
        // The containing app bundle ID is the extension bundle ID without the ".Extension" suffix
        let appBundleId = bundleId.replacingOccurrences(of: ".Extension", with: "")
        
        DispatchQueue.main.async {
            if let appURL = NSWorkspace.shared.urlForApplication(withBundleIdentifier: appBundleId) {
                let configuration = NSWorkspace.OpenConfiguration()
                configuration.activates = true
                NSWorkspace.shared.openApplication(at: appURL, configuration: configuration) { _, error in
                    if let error = error {
                        os_log(.error, "Failed to open app: %@", error.localizedDescription)
                    }
                }
            } else {
                os_log(.error, "Could not find app with bundle ID: %@", appBundleId)
            }
        }
        #endif
    }
}
