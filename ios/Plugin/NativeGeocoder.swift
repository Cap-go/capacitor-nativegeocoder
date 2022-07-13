import Foundation
import Capacitor
import CoreLocation

struct NativeGeocoderResult: Encodable {
    var latitude: String?
    var longitude: String?
    var countryCode: String?
    var countryName: String?
    var postalCode: String?
    var administrativeArea: String?
    var subAdministrativeArea: String?
    var locality: String?
    var subLocality: String?
    var thoroughfare: String?
    var subThoroughfare: String?
    var areasOfInterest: [String]?
}

struct NativeGeocoderError {
    var message: String
}

struct NativeGeocoderOptions: Decodable {
    var useLocale: Bool = true
    var defaultLocale: String?
    var maxResults: Int = 1
}

@objc public class NativeGeocoder: NSObject {

    typealias ReverseGeocodeCompletionHandler = ([NativeGeocoderResult]?, NativeGeocoderError?) -> Void
    typealias ForwardGeocodeCompletionHandler = ([NativeGeocoderResult]?, NativeGeocoderError?) -> Void
    private static let MAX_RESULTS_COUNT = 5

    func reverseGeocode(latitude: Double, longitude: Double, call: CAPPluginCall) {
        if (CLGeocoder().isGeocoding) {
            call.reject("Geocoder is busy. Please try again later.")
            return
        }
        
        let location = CLLocation(latitude: latitude, longitude: longitude)
        var options = NativeGeocoderOptions(useLocale: true, defaultLocale: nil, maxResults: 1)
        options.useLocale = call.getBool("useLocale") ?? true
        options.defaultLocale = call.getString("defaultLocale")
        options.maxResults = call.getInt("maxResults") ?? 1

        reverseGeocodeLocationHandler(location, options: options, completionHandler: { [weak self] (resultObj, error) in
            if let error = error {
                call.reject(error.message)
            } else {
                if let encodedResult = try? JSONEncoder().encode(resultObj),
                    let result = try? JSONSerialization.jsonObject(with: encodedResult, options: .allowFragments) as? [Dictionary<String,Any>] {
                    call.resolve(result)
                } else {
                    call.reject("Invalid JSON result")
                }
            }
        })
    }
    
