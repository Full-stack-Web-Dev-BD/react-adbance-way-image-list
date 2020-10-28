import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './component/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
