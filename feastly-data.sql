use feastly;

INSERT INTO `product_category` (`name`, `description`) VALUES 
('Kem', 'Ngon trê từng vị kem'), 
('Bánh', 'Ngọt'), 
('Đồ ăn', 'Tùy loại'), 
('Nước', ''), 
('Bia', 'Không say không về'), 
('Rượu', 'Thức uống cho kẻ sỉ tinh');

INSERT INTO `discount` (`name`, `description`, `discount_percent`) VALUES 
('NONE', 'Đéo giảm', 0),
('Giảm 10%', 'Giảm 10% giá sản phẩm', 0.1),
('Giảm 20%', 'Giảm 20% giá sản phẩm', 0.2),
('Giảm 30%', 'Giảm 30% giá sản phẩm', 0.3),
('Giảm 40%', 'Giảm 40% giá sản phẩm', 0.4),
('Giảm 50%', 'Giảm 50% giá sản phẩm', 0.5),
('Giảm 75%', 'Giảm 75% giá sản phẩm', 0.75);

INSERT INTO `products` (`name`, `desc`, `category_id`, `discount_id`, `price`, `sold_number`, `quantity`) VALUES 
('Kem ốc quê', 'Kem có em', 1, 1, '10000', 1, 10),
('Bánh sinh nhật', 'Bánh có anh', 2, 2, '200000', 2, 10);

INSERT INTO `users` (`email`, `password`, `name`, `telephone`, `role`) VALUES 
('admin@gmail.com', '$2b$10$iDOGulq.CY.YtBD96mA7lO0pPZHZ14i054D0E7AluwYXP1kkvJ0Ya', 'admin', '0987654321', 1), -- password = 123456
('vinh@gmail.com', '$2b$10$iDOGulq.CY.YtBD96mA7lO0pPZHZ14i054D0E7AluwYXP1kkvJ0Ya', 'Vinh', '0123456789', 0);