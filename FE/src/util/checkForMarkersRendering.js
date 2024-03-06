const showMarker = (map, marker) => {
  marker.setMap(map);
};

const hideMarker = (marker) => {
  marker.setMap(null);
};

const checkForMarkersRendering = (map, markers) => {
  const mapBounds = map.getBounds();

  for (let i = 0; i < markers.length; i += 1) {
    const position = markers[i].getPosition();

    if (mapBounds.hasLatLng(position)) {
      showMarker(map, markers[i]);
    } else {
      hideMarker(markers[i]);
    }
  }
};

export default checkForMarkersRendering;
