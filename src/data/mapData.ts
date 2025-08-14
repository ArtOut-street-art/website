export interface Artwork {
  id: string;
  title: string;
  coordinates: [number, number]; // [lng, lat]
  image?: string;
  artist?: string | null;
  year?: number | null;
}
export interface Cluster {
  id: string;
  name: string;
  center: [number, number]; // [lng, lat]
  address: string;
  suburb: string;
  art_count: number;
  artworks: Artwork[];
}
export interface Tour {
  id: string;
  name: string;
  mode: "walking";
  description: string;
  waypoints: [number, number][]; // [lng, lat]
  est_distance_km: number;
  est_time_min: number;
}
export interface ArtOutDataset {
  type: "ArtOutDataset";
  version: number;
  clusters: Cluster[];
  tours: Tour[];
}

// New dataset (lng, lat order in source)
export const dataset: ArtOutDataset = {
  type: "ArtOutDataset",
  version: 1,
  clusters: [
    {
      id: "hosier",
      name: "Hosier & Rutledge Lanes",
      center: [144.9691, -37.8165],
      address: "Hosier Ln, Melbourne VIC 3000",
      suburb: "Melbourne CBD",
      art_count: 6,
      artworks: [
        { id: "hosier-1", title: "Hosier Entry Wall", coordinates: [144.96906, -37.81639], image: "/art/hosier/1.jpg", artist: null, year: null },
        { id: "hosier-2", title: "Stencil Stack", coordinates: [144.96919, -37.81633], image: "/art/hosier/2.jpg", artist: null, year: null },
        { id: "hosier-3", title: "Laneway Pasteups", coordinates: [144.96924, -37.81649], image: "/art/hosier/3.jpg", artist: null, year: null },
        { id: "hosier-4", title: "Rutledge Corner", coordinates: [144.96913, -37.81659], image: "/art/hosier/4.jpg", artist: null, year: null },
        { id: "hosier-5", title: "Blue Portrait", coordinates: [144.96904, -37.81657], image: "/art/hosier/5.jpg", artist: null, year: null },
        { id: "hosier-6", title: "Door Panel Collage", coordinates: [144.9693, -37.81643], image: "/art/hosier/6.jpg", artist: null, year: null }
      ]
    },
    {
      id: "flinders-lanes",
      name: "AC/DC Lane & Duckboard Pl",
      center: [144.971, -37.8154],
      address: "AC/DC Ln & Duckboard Pl, Melbourne VIC 3000",
      suburb: "Melbourne CBD",
      art_count: 4,
      artworks: [
        { id: "fl-1", title: "AC/DC Bolt", coordinates: [144.97086, -37.81552], image: "/art/flinders/1.jpg" },
        { id: "fl-2", title: "Gig Posters", coordinates: [144.97105, -37.81547], image: "/art/flinders/2.jpg" },
        { id: "fl-3", title: "Duckboard Mural", coordinates: [144.97124, -37.81525], image: "/art/flinders/3.jpg" },
        { id: "fl-4", title: "Alley Pasteups", coordinates: [144.97115, -37.81533], image: "/art/flinders/4.jpg" }
      ]
    },
    {
      id: "union-caledonian",
      name: "Union & Caledonian Lanes",
      center: [144.9649, -37.81215],
      address: "Union Ln, Melbourne VIC 3000",
      suburb: "Melbourne CBD",
      art_count: 4,
      artworks: [
        { id: "uc-1", title: "Union Lane Wall", coordinates: [144.96497, -37.81208], image: "/art/union/1.jpg" },
        { id: "uc-2", title: "Stickerbomb", coordinates: [144.96505, -37.812], image: "/art/union/2.jpg" },
        { id: "uc-3", title: "Caledonian Corner", coordinates: [144.96454, -37.8122], image: "/art/union/3.jpg" },
        { id: "uc-4", title: "Arcade Shutters", coordinates: [144.9647, -37.81218], image: "/art/union/4.jpg" }
      ]
    },
    {
      id: "presgrave",
      name: "Presgrave Place (Framed Lane)",
      center: [144.96534, -37.81507],
      address: "Presgrave Pl, Melbourne VIC 3000",
      suburb: "Melbourne CBD",
      art_count: 3,
      artworks: [
        { id: "pg-1", title: "Mini Frames Wall", coordinates: [144.96533, -37.81508], image: "/art/presgrave/1.jpg" },
        { id: "pg-2", title: "Gold Frame Niche", coordinates: [144.96529, -37.81502], image: "/art/presgrave/2.jpg" },
        { id: "pg-3", title: "Shadowbox Cluster", coordinates: [144.96537, -37.8151], image: "/art/presgrave/3.jpg" }
      ]
    },
    {
      id: "guildford",
      name: "Guildford Lane",
      center: [144.95923, -37.81152],
      address: "Guildford Ln, Melbourne VIC 3000",
      suburb: "Melbourne CBD",
      art_count: 3,
      artworks: [
        { id: "gf-1", title: "Warehouse Wall", coordinates: [144.95917, -37.8116], image: "/art/guildford/1.jpg" },
        { id: "gf-2", title: "Roller Door", coordinates: [144.95925, -37.81148], image: "/art/guildford/2.jpg" },
        { id: "gf-3", title: "Laneway Corner", coordinates: [144.9593, -37.81155], image: "/art/guildford/3.jpg" }
      ]
    },
    {
      id: "chinatown",
      name: "Croft & Tattersalls Alleys",
      center: [144.9689, -37.8116],
      address: "Croft Alley, Melbourne VIC 3000",
      suburb: "Chinatown (CBD)",
      art_count: 4,
      artworks: [
        { id: "ct-1", title: "Croft Alley Bend", coordinates: [144.96878, -37.8117], image: "/art/chinatown/1.jpg" },
        { id: "ct-2", title: "Croft Back Wall", coordinates: [144.9689, -37.81155], image: "/art/chinatown/2.jpg" },
        { id: "ct-3", title: "Tattersalls Midway", coordinates: [144.96539, -37.81148], image: "/art/chinatown/3.jpg" },
        { id: "ct-4", title: "Lantern Pasteups", coordinates: [144.96555, -37.81144], image: "/art/chinatown/4.jpg" }
      ]
    },
    {
      id: "haring-smith",
      name: "Keith Haring Mural & Smith St",
      center: [144.98681, -37.79938],
      address: "Johnston St × Smith St, Collingwood",
      suburb: "Collingwood",
      art_count: 3,
      artworks: [
        { id: "kh-1", title: "Keith Haring 1984", coordinates: [144.98681, -37.79938], image: "/art/collingwood/1.jpg" },
        { id: "kh-2", title: "Smith St Wall", coordinates: [144.98417, -37.8], image: "/art/collingwood/2.jpg" },
        { id: "kh-3", title: "Johnston Corner", coordinates: [144.9862, -37.79955], image: "/art/collingwood/3.jpg" }
      ]
    },
    {
      id: "easey",
      name: "Easey St Murals (Trains)",
      center: [144.98879, -37.79815],
      address: "Easey St, Collingwood",
      suburb: "Collingwood",
      art_count: 3,
      artworks: [
        { id: "ez-1", title: "Rooftop Trains", coordinates: [144.98879, -37.79815], image: "/art/easey/1.jpg" },
        { id: "ez-2", title: "Lane Truck Dock", coordinates: [144.9886, -37.79828], image: "/art/easey/2.jpg" },
        { id: "ez-3", title: "Red Brick Wall", coordinates: [144.98895, -37.79805], image: "/art/easey/3.jpg" }
      ]
    },
    {
      id: "rose-napier",
      name: "Rose St & Napier/Fitzroy Town Hall",
      center: [144.97955, -37.8021],
      address: "201 Napier St, Fitzroy",
      suburb: "Fitzroy",
      art_count: 3,
      artworks: [
        { id: "rn-1", title: "Rose St Wall", coordinates: [144.97736, -37.79583], image: "/art/fitzroy/1.jpg" },
        { id: "rn-2", title: "Market Corner", coordinates: [144.97755, -37.7959], image: "/art/fitzroy/2.jpg" },
        { id: "rn-3", title: "Town Hall Lane", coordinates: [144.97955, -37.8021], image: "/art/fitzroy/3.jpg" }
      ]
    }
  ],
  tours: [
    {
      id: "cbd-core-walk",
      name: "CBD Core Walk",
      mode: "walking",
      description: "Hosier → AC/DC/Duckboard → Presgrave → Union/Caledonian.",
      waypoints: [
        [144.9691, -37.8165],
        [144.971, -37.8154],
        [144.96534, -37.81507],
        [144.9649, -37.81215]
      ],
      est_distance_km: 1.3,
      est_time_min: 40
    },
    {
      id: "cbd-chinatown-loop",
      name: "CBD + Chinatown Loop",
      mode: "walking",
      description: "Union/Caledonian → Chinatown (Croft/Tattersalls) → Hosier.",
      waypoints: [
        [144.9649, -37.81215],
        [144.9689, -37.8116],
        [144.9691, -37.8165]
      ],
      est_distance_km: 1.2,
      est_time_min: 35
    },
    {
      id: "fitzroy-collingwood-circuit",
      name: "Fitzroy–Collingwood Circuit",
      mode: "walking",
      description: "Rose/Napier → Haring/Smith → Easey St.",
      waypoints: [
        [144.97955, -37.8021],
        [144.98681, -37.79938],
        [144.98879, -37.79815]
      ],
      est_distance_km: 2.2,
      est_time_min: 55
    },
    {
      id: "cbd-to-north-connector",
      name: "CBD → Fitzroy Connector",
      mode: "walking",
      description: "Guildford Lane → Chinatown → Hosier → Rose/Napier.",
      waypoints: [
        [144.95923, -37.81152],
        [144.9689, -37.8116],
        [144.9691, -37.8165],
        [144.97955, -37.8021]
      ],
      est_distance_km: 3.2,
      est_time_min: 75
    }
  ]
};

