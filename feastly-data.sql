use feastly;

INSERT INTO `product_category` (`name`, `description`) VALUES 
('Mỳ Phở', 'Siuuuuuuuuuu'), 
('Cơm Hộp', 'Em ăn cơm chưa'),
('Bánh', 'Bán bánh bánh mì lo lo cho em'),
('Trà Sữa', 'Thức uống cho kẻ sỉ tinh'),
('Cà Phê', 'Không say không về'), 
('Đồ Ăn', 'Tùy loại'),
('Đồ Uống', ''),
('Đồ Chiên', 'Chưa chắc đã giòn đâu');

INSERT INTO `discount` (`name`, `description`, `discount_percent`) VALUES 
('NONE', 'Đéo giảm', 0),
('Giảm 10%', 'Giảm 10% giá sản phẩm', 0.1),
('Giảm 20%', 'Giảm 20% giá sản phẩm', 0.2),
('Giảm 30%', 'Giảm 30% giá sản phẩm', 0.3),
('Giảm 40%', 'Giảm 40% giá sản phẩm', 0.4),
('Giảm 50%', 'Giảm 50% giá sản phẩm', 0.5),
('Giảm 75%', 'Giảm 75% giá sản phẩm', 0.75);

INSERT INTO `products` (`name`, `desc`, `category_id`, `discount_id`, `price`, `sold_number`, `quantity`, `image`) VALUES 
('Mì trộn indo thập cẩm', '', 1, 2,27900, 1, 1, 'upload/productImage/1681813175582.jpeg'),
('Mì trộn Hải sản', '', 1, 3, 31500, 1, 1, 'upload/productImage/1681813996692.jpeg'),
('Mì đặc biệt siêu topping', '', 1, 4, 60050, 1, 1, 'upload/productImage/1681813544861.jpeg'), 
('Mì trộn chân giò hun khói', '', 1, 1, 45000, 1, 1, 'upload/productImage/1681813899142.jpeg'),
('Bún bò Huế', '', 1, 1, 56000, 1, 1, 'upload/productImage/1681814335510.jpeg'),
('Bún đậu mắm tôm', '', 1, 1, 35000, 1, 1, 'upload/productImage/1681818792540.jpeg'),
('Bún trộn nem nướng', '', 1, 1, 49000, 1, 1, 'upload/productImage/1681814558840.jpeg'),
('Bún chả chan', '', 1, 1, 35000, 1, 1, 'upload/productImage/1681814823190.jpg'),
('Cơm tấm sườn cốt lết', '', 2, 1, 18000, 1, 1, 'upload/productImage/1681815334353.jpeg'),
('Cơm tấm thịt ba chỉ', '', 2, 2, 45200, 1, 1, 'upload/productImage/1681815419215.jpeg'),
('Cơm rang dưa bò', '', 2, 4, 43000, 1, 1, 'upload/productImage/1681815036538.jpeg'),
('Cơm rang xá xíu', '', 2, 3, 40000, 1, 1, 'upload/productImage/1681815136443.jpeg'),
('Cơm rang thập cẩm', '', 2, 1, 32000, 1, 1, 'upload/productImage/1681815226446.jpeg'),
('Cơm bò sốt tiêu đen', '', 2, 2, 38400, 1, 1, 'upload/productImage/1681815556598.jpeg'),
('Cơm thịt chiên sốt thái', '', 2, 1, 39900, 1, 1, 'upload/productImage/1681815645434.jpeg'),
('Bánh mì thịt nướng', '', 3, 3, 26600, 1, 1, 'upload/productImage/1681815954922.jpg'),
('Bánh mì gà chiên', '', 3, 1, 23000, 0, 10, 'upload/productImage/1681816076225.jpg'),
('Bánh Mì thịt viên', '', 3, 1, 15000, 0, 10, 'upload/productImage/1681816129859.jpeg'),
('Bánh tráng nướng', '', 3, 2, 20000, 0, 10, 'upload/productImage/1681816382707.jpeg'),
('Bánh tráng cuốn bơ', '', 3, 1, 20000, 0, 10, 'upload/productImage/1681816279719.jpeg'),
('Bánh xèo', '', 3, 1, 25000, 0, 10, 'upload/productImage/1681816482210.jpeg'),
('Hồng trà sữa', '', 4, 1, 26000, 0, 10, 'upload/productImage/1681816948079.jpeg'),
('Trà sữa trân châu trắng', '', 4, 1, 26000, 0, 10, 'upload/productImage/1681817076631.jpeg'),
('Trà sữa trân châu đen', '', 4, 1, 26000, 0, 10, 'upload/productImage/1681817153504.jpeg'),
('Trà sữa bạc hà', '', 4, 2, 26000, 0, 10, 'upload/productImage/1681817254671.jpeg'),
('Trà sữa dâu', '', 4, 1, 23000, 0, 10, 'upload/productImage/1681817352660.jpeg'),
('Lục trà xoài cheese', '', 4, 4, 35000, 0, 10, 'upload/productImage/1681817463522.jpeg'),
('Lục trà dâu cheese', '', 4, 4, 35000,  0, 10, 'upload/productImage/1681817523337.jpeg'),
('Trà sữa matcha', '', 5, 1, 28000, 0, 10, 'upload/productImage/1681818412643.jpg'),
('Cà phê nâu đá', '', 5, 2, 32000, 0, 10, 'upload/productImage/1681817689767.jpg'),
('Bạc xỉu', '', 5, 1, 34000, 0, 10, 'upload/productImage/1681817755225.jpg'),
('Latte nóng', '', 5, 1, 46000, 0, 10, 'upload/productImage/1681817821278.jpg'),
('Caramel Macchiato', '', 5, 1, 50000, 0, 10, 'upload/productImage/1681817952029.jpeg'),
('Americano chanh leo', '', 5, 1, 35000, 0, 10, 'upload/productImage/1681818145995.jpeg'),
('Esperesso nâu đá', '', 5, 1, 50000, 0, 10, 'upload/productImage/1681818215981.jpeg'),
('Cappuccino', '', 5, 3, 52000, 0, 10, 'upload/productImage/1681817873766.jpg');

INSERT INTO `users` (`email`, `password`, `name`, `telephone`, `role`) VALUES 
('admin@gmail.com', '$2b$10$iDOGulq.CY.YtBD96mA7lO0pPZHZ14i054D0E7AluwYXP1kkvJ0Ya', 'admin', '0987654321', 1), -- password = 123456
('vinh@gmail.com', '$2b$10$iDOGulq.CY.YtBD96mA7lO0pPZHZ14i054D0E7AluwYXP1kkvJ0Ya', 'Vinh', '0123456789', 0),
('hieu@gmail.com',	'$2b$10$bKufoH9l2AQg.Hv0AdLKce/PO2f4uFXbkJY2LKpjMjdVME.mgpCkS',	'Minh Hieu', '0987654321', 0) -- password = 123
