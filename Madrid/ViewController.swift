//
//  ViewController.swift
//  Madrid
//
//  Created by Alejandro Modroño Vara on 27/11/25.
//

import Cocoa
import SafariServices
import SwiftUI

let extensionBundleIdentifier = "es.amodrono.Madrid.Extension"

// MARK: - Feature Data
struct Feature: Identifiable {
    let id = UUID()
    let icon: String
    let title: String
    let description: String
    let color: Color
}

let features: [Feature] = [
    Feature(icon: "archivebox.fill", title: "Auto Archive", description: "Automatically archives inactive tabs to keep your browser clean and organized.", color: Color(red: 0.91, green: 0.27, blue: 0.38)),
    Feature(icon: "clock.fill", title: "Smart Timing", description: "Set custom thresholds in seconds, minutes, hours, or days. Tabs are archived only after being inactive.", color: Color(red: 0.25, green: 0.47, blue: 0.85)),
    Feature(icon: "shield.fill", title: "Protected Sites", description: "Add URL patterns to protect important sites from ever being archived.", color: Color(red: 0.3, green: 0.69, blue: 0.31)),
    Feature(icon: "arrow.counterclockwise", title: "Easy Restore", description: "Quickly restore any archived tab with a single click. Never lose your tabs again.", color: Color(red: 0.61, green: 0.35, blue: 0.71)),
    Feature(icon: "chart.bar.fill", title: "Smart Limits", description: "Set minimum tabs before archiving starts and maximum tabs per window.", color: Color(red: 1.0, green: 0.6, blue: 0.0))
]

// MARK: - Showcase View
struct ShowcaseView: View {
    @State private var currentPage = 0
    @State private var timer: Timer?
    
