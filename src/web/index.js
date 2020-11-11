import React from 'react';
import ReactDOM from 'react-dom';
import App from 'root/app.js'
import './app.scss'

const DOM = document.getElementById('root')
const render = () => {
  ReactDOM.render(
    <App />,
    DOM
  );
}

if (module.hot) {
  module.hot.accept('./app.js', function() {
    console.log('hot!');
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(DOM)
      render()
    }, 50)
  })
}
render()

