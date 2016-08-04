import React from 'react';
import $ from 'jquery';
import {render} from 'react-dom';
import PeopleStore from '../stores/PeopleStore';
import PeopleActions from '../actions/PeopleActions';

class App extends React.Component {

  fetchStores (){
    return {
      people: PeopleStore.items()
    }
  }

  componentWillMount() {
     console.log('Component WILL MOUNT!')
  }

  componentDidMount() {
     PeopleStore.on('fetched', this.updateState)
     PeopleActions.fetchPeople();
     console.log('Component DID MOUNT!')
  }

  updateState (){
    console.log('Update State')
    this.setState(this.fetchPeople())
  }

  componentWillReceiveProps(newProps) {
     console.log('Component WILL RECIEVE PROPS!')
  }

  shouldComponentUpdate(newProps, newState) {
     return true;
  }

  componentWillUpdate(nextProps, nextState) {
     console.log('Component WILL UPDATE!');
  }

  componentDidUpdate(prevProps, prevState) {
     console.log('Component DID UPDATE!')
  }

  componentWillUnmount() {
     console.log('Component WILL UNMOUNT!')
  }

  render () {
      return <p> Hello React! {this.state}</p>;
    }
}

render(<App/>, document.getElementById('app'));
