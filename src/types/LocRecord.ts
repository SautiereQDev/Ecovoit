import LocRecord from '@ecovoit-api/mock-adapter/out/src/dev/types/LocRecord';

namespace LocRecord {
	/* Definitions ------------------------------------------------------ */
	import Coordinates = LocRecord.Coordinates;
	type Geometry<T extends GeometryType, C extends Matrix> = {
		type: T;
		coordinates: C;
	};
	type GeometryType = 'MultiPolygon' | 'Polygon';
	type Matrix = Matrix2D | Matrix3D;
	type Matrix2D = [LatLng[]];
	type Matrix3D = [[LatLng[]]];
	type LatLng = {
		latitude: number;
		longitude: number;
	};

	/* Master record ---------------------------------------------------- */
	type LRRecord<D extends string, G extends Geometry<GeometryType, Matrix>> = {
		fields: {
			coordinates: Coordinates;
			geojson: G;
		};
		geometry: G;
		datasetid: D;
		recordid: string | null;
	};

	/* Specific records ------------------------------------------------- */
	export type LRDistricts = LRRecord<
		'b55cda71-088c-4ea4-8df8-69fc80c7b9c8',
		Geometry<'MultiPolygon', Matrix3D>
	> & {
		fields: {
			cq_id: number;
			cq_nom: string;
		};
	};

	export type LRCDADivision = LRRecord<
		'ff4812dc-17c5-4f0d-b561-ce4ecd0e2526',
		Geometry<'MultiPolygon', Matrix2D>
	> & {
		fields: {
			id: number;
			code_insee: number;
			nom_commune: string;
		};
	};

	export type Record = LRDistricts | LRCDADivision;
}

export default LocRecord;
