import { useState, useEffect } from 'react';
import mapStore from '../stores/mapStore';

const useGeoloaction = () => {
  const [currentMyLocation, setCurrentMyLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [locationLoading, setLocationLoading] = useState(false);

  const { seoulLat, seoulLng } = mapStore();

  const getCurPosition = () => {
    setLocationLoading(true);
    const success = (location) => {
      setCurrentMyLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      setLocationLoading(false);
    };

    const error = () => {
      setCurrentMyLocation({ lat: seoulLat, lng: seoulLng });
      setLocationLoading(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  useEffect(() => {
    getCurPosition();
  }, []);

  return { currentMyLocation, locationLoading, getCurPosition };
};

export default useGeoloaction;
