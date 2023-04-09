DROP SCHEMA IF EXISTS feastly;
CREATE SCHEMA feastly;
USE feastly;

CREATE TABLE product_category (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE discount (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `discount_percent` DECIMAL(4, 2) NOT NULL,
    `active` BOOLEAN DEFAULT true NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE products (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `desc` TEXT NOT NULL,
    `category_id` INT UNSIGNED,
    `discount_id` INT UNSIGNED,
    `price` DECIMAL(10, 2) NOT NULL,
    `sold_number` INT UNSIGNED DEFAULT '0' NOT NULL,
    `quantity` INT UNSIGNED DEFAULT '0' NOT NULL,
    `image` VARCHAR(150),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_prod_discount`
        FOREIGN KEY (`discount_id`)
        REFERENCES discount (`id`)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
    CONSTRAINT `fk_prod_category`
        FOREIGN KEY (`category_id`)
        REFERENCES product_category (`id`)
        ON DELETE SET NULL
        ON UPDATE SET NULL
) ENGINE=InnoDB;

CREATE TABLE users (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `password` TEXT NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `telephone` VARCHAR(10) NOT NULL,
    `role` BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
) ENGINE=InnoDB;

CREATE TABLE user_address (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED, -- NOT NULL, 
    `city` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `telephone` VARCHAR(10) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT `fk_user_usad`
        FOREIGN KEY (`user_id`)
        REFERENCES users (`id`)
        ON DELETE SET NULL 
        ON UPDATE SET NULL
);

CREATE TABLE user_payment (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED, -- NOT NULL, 
    `payment_type` VARCHAR(100) NOT NULL,
    `provider` VARCHAR(100) NOT NULL,
    `account_no` INT NOT NULL,
    `expiry` DATE NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT `fk_user_uspa`
        FOREIGN KEY (`user_id`)
        REFERENCES users (`id`)
        ON DELETE SET NULL
        ON UPDATE SET NULL
);

-- done above 

CREATE TABLE order_details (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED, -- NOT NULL,
    `total` DECIMAL(15, 2) NOT NULL, 
    `provider` VARCHAR(10) NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_user_details`
        FOREIGN KEY (`user_id`)
        REFERENCES users (`id`)
        ON DELETE SET NULL
        ON UPDATE SET NULL
) ENGINE=InnoDB;

CREATE TABLE order_items (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` INT UNSIGNED, -- NOT NULL,
    `product_id` INT UNSIGNED, -- NOT NULL,
    `quantity` INT UNSIGNED NOT NULL DEFAULT '1',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT `fk_details_items`
        FOREIGN KEY (`order_id`)
        REFERENCES order_details (`id`)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
    CONSTRAINT `fk_prod_orderitem`
        FOREIGN KEY (`product_id`)
        REFERENCES products (`id`)
        ON DELETE SET NULL
        ON UPDATE SET NULL
) ENGINE=InnoDB;

CREATE TABLE cart_item (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED, -- NOT NULL,
    `product_id` INT UNSIGNED, -- NOT NULL,
    `quantity` INT UNSIGNED NOT NULL DEFAULT '1',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT `fk_prod_cait`
        FOREIGN KEY (`product_id`)
        REFERENCES products (`id`)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
    CONSTRAINT `fk_user_shse`
        FOREIGN KEY (`user_id`)
        REFERENCES users (`id`)
        ON DELETE SET NULL
        ON UPDATE SET NULL
);