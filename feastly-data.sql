use feastly;

INSERT INTO `product_category` (`name`, `description`) VALUES 
('Mỳ Phở', 'Siuuuuuuuuuu'), 
('Cơm Hộp', 'Em ăn cơm chưa'),
('Bánh Mì', 'Bán bánh bánh mì lo lo cho em'),
('Bia, Rượu', 'Không say không về'), 
('Trà Sữa', 'Thức uống cho kẻ sỉ tinh'),
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
('Mì trộn indo thập cẩm', '', 1, 1,27900, 1, 1, 'https://images.foody.vn/res/g101/1003994/s120x120/3d119e5e-9c39-41d6-83c3-90041bb9-b7a9121e-211230154400.jpeg'),
('Mì trộn Nem chua', '', 1, 1, 31500, 1, 1, 'https://images.foody.vn/res/g101/1003994/s120x120/474b60dd-33d7-4fc5-b6f1-4bf51010-2564ecd3-211119213441.jpeg'),
('Mì đặc biệt siêu topping', '', 1, 1, 60050, 1, 1, 'https://images.foody.vn/res/g101/1003994/s120x120/429d0ac2-d646-4418-ae17-33647887-e7c4b8f9-210710152430.jpeg'), 
('Khoai tây lắc phô mai', '', 1, 1, 21600, 1, 1, 'https://images.foody.vn/res/g101/1003994/s120x120/16b38f0f-f82a-4fb1-896b-80c03361-b7d40dac-230224144857.jpeg'),
('Khoai tây chiên', '', 1, 1, 19800, 1, 1, 'https://images.foody.vn/res/g101/1003994/s120x120/474cfec3-d858-4185-b772-2259c9de-6298c164-230223123129.jpeg'),
('Mì Trộn Thập Cẩm Đặc Biệt', '', 1, 1,40050, 1, 1, 'https://images.foody.vn/res/g101/1003994/s120x120/b7ae92c1-3ddd-473c-bbf9-04bee7c8-86abaa17-211031152658.jpeg'),
('Mì Trộn Indomie Trứng ốp la', '', 1, 1, 22500, 1, 1, 'https://images.foody.vn/res/g101/1003994/s120x120/6b78d8e3-3da3-445e-9e00-989d8ab5-251d58e4-220907121524.jpeg'),
('Mì Trộn Indomie Xúc Xích', '', 1, 1, 25200, 1, 1, 'https://images.foody.vn/res/g101/1003994/s120x120/fe1c5f87-8224-41d3-a362-fef6f2d7-888bcd92-210927182037.jpeg'),
('Mì Trộn Rau Củ + Viên Hải Sản Nhân Mayo', '', 1, 1, 25200, 1, 1, 'https://images.foody.vn/res/g101/1003994/s120x120/e9023cf8-1414-4231-bc8a-1cfc59f8-b237f562-210927182050.jpeg'),
('Mì Trộn Indomie Rau Củ', '', 1, 1, 18000, 1, 1, 'https://images.foody.vn/res/g101/1003994/s120x120/26e6543b-7104-4b90-a48b-e02bb091-44eb505f-220828074847.jpeg'),
('Mì Trộn Indomie Rau Củ + Thịt Viên', '', 1, 1, 25200, 1, 1, 'https://images.foody.vn/res/g101/1003994/s120x120/b9882ee1-c32b-4284-a521-13ad38df-c973c106-220828074827.jpeg'),
('Mì Trộn Chả Mực Xoắn', '', 1, 1, 25200, 1, 1, 'https://images.foody.vn/res/g101/1003994/s120x120/1ba5e332-6176-4ef6-8d69-e8bb2492-f8163fd3-210927181828.jpeg'),
('Mì trộn hồ lô', '', 1, 1, 25200, 1, 1, 'https://images.foody.vn/res/g101/1003994/s120x120/b1132a37-e0b6-49d8-9c71-03a8459a-fec43358-210927181936.jpeg'),
('Mì trộn sủi cảo', '', 1, 1, 25200, 1, 1, 'https://images.foody.vn/default/s120x120/shopeefood-deli-dish-no-image.png'),
('Xiên Hải sản nhân mayo(4 viên)', '', 3, 1, 11700, 1, 1, 'https://images.foody.vn/res/g101/1003994/s120x120/1ad289ed-04a1-4f56-b42c-295b4813-29852199-201126235052.jpeg'),
('Xúc xích rán', '', 3, 1, 9900, 1, 1, 'https://images.foody.vn/res/g101/1003994/s120x120/d28a8c50-0453-4652-984d-e0594944-0302e477-201103144000.jpeg'),
('Bánh gà(3 cái)', '', 3, 1, 18000, 1, 1, 'https://images.foody.vn/res/g101/1003994/s120x120/2aa79bf5-5e1f-4f43-9e42-e03e5bd3-6e12fea1-210513091459.jpeg'),
('Bánh Mì Thập Cẩm', '', 2, 1, 23000, 0, 10, 'https://images.foody.vn/res/g2/19069/s120x120/4f240cec-f8af-48c0-8186-a17eaf600173.jpg'),
('Bánh Mì Pate', '', 2, 1, 15000, 0, 10, 'https://images.foody.vn/res/g2/19069/s120x120/a7fd5429-505f-4245-ac90-ab34d94fc57c.jpg'),
('Bánh Mì Thịt Xiên Nướng', '', 2, 1, 20000, 0, 10, 'https://images.foody.vn/res/g2/19069/s120x120/140f1101-8817-4521-9c56-8f9f41fa840a.jpg'),
('Bánh Mì Trứng Ốp', '', 2, 1, 20000, 0, 10, 'https://images.foody.vn/res/g2/19069/s120x120/41378517-de5b-4173-a044-61fba84303af.jpg'),
('Bánh Mì Thịt Xá Xíu', '', 2, 1, 20000, 0, 10, 'https://images.foody.vn/res/g2/19069/s120x120/63afc728-4f08-4bdc-8dd1-2fa8c1c5a454.jpg'),
('Bánh Mỳ Sốt Vang', '', 2, 1, 45000, 0, 10, 'https://images.foody.vn/res/g2/19069/s120x120/d670406f-7e3f-4c90-ae05-aef405fd-e4967597-201020030946.jpeg'),
('Bánh Mì Xúc Xích', '', 2, 1, 20000, 0, 10, 'https://images.foody.vn/res/g2/19069/s120x120/1adaad7d-7604-48f7-91a8-5c69bba727a5.jpg'),
('Bánh Mì Ruốc', '', 2, 1, 12000, 0, 10, 'https://images.foody.vn/res/g2/19069/s120x120/47866516-13ce-4160-99d4-8f3f55d250e3.jpg'),
('Bánh Mì Chả', '', 2, 1, 23000, 0, 10, 'https://images.foody.vn/res/g2/19069/s120x120/b6ad10f1-25d7-4d5c-9e47-a721b27992c4.jpg'),
('Bánh Mì Thịt Kho', '', 2, 1, 23000, 0, 10, 'https://images.foody.vn/res/g2/19069/s120x120/9d1e70e3-2377-4547-98f6-d2cedc19033e.jpg'),
('Bánh Mì Gà Xào Nấm', '', 2, 1, 23000, 0, 10, 'https://images.foody.vn/res/g2/19069/s120x120/a4826a69-bd51-4b4c-9e8c-7a9b04be955e.jpg'),
('Bánh Mỳ Xíu Mại', '', 2, 1, 23000, 0, 10, 'https://images.foody.vn/res/g2/19069/s120x120/95d9170f-92a5-4585-89ac-dea1a43a-6d071ee5-211006201326.jpeg'),
('Bánh Mì Giò Lụa', '', 2, 1, 23000, 0, 10, 'https://images.foody.vn/res/g2/19069/s120x120/c889609b-1b67-4c48-8618-e1a8db79a044.jpg'),
('Bánh Mì Lạp Xưởng', '', 2, 1, 18000, 0, 10, 'https://images.foody.vn/res/g2/19069/s120x120/93a496ea-ee89-44fe-8915-8629215227fa.jpg'),
('Bánh Mỳ Nem Lụi', '', 2, 1, 23000, 0, 10, 'https://images.foody.vn/res/g2/19069/s120x120/5e30e971-caff-4ff2-b078-d0554e86-65b97c2e-210512141626.jpeg'),
('Bánh Mì Trứng Kho', '', 2, 1, 20000, 0, 10, 'https://images.foody.vn/res/g2/19069/s120x120/2ff7e0ef-7e80-4ea8-b5a5-a55fb47ca005.jpg');

INSERT INTO `users` (`email`, `password`, `name`, `telephone`, `role`) VALUES 
('admin@gmail.com', '$2b$10$iDOGulq.CY.YtBD96mA7lO0pPZHZ14i054D0E7AluwYXP1kkvJ0Ya', 'admin', '0987654321', 1), -- password = 123456
('vinh@gmail.com', '$2b$10$iDOGulq.CY.YtBD96mA7lO0pPZHZ14i054D0E7AluwYXP1kkvJ0Ya', 'Vinh', '0123456789', 0);
