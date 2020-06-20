create database if not exists `ecommerce-store`;

use `ecommerce-store`;

create table product
(
    id          int primary key not null,
    productName nvarchar(255),
    description text,
    thumbnail   nvarchar(255),
    price       float,
    amount      int,
    categoryId  int,
    supplierId  int
);

create table category
(
    id           int primary key not null,
    categoryName nvarchar(255)
);

create table supplier
(
    id int primary key not null,
    supplierName nvarchar(255)
);

create table user(
  id int not null primary key,
  username varchar(255),
  passwordHash varchar(255),
  fullName nvarchar(255),
  roleId int,
  avatar nvarchar(255),
  phone varchar(20),
  address nvarchar(255)
);

create table role(
    id int not null primary key,
    roleName varchar(20)
);

create table `order`(
    id int not null primary key,
    userId int,
    totalPrice float,
    createdDate datetime,
    address nvarchar(255),
    phone varchar(20),
    status nvarchar(50)
);

create table orderDetail(
    id int not null primary key ,
    orderId int,
    productId int,
    amount int,
    totalPrice float
);
# user
alter table user add constraint FK_user_role foreign key (roleId) references role(id);

# order
alter table `order` add constraint FK_order_user foreign key (userId) references user(id);

# order detail
alter table `orderDetail` add constraint FK_orderDetail_order foreign key (orderId) references `order`(id);

alter table `orderDetail` add constraint FK_orderDetail_product foreign key (productId) references `product`(id);

# product
alter table `product` add constraint FK_product_category foreign key (categoryId) references `category`(id);

alter table `product` add constraint FK_product_supplier foreign key (supplierId) references `supplier`(id);
