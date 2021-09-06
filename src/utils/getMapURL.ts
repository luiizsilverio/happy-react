
const getMapURL = () => {
  if (process.env.REACT_APP_TILELAYER === 'MAPBOX') {
    return `https://api.mapbox.com/styles/v1/mapbox/${process.env.REACT_APP_MAPBOX_THEME}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
  } else {
    return 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
  }    
}

export default getMapURL