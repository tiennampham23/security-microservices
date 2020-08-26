create database store;
use store;

create table product
(
    id          int                       not null
        primary key,
    productname varchar(255) charset utf8 null,
    description mediumtext                null,
    thumbnail   varchar(255) charset utf8 null,
    price       float                     null,
    amount      int                       null,
    categoryid  int                       null,
    supplierid  int                       null
);


