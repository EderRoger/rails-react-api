import React from 'react';
import $ from 'jquery';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
      return <p> Hello React!</p>;
    }
}

render(<App/>, document.getElementById('app'));
