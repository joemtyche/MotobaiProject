-- Safe local seed data for Motobai.
-- Run this after `python manage.py migrate`.
-- This intentionally skips django_migrations, django_content_type, and auth_permission.

START TRANSACTION;

INSERT IGNORE INTO `api_account`
  (`id`, `account`, `representative_name`, `representative_position`, `city`, `barangay`, `street`, `phone_number`, `email`, `date_created`, `is_deleted`)
VALUES
  (1, 'Motorjoy Depot Inc.', 'Mark Anthony', 'CEO', 'Davao City', 'Catalunan Pequeno', ' TPI Bldg, Quimpo Blvd PH', '09564931912', 'motor@gmail.com', '2024-12-03 11:23:41.699263', 0),
  (2, 'Rusi', 'Gabriel', 'Employee', 'Davao City', 'Quimpo Blvd 8000 PH', 'Door No: 1, Sato Building', '09566023417', 'rusi@official.com', '2024-12-03 11:24:40.804642', 0),
  (3, 'Effanix Motorparts', 'Camille', 'CEO', 'Davao City', 'Datu Abing', 'St 8000', '09567922991', 'tyche@gmail.com', '2024-12-03 11:25:33.623516', 0),
  (4, 'DHCI Cyclehaus', 'Juan Santos', 'Manager', 'Davao City', '134 Quezon Blvd ', '8000 PH', '09822271150', 'Santos@gmail.com', '2024-12-03 11:26:36.095735', 0),
  (5, 'Eversure', 'Christine Rivera', 'Owner', 'Davao City', 'Diversion Road', 'Block 8, Lot 27, Old San Isidro', '09822995969', 'eversosure@gmail.com', '2024-12-03 11:27:40.784390', 0),
  (6, 'GearHub Davao Trading', 'Alma Reyes', 'Owner', 'Davao City', 'Matina', 'Door 4, Mabini Compound', '09171234501', 'gearhubdavao@example.com', '2026-07-01 08:15:00.000000', 0),
  (7, 'Davao MotoWorks Supply', 'Bryan Lim', 'Purchasing Manager', 'Davao City', 'Buhangin', 'Km. 6 Diversion Road', '09171234502', 'motoworks@example.com', '2026-07-01 08:20:00.000000', 0),
  (8, 'RideReady Service Center', 'Liza Mondejar', 'Operations Head', 'Davao City', 'Toril', 'National Highway Corner Bato Road', '09171234503', 'rideready@example.com', '2026-07-01 08:25:00.000000', 0),
  (9, 'Apex Cycle Parts Co.', 'Ernesto Cruz', 'Branch Manager', 'Davao City', 'Agdao', 'Warehouse 2, Lapu-Lapu Street', '09171234504', 'apexcycle@example.com', '2026-07-01 08:30:00.000000', 0),
  (10, 'Northline Scooter Garage', 'Mika Santos', 'Owner', 'Davao City', 'Cabantian', 'Blk 11 Lot 6 North Crest', '09171234505', 'northline@example.com', '2026-07-01 08:35:00.000000', 0);

INSERT IGNORE INTO `api_customer`
  (`id`, `customer_name`, `phone_number`, `date_created`, `is_deleted`)
VALUES
  (1, 'Jonel Garcia', '09172230001', '2026-07-03 09:10:00.000000', 0),
  (2, 'Mae Concepcion', '09172230002', '2026-07-04 10:20:00.000000', 0),
  (3, 'Rafael Ocampo', '09172230003', '2026-07-05 11:30:00.000000', 0),
  (4, 'Clara Bautista', '09172230004', '2026-07-06 13:15:00.000000', 0),
  (5, 'Nico Villanueva', '09172230005', '2026-07-07 14:05:00.000000', 0),
  (6, 'Patricia Ramos', '09172230006', '2026-07-08 15:25:00.000000', 0),
  (7, 'Marco Soriano', '09172230007', '2026-07-09 16:40:00.000000', 0),
  (8, 'Erika Dela Cruz', '09172230008', '2026-07-10 09:45:00.000000', 0),
  (9, 'Sam Navarro', '09172230009', '2026-07-11 10:55:00.000000', 0),
  (10, 'Bianca Flores', '09172230010', '2026-07-12 12:10:00.000000', 0);

