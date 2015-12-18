angular
  .module('lingo')
  .factory('translate', TranslateFactory)

TranslateFactory.$inject = ["yandex"];

function TranslateFactory(yandex) {

  return {
    getParams: function(text) {
      return {
        "key" : yandex,
        "text": text,
        "lang": "en-de"
      }
    }
  }

};