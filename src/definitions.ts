export interface NativeGeocoderPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
