import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import Loader from "react-loader-spinner";
import { Map, Marker, TileLayer } from "react-leaflet";

import Sidebar from "../components/Sidebar";
import mapIcon from '../utils/mapIcon'
import api from '../services/api'
import getMapURL from '../utils/getMapURL';

// import PrimaryButton from "../../components/PrimaryButton";
// import Map from "../../components/Map";

import '../styles/pages/orphanage.scss'

interface IOrphanage {
  latitude: number
  longitude: number
  name: string
  about: string
  instructions: string
  opening_hours: string
  open_on_weekends: string
  images: Array<{
    id: number
    url: string
  }>
}

interface Params {
  id: string
}

export default function Orphanage() {
  const params = useParams<Params>()
  const [orphanage, setOrphanage] = useState<IOrphanage>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  
  useEffect(() => {
    api.get(`orphanages/${params.id}`)
      .then(response => {        
        setOrphanage(response.data)        
      })
  }, [params.id])

  if (!orphanage) {
    return (
      <div className="loader">
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs        
          />
      </div>
    )
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images.length === 0 ? "" 
            : orphanage.images[activeImageIndex].url} 
            alt={orphanage.name} 
          />

          <div className="images">
            {
              orphanage.images.map((image, index) => (
                <button key={image.id} 
                  type="button"
                  className={activeImageIndex === index ? "active" : ""}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={image.url} alt={orphanage.name} />
                </button>            
              ))
            }
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                interactive={false}
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
              >
                <TileLayer url={ getMapURL() } />

                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[orphanage.latitude, orphanage.longitude]} 
                />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              { orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não tendemos <br />
                  fim de semana
                </div>
              ) }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}