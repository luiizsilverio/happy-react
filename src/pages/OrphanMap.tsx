import mapMarkerImg from '../images/marker.svg'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import '../styles/pages/orphanMap.scss'

function OrphanMap() {

  function getUrl() {
    if (process.env.REACT_APP_TILELAYER === 'MAPBOX') {
      return `https://api.mapbox.com/styles/v1/mapbox/${process.env.REACT_APP_MAPBOX_THEME}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
    } else {
      return 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }    
  }

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Campinas</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map  
        center={[-22.909343,-47.0595067]}
        zoom={16}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url={ getUrl() } />          
      </Map>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}

export default OrphanMap