INSERT IGNORE INTO `api_employee`
  (`id`, `city`, `barangay`, `street`, `phone_number`, `email`, `date_created`, `first_name`, `last_name`, `middle_name`, `is_deleted`)
VALUES
  (1, 'Davao City', 'Catalunan Pequeno', 'Block 8, Lot 27, Old San Isidro', '09566921912', 'joem@gmail.com', '2024-12-03 11:28:17.519558', 'Jose Emmanuel', 'Idpan', 'R.', 0),
  (2, 'Davao City', 'Ecoland', 'SM Megamall', '09865921911', 'thaddy@gmail.com', '2024-12-03 11:29:02.697559', 'Thaddeus', 'Domingo', 'C.', 0),
  (3, 'Davao City', 'Camella', 'Homes', '09866321911', 'ram@gmail.com', '2024-12-03 11:29:35.744666', 'Ram Christian', 'Nacar', 'N.', 0),
  (4, 'Davao City', 'Lanang', 'Palm Drive', '09173340001', 'mikael.dizon@example.com', '2026-07-01 09:00:00.000000', 'Mikael', 'Dizon', 'A.', 0),
  (5, 'Davao City', 'Matina', 'Gem Village', '09173340002', 'andrea.velasco@example.com', '2026-07-01 09:05:00.000000', 'Andrea', 'Velasco', 'P.', 0);

INSERT IGNORE INTO `api_product`
  (`id`, `product_name`, `price`, `brand`, `description`, `product_type`, `vehicle_type`, `sku`)
VALUES
  (1, 'TSMP WF Pulley', 550.00, 'TSMP', 'Nmax and Aerox models', 'Parts', 'Scooter', 'SCOOTER -001'),
  (2, 'TSMP Clutch Bell', 350.00, 'TSMP', 'Clutch Bell', 'Parts', 'Scooter', 'SCOOTER -002'),
  (3, 'TSMP Clutch Lining Assy', 550.00, 'TSMP', 'Nmax and Aerox', 'Parts', 'Scooter', 'SCOOTER -003'),
  (4, 'PRO HONDA ENGINE OIL 10W-30 SL', 315.00, 'PRO HONDA', '10W-30 SL API SERVICE JASO MB FULLY SYNTHETIC', 'Oils & Fluids', 'Motorcycle', 'MOTORCYCLE -001'),
  (5, 'MOTUL SCOOTER POWER LE 5w40', 550.00, 'MOTUL', '1Liter ( FULLY SYNTHETIC )', 'Oils & Fluids', 'Scooter', 'SCOOTER -004'),
  (6, 'OXFORD OX666 CARGO NET 17" X 17"', 490.00, 'OXFORD', 'CARGO NET 17" X 17"', 'Parts', 'Motorcycle', 'MOTORCYCLE -002'),
  (7, 'GIVI Z191 COMPRESSION SPRING', 50.00, 'GIVI', 'COMPRESSION SPRING', 'Parts', 'Motorcycle', 'MOTORCYCLE -003'),
  (8, 'Shell Advance AX7 10W-40', 420.00, 'SHELL', 'Synthetic technology motorcycle oil', 'Oils & Fluids', 'Motorcycle', 'MOTORCYCLE -004'),
  (9, 'Yamalube Gear Oil 10W-40', 220.00, 'YAMALUBE', 'Gear oil for scooters and motorcycles', 'Oils & Fluids', 'Scooter', 'SCOOTER -005'),
  (10, 'NGK Iridium Spark Plug CR8EIX', 480.00, 'NGK', 'Iridium spark plug for daily service', 'Parts', 'Motorcycle', 'MOTORCYCLE -005');

