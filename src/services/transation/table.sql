 CREATE DATABASE IF NOT EXISTS transation;
 
 CREATE TABLE transation (id INT AUTO_INCREMENT PRIMARY KEY,
  payment_id VARCHAR(255),
  discription VARCHAR(255), 
  status VARCHAR(255), confirms VARCHAR(255), 
  amount INT(255), network_fee INT(255), 
  wallet_id VARCHAR(255));
   