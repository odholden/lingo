angular
  .module("lingo")
  .factory("Translate", Translate)

Translate.$inject = ['$resource', 'translate']

function Translate($resource, yandex, translate) {

  return $resource(
    {"get": 
      { url: "https://translate.yandex.net/api/v1.5/tr.json/translate",
        method: "GET",
        params: {
          key: yandex,
          text: "here is some testing text",
          lang: "en-de"
        }
      }
    }
  )
}