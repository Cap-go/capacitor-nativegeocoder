# @capgo/nativegeocoder
  <a href="https://capgo.app/"><img src='https://raw.githubusercontent.com/Cap-go/capgo/main/assets/capgo_banner.png' alt='Capgo - Instant updates for capacitor'/></a>

<div align="center">
<h2><a href="https://capgo.app/">Check out: Capgo — Instant updates for capacitor</a></h2>
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
reverseGeocode(options: reverseOptions) => any
```

Convert latitude and longitude to an address

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#reverseoptions">reverseOptions</a></code> |

**Returns:** <code>any</code>

**Since:** 0.0.1

--------------------


### forwardGeocode(...)

```typescript
forwardGeocode(options: ForwardOptions) => any
```

Convert an address to latitude and longitude

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#forwardoptions">ForwardOptions</a></code> |

**Returns:** <code>any</code>

**Since:** 0.0.1

--------------------


### Interfaces


#### reverseOptions

| Prop                | Type                 | Description                                                              |
| ------------------- | -------------------- | ------------------------------------------------------------------------ |
| **`latitude`**      | <code>number</code>  | latitude is a number representing the latitude of the location.          |
| **`longitude`**     | <code>number</code>  | longitude is a number representing the longitude of the location.        |
| **`useLocale`**     | <code>boolean</code> | Localise the results to the given locale.                                |
| **`defaultLocale`** | <code>string</code>  | locale is a string in the format of language_country, for example en_US. |
| **`maxResults`**    | <code>number</code>  | Max number of results to return.                                         |
| **`apiKey`**        | <code>string</code>  | Only used for web platform to use google api                             |


#### Adress

| Prop                        | Type                |
| --------------------------- | ------------------- |
| **`latitude`**              | <code>number</code> |
| **`longitude`**             | <code>number</code> |
| **`countryCode`**           | <code>string</code> |
| **`countryName`**           | <code>string</code> |
| **`postalCode`**            | <code>string</code> |
| **`administrativeArea`**    | <code>string</code> |
| **`subAdministrativeArea`** | <code>string</code> |
| **`locality`**              | <code>string</code> |
| **`subLocality`**           | <code>string</code> |
| **`thoroughfare`**          | <code>string</code> |
| **`subThoroughfare`**       | <code>string</code> |
| **`areasOfInterest`**       | <code>{}</code>     |


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
