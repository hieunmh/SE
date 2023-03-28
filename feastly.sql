    DROP SCHEMA IF EXISTS feastly;
    CREATE SCHEMA feastly;
    USE feastly;

    CREATE TABLE product_category (
        id INT(10) NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        descripsion TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB;

    CREATE TABLE product_inventory (
        id INT(10) NOT NULL AUTO_INCREMENT,
        quantity INT(10) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB;

    CREATE TABLE discount (
        id INT(10) NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        descripsion TEXT NOT NULL,
        discount_percent DECIMAL(2) NOT NULL,
        active BOOLEAN NOT NULL,
        created_at TIMESTAMP NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB;

    CREATE TABLE product (
        id INT(10) NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(100) NOT NULL,
        `desc` TEXT NOT NULL,
        `category_id` INT(10) DEFAULT '0',
        inventory_id INT(10) DEFAULT '0',
        `price` DECIMAL(6) NOT NULL,
        `discount_id` INT(10) DEFAULT '0',
        `created_at` TIMESTAMP NOT NULL,
        sold_number INT(10),
        image VARCHAR(50),
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

    CREATE TABLE customer (
        id INT(10) NOT NULL AUTO_INCREMENT,
        email VARCHAR(100) NOT NULL,
        password TEXT NOT NULL,
        name VARCHAR(30) NOT NULL,
        telephone VARCHAR(10) NOT NULL,
        role BOOLEAN NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB;

    CREATE TABLE payment_details (
        id INT(10) NOT NULL AUTO_INCREMENT,
        order_id INT(10) DEFAULT '0',
        amount INT(255) NOT NULL, 
        provider VARCHAR(10) NOT NULL,
        status VARCHAR(10) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        PRIMARY KEY (id)
    );

    CREATE TABLE order_details (
        id INT(10) NOT NULL AUTO_INCREMENT,
        customer_id INT(10) DEFAULT '0',
        total DECIMAL(2) NOT NULL, 
        payment_id INT(10) DEFAULT '0',
        created_at TIMESTAMP NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_customer_details`
            FOREIGN KEY (`customer_id`)
            REFERENCES customer (`id`)
            ON DELETE SET NULL
            ON UPDATE SET NULL,
        CONSTRAINT `fk_orde_pade`
            FOREIGN KEY (`payment_id`)
            REFERENCES payment_details (`id`)
            ON DELETE SET NULL
            ON UPDATE SET NULL
    ) ENGINE=InnoDB;

    CREATE TABLE order_items (
        id INT(10) NOT NULL AUTO_INCREMENT,
        order_id INT(10) DEFAULT '0',
        product_id INT(10) DEFAULT '0',
        quantity INT(255) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT `fk_details_items`
            FOREIGN KEY (`order_id`)
            REFERENCES order_details (`id`)
            ON DELETE SET NULL
            ON UPDATE SET NULL,
        CONSTRAINT `fk_prod_orderitem`
            FOREIGN KEY (`product_id`)
            REFERENCES product (`id`)
            ON DELETE SET NULL
            ON UPDATE SET NULL
    ) ENGINE=InnoDB;

    CREATE TABLE shopping_session (
        id INT(10) NOT NULL AUTO_INCREMENT,
        customer_id INT(10) DEFAULT '0',
        total DECIMAL(2) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT `fk_customer_shse`
            FOREIGN KEY (`customer_id`)
            REFERENCES customer (`id`)
            ON DELETE SET NULL
            ON UPDATE SET NULL
    );

    CREATE TABLE cart_item (
        id INT(10) NOT NULL AUTO_INCREMENT,
        session_id INT(10) DEFAULT '0',
        product_id INT(10) DEFAULT '0',
        quantity INT(255) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT `fk_prod_cait`
            FOREIGN KEY (`product_id`)
            REFERENCES product (`id`)
            ON DELETE SET NULL
            ON UPDATE SET NULL,
        CONSTRAINT `fk_prod_shse`
            FOREIGN KEY (`session_id`)
            REFERENCES shopping_session (`id`)
            ON DELETE SET NULL
            ON UPDATE SET NULL
    );

    CREATE TABLE customer_address (
        id INT(10) NOT NULL AUTO_INCREMENT,
        customer_id INT(10) DEFAULT '0', 
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        telephone VARCHAR(10) NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT `fk_customer_usad`
            FOREIGN KEY (`customer_id`)
            REFERENCES customer (`id`)
            ON DELETE SET NULL 
            ON UPDATE SET NULL
    );

    CREATE TABLE customer_payment (
        id INT(10) NOT NULL AUTO_INCREMENT,
        customer_id INT(10) DEFAULT '0', 
        payment_type VARCHAR(100) NOT NULL,
        provider VARCHAR(100) NOT NULL,
        account_no INT(255) NOT NULL,
        expiry DATE NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT `fk_customer_uspa`
            FOREIGN KEY (`customer_id`)
            REFERENCES customer (`id`)
            ON DELETE SET NULL
            ON UPDATE SET NULL
    );  