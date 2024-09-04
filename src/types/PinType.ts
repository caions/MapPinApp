import { LatLngLiteral } from "leaflet";

export type PinType = LatLngLiteral & {
  id: number;
};
