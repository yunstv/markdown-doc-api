import React from 'react'
import Routers from './routers'

class App extends React.PureComponent {
  componentDidMount() {
  }
  render() {
    return (
      <React.Suspense fallback={<h1>loading...</h1>}>
        <Routers />
      </React.Suspense>
    )
  }
}

export default App