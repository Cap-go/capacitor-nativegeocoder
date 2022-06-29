export interface Adress {
  latitude:	string
  longitude:	string
  countryCode:	string
  postalCode:	string
  administrativeArea:	string
  subAdministrativeArea:	string
  locality:	string
  subLocality:	string
  thoroughfare:	string
  subThoroughfare:	string
  areasOfInterest:	string[]
  formatted_address: string
}

export interface ForwardOptions {
  addressString:	string
  useLocale?:	boolean
  defaultLocale?:	string
  maxResults?:	number
  apiKey?:	string
}
export interface reverseOptions {
  latitude:	number	
  longitude:	number
  useLocale?:	boolean
  defaultLocale?:	string
  maxResults?:	number
  apiKey?:	string
}
export interface NativeGeocoderPlugin {
  reverseGeocode(options: reverseOptions): Promise<{ addresses:	Adress[] }>;
  forwardGeocode(options: ForwardOptions): Promise<{ addresses:	Adress[] }>;
}
