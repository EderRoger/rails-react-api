var PeopleStore = {}

PeopleStore = $.extend(PeopleStore, new EventEmitter())
PeopleStore = $.extend(PeopleStore, new BaseStore({entityPlural: 'people'}))
dispatcher.register(PeopleStore.handleActions.bind(PeopleStore))
