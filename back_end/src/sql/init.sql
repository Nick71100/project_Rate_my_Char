CREATE TABLE artworks(
   id INT AUTO_INCREMENT,
   title VARCHAR(255),
   product_year INT,
   image_url VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE authors(
   id INT AUTO_INCREMENT,
   name VARCHAR(255),
   firstname VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE categories(
   id INT AUTO_INCREMENT,
   label VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE genders(
   id INT AUTO_INCREMENT,
   label VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE roles(
   id INT AUTO_INCREMENT,
   label_role VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE users(
   id INT AUTO_INCREMENT,
   pseudo VARCHAR(255),
   password CHAR(60),
   email VARCHAR(255),
   created_at DATETIME,
   id_role INT NOT NULL,
   id_gender INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_role) REFERENCES roles(id),
   FOREIGN KEY(id_gender) REFERENCES genders(id)
);

CREATE TABLE characters(
   id INT AUTO_INCREMENT,
   name VARCHAR(255),
   desciption VARCHAR(255),
   image_url VARCHAR(255),
   rate TINYINT,
   id_gender INT NOT NULL,
   id_artwork INT NOT NULL,
   id_user INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_gender) REFERENCES genders(id),
   FOREIGN KEY(id_artwork) REFERENCES artworks(id),
   FOREIGN KEY(id_user) REFERENCES users(id)
);

CREATE TABLE artworks_authors(
   id_artwork INT,
   id_author INT,
   PRIMARY KEY(id_artwork, id_author),
   FOREIGN KEY(id_artwork) REFERENCES artworks(id),
   FOREIGN KEY(id_author) REFERENCES authors(id)
);

CREATE TABLE artworks_categories(
   id_artwork INT,
   id_categorie INT,
   PRIMARY KEY(id_artwork, id_categorie),
   FOREIGN KEY(id_artwork) REFERENCES artworks(id),
   FOREIGN KEY(id_categorie) REFERENCES categories(id)
);

CREATE TABLE users_characters(
   id_user INT,
   id_character INT,
   PRIMARY KEY(id_user, id_character),
   FOREIGN KEY(id_user) REFERENCES users(id),
   FOREIGN KEY(id_character) REFERENCES characters(id)
);
