CREATE TABLE products(
	id SERIAL PRIMARY KEY  NOT NULL,
	name VARCHAR(50) NOT NULL UNIQUE,
	slug VARCHAR(100) NOT NULL UNIQUE,
	image VARCHAR(100) NOT NULL,
	brand VARCHAR(50) NOT NULL,
	category VARCHAR(50) NOT NULL,
	description VARCHAR NOT NULL,
	price BIGINT NOT NULL,
	countInStock INT NOT NULL,
	rating INT NOT NULL,
	numReviews INT NOT NULL
)
INSERT INTO products(name,slug,image,category,price,countInStock,brand, rating,numReviews,description) VALUES
('Nike Slim shirt','nike-slim-shirt','/images/p1.jpg',"Shirt",120,10,'Nike',4.5,10,'high quality shirt'),
('Adidas Fit shirt','adidas-fit-shirt','/images/p1.jpg','Shirt',250,0,'Adidas',4.0,4,'high quality product'),
('Nike Slim Pant','nike-slim-pants','/images/p1.jpg',"Pants",110,4,'Nike',2.5,11,'high quality product'),
('Adidas Fit Pants','adidas-fit-pants','/images/p1.jpg',"Pants",150,5,'Puma',4.0,10,'high quality product');

CREATE TABLE users(
	id SERIAL PRIMARY KEY NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(250) NOT NULL,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	isAdmin BOOLEAN  NOT NULL,
	google JSON,
	facebook JSON
	
);
INSER INTO users(email,password,firstName,lastName,isAdmin)VALUES 
(silvanaselmani@gmail.com,'silvana123','silvana','selmani',true),
(blerim@gmail.com,'blerim123','blerim','daku',false);



