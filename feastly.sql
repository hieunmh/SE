DROP SCHEMA IF EXISTS feastly;
CREATE SCHEMA feastly;
USE feastly;

CREATE TABLE product_category (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE product_inventory (
    id INT NOT NULL AUTO_INCREMENT,
    quantity INT DEFAULT '0' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE discount (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    discount_percent DECIMAL(4, 2) NOT NULL,
    active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `desc` TEXT NOT NULL,
    `category_id` INT,
    inventory_id INT,
    `price` DECIMAL(10, 2) NOT NULL,
    `discount_id` INT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    sold_number INT DEFAULT '0' NOT NULL,
    image VARCHAR(150),
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_prod_discount`
        FOREIGN KEY (`discount_id`)
        REFERENCES discount (`id`)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
    CONSTRAINT `fk_prod_inventory`
        FOREIGN KEY (`inventory_id`)
        REFERENCES product_inventory (`id`)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
    CONSTRAINT `fk_prod_category`
        FOREIGN KEY (`category_id`)
        REFERENCES product_category (`id`)
        ON DELETE SET NULL
        ON UPDATE SET NULL
) ENGINE=InnoDB;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    password TEXT NOT NULL,
    name VARCHAR(30) NOT NULL,
    telephone VARCHAR(10) NOT NULL,
    role BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
) ENGINE=InnoDB;

-- done above 

CREATE TABLE payment_details (
    id INT NOT NULL AUTO_INCREMENT,
    order_id INT,
    amount INT NOT NULL, 
    provider VARCHAR(10) NOT NULL,
    status VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE order_details (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT DEFAULT '0',
    total DECIMAL(2) NOT NULL, 
    payment_id INT DEFAULT '0',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_user_details`
        FOREIGN KEY (`user_id`)
        REFERENCES users (`id`)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
    CONSTRAINT `fk_orde_pade`
        FOREIGN KEY (`payment_id`)
        REFERENCES payment_details (`id`)
        ON DELETE SET NULL
        ON UPDATE SET NULL
) ENGINE=InnoDB;

CREATE TABLE order_items (
    id INT NOT NULL AUTO_INCREMENT,
    order_id INT DEFAULT '0',
    product_id INT DEFAULT '0',
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
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

CREATE TABLE shopping_session (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT DEFAULT '0',
    total DECIMAL(2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT `fk_user_shse`
        FOREIGN KEY (`user_id`)
        REFERENCES users (`id`)
        ON DELETE SET NULL
        ON UPDATE SET NULL
);

CREATE TABLE cart_item (
    id INT NOT NULL AUTO_INCREMENT,
    session_id INT DEFAULT '0',
    product_id INT DEFAULT '0',
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT `fk_prod_cait`
        FOREIGN KEY (`product_id`)
        REFERENCES products (`id`)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
    CONSTRAINT `fk_prod_shse`
        FOREIGN KEY (`session_id`)
        REFERENCES shopping_session (`id`)
        ON DELETE SET NULL
        ON UPDATE SET NULL
);

CREATE TABLE user_address (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT DEFAULT '0', 
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    telephone VARCHAR(10) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT `fk_user_usad`
        FOREIGN KEY (`user_id`)
        REFERENCES users (`id`)
        ON DELETE SET NULL 
        ON UPDATE SET NULL
);

CREATE TABLE user_payment (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT DEFAULT '0', 
    payment_type VARCHAR(100) NOT NULL,
    provider VARCHAR(100) NOT NULL,
    account_no INT NOT NULL,
    expiry DATE NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT `fk_user_uspa`
        FOREIGN KEY (`user_id`)
        REFERENCES users (`id`)
        ON DELETE SET NULL
        ON UPDATE SET NULL
);  

-- data
INSERT INTO `feastly`.`product_category` (`id`, `name`) VALUES ('1', 'Cơm');
INSERT INTO `feastly`.`product_inventory` (`id`, `quantity`) VALUES ('1', '50');
INSERT INTO `feastly`.`discount` (`id`, `name`, `description`, `discount_percent`) VALUES ('1', 'NONE', 'DEO GIAM', '0');