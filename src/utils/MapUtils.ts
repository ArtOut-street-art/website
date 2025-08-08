import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

// Updates map bounds when provided
export function FitBoundsUpdater({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  return null;
}

// Ensures the map resizes properly on container changes
export function InvalidateMapSize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}
