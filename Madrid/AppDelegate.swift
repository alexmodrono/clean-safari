//
//  AppDelegate.swift
//  Madrid
//
//  Created by Alejandro Modroño Vara on 27/11/25.
//

import Cocoa
import SwiftUI

@main
class AppDelegate: NSObject, NSApplicationDelegate {
    
    // UserDefaults keys
    private let hasLaunchedBeforeKey = "hasLaunchedBefore"
    private let lastUpdateCheckKey = "lastUpdateCheck"
    private let skipVersionKey = "skipVersion"
    
    // GitHub repo info
    private let githubOwner = "alexmodrono"
    private let githubRepo = "clean-safari"
    
    // Update check interval (24 hours)
    private let updateCheckInterval: TimeInterval = 24 * 60 * 60
    
    var updateWindow: NSWindow?

    func applicationDidFinishLaunching(_ notification: Notification) {
        let hasLaunchedBefore = UserDefaults.standard.bool(forKey: hasLaunchedBeforeKey)
        
        if hasLaunchedBefore {
            // Not first launch - close the main window and just check for updates
            DispatchQueue.main.async {
                // Close the main showcase window
                NSApplication.shared.windows.first?.close()
                
                // Check for updates silently
                self.checkForUpdatesIfNeeded()
            }
        } else {
            // First launch - mark as launched and show showcase
            UserDefaults.standard.set(true, forKey: hasLaunchedBeforeKey)
            
            // Also check for updates after showing the showcase
            DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
                self.checkForUpdatesIfNeeded()
            }
        }
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }
    
    // MARK: - Update Checking
    
    private func checkForUpdatesIfNeeded() {
        let lastCheck = UserDefaults.standard.double(forKey: lastUpdateCheckKey)
        let now = Date().timeIntervalSince1970
        
        // Only check if enough time has passed since last check
        if now - lastCheck > updateCheckInterval {
            checkForUpdates()
        } else {
            // No update window shown, quit if this wasn't first launch
            if UserDefaults.standard.bool(forKey: hasLaunchedBeforeKey) && NSApplication.shared.windows.isEmpty {
                NSApplication.shared.terminate(nil)
            }
        }
    }
    
    func checkForUpdates() {
        UserDefaults.standard.set(Date().timeIntervalSince1970, forKey: lastUpdateCheckKey)
        
        let urlString = "https://api.github.com/repos/\(githubOwner)/\(githubRepo)/releases/latest"
        guard let url = URL(string: urlString) else { return }
        
        var request = URLRequest(url: url)
        request.setValue("application/vnd.github.v3+json", forHTTPHeaderField: "Accept")
        request.timeoutInterval = 10
        
        URLSession.shared.dataTask(with: request) { [weak self] data, response, error in
            guard let self = self else { return }
            
            if let error = error {
                print("Update check failed: \(error.localizedDescription)")
                DispatchQueue.main.async {
                    self.terminateIfNoWindows()
                }
                return
            }
            
            guard let data = data else {
                DispatchQueue.main.async {
                    self.terminateIfNoWindows()
                }
                return
            }
            
            do {
                if let json = try JSONSerialization.jsonObject(with: data) as? [String: Any],
                   let tagName = json["tag_name"] as? String,
                   let htmlUrl = json["html_url"] as? String,
                   let body = json["body"] as? String {
                    
                    let latestVersion = tagName.replacingOccurrences(of: "v", with: "")
                    let currentVersion = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "0.0.0"
                    let skipVersion = UserDefaults.standard.string(forKey: self.skipVersionKey)
                    
                    if self.isNewerVersion(latestVersion, than: currentVersion) && skipVersion != latestVersion {
                        DispatchQueue.main.async {
                            self.showUpdateAlert(version: latestVersion, releaseNotes: body, downloadUrl: htmlUrl)
                        }
                    } else {
                        DispatchQueue.main.async {
                            self.terminateIfNoWindows()
                        }
                    }
                } else {
                    DispatchQueue.main.async {
                        self.terminateIfNoWindows()
                    }
                }
            } catch {
                print("Failed to parse update response: \(error)")
                DispatchQueue.main.async {
                    self.terminateIfNoWindows()
                }
            }
        }.resume()
    }
    
    private func isNewerVersion(_ latest: String, than current: String) -> Bool {
        let latestComponents = latest.split(separator: ".").compactMap { Int($0) }
        let currentComponents = current.split(separator: ".").compactMap { Int($0) }
        
        let maxLength = max(latestComponents.count, currentComponents.count)
        
        for i in 0..<maxLength {
            let latestPart = i < latestComponents.count ? latestComponents[i] : 0
            let currentPart = i < currentComponents.count ? currentComponents[i] : 0
            
            if latestPart > currentPart {
                return true
            } else if latestPart < currentPart {
                return false
            }
        }
        
        return false
    }
    
    private func showUpdateAlert(version: String, releaseNotes: String, downloadUrl: String) {
        // Create update window with SwiftUI
        let updateView = UpdateAvailableView(
            version: version,
            releaseNotes: releaseNotes,
            downloadUrl: downloadUrl,
            onSkip: { [weak self] in
                UserDefaults.standard.set(version, forKey: self?.skipVersionKey ?? "")
                self?.updateWindow?.close()
                self?.terminateIfNoWindows()
            },
            onLater: { [weak self] in
                self?.updateWindow?.close()
                self?.terminateIfNoWindows()
            },
            onUpdate: { [weak self] in
                if let url = URL(string: downloadUrl) {
                    NSWorkspace.shared.open(url)
                }
                self?.updateWindow?.close()
                NSApplication.shared.terminate(nil)
            }
        )
        
        let hostingController = NSHostingController(rootView: updateView)
        
        let window = NSWindow(contentViewController: hostingController)
        window.title = "Update Available"
        window.titlebarAppearsTransparent = true
        window.titleVisibility = .hidden
        window.styleMask = [.titled, .closable, .fullSizeContentView]
        window.standardWindowButton(.miniaturizeButton)?.isHidden = true
        window.standardWindowButton(.zoomButton)?.isHidden = true
        window.backgroundColor = NSColor(red: 0.08, green: 0.08, blue: 0.14, alpha: 1.0)
        window.setContentSize(NSSize(width: 420, height: 380))
        window.center()
        
        self.updateWindow = window
        window.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)
    }
    
    private func terminateIfNoWindows() {
        // Only terminate if there are no windows open
        let hasVisibleWindows = NSApplication.shared.windows.contains { $0.isVisible }
        if !hasVisibleWindows {
            NSApplication.shared.terminate(nil)
        }
    }
}

