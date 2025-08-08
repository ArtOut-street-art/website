import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { FitBoundsUpdater, InvalidateMapSize } from "../utils/MapUtils";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MarkerData {
  id: string;
  position: [number, number];
  name: string;
  address: string;
}

interface MapWrapperProps {
  center: [number, number];
  zoom: number;
  markers: MarkerData[];
  polylinePositions?: [number, number][];
  polylineColor?: string;
  bounds?: L.LatLngBoundsExpression;
}

export function MapWrapper({
  center,
  zoom,
  markers,
  polylinePositions,
  polylineColor,
  bounds,
}: MapWrapperProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={true}
      className="rounded-xl"
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © CARTO'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {markers.map((marker) => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>
            <div style={{ minWidth: 180, maxWidth: 220 }}>
              <strong style={{ fontSize: "16px", fontWeight: "500" }}>
                {marker.name}
              </strong>
              <br />
              <span style={{ fontSize: "13px", lineHeight: "1.4" }}>
                {marker.address}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
      {polylinePositions && polylinePositions.length > 1 && (
        <Polyline
          positions={polylinePositions}
          color={polylineColor}
          weight={5}
          opacity={0.9}
        />
      )}
      {bounds && <FitBoundsUpdater bounds={bounds} />}
      <InvalidateMapSize />
    </MapContainer>
  );
}
