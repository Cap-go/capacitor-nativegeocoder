# @capgo/nativegeocoder

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

- `NSLocationAlwaysUsageDescription` (`Privacy - Location Always Usage Description`)
- `NSLocationWhenInUseUsageDescription` (`Privacy - Location When In Use Usage Description`)

Read about [Configuring `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) in the [iOS Guide](https://capacitorjs.com/docs/ios) for more information on setting iOS permissions in Xcode

## Android

This API requires the following permissions be added to your `AndroidManifest.xml`:

```xml
<!-- Geolocation API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

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
reverseGeocode(options: reverseOptions) => Promise<{ addresses: Adress[]; }>
```

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#reverseoptions">reverseOptions</a></code> |

**Returns:** <code>Promise&lt;{ addresses: Adress[]; }&gt;</code>

--------------------


### forwardGeocode(...)

```typescript
forwardGeocode(options: ForwardOptions) => Promise<{ addresses: Adress[]; }>
```

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#forwardoptions">ForwardOptions</a></code> |

**Returns:** <code>Promise&lt;{ addresses: Adress[]; }&gt;</code>

--------------------


### Interfaces


#### Adress

| Prop                        | Type                  |
| --------------------------- | --------------------- |
| **`latitude`**              | <code>string</code>   |
| **`longitude`**             | <code>string</code>   |
| **`countryCode`**           | <code>string</code>   |
| **`postalCode`**            | <code>string</code>   |
| **`administrativeArea`**    | <code>string</code>   |
| **`subAdministrativeArea`** | <code>string</code>   |
| **`locality`**              | <code>string</code>   |
| **`subLocality`**           | <code>string</code>   |
| **`thoroughfare`**          | <code>string</code>   |
| **`subThoroughfare`**       | <code>string</code>   |
| **`areasOfInterest`**       | <code>string[]</code> |
| **`formatted_address`**     | <code>string</code>   |


#### reverseOptions

| Prop                | Type                 |
| ------------------- | -------------------- |
| **`latitude`**      | <code>number</code>  |
| **`longitude`**     | <code>number</code>  |
| **`useLocale`**     | <code>boolean</code> |
| **`defaultLocale`** | <code>string</code>  |
| **`maxResults`**    | <code>number</code>  |
| **`apiKey`**        | <code>string</code>  |


#### ForwardOptions

| Prop                | Type                 |
| ------------------- | -------------------- |
| **`addressString`** | <code>string</code>  |
| **`useLocale`**     | <code>boolean</code> |
| **`defaultLocale`** | <code>string</code>  |
| **`maxResults`**    | <code>number</code>  |
| **`apiKey`**        | <code>string</code>  |

</docgen-api>
