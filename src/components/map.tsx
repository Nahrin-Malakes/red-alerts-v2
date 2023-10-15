"use client";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";

import citiesFile from "@/data/cities.json";

export type Location = {
  name: string;
  lat: number;
  lng: number;
};

interface MapProps {
  locations: string[] | null;
}

export function Map({ locations }: MapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    id: "google-map-script",
  });

  const onLoad = useCallback((map: google.maps.Map) => setMap(map), []);

  useEffect(() => {
    if (map && locations && locations.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      locations.map((location) => {
        citiesFile.map((city) => {
          if (city.name === location) {
            bounds.extend({ lat: city.lat, lng: city.lng });
          }
        });
      });
      map.fitBounds(bounds);
    } else {
      map?.setCenter({ lat: 31.5469501, lng: 34.6863132 });
    }
  }, [map, locations]);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const generateMarkers = (locations: string[]) => {
    const coords: any = [{}];
    locations.map((location) => {
      citiesFile.map((city) => {
        if (city.name === location) {
          coords?.push({ lat: city.lat, lng: city.lng });
        }
      });
    });

    return coords?.map((coord: { lat: number; lng: number }, idx: number) => (
      <Marker key={idx} position={{ lat: coord.lat, lng: coord.lng }} />
    ));
  };

  console.log("re-renderd");

  return (
    <div className="absolute z-0">
      {isLoaded && (
        <GoogleMap
          onLoad={onLoad}
          onUnmount={onUnmount}
          mapContainerStyle={{ height: "100vh", width: "100vw" }}
          zoom={10}
          center={{ lat: 31.5469501, lng: 34.6863132 }}
          options={{
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
          }}
        >
          {locations && generateMarkers(locations)}
        </GoogleMap>
      )}
    </div>
  );
}
