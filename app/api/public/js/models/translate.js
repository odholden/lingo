angular
  .module("lingo")
  .factory("Translate", Translate)

Translate.$inject = ['$resource', 'translate']

function Translate($resource, translate) {
  return $resource(
    {"post": 
      { url: "https://translate.yandex.net/api/v1.5/tr.json/translate",
        method: "POST",
        params: translate
      }
    }
  )
}