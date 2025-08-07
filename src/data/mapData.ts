export const dataset = {
  type: "FeatureCollection",
  features: [
    {
      id: 1,
      type: "Feature",
      properties: {
        name: "Hosier Lane",
        address: "Hosier Ln, Melbourne VIC 3000",
        suburb: "Melbourne CBD",
        category: "Laneway Street Art",
      },
      geometry: {
        type: "Point",
        coordinates: [144.96909, -37.81642],
      },
    },
    {
      id: 2,
      type: "Feature",
      properties: {
        name: "Rutledge Lane",
        address: "Rutledge Ln, Melbourne CBD",
        suburb: "Melbourne CBD",
        category: "Laneway Street Art",
      },
      geometry: {
        type: "Point",
        coordinates: [144.9691, -37.81656],
      },
    },
    {
      id: 3,
      type: "Feature",
      properties: {
        name: "AC/DC Lane",
        address: "AC/DC Ln, Melbourne CBD",
        suburb: "Melbourne CBD",
        category: "Laneway Street Art",
      },
      geometry: {
        type: "Point",
        coordinates: [144.97086, -37.81552],
      },
    },
    {
      id: 4,
      type: "Feature",
      properties: {
        name: "Duckboard Place",
        address: "Duckboard Pl, Melbourne CBD",
        suburb: "Melbourne CBD",
        category: "Laneway Street Art",
      },
      geometry: {
        type: "Point",
        coordinates: [144.97124, -37.81525],
      },
    },
    {
      id: 5,
      type: "Feature",
      properties: {
        name: "Union Lane",
        address: "Union Ln, Melbourne CBD",
        suburb: "Melbourne CBD",
        category: "Laneway Street Art",
      },
      geometry: {
        type: "Point",
        coordinates: [144.96497, -37.81208],
      },
    },
    {
      id: 6,
      type: "Feature",
      properties: {
        name: "Caledonian Lane",
        address: "Caledonian Ln, Melbourne CBD",
        suburb: "Melbourne CBD",
        category: "Laneway Street Art",
      },
      geometry: {
        type: "Point",
        coordinates: [144.96454, -37.8122],
      },
    },
    {
      id: 7,
      type: "Feature",
      properties: {
        name: "Croft Alley",
        address: "Croft Alley, Chinatown",
        suburb: "Melbourne CBD",
        category: "Laneway Street Art",
      },
      geometry: {
        type: "Point",
        coordinates: [144.96878, -37.8117],
      },
    },
    {
      id: 8,
      type: "Feature",
      properties: {
        name: "Presgrave Place",
        address: "Presgrave Pl, Melbourne CBD",
        suburb: "Melbourne CBD",
        category: "Framed-Art Laneway",
      },
      geometry: {
        type: "Point",
        coordinates: [144.96534, -37.81507],
      },
    },
    {
      id: 9,
      type: "Feature",
      properties: {
        name: "Tattersalls Lane",
        address: "Tattersalls Ln, Chinatown",
        suburb: "Melbourne CBD",
        category: "Laneway Street Art & Bars",
      },
      geometry: {
        type: "Point",
        coordinates: [144.96539, -37.81148],
      },
    },
    {
      id: 10,
      type: "Feature",
      properties: {
        name: "Guildford Lane",
        address: "Guildford Ln, Melbourne CBD",
        suburb: "Melbourne CBD",
        category: "Heritage Warehouses & Murals",
      },
      geometry: {
        type: "Point",
        coordinates: [144.95923, -37.81152],
      },
    },
    {
      id: 11,
      type: "Feature",
      properties: {
        name: "Keith Haring Mural",
        address: "Johnston St × Smith St, Collingwood",
        suburb: "Collingwood",
        category: "Historic Mural (1984)",
      },
      geometry: {
        type: "Point",
        coordinates: [144.98681, -37.79938],
      },
    },
    {
      id: 12,
      type: "Feature",
      properties: {
        name: "Easey St Murals",
        address: "Easey St, Collingwood",
        suburb: "Collingwood",
        category: "Street Art & Rooftop Trains",
      },
      geometry: {
        type: "Point",
        coordinates: [144.98879, -37.79815],
      },
    },
    {
      id: 13,
      type: "Feature",
      properties: {
        name: "Rose St Artists’ Market",
        address: "60 Rose St, Fitzroy",
        suburb: "Fitzroy",
        category: "Open-Air Art Market & Murals",
      },
      geometry: {
        type: "Point",
        coordinates: [144.97736, -37.795834],
      },
    },
    {
      id: 14,
      type: "Feature",
      properties: {
        name: "Fitzroy Town Hall (Napier St)",
        address: "201 Napier St, Fitzroy",
        suburb: "Fitzroy",
        category: "Civic Landmark & Nearby Murals",
      },
      geometry: {
        type: "Point",
        coordinates: [144.97955, -37.802096],
      },
    },
    {
      id: 15,
      type: "Feature",
      properties: {
        name: "Smith Street Art Strip",
        address: "Smith St, Collingwood/Fitzroy",
        suburb: "Collingwood–Fitzroy",
        category: "Retail Strip with Large-Scale Pieces",
      },
      geometry: {
        type: "Point",
        coordinates: [144.98417, -37.8],
      },
    },
  ],
  tours: [
    {
      id: "cbd_icons",
      name: "CBD Laneway Icons",
      description:
        "The must-see, paint-splattered heart of Melbourne’s street-art scene.",
      stop_ids: [1, 2, 3, 4, 5],
      approx_distance_km: 1.0,
      est_time_min: 40,
      color: "#ff5733",
    },
    {
      id: "chinatown_hidden",
      name: "Chinatown Hidden Gems",
      description:
        "Narrow alleys packed with colour, paste-ups and hole-in-the-wall bars.",
      stop_ids: [6, 7, 8, 9, 10],
      approx_distance_km: 0.8,
      est_time_min: 35,
      color: "#33ff57",
    },
    {
      id: "northside_classics",
      name: "Fitzroy–Collingwood Classics",
      description: "Legendary Northside murals and indie culture hotspots.",
      stop_ids: [11, 12, 13, 14, 15],
      approx_distance_km: 2.2,
      est_time_min: 60,
      color: "#3357ff",
    },
    {
      id: "cbd_express",
      name: "CBD Express Loop",
      description: "A bite-sized sampler for visitors on a tight schedule.",
      stop_ids: [1, 5, 6, 8],
      approx_distance_km: 0.6,
      est_time_min: 25,
      color: "#ff33a6",
    },
  ],
};