    private func reverseGeocodeLocationHandler(_ location: CLLocation, options: NativeGeocoderOptions, completionHandler: @escaping ReverseGeocodeCompletionHandler) {
        let geocoderOptions = getNativeGeocoderOptions(from: options)
        
        if #available(iOS 11, *) {
            var locale: Locale?
            if let defaultLocaleString = geocoderOptions.defaultLocale {
                locale = Locale.init(identifier: defaultLocaleString)
            } else if (geocoderOptions.useLocale == false) {
                locale = Locale.init(identifier: "en_US")
            }

            CLGeocoder().reverseGeocodeLocation(location, preferredLocale: locale, completionHandler: { [weak self] (placemarks, error) in
                self?.createReverseGeocodeResult(placemarks, error, maxResults: geocoderOptions.maxResults, completionHandler: { (resultObj, error) in
                    completionHandler(resultObj, error)
                })
            })
        } else {
            // fallback for < iOS 11
            CLGeocoder().reverseGeocodeLocation(location, completionHandler: { [weak self] (placemarks, error) in
                self?.createReverseGeocodeResult(placemarks, error, maxResults: geocoderOptions.maxResults, completionHandler: { (resultObj, error) in
                    completionHandler(resultObj, error)
                })
            })
        }
    }
    
    private func createReverseGeocodeResult(_ placemarks: [CLPlacemark]?, _ error: Error?, maxResults: Int, completionHandler: @escaping ReverseGeocodeCompletionHandler) {
        guard error == nil else {
            completionHandler(nil, NativeGeocoderError(message: "CLGeocoder:reverseGeocodeLocation Error"))
            return
        }
        
        if let placemarks = placemarks {
            let maxResultObjects = placemarks.count >= maxResults ? maxResults : placemarks.count
            var resultObj = [NativeGeocoderResult]()
            
            for i in 0..<maxResultObjects {
                // https://developer.apple.com/documentation/corelocation/clplacemark
                var latitude = ""
                if let lat = placemarks[i].location?.coordinate.latitude {
                    latitude = "\(lat)"
                }
                var longitude = ""
                if let lon = placemarks[i].location?.coordinate.longitude {
                    longitude = "\(lon)"
                }
                let placemark = NativeGeocoderResult(
                    latitude: latitude,
                    longitude: longitude,
                    countryCode: placemarks[i].isoCountryCode ?? "",
                    countryName: placemarks[i].country ?? "",
                    postalCode: placemarks[i].postalCode ?? "",
                    administrativeArea: placemarks[i].administrativeArea ?? "",
                    subAdministrativeArea: placemarks[i].subAdministrativeArea ?? "",
                    locality: placemarks[i].locality ?? "",
                    subLocality: placemarks[i].subLocality ?? "",
                    thoroughfare: placemarks[i].thoroughfare ?? "",
                    subThoroughfare: placemarks[i].subThoroughfare ?? "",
                    areasOfInterest: placemarks[i].areasOfInterest ?? []
                )
                resultObj.append(placemark)
            }
            
            completionHandler(resultObj, nil)
        }
        else {
            completionHandler(nil, NativeGeocoderError(message: "Cannot get an address"))
        }
    }
    
    
    func forwardGeocode(address: String, call: CAPPluginCall) {
        
        if (CLGeocoder().isGeocoding) {
            call.reject("Geocoder is busy. Please try again later.")
            return
        }
        
        var options = NativeGeocoderOptions(useLocale: true, defaultLocale: nil, maxResults: 1)
        options.useLocale = call.getBool("useLocale") ?? true
        options.defaultLocale = call.getString("defaultLocale")
        options.maxResults = call.getInt("maxResults") ?? 1
        
        forwardGeocodeHandler(address, options: options, completionHandler: { [weak self] (resultObj, error) in
            if let error = error {
                call.reject(error.message)
            } else {
                if let encodedResult = try? JSONEncoder().encode(resultObj),
                    let result = try? JSONSerialization.jsonObject(with: encodedResult, options: .allowFragments) as? [Dictionary<String,Any>] {
                    call.resolve(result)
                } else {
                    call.reject("Invalid JSON result")
                }
            }
        })
    }
    
    func forwardGeocodeHandler(_ address: String, options: NativeGeocoderOptions, completionHandler: @escaping ForwardGeocodeCompletionHandler) {
        let geocoderOptions = getNativeGeocoderOptions(from: options)
        
        if #available(iOS 11, *) {
            var locale: Locale?
            if let defaultLocaleString = geocoderOptions.defaultLocale {
                locale = Locale.init(identifier: defaultLocaleString)
            } else if (geocoderOptions.useLocale == false) {
                locale = Locale.init(identifier: "en_US")
            }
            
            CLGeocoder().geocodeAddressString(address, in: nil, preferredLocale: locale, completionHandler: { [weak self] (placemarks, error) in
                self?.createForwardGeocodeResult(placemarks, error, maxResults: geocoderOptions.maxResults, completionHandler: { (resultObj, error) in
                    completionHandler(resultObj, error)
                })
            })
        } else {
            // fallback for < iOS 11
            CLGeocoder().geocodeAddressString(address, completionHandler: { [weak self] (placemarks, error) in
                self?.createForwardGeocodeResult(placemarks, error, maxResults: geocoderOptions.maxResults, completionHandler: { (resultObj, error) in
                    completionHandler(resultObj, error)
                })
            })
        }
    }

    private func createForwardGeocodeResult(_ placemarks: [CLPlacemark]?, _ error: Error?, maxResults: Int, completionHandler: @escaping ForwardGeocodeCompletionHandler) {
        guard error == nil else {
            completionHandler(nil, NativeGeocoderError(message: "CLGeocoder:geocodeAddressString Error"))
            return
        }
        
        if let placemarks = placemarks {
            let maxResultObjects = placemarks.count >= maxResults ? maxResults : placemarks.count
            var resultObj = [NativeGeocoderResult]()
            
            for i in 0..<maxResultObjects {
                if let latitude = placemarks[i].location?.coordinate.latitude,
                    let longitude = placemarks[i].location?.coordinate.longitude {
                
                    // https://developer.apple.com/documentation/corelocation/clplacemark
                    let placemark = NativeGeocoderResult(
                        latitude: "\(latitude)",
                        longitude: "\(longitude)",
                        countryCode: placemarks[i].isoCountryCode ?? "",
                        countryName: placemarks[i].country ?? "",
                        postalCode: placemarks[i].postalCode ?? "",
                        administrativeArea: placemarks[i].administrativeArea ?? "",
                        subAdministrativeArea: placemarks[i].subAdministrativeArea ?? "",
                        locality: placemarks[i].locality ?? "",
                        subLocality: placemarks[i].subLocality ?? "",
                        thoroughfare: placemarks[i].thoroughfare ?? "",
                        subThoroughfare: placemarks[i].subThoroughfare ?? "",
                        areasOfInterest: placemarks[i].areasOfInterest ?? []
                    )
                    resultObj.append(placemark)
                }
            }
            
            if (resultObj.count == 0) {
                completionHandler(nil, NativeGeocoderError(message: "Cannot get latitude and/or longitude"))
            } else {
                completionHandler(resultObj, nil)
            }
        }
        else {
            completionHandler(nil, NativeGeocoderError(message: "Cannot find a location"))
        }
    }
    
    // MARK: - Helper
    private func getNativeGeocoderOptions(from options: NativeGeocoderOptions) -> NativeGeocoderOptions {
        var geocoderOptions = NativeGeocoderOptions()
        geocoderOptions.useLocale = options.useLocale
        geocoderOptions.defaultLocale = options.defaultLocale
        if (options.maxResults > 0) {
            geocoderOptions.maxResults = options.maxResults > NativeGeocoder.MAX_RESULTS_COUNT ? NativeGeocoder.MAX_RESULTS_COUNT : options.maxResults
        } else {
            geocoderOptions.maxResults = 1
        }
        return geocoderOptions
    }
}
