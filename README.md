# @capgo/nativegeocoder
 <a href="https://capgo.app/"><img src='https://raw.githubusercontent.com/Cap-go/capgo/main/assets/capgo_banner.png' alt='Capgo - Instant updates for capacitor'/></a>

<div align="center">
  <h2><a href="https://capgo.app/?ref=plugin"> ➡️ Get Instant updates for your App with Capgo</a></h2>
  <h2><a href="https://capgo.app/consulting/?ref=plugin"> Missing a feature? We’ll build the plugin for you 💪</a></h2>
</div>

Capacitor plugin for native forward and reverse geocoding

## Install

```bash
npm install @capgo/nativegeocoder
npx cap sync
```

then import this into your code:

```javascript
import { NativeGeocoder } from '@capgo/nativegeocoder';
```

## iOS

Apple requires privacy descriptions to be specified in `Info.plist` for location information:

- `NSLocationAlwaysAndWhenInUseUsageDescription` (`Privacy - Location Always Usage Description`)
- `NSLocationWhenInUseUsageDescription` (`Privacy - Location When In Use Usage Description`)

Read about [Configuring `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) in the [iOS Guide](https://capacitorjs.com/docs/ios) for more information on setting iOS permissions in Xcode
The IOS implementation require internet

## Android

This API requires the following permissions be added to your `AndroidManifest.xml`:

```xml
<!-- Geolocation API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

## Web

This API requires a Google API key to be set in the `apiKey` field of the `ForwardOptions` or `ReverseOptions` interfaces.

There is no way to use this plugin on the web without a Google API key.

The return data is limited to the data available from the native API on the device, as exemple `formatted_address` is not available in web implementation, as it's not available in the native API.

## API

<docgen-index>

* [`reverseGeocode(...)`](#reversegeocode)
* [`forwardGeocode(...)`](#forwardgeocode)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### reverseGeocode(...)

```typescript
reverseGeocode(options: ReverseOptions) => Promise<{ addresses: Address[]; }>
```

Convert latitude and longitude to an address

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#reverseoptions">ReverseOptions</a></code> |

**Returns:** <code>Promise&lt;{ addresses: Address[]; }&gt;</code>

**Since:** 0.0.1

--------------------


### forwardGeocode(...)

```typescript
forwardGeocode(options: ForwardOptions) => Promise<{ addresses: Address[]; }>
```

Convert an address to latitude and longitude

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#forwardoptions">ForwardOptions</a></code> |

**Returns:** <code>Promise&lt;{ addresses: Address[]; }&gt;</code>

**Since:** 0.0.1

--------------------


### Interfaces


#### Address

| Prop                        | Type                  |
| --------------------------- | --------------------- |
| **`latitude`**              | <code>number</code>   |
| **`longitude`**             | <code>number</code>   |
| **`countryCode`**           | <code>string</code>   |
| **`countryName`**           | <code>string</code>   |
| **`postalCode`**            | <code>string</code>   |
| **`administrativeArea`**    | <code>string</code>   |
| **`subAdministrativeArea`** | <code>string</code>   |
| **`locality`**              | <code>string</code>   |
| **`subLocality`**           | <code>string</code>   |
| **`thoroughfare`**          | <code>string</code>   |
| **`subThoroughfare`**       | <code>string</code>   |
| **`areasOfInterest`**       | <code>string[]</code> |


#### ReverseOptions

| Prop                | Type                 | Description                                                              |
| ------------------- | -------------------- | ------------------------------------------------------------------------ |
| **`latitude`**      | <code>number</code>  | latitude is a number representing the latitude of the location.          |
| **`longitude`**     | <code>number</code>  | longitude is a number representing the longitude of the location.        |
| **`useLocale`**     | <code>boolean</code> | Localise the results to the given locale.                                |
| **`defaultLocale`** | <code>string</code>  | locale is a string in the format of language_country, for example en_US. |
| **`maxResults`**    | <code>number</code>  | Max number of results to return.                                         |
| **`apiKey`**        | <code>string</code>  | Only used for web platform to use google api                             |
| **`resultType`**    | <code>string</code>  | Only used for web platform to use google api                             |


#### ForwardOptions

| Prop                | Type                 | Description                                                              |
| ------------------- | -------------------- | ------------------------------------------------------------------------ |
| **`addressString`** | <code>string</code>  | address is a string of the address to be geocoded.                       |
| **`useLocale`**     | <code>boolean</code> | Localise the results to the given locale.                                |
| **`defaultLocale`** | <code>string</code>  | locale is a string in the format of language_country, for example en_US. |
| **`maxResults`**    | <code>number</code>  | Max number of results to return.                                         |
| **`apiKey`**        | <code>string</code>  | Only used for web platform to use google api                             |

</docgen-api>

## Thanks
To [@sebastianbaar](https://github.com/sebastianbaar) and his work on [cordova-plugin-nativegeocoder](https://github.com/sebastianbaar/cordova-plugin-nativegeocoder) what he made was very inspiring
