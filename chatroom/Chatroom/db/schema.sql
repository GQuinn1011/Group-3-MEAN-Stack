DROP DATABASE IF EXISTS chatroom_db;
CREATE DATABASE chatroom_db;
USE chat_logs;


CREATE TABLE chat_logs (
  id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(255) NOT NULL,
  messages VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);
