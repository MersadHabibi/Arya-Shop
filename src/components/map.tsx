"use client";

import { MapContainer, MapContainerProps, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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
        </MapContainer>
      )}
    </>
  );
};

export default Map;
