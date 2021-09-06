import { FormEvent, useState, ChangeEvent } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from 'react-router';
import { FiPlus } from "react-icons/fi";
import { LeafletMouseEvent } from 'leaflet';

import Sidebar from "../components/Sidebar";
// import PrimaryButton from "../../components/PrimaryButton";

import '../styles/pages/create-orphanage.scss'
import mapIcon from '../utils/mapIcon';
import getMapURL from '../utils/getMapURL';
import api from '../services/api';

// import Map from "../../components/Map";

export default function OrphanagesMap() {
  const history = useHistory()
  const [position, setPosition] = useState({ lat: 0, lng: 0 })
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeninghours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  function handleMapClick(event: LeafletMouseEvent) {    
    const { lat, lng } = event.latlng

    setPosition({ lat, lng })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const latitude = position.lat
    const longitude = position.lng
    
    const data = new FormData()
    
    data.append('name', name)
    data.append('about', about)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))

    images.forEach(image => {
      data.append('images', image)
    })

    await api.post('orphanages', data)

    alert('Cadastro realizado com sucesso!')

    history.push('/app')
  } 

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {

    if (!event.target.files) return

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages)

    const prvImages = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })

    setPreviewImages(prvImages)
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form 
          onSubmit={handleSubmit} 
          className="create-orphanage-form"
        >
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-22.9039689,-47.0563924]}
              zoom={16}
              style={{ width: '100%', height: 280 }}
              onClick={handleMapClick}
            >
              <TileLayer url={ getMapURL() } />

              { 
                position.lat !== 0 &&
                  <Marker 
                    icon={mapIcon} 
                    position={[position.lat, position.lng]} 
                    interactive={false}
                  />
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" 
                value={name} 
                onChange={(ev) => setName(ev.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" 
                maxLength={300} 
                value={about} 
                onChange={(ev) => setAbout(ev.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  previewImages.map(image => (
                    <img key={image} src={image} alt={name} />
                  ))
                }

                <label htmlFor="imagens" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input type="file" multiple id="imagens" 
                onChange={handleSelectImages}
              />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instructions} 
                onChange={(ev) => setInstructions(ev.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
                id="opening_hours" 
                value={opening_hours} 
                onChange={(ev) => setOpeninghours(ev.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" 
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button type="button"
                  className={!open_on_weekends ? "active" : ""}                
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button type="submit">Confirmar</button>
          {/* <PrimaryButton type="submit">Confirmar</PrimaryButton> */}
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;