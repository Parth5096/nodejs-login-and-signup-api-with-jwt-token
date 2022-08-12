const mysql = require("mysql");

const sqlcon = mysql.createConnection({
    host : "sql6.freemysqlhosting.net",
    user : "sql6506758",
    password : "tHu6VJWxhm",
    database : "sql6506758",
    port : 3306
});

sqlcon.connect(err => {
    if(err) throw err;
    console.log("mysql database connected successfully");
    // sqlcon.query("CREATE DATABASE IF NOT EXISTS transation", function (err, result) {
    //     if (err) throw err;
    //   });

      var sql = "CREATE TABLE IF NOT EXISTS transations (id INT AUTO_INCREMENT PRIMARY KEY, payment_id VARCHAR(255), discription VARCHAR(255), status VARCHAR(255), confirms VARCHAR(255), amount INT(255), network_fee INT(255), wallet_id VARCHAR(255), created_at DATETIME NOT NULL, updated_at timestamp not null default current_timestamp on update current_timestamp)";
sqlcon.query(sql, function (err, result) {
  if (err) throw err;
});
}); 

module.exports = sqlcon;