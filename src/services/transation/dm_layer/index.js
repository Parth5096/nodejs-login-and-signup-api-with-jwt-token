const dbConn = require('../../../database/mysql');

var Transation = function(transation){
    this.payment_id = transation.payment_id;
    this.discription = transation.discription;
    this.status = transation.status;
    this.confirms = transation.confirms;
    this.amount = transation.amount;
    this.network_fee = transation.network_fee;
    this.wallet_id = transation.wallet_id;
    this.created_at = new Date();
    this.updated_at = new Date();
  };

  //insert transation value
  Transation.create = function (newTransationValue, result) {
  dbConn.query("INSERT INTO transations set ?", newTransationValue, function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(err, null);
  }
  else{
    // console.log(res);
    result(null, res);
  }
  });
  }

  Transation.findById = function (id, result) {
  dbConn.query("Select * from transations where id = ? ", id, function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(err, null);
  }
  else{
    result(null, res);
  }
  });
  }


  Transation.findAll = function (result) {
  dbConn.query("Select * from transations", function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(null, err);
  }
  else{
    // console.log(res);
    result(null, res);
  }
  });
  }

  Transation.update = function(id, transation, result){
  dbConn.query("UPDATE transations SET payment_id=?,discription=?,status=?,confirms=?,amount=?,network_fee=?,wallet_id=? WHERE id = ?", [transation.payment_id,transation.discription,transation.status,transation.confirms,transation.amount,transation.network_fee,transation.wallet_id, id], function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(null, err);
  }else{
    result(null, res);
  }
  });
  }

  Transation.delete = function(id, result){
  dbConn.query("DELETE FROM transations WHERE id = ?", [id], function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(null, err);
  }
  else{
    result(null, res);
  }
  });
  };

  module.exports= Transation;
