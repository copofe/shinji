ALTER TABLE `post` DROP FOREIGN KEY `post_author_id_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `user` ADD `avatar` varchar(255);