    var body: some View {
        ZStack {
            // Background gradient
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
                // Draggable area for window
                Color.clear
                    .frame(height: 24)
                    .background(WindowDragArea())
                
                // Thank you message
                VStack(spacing: 10) {
                    Text("Thank you for downloading")
                        .font(.subheadline)
                        .foregroundColor(.gray)
                    
                    HStack(spacing: 10) {
                        Image(systemName: "archivebox.fill")
                            .font(.title)
                            .foregroundColor(Color(red: 0.91, green: 0.27, blue: 0.38))
                        
                        Text("Auto Archive")
                            .font(.largeTitle)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                        
                        Text("for Safari")
                            .font(.title2)
                            .foregroundColor(.gray)
                    }
                }
                .padding(.top, 10)
                .padding(.bottom, 24)
                
                // Feature slideshow with arrows
                HStack(spacing: 0) {
                    // Left arrow
                    Button(action: previousPage) {
                        Image(systemName: "chevron.left")
                            .font(.title2.weight(.semibold))
                            .foregroundColor(currentPage > 0 ? .white : .gray.opacity(0.3))
                            .frame(width: 44, height: 44)
                            .background(Color.white.opacity(currentPage > 0 ? 0.1 : 0))
                            .cornerRadius(22)
                    }
                    .buttonStyle(.plain)
                    .disabled(currentPage == 0)
                    .padding(.leading, 16)
                    
                    // Feature content
                    FeatureSlide(feature: features[currentPage])
                        .frame(maxWidth: .infinity)
                        .animation(.easeInOut(duration: 0.3), value: currentPage)
                    
                    // Right arrow
                    Button(action: nextPage) {
                        Image(systemName: "chevron.right")
                            .font(.title2.weight(.semibold))
                            .foregroundColor(currentPage < features.count - 1 ? .white : .gray.opacity(0.3))
                            .frame(width: 44, height: 44)
                            .background(Color.white.opacity(currentPage < features.count - 1 ? 0.1 : 0))
                            .cornerRadius(22)
                    }
                    .buttonStyle(.plain)
                    .disabled(currentPage == features.count - 1)
                    .padding(.trailing, 16)
                }
                .frame(height: 260)
                
                // Page counter
                HStack(spacing: 6) {
                    ForEach(0..<features.count, id: \.self) { index in
                        Circle()
                            .fill(currentPage == index ? features[currentPage].color : Color.gray.opacity(0.3))
                            .frame(width: 8, height: 8)
                    }
                }
                .padding(.top, 16)
                
                Spacer()
                
                // Action buttons
                VStack(spacing: 12) {
                    Button(action: openSafariPreferences) {
                        HStack {
                            Image(systemName: "safari")
                            Text("Enable in Safari")
                        }
                        .font(.headline)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(
                            LinearGradient(
                                colors: [Color(red: 0.91, green: 0.27, blue: 0.38), Color(red: 1.0, green: 0.42, blue: 0.42)],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                        .foregroundColor(.white)
                        .cornerRadius(12)
                    }
                    .buttonStyle(.plain)
                    
                    HStack(spacing: 12) {
                        Button(action: openDonateLink) {
                            HStack {
                                Image(systemName: "heart.fill")
                                Text("Donate")
                            }
                            .font(.subheadline.weight(.medium))
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                            .background(Color.pink.opacity(0.15))
                            .foregroundColor(.pink)
                            .cornerRadius(10)
                            .overlay(
                                RoundedRectangle(cornerRadius: 10)
                                    .stroke(Color.pink.opacity(0.3), lineWidth: 1)
                            )
                        }
                        .buttonStyle(.plain)
                        
                        Button(action: checkForUpdates) {
                            HStack {
                                Image(systemName: "arrow.triangle.2.circlepath")
                                Text("Updates")
                            }
                            .font(.subheadline.weight(.medium))
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                            .background(Color.blue.opacity(0.15))
                            .foregroundColor(.blue)
                            .cornerRadius(10)
                        }
                        .buttonStyle(.plain)
                        
                        Button(action: closeApp) {
                            HStack {
                                Image(systemName: "xmark")
                            }
                            .font(.subheadline.weight(.medium))
                            .frame(width: 44)
                            .padding(.vertical, 12)
                            .background(Color.white.opacity(0.08))
                            .foregroundColor(.gray)
                            .cornerRadius(10)
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(.horizontal, 32)
                .padding(.bottom, 32)
            }
        }
        .frame(width: 500, height: 560)
        .onAppear {
            startAutoScroll()
        }
        .onDisappear {
            timer?.invalidate()
        }
    }
    
    func previousPage() {
        resetTimer()
        withAnimation(.easeInOut(duration: 0.3)) {
            currentPage = max(0, currentPage - 1)
        }
    }
    
    func nextPage() {
        resetTimer()
        withAnimation(.easeInOut(duration: 0.3)) {
            currentPage = min(features.count - 1, currentPage + 1)
        }
    }
    
    func resetTimer() {
        timer?.invalidate()
        startAutoScroll()
    }
    
    func startAutoScroll() {
        timer = Timer.scheduledTimer(withTimeInterval: 5.0, repeats: true) { _ in
            withAnimation(.easeInOut(duration: 0.5)) {
                currentPage = (currentPage + 1) % features.count
            }
        }
    }
    
    func openSafariPreferences() {
        SFSafariApplication.showPreferencesForExtension(withIdentifier: extensionBundleIdentifier) { error in
            if let error = error {
                print("Error opening Safari preferences: \(error)")
            }
        }
    }
    
    func openDonateLink() {
        if let url = URL(string: "https://buymeacoffee.com/amodrono") {
            NSWorkspace.shared.open(url)
        }
    }
    
    func closeApp() {
        NSApplication.shared.terminate(nil)
    }
    
    func checkForUpdates() {
        if let appDelegate = NSApplication.shared.delegate as? AppDelegate {
            appDelegate.checkForUpdates()
        }
    }
}

struct FeatureSlide: View {
    let feature: Feature
    
    var body: some View {
        VStack(spacing: 24) {
            ZStack {
                Circle()
                    .fill(feature.color.opacity(0.08))
                    .frame(width: 120, height: 120)
                
                Circle()
                    .fill(feature.color.opacity(0.15))
                    .frame(width: 96, height: 96)
                
                Image(systemName: feature.icon)
                    .font(.system(size: 44))
                    .foregroundColor(feature.color)
            }
            
            VStack(spacing: 12) {
                Text(feature.title)
                    .font(.title2)
                    .fontWeight(.semibold)
                    .foregroundColor(.white)
                
                Text(feature.description)
                    .font(.body)
                    .foregroundColor(.gray)
                    .multilineTextAlignment(.center)
                    .fixedSize(horizontal: false, vertical: true)
                    .padding(.horizontal, 20)
            }
        }
        .padding(.vertical, 16)
    }
}

// MARK: - Window Drag Area
struct WindowDragArea: NSViewRepresentable {
    func makeNSView(context: Context) -> NSView {
        let view = WindowDragView()
        return view
    }
    
    func updateNSView(_ nsView: NSView, context: Context) {}
}

class WindowDragView: NSView {
    override var mouseDownCanMoveWindow: Bool { true }
    
    override func mouseDown(with event: NSEvent) {
        window?.performDrag(with: event)
    }
}

// MARK: - View Controller
class ViewController: NSViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let showcaseView = ShowcaseView()
        let hostingController = NSHostingController(rootView: showcaseView)
        
        addChild(hostingController)
        view.addSubview(hostingController.view)
        
        hostingController.view.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            hostingController.view.topAnchor.constraint(equalTo: view.topAnchor),
            hostingController.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            hostingController.view.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            hostingController.view.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }

    override func viewDidAppear() {
        super.viewDidAppear()
        
        // Configure window
        if let window = view.window {
            window.titlebarAppearsTransparent = true
            window.titleVisibility = .hidden
            window.styleMask.insert(.fullSizeContentView)
            window.styleMask.remove(.resizable)
            window.standardWindowButton(.closeButton)?.isHidden = true
            window.standardWindowButton(.miniaturizeButton)?.isHidden = true
            window.standardWindowButton(.zoomButton)?.isHidden = true
            window.isMovableByWindowBackground = true
            window.backgroundColor = NSColor(red: 0.08, green: 0.08, blue: 0.14, alpha: 1.0)
            
            // Set window size and center
            window.setContentSize(NSSize(width: 500, height: 560))
            window.center()
        }
    }
}