INSERT IGNORE INTO `api_inventory`
  (`id`, `stock`, `stock_minimum_threshold`, `date_added`, `date_updated`, `product_id`, `is_deleted`)
VALUES
  (1, 320, 50, '2024-12-03 11:32:48.502578', '2026-07-24 18:00:00.000000', 1, 0),
  (2, 185, 75, '2024-12-03 11:33:36.159245', '2026-07-24 18:00:00.000000', 2, 0),
  (3, 95, 100, '2024-12-03 11:34:24.814410', '2026-07-24 18:00:00.000000', 3, 0),
  (4, 500, 50, '2024-12-03 11:36:21.945341', '2026-07-24 18:00:00.000000', 4, 0),
  (5, 260, 135, '2024-12-03 11:38:26.814303', '2026-07-24 18:00:00.000000', 5, 0),
  (6, 40, 35, '2024-12-03 11:39:36.085666', '2026-07-24 18:00:00.000000', 6, 0),
  (7, 0, 250, '2024-12-03 11:40:24.703715', '2026-07-24 18:00:00.000000', 7, 0),
  (8, 410, 80, '2026-07-01 09:20:00.000000', '2026-07-24 18:00:00.000000', 8, 0),
  (9, 150, 60, '2026-07-01 09:25:00.000000', '2026-07-24 18:00:00.000000', 9, 0),
  (10, 70, 40, '2026-07-01 09:30:00.000000', '2026-07-24 18:00:00.000000', 10, 0);

INSERT IGNORE INTO `api_supplier`
  (`id`, `supplier_name`, `phone_number`, `description`, `is_deleted`)
VALUES
  (1, 'Supplier 1', '09570311911', 'Secret Supplier', 0),
  (2, 'Davao Lubricants Wholesale', '09174450001', 'Bulk oils and maintenance parts supplier', 0);

INSERT IGNORE INTO `api_inboundstock`
  (`id`, `supplier_id`, `employee_id`, `reference_number`, `date_created`)
VALUES
  (1, 2, 4, 'SIN-2026-001', '2026-07-01 09:15:00.000000'),
  (2, 1, 5, 'SIN-2026-002', '2026-07-08 10:30:00.000000'),
  (3, 2, 1, 'SIN-2026-003', '2026-07-18 14:45:00.000000');

INSERT IGNORE INTO `api_inboundstockitem`
  (`id`, `inventory_id`, `quantity`, `inbound_stock_id`)
VALUES
  (1, 4, 200, 1),
  (2, 8, 160, 1),
  (3, 1, 120, 2),
  (4, 10, 80, 2),
  (5, 5, 100, 3),
  (6, 9, 60, 3);

INSERT IGNORE INTO `api_outboundstock`
  (`id`, `employee_id`, `reason`, `date_created`)
VALUES
  (1, 5, 'Damaged packaging', '2026-07-05 16:20:00.000000'),
  (2, 4, 'Display samples', '2026-07-13 11:10:00.000000'),
  (3, 2, 'Internal shop use', '2026-07-22 15:35:00.000000');

INSERT IGNORE INTO `api_outboundstockitem`
  (`id`, `inventory_id`, `quantity`, `outbound_stock_id`)
VALUES
  (1, 7, 12, 1),
  (2, 6, 6, 1),
  (3, 10, 4, 2),
  (4, 2, 8, 2),
  (5, 4, 10, 3),
  (6, 8, 5, 3);

INSERT IGNORE INTO `api_order`
  (`id`, `account_id`, `employee_id`, `order_type`, `order_date`, `reference_number`, `account_name`, `representative_name`, `city`, `barangay`, `street`, `phone_number`, `deductions`, `customer_name`, `employee_first_name`, `employee_middle_name`, `employee_last_name`)
