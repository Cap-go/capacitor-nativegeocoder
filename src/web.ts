import { WebPlugin } from '@capacitor/core';

import type { NativeGeocoderPlugin, reverseOptions, ForwardOptions, Adress } from './definitions';

interface GeocoderResult  {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[];
    }[];
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

export class NativeGeocoderWeb
  extends WebPlugin
  implements NativeGeocoderPlugin {
    async reverseGeocode(options: reverseOptions): Promise<{ addresses:	Adress[] }> {
      if (!options.apiKey) {
        throw new Error('apiKey is required for web');
      }
      const params = {
        latlng: `${options.latitude},${options.longitude}`,
        key: options.apiKey,
        ...(options.defaultLocale && {language: options.defaultLocale}),
        result_type: 'street_address',
      }
      return fetch(`https://maps.googleapis.com/maps/api/geocode/json${new URLSearchParams(params).toString()}`)
        .then(response => response.json())
        .then(data => {
          return data.results.forEach((result: GeocoderResult) => {
            // transform the response in Adress[]
            // use the restul from google geocoder and transform it in Adress
            return {
              latitude: result.geometry.location.lat,
              longitude: result.geometry.location.lng,
              countryCode: result.address_components[0].long_name,
              postalCode: result.address_components[1].long_name,
              administrativeArea: result.address_components[2].long_name,
              subAdministrativeArea: result.address_components[3].long_name,
              locality: result.address_components[4].long_name,
              subLocality: result.address_components[5].long_name,
              thoroughfare: result.address_components[6].long_name,
              subThoroughfare: result.address_components[7].long_name,
              areasOfInterest: result.address_components[8].long_name,
              formatted_address: result.formatted_address,
            }
          }).slice(0, options.maxResults || 1)
        });
    };
    async forwardGeocode(options: ForwardOptions): Promise<{ addresses:	Adress[] }> {
      if (!options.apiKey) {
        throw new Error('apiKey is required for web');
      }
      const params = {
        address: options.addressString,
        key: options.apiKey,
        ...(options.defaultLocale && {language: options.defaultLocale}),
        result_type: 'street_address',
      }
      return fetch(`https://maps.googleapis.com/maps/api/geocode/json${new URLSearchParams(params).toString()}`)
        .then(response => response.json())
        .then(data => {
          return data.results.forEach((result: GeocoderResult) => {
            // transform the response in Adress[]
            // use the restul from google geocoder and transform it in Adress
            return {
              latitude: result.geometry.location.lat,
              longitude: result.geometry.location.lng,
              countryCode: result.address_components[0].long_name,
              postalCode: result.address_components[1].long_name,
              administrativeArea: result.address_components[2].long_name,
              subAdministrativeArea: result.address_components[3].long_name,
              locality: result.address_components[4].long_name,
              subLocality: result.address_components[5].long_name,
              thoroughfare: result.address_components[6].long_name,
              subThoroughfare: result.address_components[7].long_name,
              areasOfInterest: result.address_components[8].long_name,
              formatted_address: result.formatted_address,
            }
          }).slice(0, options.maxResults || 1)
        });
      };
}
