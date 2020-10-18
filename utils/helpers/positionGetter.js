const positionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const getPositionSuccess = (pos, setPickedLocation, onLocationPicked) => {
 const {coords:{latitude, longitude}} = pos;
  setPickedLocation({
    lat: latitude,
    lng: longitude
  })
  onLocationPicked({
    lat: latitude,
    lng: longitude
  })
}

const getPositionError = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

export default positionGetter = {
  success: getPositionSuccess,
  error: getPositionError,
  options: positionOptions
}