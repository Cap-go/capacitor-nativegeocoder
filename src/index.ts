import { registerPlugin } from "@capacitor/core";

import type { NativeGeocoderPlugin } from "./definitions";

const NativeGeocoder = registerPlugin<NativeGeocoderPlugin>("NativeGeocoder", {
  web: () => import("./web").then((m) => new m.NativeGeocoderWeb()),
});

export * from "./definitions";
export { NativeGeocoder };
