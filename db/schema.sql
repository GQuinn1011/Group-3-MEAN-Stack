DROP DATABASE IF EXISTS chatroom_db;
CREATE DATABASE chatroom_db;
USE chatroom_db;


CREATE TABLE chat (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  msg VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO chat (username, msg) VALUES ("User One", "hello");