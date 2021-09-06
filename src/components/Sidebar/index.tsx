import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router";
import mapMarkerImg from '../../images/marker.svg'
import './styles.scss'

export default function Sidebar() {
  const { goBack } = useHistory()
  
  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  )
}