VALUES
  (1, 6, 4, 'Delivery', '2026-07-03 09:00:00.000000', 'SO-2026-0001', 'GearHub Davao Trading', 'Alma Reyes', 'Davao City', 'Matina', 'Door 4, Mabini Compound', '09171234501', 300.00, NULL, 'Mikael', 'A.', 'Dizon'),
  (2, 7, 5, 'Delivery', '2026-07-04 10:00:00.000000', 'SO-2026-0002', 'Davao MotoWorks Supply', 'Bryan Lim', 'Davao City', 'Buhangin', 'Km. 6 Diversion Road', '09171234502', 0.00, NULL, 'Andrea', 'P.', 'Velasco'),
  (3, 8, 1, 'Delivery', '2026-07-05 11:00:00.000000', 'SO-2026-0003', 'RideReady Service Center', 'Liza Mondejar', 'Davao City', 'Toril', 'National Highway Corner Bato Road', '09171234503', 160.00, NULL, 'Jose Emmanuel', 'R.', 'Idpan'),
  (4, 9, 2, 'Delivery', '2026-07-06 13:00:00.000000', 'SO-2026-0004', 'Apex Cycle Parts Co.', 'Ernesto Cruz', 'Davao City', 'Agdao', 'Warehouse 2, Lapu-Lapu Street', '09171234504', 340.00, NULL, 'Thaddeus', 'C.', 'Domingo'),
  (5, 10, 3, 'Delivery', '2026-07-07 14:00:00.000000', 'SO-2026-0005', 'Northline Scooter Garage', 'Mika Santos', 'Davao City', 'Cabantian', 'Blk 11 Lot 6 North Crest', '09171234505', 550.00, NULL, 'Ram Christian', 'N.', 'Nacar'),
  (6, 6, 5, 'Delivery', '2026-07-08 09:30:00.000000', 'SO-2026-0006', 'GearHub Davao Trading', 'Alma Reyes', 'Davao City', 'Matina', 'Door 4, Mabini Compound', '09171234501', 0.00, NULL, 'Andrea', 'P.', 'Velasco'),
  (7, 7, 4, 'Delivery', '2026-07-09 10:30:00.000000', 'SO-2026-0007', 'Davao MotoWorks Supply', 'Bryan Lim', 'Davao City', 'Buhangin', 'Km. 6 Diversion Road', '09171234502', 180.00, NULL, 'Mikael', 'A.', 'Dizon'),
  (8, 8, 2, 'Delivery', '2026-07-10 11:30:00.000000', 'SO-2026-0008', 'RideReady Service Center', 'Liza Mondejar', 'Davao City', 'Toril', 'National Highway Corner Bato Road', '09171234503', 80.00, NULL, 'Thaddeus', 'C.', 'Domingo'),
  (9, 9, 1, 'Delivery', '2026-07-11 13:30:00.000000', 'SO-2026-0009', 'Apex Cycle Parts Co.', 'Ernesto Cruz', 'Davao City', 'Agdao', 'Warehouse 2, Lapu-Lapu Street', '09171234504', 70.00, NULL, 'Jose Emmanuel', 'R.', 'Idpan'),
  (10, 10, 3, 'Delivery', '2026-07-12 14:30:00.000000', 'SO-2026-0010', 'Northline Scooter Garage', 'Mika Santos', 'Davao City', 'Cabantian', 'Blk 11 Lot 6 North Crest', '09171234505', 400.00, NULL, 'Ram Christian', 'N.', 'Nacar'),
  (11, NULL, 4, 'Walkin', '2026-07-13 09:00:00.000000', 'SO-2026-0011', NULL, NULL, NULL, NULL, NULL, '09172230001', 0.00, 'Jonel Garcia', 'Mikael', 'A.', 'Dizon'),
  (12, NULL, 5, 'Walkin', '2026-07-13 10:00:00.000000', 'SO-2026-0012', NULL, NULL, NULL, NULL, NULL, '09172230002', 30.00, 'Mae Concepcion', 'Andrea', 'P.', 'Velasco'),
  (13, NULL, 1, 'Walkin', '2026-07-14 11:00:00.000000', 'SO-2026-0013', NULL, NULL, NULL, NULL, NULL, '09172230003', 0.00, 'Rafael Ocampo', 'Jose Emmanuel', 'R.', 'Idpan'),
  (14, NULL, 2, 'Walkin', '2026-07-14 13:00:00.000000', 'SO-2026-0014', NULL, NULL, NULL, NULL, NULL, '09172230004', 120.00, 'Clara Bautista', 'Thaddeus', 'C.', 'Domingo'),
  (15, NULL, 3, 'Walkin', '2026-07-15 14:00:00.000000', 'SO-2026-0015', NULL, NULL, NULL, NULL, NULL, '09172230005', 0.00, 'Nico Villanueva', 'Ram Christian', 'N.', 'Nacar'),
  (16, NULL, 4, 'Walkin', '2026-07-15 15:00:00.000000', 'SO-2026-0016', NULL, NULL, NULL, NULL, NULL, '09172230006', 65.00, 'Patricia Ramos', 'Mikael', 'A.', 'Dizon'),
  (17, NULL, 5, 'Walkin', '2026-07-16 09:30:00.000000', 'SO-2026-0017', NULL, NULL, NULL, NULL, NULL, '09172230007', 180.00, 'Marco Soriano', 'Andrea', 'P.', 'Velasco'),
  (18, NULL, 1, 'Walkin', '2026-07-16 10:30:00.000000', 'SO-2026-0018', NULL, NULL, NULL, NULL, NULL, '09172230008', 20.00, 'Erika Dela Cruz', 'Jose Emmanuel', 'R.', 'Idpan'),
  (19, NULL, 2, 'Walkin', '2026-07-17 11:30:00.000000', 'SO-2026-0019', NULL, NULL, NULL, NULL, NULL, '09172230009', 0.00, 'Sam Navarro', 'Thaddeus', 'C.', 'Domingo'),
  (20, NULL, 3, 'Walkin', '2026-07-17 13:30:00.000000', 'SO-2026-0020', NULL, NULL, NULL, NULL, NULL, '09172230010', 190.00, 'Bianca Flores', 'Ram Christian', 'N.', 'Nacar');

