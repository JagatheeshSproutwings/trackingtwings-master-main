import React, { useState } from 'react';
import { L } from 'leaflet';
import { Animated } from '@react-spring/animated';

const MyComponent = () => {
  const [marker, setMarker] = useState(null);

  const animatedMarker = Animated.create(
    {
      latLng: [50, 50],
    },
    {
      duration: 1000,
      speed: 50,
    }
  );

  const handleClick = () => {
    const latLng = [50, 50];
    const marker = L.marker(latLng);
    setMarker(marker);
    animatedMarker.setValue(marker.getLatLng());
    animatedMarker.start();
  };

  return (
    <div>
      <L.Map id="map" center={[50, 50]} zoom={10}>
        {marker}
      </L.Map>
      <button onClick={handleClick}>Click to animate marker</button>
    </div>
  );
};

export default MyComponent;