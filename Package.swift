// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapgoNativegeocoder",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "CapgoNativegeocoder",
            targets: ["NativeGeocoderPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0")
    ],
    targets: [
        .target(
            name: "NativeGeocoderPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/NativeGeocoderPlugin"),
        .testTarget(
            name: "NativeGeocoderPluginTests",
            dependencies: ["NativeGeocoderPlugin"],
            path: "ios/Tests/NativeGeocoderPluginTests")
    ]
)