INSERT IGNORE INTO `api_orderdetails`
  (`id`, `order_id`, `inventory_id`, `quantity`, `sku_hold`, `product_price`, `product_name`)
VALUES
  (1, 1, 4, 12, 'MOTORCYCLE -001', 315.00, 'PRO HONDA ENGINE OIL 10W-30 SL'),
  (2, 1, 8, 6, 'MOTORCYCLE -004', 420.00, 'Shell Advance AX7 10W-40'),
  (3, 2, 1, 5, 'SCOOTER -001', 550.00, 'TSMP WF Pulley'),
  (4, 2, 2, 10, 'SCOOTER -002', 350.00, 'TSMP Clutch Bell'),
  (5, 3, 5, 4, 'SCOOTER -004', 550.00, 'MOTUL SCOOTER POWER LE 5w40'),
  (6, 3, 9, 8, 'SCOOTER -005', 220.00, 'Yamalube Gear Oil 10W-40'),
  (7, 4, 8, 7, 'MOTORCYCLE -004', 420.00, 'Shell Advance AX7 10W-40'),
  (8, 4, 10, 5, 'MOTORCYCLE -005', 480.00, 'NGK Iridium Spark Plug CR8EIX'),
  (9, 5, 4, 20, 'MOTORCYCLE -001', 315.00, 'PRO HONDA ENGINE OIL 10W-30 SL'),
  (10, 5, 5, 5, 'SCOOTER -004', 550.00, 'MOTUL SCOOTER POWER LE 5w40'),
  (11, 6, 3, 3, 'SCOOTER -003', 550.00, 'TSMP Clutch Lining Assy'),
  (12, 6, 7, 10, 'MOTORCYCLE -003', 50.00, 'GIVI Z191 COMPRESSION SPRING'),
  (13, 7, 1, 4, 'SCOOTER -001', 550.00, 'TSMP WF Pulley'),
  (14, 7, 6, 2, 'MOTORCYCLE -002', 490.00, 'OXFORD OX666 CARGO NET 17" X 17"'),
  (15, 8, 9, 12, 'SCOOTER -005', 220.00, 'Yamalube Gear Oil 10W-40'),
  (16, 8, 10, 3, 'MOTORCYCLE -005', 480.00, 'NGK Iridium Spark Plug CR8EIX'),
  (17, 9, 2, 7, 'SCOOTER -002', 350.00, 'TSMP Clutch Bell'),
  (18, 9, 4, 8, 'MOTORCYCLE -001', 315.00, 'PRO HONDA ENGINE OIL 10W-30 SL'),
  (19, 9, 8, 5, 'MOTORCYCLE -004', 420.00, 'Shell Advance AX7 10W-40'),
  (20, 10, 5, 6, 'SCOOTER -004', 550.00, 'MOTUL SCOOTER POWER LE 5w40'),
  (21, 10, 1, 2, 'SCOOTER -001', 550.00, 'TSMP WF Pulley'),
  (22, 11, 4, 2, 'MOTORCYCLE -001', 315.00, 'PRO HONDA ENGINE OIL 10W-30 SL'),
  (23, 11, 7, 1, 'MOTORCYCLE -003', 50.00, 'GIVI Z191 COMPRESSION SPRING'),
  (24, 12, 1, 1, 'SCOOTER -001', 550.00, 'TSMP WF Pulley'),
  (25, 12, 10, 1, 'MOTORCYCLE -005', 480.00, 'NGK Iridium Spark Plug CR8EIX'),
  (26, 13, 5, 1, 'SCOOTER -004', 550.00, 'MOTUL SCOOTER POWER LE 5w40'),
  (27, 13, 9, 2, 'SCOOTER -005', 220.00, 'Yamalube Gear Oil 10W-40'),
  (28, 14, 8, 1, 'MOTORCYCLE -004', 420.00, 'Shell Advance AX7 10W-40'),
  (29, 14, 2, 2, 'SCOOTER -002', 350.00, 'TSMP Clutch Bell'),
  (30, 15, 6, 1, 'MOTORCYCLE -002', 490.00, 'OXFORD OX666 CARGO NET 17" X 17"'),
  (31, 15, 7, 4, 'MOTORCYCLE -003', 50.00, 'GIVI Z191 COMPRESSION SPRING'),
  (32, 16, 3, 1, 'SCOOTER -003', 550.00, 'TSMP Clutch Lining Assy'),
  (33, 16, 4, 1, 'MOTORCYCLE -001', 315.00, 'PRO HONDA ENGINE OIL 10W-30 SL'),
  (34, 17, 10, 2, 'MOTORCYCLE -005', 480.00, 'NGK Iridium Spark Plug CR8EIX'),
  (35, 17, 9, 1, 'SCOOTER -005', 220.00, 'Yamalube Gear Oil 10W-40'),
  (36, 18, 5, 2, 'SCOOTER -004', 550.00, 'MOTUL SCOOTER POWER LE 5w40'),
  (37, 18, 8, 1, 'MOTORCYCLE -004', 420.00, 'Shell Advance AX7 10W-40'),
  (38, 19, 2, 1, 'SCOOTER -002', 350.00, 'TSMP Clutch Bell'),
  (39, 19, 7, 2, 'MOTORCYCLE -003', 50.00, 'GIVI Z191 COMPRESSION SPRING'),
  (40, 20, 1, 2, 'SCOOTER -001', 550.00, 'TSMP WF Pulley'),
  (41, 20, 4, 2, 'MOTORCYCLE -001', 315.00, 'PRO HONDA ENGINE OIL 10W-30 SL'),
  (42, 20, 9, 3, 'SCOOTER -005', 220.00, 'Yamalube Gear Oil 10W-40');

