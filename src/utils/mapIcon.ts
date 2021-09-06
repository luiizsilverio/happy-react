import Leaflet from 'leaflet'
import mapMarkerImg from '../images/marker.svg'

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68], // sobe ícone 68px para não ficar bem no meio da posição
  popupAnchor: [0, -70]
})

export default mapIcon