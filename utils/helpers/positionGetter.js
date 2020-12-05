const positionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
/**
 * @param  {Object} pos - Large object containing position data
 * @param  {Function} setPickedLocation - a function for setting latitude and longitude in LocationPicker component
 * @param  {Function} onLocationPicked - a function for setting latitude and longitude in NewPlaceScreen component
 */
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

/**
 * A function that logs error code and error message to the console.
 * @param  {Object} err
 */
const getPositionError = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

export default positionGetter = {
  success: getPositionSuccess,
  error: getPositionError,
  options: positionOptions
}
