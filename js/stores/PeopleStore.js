import $ from 'jquery';

var Dispatcher = require('flux').Dispatcher;
var Store = require('./Store');
var EventEmitter = require('events').EventEmitter;
var PeopleStore = {}
var peopleDispatcher = new Dispatcher()

PeopleStore = $.extend(PeopleStore, new EventEmitter())
PeopleStore = $.extend(PeopleStore, new Store({entityPlural: 'people'}))
peopleDispatcher.register(PeopleStore.handleActions.bind(PeopleStore))

module.exports = PeopleStore
