import { WebPlugin } from '@capacitor/core';

import type { NativeGeocoderPlugin } from './definitions';

export class NativeGeocoderWeb
  extends WebPlugin
  implements NativeGeocoderPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
