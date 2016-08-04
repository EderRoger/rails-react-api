import $ from 'jquery';

var Store = function(config){
  this.items = []
  this.item = {}
  this.errors = []
  this.object = config.newObject

  this.working = function() {this.emitEvent('working')}
  this.created = function() {this.emitEvent('done'); this.emitEvent('created')}
  this.fetched = function() {this.emitEvent('done'); this.emitEvent('fetched')}
  this.error = function() {this.emitEvent('done'); this.emitEvent('error')}

  this['create_' + config.entityPlural] = function(entityObj) {
    this.working()
    var data = {}
    data[config.entitySingular] = entityObj
    $.ajax('/' + config.entityPlural  + '.json', {method: 'POST', data: data})
    .then(
      this.onSucessCreate.bind(this),
      this.onError.bind(this)
    )
  },

  this['fetch_' + config.entityPlural] = function(){
    this.working()
    $.ajax('/' + config.entityPlural + '.json')
    .then(
      this.onSucessFetch.bind(this),
      this.onError.bind(this)
    )
  },

  this.onSucessCreate = function(data) {this.created()},
  this.onSucessFetch = function(data) {this.items = data; this.fetched()},
  this.onError= function(e) {
    console.log('Error', config.entitySingular, e.responseText)
    console.log('Error', config.entitySingular, e)
    this.errors = e.responseText
    this.error()
  },
  this.handleActions = function(action){
    var fn = this[action.type]
    if (fn) {
      fn.bind(this)(action.payload)
    }
  }
}
module.exports = Store
