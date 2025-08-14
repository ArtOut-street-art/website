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
  artCount?: number; // cluster count
  isCluster?: boolean; // cluster flag
  active?: boolean; // highlight state
}

interface MapWrapperProps {
  center: [number, number];
  zoom: number;
  markers: MarkerData[];
  polylinePositions?: [number, number][];
  polylineColor?: string;
  bounds?: L.LatLngBoundsExpression;
  onMarkerClick?: (id: string) => void; // NEW
}

export function MapWrapper({
  center,
  zoom,
  markers,
  polylinePositions,
  polylineColor,
  bounds,
  onMarkerClick,
}: MapWrapperProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom
      className="rounded-xl"
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {markers.map((m) => {
        const isCluster = !!m.isCluster;
        const icon = isCluster
          ? L.divIcon({
              className: `artout-cluster ${m.active ? "active" : ""}`,
              html: `<div class="cluster-circle" role="button" aria-label="${
                m.name
              } (${m.artCount ?? 0} artworks)">
                       <span class="count">${m.artCount ?? ""}</span>
                     </div>`,
              iconSize: [46, 46],
              iconAnchor: [23, 23],
            })
          : undefined;

        // Only spread icon prop if defined (avoids Leaflet createIcon error)
        const markerProps: any = {
          key: m.id,
          position: m.position,
          eventHandlers: onMarkerClick
            ? { click: () => onMarkerClick(m.id) }
            : undefined,
        };
        if (icon) markerProps.icon = icon;

        return (
          <Marker {...markerProps}>
            <Popup>
              <div style={{ minWidth: 170, maxWidth: 240 }}>
                <strong style={{ fontSize: 15, fontWeight: 500 }}>
                  {m.name}
                </strong>
                <br />
                <span style={{ fontSize: 12, lineHeight: "1.4" }}>
                  {m.address}
                </span>
                {isCluster && (
                  <>
                    <br />
                    <span style={{ fontSize: 11, color: "#888" }}>
                      {m.artCount ?? 0} artwork
                      {m.artCount === 1 ? "" : "s"}
                    </span>
                    <br />
                    <em style={{ fontSize: 11 }}>Click to expand</em>
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
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
