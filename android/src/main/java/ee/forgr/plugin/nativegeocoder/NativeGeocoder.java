package ee.forgr.capacitor_nativegeocoder;

import android.util.Log;

public class NativeGeocoder {

    public Context context;
    /**
     * Reverse geocode a given latitude and longitude to find location address
     * @param latitude double
     * @param longitude double
     * @param call PluginCall
     */
    private void reverseGeocode(double latitude, double longitude, PluginCall call) {

        if (latitude == 0 || longitude == 0) {
            call.reject("Expected two non-empty double arguments.");
            return;
        }

        if (!Geocoder.isPresent()) {
            call.reject("Geocoder is not present on this device/emulator.");
            return;
        }

        NativeGeocoderOptions geocoderOptions = getNativeGeocoderOptions(options);
        geocoder = createGeocoderWithOptions(geocoderOptions);

        try {
            List<Address> geoResults = geocoder.getFromLocation(latitude, longitude, geocoderOptions.maxResults);
            if (geoResults.size() > 0) {
                int maxResultObjects = geoResults.size() >= geocoderOptions.maxResults ? geoResults.size() : geoResults.size();
                JSONArray resultObj = new JSONArray();

                for (int i = 0; i < maxResultObjects; i++) {
                    Address address = geoResults.get(i);

                    // https://developer.android.com/reference/android/location/Address.html
                    JSONObject placemark = new JSONObject();
                    placemark.put("latitude", !String.valueOf(address.getLatitude()).isEmpty() ? address.getLatitude() : "");
                    placemark.put("longitude", !String.valueOf(address.getLongitude()).isEmpty() ? address.getLongitude() : "");
                    placemark.put("countryCode", address.getCountryCode() != null ? address.getCountryCode() : "");
                    placemark.put("countryName", address.getCountryName() != null ? address.getCountryName() : "");
                    placemark.put("postalCode", address.getPostalCode() != null ? address.getPostalCode() : "");
                    placemark.put("administrativeArea", address.getAdminArea() != null ? address.getAdminArea() : "");
                    placemark.put("subAdministrativeArea", address.getSubAdminArea() != null ? address.getSubAdminArea() : "");
                    placemark.put("locality", address.getLocality() != null ? address.getLocality() : "");
                    placemark.put("subLocality", address.getSubLocality() != null ? address.getSubLocality() : "");
                    placemark.put("thoroughfare", address.getThoroughfare() != null ? address.getThoroughfare() : "");
                    placemark.put("subThoroughfare", address.getSubThoroughfare() != null ? address.getSubThoroughfare() : "");
                    placemark.put("areasOfInterest", address.getFeatureName() != null ? new JSONArray(new String[]{ address.getFeatureName()} ) : new JSONArray());

                    resultObj.put(placemark);
                }
                call.resolve(resultObj);
            } else {
                call.reject("Cannot get an address.");
            }
        }
        catch (Exception e) {
            String errorMsg = e.getMessage();
            if (e.getMessage().equals("grpc failed") && !isNetworkAvailable()) {
                errorMsg = "No Internet Access";
            }
            call.reject("Geocoder:getFromLocationName Error: " + errorMsg);
        }
    }


