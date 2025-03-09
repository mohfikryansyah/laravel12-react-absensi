import { MutableRefObject, PropsWithChildren, useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker,
    Tooltip,
    useMapEvents,
    Popup,
    useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, PathOptions, StyleFunction } from "leaflet";

type Props = {
    className?: string;
    height?: string;
    zoom?: number;
    center?: [number, number];
    mapRef?: MutableRefObject<L.Map | null>;
};

export const MapWithInvalidateSize = () => {
    const map = useMap();

    useEffect(() => {
        if (map) {
            setTimeout(() => {
                map.invalidateSize();
            }, 100);
        }
    }, [map]);

    return null;
};

export const defaultMarkerIcon = new Icon({
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowAnchor: [10, 41],
    shadowSize: [41, 41],
});

export default function MapLeaflet({
    className = "",
    // height = "500px",
    zoom = 10,
    center = [0.5753543789632711, 123.27836689275536],
    children,
    mapRef,
}: Props & PropsWithChildren) {
    
    function MapInitializer() {
        const map = useMapEvents({
            load: () => {
                if (mapRef) {
                    mapRef.current = map;
                }
            },
        });
        
        if (mapRef && !mapRef.current) {
            mapRef.current = map;
        }
        
        return null;
    }

    return (
            <MapContainer
                center={center}
                zoom={zoom}
                zoomControl={false}
                minZoom={11}
                className="z-10 rounded-xl"
                style={{ height: "100%", width: "100%" }}
                ref={mapRef}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapInitializer />
                {children}
            </MapContainer>
    );
}
