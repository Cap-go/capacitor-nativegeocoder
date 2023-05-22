import { WebPlugin } from "@capacitor/core";

import type {
  NativeGeocoderPlugin,
  reverseOptions,
  ForwardOptions,
  Adress,
} from "./definitions";

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
    options: reverseOptions
  ): Promise<{ addresses: Adress[] }> {
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
      .then((data: GeocoderPayload): { addresses: Adress[] } => {
        return {
          addresses: data.results
            .map((result: GeocoderResult): Adress => {
              // transform the response in Adress[]
              // use the restul from google geocoder and transform it in Adress

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
  ): Promise<{ addresses: Adress[] }> {
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
      .then((data: GeocoderPayload): { addresses: Adress[] } => {
        return {
          addresses: data.results
            .map((result: GeocoderResult): Adress => {
              // transform the response in Adress[]
              // use the restul from google geocoder and transform it in Adress
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
