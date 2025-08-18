/**
 * build_walking_routes.js
 * Generate best walking paths (GeoJSON) between tour waypoints
 * Usage:
 *   MAPBOX_TOKEN=pk.your_token node build_walking_routes.js
 * Inputs:
 *   - artout_dataset_v3.json (clusters + tours with waypoint_cluster_ids)
 * Output:
 *   - tours_directions.geojson
 */
import fs from 'node:fs/promises';

const TOKEN = process.env.MAPBOX_TOKEN;
if (!TOKEN) {
  console.error('Missing MAPBOX_TOKEN env var.');
  process.exit(1);
}

const DATASET_PATH = new URL('./artout_dataset_v3.json', import.meta.url);
const OUT_PATH = new URL('./tours_directions.geojson', import.meta.url);
const PUBLIC_DIR = new URL("../../public/data/", import.meta.url);

const dataset = JSON.parse(await fs.readFile(DATASET_PATH, 'utf-8'));
const clustersById = Object.fromEntries(dataset.clusters.map(c => [c.id, c]));

async function fetchRoute(coords) {
  // coords: [[lng,lat], [lng,lat], ...]
  const path = coords.map(([lng, lat]) => `${lng},${lat}`).join(';');
  const url = new URL(`https://api.mapbox.com/directions/v5/mapbox/walking/${path}`);
  url.searchParams.set('geometries', 'geojson');
  url.searchParams.set('overview', 'full');
  url.searchParams.set('access_token', TOKEN);

  const res = await fetch(url, { headers: { 'Accept': 'application/json' }});
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Directions API ${res.status}: ${txt}`);
  }
  const json = await res.json();
  const route = json.routes?.[0];
  if (!route) throw new Error('No routes returned');
  return route.geometry; // GeoJSON LineString
}

const features = [];
for (const tour of dataset.tours) {
  const coords = tour.waypoint_cluster_ids.map(id => clustersById[id].center);
  try {
    const geom = await fetchRoute(coords);
    features.push({
      type: 'Feature',
      id: tour.id,
      properties: {
        name: tour.name,
        mode: tour.mode,
        description: tour.description,
        waypoint_cluster_ids: tour.waypoint_cluster_ids
      },
      geometry: geom
    });
    console.log(`✓ Built route for ${tour.name}`);
    // Be polite to the API
    await new Promise(r => setTimeout(r, 350));
  } catch (e) {
    console.error(`× Failed route for ${tour.name}:`, e.message);
  }
}

const fc = { type: 'FeatureCollection', features };
await fs.writeFile(OUT_PATH, JSON.stringify(fc));
let writeExtra = false;
try {
  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  writeExtra = true;
} catch { /* ignore */ }
if (writeExtra) {
  await fs.writeFile(new URL("tours_directions.geojson", PUBLIC_DIR), JSON.stringify(fc));
  console.log(`Copied to /public/data/tours_directions.geojson`);
}
console.log(`\nSaved ${features.length} routes → tours_directions.geojson`);
