CREATE TABLE `user` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `admin` bit(1) DEFAULT NULL,
    `user_address` varchar(100) DEFAULT NULL,
    `user_email` varchar(100) DEFAULT NULL,
    `user_name` varchar(50) DEFAULT NULL,
    `user_password` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`id`)
)

CREATE TABLE `product` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `description` varchar(200) DEFAULT NULL,
    `image_url` varchar(255) DEFAULT NULL,
    `name` varchar(50) DEFAULT NULL,
    `price` double DEFAULT NULL,
    `stock_quantity` int DEFAULT NULL,
    `category` varchar(50) DEFAULT NULL,
    PRIMARY KEY (`id`)
)

CREATE TABLE `cart` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `timestamp` timestamp DEFAULT CURRENT_TIMESTAMP,
    `product_id` bigint DEFAULT NULL,
    `user_id` bigint DEFAULT NULL,
    `quantity` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_product_id` (`product_id`),
    KEY `FK_user_id` (`user_id`),
    CONSTRAINT `FK_product_id` FOREIGN KEY (`product_id` REFERENCES `product` (`id`),
    CONSTRAINT `FK_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
    )
)