-- DATA VISUALIZATION
create database test_data;
use test_data;
create table temp_data
(
  id INT NOT NULL AUTO_INCREMENT,
  state VARCHAR(25) NOT NULL,
  country VARCHAR(25) NOT NULL,
  varX INTEGER,
  varY INTEGER,
  varB INTEGER,
  PRIMARY KEY(id)
);

-- CHAT
DROP DATABASE IF EXISTS chatroom_db;
CREATE DATABASE chatroom_db;
USE chatroom_db;


CREATE TABLE chat_logs (
  id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(255) NOT NULL,
  messages VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);
