import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

import '../styles/pages/home.scss'
import logoSvg from '../images/logo.svg'

function Home() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoSvg} alt="Happy" />

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Campinas</strong>
          <span>São Paulo</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0,.6)" />
        </Link>
      </div>
    </div>
  )
}

export default Home