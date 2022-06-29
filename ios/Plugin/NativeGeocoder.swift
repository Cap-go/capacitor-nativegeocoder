import Foundation

@objc public class NativeGeocoder: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