INSERT IGNORE INTO `api_ordertracking`
  (`id`, `order_id`, `status`, `reference_number`, `date_created`, `date_validated`, `date_shipped`, `date_received`, `date_completed`, `date_cancelled`, `last_updated`)
VALUES
  (1, 1, 'unvalidated', NULL, '2026-07-03 09:00:00.000000', NULL, NULL, NULL, NULL, NULL, '2026-07-03 09:00:00.000000'),
  (2, 2, 'validated', NULL, '2026-07-04 10:00:00.000000', '2026-07-04 10:45:00.000000', NULL, NULL, NULL, NULL, '2026-07-04 10:45:00.000000'),
  (3, 3, 'shipped', NULL, '2026-07-05 11:00:00.000000', '2026-07-05 11:30:00.000000', '2026-07-05 15:00:00.000000', NULL, NULL, NULL, '2026-07-05 15:00:00.000000'),
  (4, 4, 'received', NULL, '2026-07-06 13:00:00.000000', '2026-07-06 13:30:00.000000', '2026-07-06 17:00:00.000000', '2026-07-07 09:30:00.000000', NULL, NULL, '2026-07-07 09:30:00.000000'),
  (5, 5, 'completed', 'BILL-2026-0005', '2026-07-07 14:00:00.000000', '2026-07-07 14:20:00.000000', '2026-07-07 17:00:00.000000', '2026-07-08 10:00:00.000000', '2026-07-08 11:15:00.000000', NULL, '2026-07-08 11:15:00.000000'),
  (6, 6, 'cancelled', NULL, '2026-07-08 09:30:00.000000', NULL, NULL, NULL, NULL, '2026-07-08 10:00:00.000000', '2026-07-08 10:00:00.000000'),
  (7, 7, 'returned', NULL, '2026-07-09 10:30:00.000000', '2026-07-09 11:00:00.000000', '2026-07-09 16:15:00.000000', '2026-07-10 09:45:00.000000', NULL, NULL, '2026-07-10 11:00:00.000000'),
  (8, 8, 'unvalidated', NULL, '2026-07-10 11:30:00.000000', NULL, NULL, NULL, NULL, NULL, '2026-07-10 11:30:00.000000'),
  (9, 9, 'completed', 'BILL-2026-0009', '2026-07-11 13:30:00.000000', '2026-07-11 14:00:00.000000', '2026-07-11 17:30:00.000000', '2026-07-12 10:15:00.000000', '2026-07-12 14:00:00.000000', NULL, '2026-07-12 14:00:00.000000'),
  (10, 10, 'validated', NULL, '2026-07-12 14:30:00.000000', '2026-07-12 15:00:00.000000', NULL, NULL, NULL, NULL, '2026-07-12 15:00:00.000000'),
  (11, 11, 'completed', 'WALKPAY-2026-0011', '2026-07-13 09:00:00.000000', NULL, NULL, NULL, '2026-07-13 09:20:00.000000', NULL, '2026-07-13 09:20:00.000000'),
  (12, 12, 'unvalidated', NULL, '2026-07-13 10:00:00.000000', NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:00:00.000000'),
  (13, 13, 'cancelled', NULL, '2026-07-14 11:00:00.000000', NULL, NULL, NULL, NULL, '2026-07-14 11:20:00.000000', '2026-07-14 11:20:00.000000'),
  (14, 14, 'completed', 'WALKPAY-2026-0014', '2026-07-14 13:00:00.000000', NULL, NULL, NULL, '2026-07-14 13:15:00.000000', NULL, '2026-07-14 13:15:00.000000'),
  (15, 15, 'completed', 'WALKPAY-2026-0015', '2026-07-15 14:00:00.000000', NULL, NULL, NULL, '2026-07-15 14:25:00.000000', NULL, '2026-07-15 14:25:00.000000'),
  (16, 16, 'unvalidated', NULL, '2026-07-15 15:00:00.000000', NULL, NULL, NULL, NULL, NULL, '2026-07-15 15:00:00.000000'),
  (17, 17, 'cancelled', NULL, '2026-07-16 09:30:00.000000', NULL, NULL, NULL, NULL, '2026-07-16 09:45:00.000000', '2026-07-16 09:45:00.000000'),
  (18, 18, 'completed', 'WALKPAY-2026-0018', '2026-07-16 10:30:00.000000', NULL, NULL, NULL, '2026-07-16 10:55:00.000000', NULL, '2026-07-16 10:55:00.000000'),
  (19, 19, 'unvalidated', NULL, '2026-07-17 11:30:00.000000', NULL, NULL, NULL, NULL, NULL, '2026-07-17 11:30:00.000000'),
  (20, 20, 'completed', 'WALKPAY-2026-0020', '2026-07-17 13:30:00.000000', NULL, NULL, NULL, '2026-07-17 13:50:00.000000', NULL, '2026-07-17 13:50:00.000000');

INSERT IGNORE INTO `api_payment`
  (`id`, `order_id`, `total_balance`, `initial_balance`, `deductions`)
VALUES
  (1, 1, 6000.00, 6300.00, 300.00),
  (2, 2, 6250.00, 6250.00, 0.00),
  (3, 3, 3800.00, 3960.00, 160.00),
  (4, 4, 5000.00, 5340.00, 340.00),
  (5, 5, 8500.00, 9050.00, 550.00),
  (6, 6, 2150.00, 2150.00, 0.00),
  (7, 7, 3000.00, 3180.00, 180.00),
  (8, 8, 4000.00, 4080.00, 80.00),
  (9, 9, 7000.00, 7070.00, 70.00),
  (10, 10, 4000.00, 4400.00, 400.00),
  (11, 11, 680.00, 680.00, 0.00),
  (12, 12, 1000.00, 1030.00, 30.00),
  (13, 13, 990.00, 990.00, 0.00),
  (14, 14, 1000.00, 1120.00, 120.00),
  (15, 15, 690.00, 690.00, 0.00),
  (16, 16, 800.00, 865.00, 65.00),
  (17, 17, 1000.00, 1180.00, 180.00),
  (18, 18, 1500.00, 1520.00, 20.00),
  (19, 19, 450.00, 450.00, 0.00),
  (20, 20, 2200.00, 2390.00, 190.00);

-- Store final inventory quantities directly so re-importing this seed refreshes
-- stock counts without replaying application-side signals.
UPDATE `api_inventory`
SET
  `stock` = CASE `id`
    WHEN 1 THEN 320
    WHEN 2 THEN 185
    WHEN 3 THEN 95
    WHEN 4 THEN 500
    WHEN 5 THEN 260
    WHEN 6 THEN 40
    WHEN 7 THEN 0
    WHEN 8 THEN 410
    WHEN 9 THEN 150
    WHEN 10 THEN 70
    ELSE `stock`
  END,
  `date_updated` = CASE
    WHEN `id` IN (1,2,3,4,5,6,7,8,9,10) THEN '2026-07-24 18:00:00.000000'
    ELSE `date_updated`
  END
WHERE `id` IN (1,2,3,4,5,6,7,8,9,10);

INSERT IGNORE INTO `auth_user`
  (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`)
VALUES
  (1, 'pbkdf2_sha256$720000$yY3CgY181NJgSobg9QBIoC$RCiYZ0NzsBrPokt+7r5KUw+XTmK4jclNMGDU6+dw/4s=', NULL, 0, '123', '', '', '', 0, 1, '2024-12-03 11:17:31.345176');

COMMIT;
