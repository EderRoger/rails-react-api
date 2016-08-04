var Dispatcher = require('flux').Dispatcher;
var peopleDispatcher = new Dispatcher()

var PeopleActions = {
  fetchPeople: function(){
    peopleDispatcher.dispatch({type: "fetch_people"})
  }
}
