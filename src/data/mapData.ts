// Types
export interface Cluster {
  id: string;
  name: string;
  center: [number, number]; // [lng, lat]
  address: string;
  suburb: string;
  art_count: number;
  scatter_radius_m: number;
}
export interface Artwork {
  id: string;
  cluster_id: string;
  title: string;
  coordinates: [number, number]; // [lng, lat]
  image: string;
}
export interface Tour {
  id: string;
  name: string;
  mode: "walking";
  description: string;
  waypoint_cluster_ids: string[];
}
export interface ArtOutDataset {
  type: "ArtOutDataset";
  version: number;
  clusters: Cluster[];
  tours: Tour[];
}

// Base dataset (no explicit artwork points listed; we generate them)
export const dataset: ArtOutDataset = {
  type: "ArtOutDataset",
  version: 2,
  clusters: [
    {
      id: "hosier",
      name: "Hosier & Rutledge Lanes",
      center: [144.9691, -37.8165],
      address: "Hosier Ln, Melbourne VIC 3000",
      suburb: "Melbourne CBD",
      art_count: 70,
      scatter_radius_m: 80
    },
    {
      id: "flinders-lanes",
      name: "AC/DC Lane & Duckboard Pl",
      center: [144.971, -37.8154],
      address: "AC/DC Ln & Duckboard Pl, Melbourne VIC 3000",
      suburb: "Melbourne CBD",
      art_count: 60,
      scatter_radius_m: 70
    },
    {
      id: "chinatown",
      name: "Croft & Tattersalls Alleys",
      center: [144.9689, -37.8116],
      address: "Croft Alley, Melbourne VIC 3000",
      suburb: "Chinatown (CBD)",
      art_count: 55,
      scatter_radius_m: 75
    },
    {
      id: "union-caledonian",
      name: "Union & Caledonian Lanes",
      center: [144.9649, -37.81215],
      address: "Union Ln, Melbourne VIC 3000",
      suburb: "Melbourne CBD",
      art_count: 30,
      scatter_radius_m: 60
    },
    {
      id: "presgrave",
      name: "Presgrave Place (Framed Lane)",
      center: [144.96534, -37.81507],
      address: "Presgrave Pl, Melbourne VIC 3000",
      suburb: "Melbourne CBD",
      art_count: 20,
      scatter_radius_m: 25
    },
    {
      id: "guildford",
      name: "Guildford Lane",
      center: [144.95923, -37.81152],
      address: "Guildford Ln, Melbourne VIC 3000",
      suburb: "Melbourne CBD",
      art_count: 20,
      scatter_radius_m: 50
    },
    {
      id: "haring-smith",
      name: "Keith Haring Mural & Smith St",
      center: [144.98681, -37.79938],
      address: "Johnston St × Smith St, Collingwood VIC 3066",
      suburb: "Collingwood",
      art_count: 30,
      scatter_radius_m: 100
    },
    {
      id: "easey",
      name: "Easey St Murals (Trains)",
      center: [144.98879, -37.79815],
      address: "Easey St, Collingwood VIC 3066",
      suburb: "Collingwood",
      art_count: 20,
      scatter_radius_m: 60
    },
    {
      id: "rose-napier",
      name: "Rose St & Napier/Fitzroy Town Hall",
      center: [144.97955, -37.8021],
      address: "201 Napier St, Fitzroy VIC 3065",
      suburb: "Fitzroy",
      art_count: 20,
      scatter_radius_m: 70
    }
  ],
  tours: [
    {
      id: "cbd-core-walk",
      name: "CBD Core Walk",
      mode: "walking",
      description: "Hosier → AC/DC/Duckboard → Presgrave → Union/Caledonian",
      waypoint_cluster_ids: ["hosier", "flinders-lanes", "presgrave", "union-caledonian"]
    },
    {
      id: "cbd-chinatown-loop",
      name: "CBD + Chinatown Loop",
      mode: "walking",
      description: "Union/Caledonian → Chinatown → Hosier",
      waypoint_cluster_ids: ["union-caledonian", "chinatown", "hosier"]
    },
    {
      id: "fitzroy-collingwood-circuit",
      name: "Fitzroy–Collingwood Circuit",
      mode: "walking",
      description: "Rose/Napier → Haring/Smith → Easey St",
      waypoint_cluster_ids: ["rose-napier", "haring-smith", "easey"]
    },
    {
      id: "grand-connector",
      name: "Grand Connector",
      mode: "walking",
      description: "Guildford → Chinatown → Hosier → Rose/Napier",
      waypoint_cluster_ids: ["guildford", "chinatown", "hosier", "rose-napier"]
    }
  ]
};

// Deterministic PRNG
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function metersToDegrees(lat: number, metersEast: number, metersNorth: number) {
  const oneDegLat = 111320;
  const oneDegLon = Math.cos((lat * Math.PI) / 180) * 111320;
  return [metersEast / oneDegLon, metersNorth / oneDegLat] as [number, number];
}

export function generateArtworks(clusters: Cluster[]): Artwork[] {
  const result: Artwork[] = [];
  for (const c of clusters) {
    const seed =
      [...c.id].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) +
      Math.round((c.center[0] + c.center[1]) * 1e6);
    const rand = mulberry32(seed);

    for (let i = 1; i <= c.art_count; i++) {
      const r = rand() ** 0.6 * c.scatter_radius_m;
      const theta = rand() * 2 * Math.PI;
      const stretch = 1.6;
      const ex = Math.cos(theta) * r * stretch;
      const ny = Math.sin(theta) * r * 0.7;
      const [dLon, dLat] = metersToDegrees(c.center[1], ex, ny);
      const pt: [number, number] = [c.center[0] + dLon, c.center[1] + dLat];
      result.push({
        id: `${c.id}-${i}`,
        cluster_id: c.id,
        title: `#${i} · ${c.name}`,
        coordinates: pt,
        image: `/art/${c.id}/${i}.jpg`
      });
    }
  }
  return result;
}

// Generated artworks (stable per build)
export const artworks: Artwork[] = generateArtworks(dataset.clusters);

// Convenience lookup
export const artworksByCluster: Record<string, Artwork[]> = artworks.reduce(
  (acc, a) => {
    (acc[a.cluster_id] ||= []).push(a);
    return acc;
  },
  {} as Record<string, Artwork[]>
);

// NOTE: This module is now legacy (generator approach).
// Current MapDemo consumes pre-built GeoJSON files (clusters.geojson, artworks.geojson, tours.geojson).
// Keep this file if you later want to regenerate synthetic point clouds.
