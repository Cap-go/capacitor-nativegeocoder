package ee.forgr.capacitor_nativegeocoder;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "NativeGeocoder")
public class NativeGeocoderPlugin extends Plugin {

    private NativeGeocoder implementation = new NativeGeocoder();

    @Override
    public void load() {
        super.load();
        implementation.context = this.getContext();
    }

    @PluginMethod
    public void reverseGeocode(PluginCall call) {
        String addressString = call.getString("addressString");
        if (addressString == null) {
            call.reject("Missing addressString");
            return;
        }
        implementation.reverseGeocode(addressString, call);
    }
    @PluginMethod
    public void forwardGeocode(PluginCall call) {
        Number latitude = call.getDouble("latitude");
        Number longitude = call.getDouble("longitude");
        if (latitude == null || longitude == null) {
            call.reject("Missing latitude or longitude");
            return;
        }
        implementation.forwardGeocode(latitude, longitude, call);
    }
}
