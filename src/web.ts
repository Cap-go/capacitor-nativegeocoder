import { WebPlugin } from "@capacitor/core";

import type { 
  NativeGeocoderPlugin, 
  ReverseOptions,
  ForwardOptions,
  Address
} from './definitions';

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}
interface GeocoderResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    location_type: string;
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
}
interface GeocoderPayload {
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  results: GeocoderResult[];
}

const findAC = (
  address_components: AddressComponent[],
  type: string
): AddressComponent => {
  return (
    address_components.find((component) => component.types.includes(type)) || {
      long_name: "",
      short_name: "",
      types: [],
    }
  );
};
export class NativeGeocoderWeb
  extends WebPlugin
  implements NativeGeocoderPlugin
{
  async reverseGeocode(
    options: ReverseOptions
  ): Promise<{ addresses: Address[] }> {
    if (!options.apiKey) {
      throw new Error("apiKey is required for web");
    }
    const params = {
      latlng: `${options.latitude},${options.longitude}`,
      key: options.apiKey,
      ...(options.defaultLocale && { language: options.defaultLocale }),
      result_type: "street_address",
    };
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?${new URLSearchParams(
        params
      ).toString()}`
    )
      .then((response) => response.json())
      .then((data: GeocoderPayload): { addresses: Address[] } => {
        return {
          addresses: data.results
            .map((result: GeocoderResult): Address => {
              // transform the response in Address[]
              // use the result from google geocoder and transform it in Address

              return {
                latitude: result.geometry.location.lat,
                longitude: result.geometry.location.lng,
                countryCode: findAC(result.address_components, "country")
                  .short_name,
                countryName: findAC(result.address_components, "country")
                  .long_name,
                postalCode: findAC(result.address_components, "postal_code")
                  .long_name,
                administrativeArea: findAC(
                  result.address_components,
                  "administrative_area_level_1"
                ).long_name,
                subAdministrativeArea: findAC(
                  result.address_components,
                  "administrative_area_level_2"
                ).long_name,
                locality: findAC(result.address_components, "locality")
                  .long_name,
                subLocality: findAC(result.address_components, "sublocality")
                  .long_name,
                thoroughfare: findAC(result.address_components, "route")
                  .long_name,
                subThoroughfare: findAC(
                  result.address_components,
                  "street_number"
                ).long_name,
                areasOfInterest: [],
              };
            })
            .slice(0, options.maxResults || 1),
        };
      });
  }
  async forwardGeocode(
    options: ForwardOptions
  ): Promise<{ addresses: Address[] }> {
    if (!options.apiKey) {
      throw new Error("apiKey is required for web");
    }
    const params = {
      address: options.addressString,
      key: options.apiKey,
      ...(options.defaultLocale && { language: options.defaultLocale }),
      result_type: "street_address",
    };
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?${new URLSearchParams(
        params
      ).toString()}`
    )
      .then((response) => response.json())
      .then((data: GeocoderPayload): { addresses: Address[] } => {
        return {
          addresses: data.results
            .map((result: GeocoderResult): Address => {
              // transform the response in Address[]
              // use the result from google geocoder and transform it in Address
              return {
                latitude: result.geometry.location.lat,
                longitude: result.geometry.location.lng,
                countryCode: findAC(result.address_components, "country")
                  .short_name,
                countryName: findAC(result.address_components, "country")
                  .long_name,
                postalCode: findAC(result.address_components, "postal_code")
                  .long_name,
                administrativeArea: findAC(
                  result.address_components,
                  "administrative_area_level_1"
                ).long_name,
                subAdministrativeArea: findAC(
                  result.address_components,
                  "administrative_area_level_2"
                ).long_name,
                locality: findAC(result.address_components, "locality")
                  .long_name,
                subLocality: findAC(result.address_components, "sublocality")
                  .long_name,
                thoroughfare: findAC(result.address_components, "route")
                  .long_name,
                subThoroughfare: findAC(
                  result.address_components,
                  "street_number"
                ).long_name,
                areasOfInterest: [],
              };
            })
            .slice(0, options.maxResults || 1),
        };
      });
  }
}
