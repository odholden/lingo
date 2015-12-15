var Language = require('../models/language');


function languagesIndex(req, res) {
  Language.find(function(err, languages){
    if (err) return res.status(404).json({message: err});
    res.status(200).json({ languages });
  });
}

function languagesShow(req, res) {
  Language.find({ name: req.params.name }, function(err, language) {
    if (err) return res.status(404).json({message: err});
    res.status(200).json({ language });
  })
}


module.exports = {
  languagesIndex: languagesIndex,
  languagesShow: languagesShow
}