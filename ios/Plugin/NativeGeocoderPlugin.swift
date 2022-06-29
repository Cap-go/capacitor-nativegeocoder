import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(NativeGeocoderPlugin)
public class NativeGeocoderPlugin: CAPPlugin {
    private let implementation = NativeGeocoder()

    @objc func reverseGeocode(_ call: CAPPluginCall) {
        guard let addressString = call.getString("addressString") else {
            call.reject("Missing addressString")
            return
        }
        implementation.reverseGeocode(addressString: addressString, call: call)
    }

    @objc func forwardGeocode(_ call: CAPPluginCall) {
        guard let latitude = call.getDouble("latitude") else {
            call.reject("Missing latitude")
            return
        }
        guard let longitude = call.getDouble("longitude") else {
            call.reject("Missing longitude")
            return
        }
        implementation.forwardGeocode(latitude: latitude, longitude: longitude, call: call)
    }
}
