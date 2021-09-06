import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import mapIcon from '../utils/mapIcon'
import mapMarkerImg from '../images/marker.svg'
import '../styles/pages/orphanMap.scss'
import api from '../services/api'
import getMapURL from '../utils/getMapURL';

interface Orphanage {
  id: number
  latitude: number
  longitude: number
  name: string
}

function OrphanMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  const latitude  = orphanages.length > 0 ? orphanages[0].latitude : -22.909343
  const longitude = orphanages.length > 0 ? orphanages[0].longitude : -47.0595067

  useEffect(() => {
    api.get('orphanages')
      .then(response => {        
        setOrphanages(response.data)        
      })
  }, [])

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
        center={[latitude, longitude]}
        zoom={16}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url={ getMapURL() } />     

        {
          orphanages.map(orphanage => (
            <Marker
              icon={mapIcon}
              position={[orphanage.latitude,orphanage.longitude]}
              key={orphanage.id}
            >
              <Popup 
                closeButton={false} 
                minWidth={240} 
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`} >
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>          
            </Marker>     
          ))
        }
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}

export default OrphanMap