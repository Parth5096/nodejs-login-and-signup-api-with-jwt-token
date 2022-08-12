const Transation = require('./dm_layer/index');

exports.create = function(req, res) {
    const new_transation = new Transation(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
    Transation.create(new_transation, function(err, transation) {
      if (err)
      res.send(err);
      res.json({message:"transation data added successfully!"});
    });
    }
    }

exports.findAll = function(req, res) {

    Transation.findAll(function(err, transation) {
  if (err)
  res.send(err);
//   console.log('res', transation);
  res.send(transation);
});
};

exports.findById = function(req, res) {
Transation.findById(req.params.id, function(err, transation) {
  if (err)
  res.send(err);
  res.json(transation);
});
}

exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Transation.update(req.params.id, new Transation(req.body), function(err, transation) {
   if (err)
   res.send(err);
   res.json({message: 'transation successfully updated' });
});
}
}


exports.delete = function(req, res) {
Transation.delete( req.params.id, function(err, transation) {
  if (err)
  res.send(err);
  res.json({message: 'Transation data successfully deleted' });
});
};