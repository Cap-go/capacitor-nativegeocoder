#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(NativeGeocoderPlugin, "NativeGeocoder",
           CAP_PLUGIN_METHOD(reverseGeocode, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(forwardGeocode, CAPPluginReturnPromise);
)
