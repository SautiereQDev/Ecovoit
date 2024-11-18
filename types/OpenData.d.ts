export type OpenDataCollection<T> = {
  parameters: { dataset: string; facet: string };
  records: T;
  nhits: string;
  status: string;
};

export type BikeStationsRecord = {
  datasetid: string;
  recordid: number;
  fields: {
    station_latitude: string;
    station_nom: string;
    total_count: string;
    accroches_libres: string;
    _full_text: string;
    geo_point_2d: string;
    station_longitude: string;
    nombre_emplacements: string;
    velos_disponibles: string;
    _id: number;
  };
};

export type CarParksRecord = {
  datasetid: 'lieux_de_stationnement_sur_la_rochelle';
  fields: {
    _full_text: string;
    _id: number;
    abo_non_resident: string;
    abo_resident: string;
    adresse: string;
    gratuit: string;
    hauteur_max: string;
    id: string;
    info: string;
    insee: string;
    nb_2_rm: string;
    nb_2r_el: string;
    nb_autopartage: string;
    nb_covoit: string;
    nb_places: string;
    nb_pmr: string;
    nb_pr: string;
    nb_velo: string;
    nb_voitures_electriques: string;
    nom: string;
    num_siret: string;
    tarif_1h: string;
    tarif_24h: string;
    tarif_2h: string;
    tarif_3h: string;
    tarif_4h: string;
    tarif_pmr: string;
    total_count: string;
    type_ouvrage: string;
    type_usagers: string;
    url: string;
    xlong: string;
    ylat: string;
  };
  recordid: number;
};
