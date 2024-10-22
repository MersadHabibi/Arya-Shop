"use client";

import {
  MapContainer,
  MapContainerProps,
  Marker,
  TileLayer,
} from "react-leaflet";

import { cn } from "@/lib/utils";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

let DefaultIcon = L.icon({
  // @ts-expect-error
  iconUrl: icon,
  // @ts-expect-error
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ className, ...props }: MapContainerProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !globalThis?.window)
    return <div className={cn("bg-base-200", className)}></div>;

  return (
    <>
      {typeof globalThis?.window !== "undefined" && (
        <MapContainer {...props} className={className}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={props.center as LatLngExpression}></Marker>
        </MapContainer>
      )}
    </>
  );
};

export default Map;
