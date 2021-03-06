angular
  .module('lingo')
  .factory('Chat', Chat)

Chat.$inject = ['$resource', 'API']

function Chat($resource, API){
  return $resource(
    API + '/chats/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: false},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'update':    { method: "PUT" }
    }
  );
}