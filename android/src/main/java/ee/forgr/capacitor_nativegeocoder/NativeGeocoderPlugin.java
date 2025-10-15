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
        Double latitude = call.getDouble("latitude");
        Double longitude = call.getDouble("longitude");
        if (latitude == null || longitude == null) {
            call.reject("Missing latitude or longitude");
            return;
        }
        implementation.reverseGeocode(latitude, longitude, call);
    }

    @PluginMethod
    public void forwardGeocode(PluginCall call) {
        String addressString = call.getString("addressString");
        if (addressString == null) {
            call.reject("Missing addressString");
            return;
        }
        implementation.forwardGeocode(addressString, call);
    }
}