// MARK: - Update Available View

struct UpdateAvailableView: View {
    let version: String
    let releaseNotes: String
    let downloadUrl: String
    let onSkip: () -> Void
    let onLater: () -> Void
    let onUpdate: () -> Void
    
    var body: some View {
        ZStack {
            // Background
            LinearGradient(
                colors: [
                    Color(red: 0.08, green: 0.08, blue: 0.14),
                    Color(red: 0.06, green: 0.10, blue: 0.18)
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()
            
            VStack(spacing: 0) {
                // Draggable area
                Color.clear
                    .frame(height: 24)
                    .background(WindowDragArea())
                
                // Icon and title
                VStack(spacing: 12) {
                    ZStack {
                        Circle()
                            .fill(Color.green.opacity(0.1))
                            .frame(width: 80, height: 80)
                        
                        Image(systemName: "arrow.down.circle.fill")
                            .font(.system(size: 40))
                            .foregroundColor(.green)
                    }
                    
                    Text("Update Available")
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                    
                    Text("Version \(version) is now available")
                        .font(.subheadline)
                        .foregroundColor(.gray)
                }
                .padding(.top, 8)
                .padding(.bottom, 20)
                
                // Release notes
                VStack(alignment: .leading, spacing: 8) {
                    Text("What's New:")
                        .font(.headline)
                        .foregroundColor(.white)
                    
                    ScrollView {
                        Text(releaseNotes)
                            .font(.system(size: 12))
                            .foregroundColor(.gray)
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                    .frame(height: 100)
                    .padding(12)
                    .background(Color.white.opacity(0.05))
                    .cornerRadius(8)
                }
                .padding(.horizontal, 24)
                
                Spacer()
                
                // Buttons
                VStack(spacing: 10) {
                    Button(action: onUpdate) {
                        HStack {
                            Image(systemName: "arrow.down.to.line")
                            Text("Download Update")
                        }
                        .font(.headline)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                        .background(
                            LinearGradient(
                                colors: [Color.green, Color.green.opacity(0.8)],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                        .foregroundColor(.white)
                        .cornerRadius(10)
                    }
                    .buttonStyle(.plain)
                    
                    HStack(spacing: 10) {
                        Button(action: onSkip) {
                            Text("Skip This Version")
                                .font(.subheadline)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 10)
                                .background(Color.white.opacity(0.08))
                                .foregroundColor(.gray)
                                .cornerRadius(8)
                        }
                        .buttonStyle(.plain)
                        
                        Button(action: onLater) {
                            Text("Remind Me Later")
                                .font(.subheadline)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 10)
                                .background(Color.white.opacity(0.08))
                                .foregroundColor(.gray)
                                .cornerRadius(8)
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(.horizontal, 24)
                .padding(.bottom, 24)
            }
        }
        .frame(width: 420, height: 380)
    }
}
