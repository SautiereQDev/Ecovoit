export type Geometry = {
  type: 'Point';
  coordinates: [number, number];
};

export type Feature = {
  type: 'Feature';
  geometry: Geometry;
  properties: {
    label: string;
    score: number;
    housenumber: string;
    id: string;
    name: string;
    postcode: string;
    citycode: string;
    x: number;
    y: number;
    city: string;
    context: string;
    type: string;
    importance: number;
    street: string;
    distance: number;
  };
};

export type FeatureCollection = {
  type: 'FeatureCollection';
  version: string;
  features: Feature[];
  attribution: string;
  licence: string;
  center: [number, number];
  limit: number;
};
