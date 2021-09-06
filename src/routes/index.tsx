import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import OrphanMap from '../pages/OrphanMap'
import Orphanage from '../pages/Orphanage'
import CreateOrphanage from '../pages/CreateOrphanage'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/app" component={OrphanMap} />
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes