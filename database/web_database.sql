create database website;

use website;

create table customer(
	customer_id int primary key,
    email varchar(100) not null unique,
    username varchar(20) not null,
    password varchar(20) not null,
    full_name varchar(50) not null,
    gender boolean,
    address varchar(100),
    phonenumber varchar(20),
    dateofbirth date not null,
    updateat date not null
);

create table product(
	product_id int primary key,
    name varchar(50) not null unique,
    image varchar(100) not null unique,
    price int not null,
    description varchar(200),
    status text not null,
    tags varchar(200) not null,
    updateat date not null
);

create table order_entity(
	order_id int primary key,
    customer_id int not null,
    total_price int not null,
    shipping_address text not null,
    shipping_fee int,
    discount_code int,
    discount_fee int,
    status text not null,
    order_day date not null,
    delivery date not null
);

create table order_product(
	id int primary key,
    product_id int not null,
    quantity int not null,
    currentprice int not null,
    status text not null,
    updateat date not null
);

create table order_list(
	order_id int,
    product_entity_id int,
    constraint pk_order_product primary key (order_id, product_entity_id)
);

create table admin_account(
	id int primary key,
    fullname text not null,
    username text not null,
    password text not null,
    status text not null,
    updateat date not null
);

create table messages(
	message_id int primary key,
	email varchar(100) not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    message varchar(500) not null,
    written_date_hour datetime not null
);

create table feature(
	feature_id int primary key,
    title varchar(50) not null,
    description varchar(500)
);

create table blog(
	blog_id int primary key,
    customer_id int not null,
    content varchar(1000) not null,
    thumbnail varchar(50) not null,
    written_date_hour datetime not null
);

alter table order_entity
add constraint fk_customer_id foreign key (customer_id)
references customer(customer_id);

alter table order_product
add constraint fk_product_id foreign key (product_id)
references product(product_id);

alter table order_list
add constraint fk_order_id foreign key (order_id)
references order_entity(order_id);

alter table order_list
add constraint fk_product_entity_id foreign key (product_entity_id)
references order_product(id);

INSERT INTO customer (customer_id, email, username, password, full_name, gender, address, phonenumber, dateofbirth, updateat)
VALUES
(1, "quocthai290103@gmail.com", "ThaiDang234", "123456789", "Dang Quoc Thai", 0, "Ho Chi Minh City", "0854916602", '2003-01-29', '2023-11-12');
INSERT INTO customer (customer_id, email, username, password, full_name, gender, address, phonenumber, dateofbirth, updateat)
VALUES
(2, "dqthai21@clc.fitus.edu.vn", "ThaiDangQuoc2901", "290103", "Dang Quoc Thai", 0, "Ho Chi Minh City", "0854916602", '2003-01-29', '2023-11-12');
INSERT INTO customer (customer_id, email, username, password, full_name, gender, address, phonenumber, dateofbirth, updateat)
VALUES
(3, "ctkien21@clc.fitus.edu.vn", "KienTrung365", "97531", "Cao Trung Kien", 0, "Ho Chi Minh City", "0854916602", '2003-01-29', '2023-11-12');

INSERT INTO product (product_id, name, image, price, description, status, tags, updateat)
VALUES
(1, "Nordic Chair", "IMG9350.png", 30, "Nice chair made of the best material", "available", "european, wool, comfy", '2023-11-12');
INSERT INTO product (product_id, name, image, price, description, status, tags, updateat)
VALUES
(2, "English Chair", "IMG3496.png", 20, "Made of magohany wood, best quality", "available", "european, wooden, cool, tall", '2023-11-12');
INSERT INTO product (product_id, name, image, price, description, status, tags, updateat)
VALUES
(3, "American Chair", "IMG3951.png", 25, "Metallic chair, fashionable and easy to move around", "out of order",'metallic, american, stylish', '2023-11-12');

INSERT INTO order_entity 
VALUES
(1, 3, 100, '23 Binh Thanh Binh Tan',  10, 52, 5, 'shipped', '2023-11-12', '2023-11-20');
INSERT INTO order_entity 
VALUES
(2, 1, 150, '23 Tan Phoi',  30, 67, 10, 'shipped', '2023-11-09', '2023-11-23');

INSERT INTO order_product
VALUES
(1, 2, 4, 80, 'shipped', '2023-11-12');
INSERT INTO order_product
VALUES
(2, 2, 3, 60, 'shipped', '2023-11-12');

INSERT INTO order_list
VALUES
(1, 2);
INSERT INTO order_list
VALUES
(2, 1);

INSERT INTO admin_account
values
(2, "OldRepublic", "Darth Revan", "9062160", "active", "2023-11-12")