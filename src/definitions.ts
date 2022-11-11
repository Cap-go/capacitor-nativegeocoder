export interface Adress {
  latitude: number;
  longitude: number;
  countryCode: string;
  countryName: string;
  postalCode: string;
  administrativeArea: string;
  subAdministrativeArea: string;
  locality: string;
  subLocality: string;
  thoroughfare: string;
  subThoroughfare: string;
  areasOfInterest: string[];
}

export interface ForwardOptions {
  /**
   * address is a string of the address to be geocoded.
   */
  addressString: string;
  /**
   * Localise the results to the given locale.
   */
  useLocale?: boolean;
  /**
   * locale is a string in the format of language_country, for example en_US.
   */
  defaultLocale?: string;
  /**
   * Max number of results to return.
   */
  maxResults?: number;
  /**
   * Only used for web platform to use google api
   */
  apiKey?: string;
}
export interface reverseOptions {
  /**
   * latitude is a number representing the latitude of the location.
   */
  latitude: number;
  /**
   * longitude is a number representing the longitude of the location.
   */
  longitude: number;
  /**
   * Localise the results to the given locale.
   */
  useLocale?: boolean;
  /**
   * locale is a string in the format of language_country, for example en_US.
   */
  defaultLocale?: string;
  /**
   * Max number of results to return.
   */
  maxResults?: number;
  /**
   * Only used for web platform to use google api
   */
  apiKey?: string;
}
export interface NativeGeocoderPlugin {
  /**
   * Convert latitude and longitude to an address
   *
   * @param id The bundle id to delete (note, this is the bundle id, NOT the version name)
   * @returns {Promise<{addresses: Adress[]}>} an Promise with the list of addresses according to maxResults
   * @throws An error if the something went wrong
   * @since 0.0.1
   */
  reverseGeocode(options: reverseOptions): Promise<{ addresses: Adress[] }>;
  /**
   * Convert an address to latitude and longitude
   *
   * @returns {Promise<{addresses: Adress[]}>} an Promise with the list of addresses according to maxResults
   * @throws An error if the something went wrong
   * @since 0.0.1
   */
  forwardGeocode(options: ForwardOptions): Promise<{ addresses: Adress[] }>;
}