    /**
     * Forward geocode a given address to find coordinates
     * @param addressString String
     * @param options JSONObject
     * @param call PluginCall
     */
    private void forwardGeocode(String addressString, PluginCall call) {
        if (addressString == null || addressString.length() == 0) {
            call.reject("Expected a non-empty string argument.");
            return;
        }

        if (!Geocoder.isPresent()) {
            call.reject("Geocoder is not present on this device/emulator.");
            return;
        }

        NativeGeocoderOptions geocoderOptions = getNativeGeocoderOptions(call);
        geocoder = createGeocoderWithOptions(geocoderOptions);

        try {
            List<Address> geoResults = geocoder.getFromLocationName(addressString, geocoderOptions.maxResults);

            if (geoResults.size() > 0) {
                int maxResultObjects = geoResults.size() >= geocoderOptions.maxResults ? geoResults.size() : geoResults.size();
                JSONArray resultObj = new JSONArray();

                for (int i = 0; i < maxResultObjects; i++) {
                    Address address = geoResults.get(i);

                    try {
                        String latitude = String.valueOf(address.getLatitude());
                        String longitude = String.valueOf(address.getLongitude());

                        if (!latitude.isEmpty() && !longitude.isEmpty()) {
                            // https://developer.android.com/reference/android/location/Address.html
                            JSONObject placemark = new JSONObject();
                            placemark.put("latitude", latitude);
                            placemark.put("longitude", longitude);
                            placemark.put("countryCode", address.getCountryCode() != null ? address.getCountryCode() : "");
                            placemark.put("countryName", address.getCountryName() != null ? address.getCountryName() : "");
                            placemark.put("postalCode", address.getPostalCode() != null ? address.getPostalCode() : "");
                            placemark.put("administrativeArea", address.getAdminArea() != null ? address.getAdminArea() : "");
                            placemark.put("subAdministrativeArea", address.getSubAdminArea() != null ? address.getSubAdminArea() : "");
                            placemark.put("locality", address.getLocality() != null ? address.getLocality() : "");
                            placemark.put("subLocality", address.getSubLocality() != null ? address.getSubLocality() : "");
                            placemark.put("thoroughfare", address.getThoroughfare() != null ? address.getThoroughfare() : "");
                            placemark.put("subThoroughfare", address.getSubThoroughfare() != null ? address.getSubThoroughfare() : "");
                            placemark.put("areasOfInterest", address.getFeatureName() != null ? new JSONArray(new String[]{ address.getFeatureName() }) : new JSONArray());

                            resultObj.put(placemark);
                        }
                    }
                    catch (RuntimeException e) {
                        e.printStackTrace();
                    }
                }

                if (resultObj.length() == 0) {
                    call.reject("Cannot get latitude and/or longitude.");
                } else {
                    call.resolve(resultObj);
                }

            } else {
                call.reject("Cannot find a location.");
            }
        }
        catch (Exception e) {
            String errorMsg = e.getMessage();
            if (e.getMessage().equals("grpc failed") && !isNetworkAvailable()) {
                errorMsg = "No Internet Access";
            }
            call.reject("Geocoder:getFromLocationName Error: " + errorMsg);
        }
    }

    /**
     * Get network connection
     * @return boolean
     */
    private boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager
                = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = null;
        if (connectivityManager != null) {
            activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        }
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();
    }

    /**
     * Get a valid NativeGeocoderOptions object
     * @param options JSONObject
     * @return NativeGeocoderOptions
     */
    private NativeGeocoderOptions getNativeGeocoderOptions(JSONObject options) {
        NativeGeocoderOptions geocoderOptions = new NativeGeocoderOptions();

        if (options != null) {
            try {
                geocoderOptions.useLocale = !options.has("useLocale") || options.getBoolean("useLocale");
            } catch (JSONException e) {
                geocoderOptions.useLocale = true;
            }

            if (options.has("defaultLocale")) {
                try {
                    geocoderOptions.defaultLocale = options.getString("defaultLocale");
                } catch (JSONException e) {
                    geocoderOptions.defaultLocale = null;
                }
            } else {
                geocoderOptions.defaultLocale = null;
            }
            if (options.has("maxResults")) {
                try {
                    geocoderOptions.maxResults = options.getInt("maxResults");
                } catch (JSONException e) {
                    geocoderOptions.maxResults = 1;
                }

                if (geocoderOptions.maxResults > 0) {
                    int MAX_RESULTS_COUNT = 5;
                    geocoderOptions.maxResults = Math.min(geocoderOptions.maxResults, MAX_RESULTS_COUNT);
                } else {
                    geocoderOptions.maxResults = 1;
                }
            } else {
                geocoderOptions.maxResults = 1;
            }
        } else {
            geocoderOptions.useLocale = true;
            geocoderOptions.defaultLocale = null;
            geocoderOptions.maxResults = 1;
        }

        return geocoderOptions;
    }

    /**
     * Create a Geocoder with NativeGeocoderOptions
     * @param geocoderOptions NativeGeocoderOptions
     * @return Geocoder
     */
    private Geocoder createGeocoderWithOptions(NativeGeocoderOptions geocoderOptions) {
        if (geocoderOptions.defaultLocale != null && !geocoderOptions.defaultLocale.isEmpty()) {
            Locale locale;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                locale = Locale.forLanguageTag(geocoderOptions.defaultLocale);
            } else {
                String[] parts = geocoderOptions.defaultLocale.split("[-_]", -1);
                if (parts.length == 1)
                    locale = new Locale(parts[0]);
                else if (parts.length == 2 || (parts.length == 3 && parts[2].startsWith("#")))
                    locale = new Locale(parts[0], parts[1]);
                else
                    locale = new Locale(parts[0], parts[1], parts[2]);
            }
            geocoder = new Geocoder(context.getApplicationContext(), locale);
        } else {
            if (geocoderOptions.useLocale) {
                geocoder = new Geocoder(context.getApplicationContext(), Locale.getDefault());
            } else {
                geocoder = new Geocoder(context.getApplicationContext(), Locale.ENGLISH);
            }
        }
        return geocoder;
    }
}
