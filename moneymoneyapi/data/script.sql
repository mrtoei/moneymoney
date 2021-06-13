INSERT INTO `users` (`id`, `username`, `password`, `firstname`, `lastname`, `email`, `role`, `remove_status`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2y$10$0gi/TWVYDPexyAtyRx.da.NlE1t9.mscV/hn0RSZ1vOXIm1raYvya', 'Admin', 'Administrator', 'administrator@Moneymoney.com', 9, 0,  CURRENT_TIMESTAMP ,  CURRENT_TIMESTAMP );

#2021-06-13
rename table my_wellet to my_wallet;
alter table my_wallet add type tinyint not null after name;

alter table transactions drop foreign key transactions_wellet_id_foreign;
drop index transactions_wellet_id_foreign on transactions;
alter table transactions change wellet_id wallet_id bigint unsigned not null;
alter table transactions add constraint transactions_wallet_id_foreign foreign key (wallet_id) references my_wallet (id);
create index transactions_wallet_id_foreign on transactions (wallet_id);


