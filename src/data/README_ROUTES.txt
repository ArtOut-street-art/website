# ArtOut routes
This bundle contains a Node script that builds **best walking paths** for your tours using **Mapbox Directions** and writes `tours_directions.geojson`.

## Prereqs
- Node 18+
- Mapbox token with Directions access

## Run
```bash
cd <folder-with-files>
export MAPBOX_TOKEN=pk.your_token_here
node build_walking_routes.js
```
Output: `tours_directions.geojson`

## Leaflet usage
Replace the `tours.geojson` source with the new `tours_directions.geojson` if it exists:
```js
const toursUrl = '/data/tours_directions.geojson'; // fallback to tours.geojson if 404
fetch(toursUrl).then(r => r.ok ? r.json() : fetch('/data/tours.geojson').then(r=>r.json()))
  .then(data => L.geoJSON(data, { style: { weight: 4, opacity: 0.9 }}).addTo(map));
```

## Placement (important)
Put these files in /public/data for production serving:
clusters.geojson, artworks.geojson, tours.geojson, (optional) tours_directions.geojson, artout_dataset_v3.json

Dev fallback: keeping them in /src/data also works (MapDemo tries /data then /src/data).

If you see "Unexpected token '<'" it means the fetch hit index.html — the file was not where expected.

## Notes
- The script reads cluster centers + tour waypoint IDs from `artout_dataset_v3.json`.
- Straight lines in `tours.geojson` remain as a fallback.
