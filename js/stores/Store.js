var Store = function(config){
  this.items = []
  this.item = {}
  this.errors = []
  this.object = config.newObject

  this.working = function() {this.emitEvent('working')}
  this.created = function() {this.emitEvent('done'); this.emitEvent('created')}
  this.updated = function() {this.emitEvent('done'); this.emitEvent('updated')}
  this.fetched = function() {this.emitEvent('done'); this.emitEvent('fetched')}
  this.edited = function() {this.emitEvent('done'); this.emitEvent('edited')}
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

  this['update_' + config.entityPlural] = function(entityObj) {
    this.working()
    var data = {}
    data[config.entitySingular] = entityObj
    $.ajax('/' + config.entityPlural + '/'+ entityObj.id +'.json', {method: 'PATCH', data: data})
    .then(
      this.onSucessUpdate.bind(this),
      this.onError.bind(this)
    )
  },
  // TODO: is it onSucessCreate?
  this['destroy_' + config.entityPlural] = function(entityObj) {
    this.working()
    var data = {}
    data[config.entitySingular] = entityObj
    $.ajax('/' + config.entityPlural  + '/'+ entityObj.id, {method: 'DELETE', data: data})
    .then(
      this.onSucessCreate.bind(this),
      this.onError.bind(this)
    )
  },

  this['edit_' + config.entityPlural] = function(entityObj){
    this.working()
    if(entityObj && entityObj.id){
      $.ajax('/' + config.entityPlural + '/'+ entityObj.id +'.json')
      .then(
        this.onSucessEdited.bind(this),
        this.onError.bind(this)
      )
    }
  },

  this['fetch_' + config.entityPlural] = function(){
    this.working()
    // default timeout ???
    $.ajax('/' + config.entityPlural + '.json')
    .then(
      this.onSucessFetch.bind(this),
      this.onError.bind(this)
    )
  },

  this.onSucessCreate = function(data) {this.created()},
  this.onSucessUpdate = function(data) {this.updated()},
  this.onSucessFetch = function(data) {this.items = data; this.fetched()},
  this.onSucessEdited = function(data) {this.item = data; this.edited()},
  this.onError= function(e) {
    //this.error = e
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
