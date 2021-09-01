import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import OrphanMap from '../pages/OrphanMap'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/app" component={OrphanMap} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes