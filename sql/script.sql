# create database ecommercestore;

use ecommercestore;

create table HIBERNATE_GEN_ID
(
    GEN_NAME  varchar(255) null,
    GEN_VALUE int          null
);

create table category
(
    id           int                       not null
        primary key,
    categoryname varchar(255) charset utf8 null
);

create table role
(
    id       int         not null
        primary key,
    rolename varchar(20) null
);

create table supplier
(
    id           int                       not null
        primary key,
    suppliername varchar(255) charset utf8 null
);

create table product
(
    id          int                       not null
        primary key,
    productname varchar(255) charset utf8 null,
    description text                      null,
    thumbnail   varchar(255) charset utf8 null,
    price       float                     null,
    amount      int                       null,
    categoryid  int                       null,
    supplierid  int                       null
);

create table user
(
    id           int                       not null
        primary key,
    username     varchar(255)              null,
    passwordhash varchar(255)              null,
    fullname     varchar(255) charset utf8 null,
    roleid       int                       null,
    avatar       varchar(255) charset utf8 null,
    phone        varchar(20)               null,
    address      varchar(255) charset utf8 null
);

create table `order`
(
    id          int                       not null
        primary key,
    userid      int                       null,
    totalprice  float                     null,
    createddate datetime                  null,
    address     varchar(255) charset utf8 null,
    phone       varchar(20)               null,
    status      varchar(50) charset utf8  null
);

create table orderDetail
(
    id         int   not null
        primary key,
    orderid    int   null,
    productid  int   null,
    amount     int   null,
    totalprice float null
);

