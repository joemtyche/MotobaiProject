-- Resettable local seed data for Motobai.
-- Run this after `python manage.py migrate`.
-- This refreshes app tables so old demo/test records are removed.
-- Sales references follow the app format: DO/WO + 3000 + YY + sequence.
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `api_payment`;
TRUNCATE TABLE `api_ordertracking`;
TRUNCATE TABLE `api_orderdetails`;
TRUNCATE TABLE `api_order`;
TRUNCATE TABLE `api_outboundstockitem`;
TRUNCATE TABLE `api_outboundstock`;
TRUNCATE TABLE `api_inboundstockitem`;
TRUNCATE TABLE `api_inboundstock`;
TRUNCATE TABLE `api_inventory`;
TRUNCATE TABLE `api_product`;
TRUNCATE TABLE `api_supplier`;
TRUNCATE TABLE `api_customer`;
TRUNCATE TABLE `api_employee`;
TRUNCATE TABLE `api_account`;
SET FOREIGN_KEY_CHECKS = 1;

START TRANSACTION;

INSERT INTO `api_account`
  (`id`, `account`, `representative_name`, `representative_position`, `city`, `barangay`, `street`, `phone_number`, `email`, `date_created`, `is_deleted`)
VALUES
  (1, 'Metro Davao Motorcycle Center', 'Leonardo Cruz', 'General Manager', 'Davao City', 'Poblacion', 'Rizal Street Corner Bolton Extension', '09171241001', 'purchasing@metrodavaomoto.example', '2026-06-19 10:15:00.000000', 0),
  (2, 'Bajada Scooter Service Hub', 'Maribel Tan', 'Procurement Lead', 'Davao City', 'Bajada', 'Door 3, JP Laurel Avenue', '09171241002', 'orders@bajadascooter.example', '2026-06-03 14:20:00.000000', 0),
  (3, 'Toril Riders Parts Supply', 'Hector Alvarez', 'Owner', 'Davao City', 'Toril', 'National Highway, Crossing Bayabas', '09171241003', 'torilriders@example.com', '2026-06-25 09:05:00.000000', 0),
  (4, 'Buhangin MotoCare Trading', 'Sofia Mercado', 'Operations Head', 'Davao City', 'Buhangin', 'Km 6 Diversion Road', '09171241004', 'procurement@buhanginmotocare.example', '2026-06-11 16:40:00.000000', 0),
  (5, 'Matina Express Cyclehaus', 'Nestor Villanueva', 'Branch Manager', 'Davao City', 'Matina', 'MacArthur Highway Frontage Road', '09171241005', 'matinaexpress@example.com', '2026-06-28 11:30:00.000000', 0),
  (6, 'Agdao Fleet Maintenance', 'Irene Santos', 'Fleet Supervisor', 'Davao City', 'Agdao', 'Warehouse 4, Lapu-Lapu Street', '09171241006', 'fleet@agdaomaintenance.example', '2026-06-05 08:55:00.000000', 0),
  (7, 'Lanang AutoMoto Supply', 'Victor Lim', 'Purchasing Manager', 'Davao City', 'Lanang', 'Palm Drive Commercial Strip', '09171241007', 'lanangautomoto@example.com', '2026-06-17 13:10:00.000000', 0),
  (8, 'Mintal Workshop Cooperative', 'Grace Molina', 'Treasurer', 'Davao City', 'Mintal', 'Mintal Public Market Road', '09171241008', 'orders@mintalworkshop.example', '2026-06-02 17:25:00.000000', 0),
  (9, 'Calinan Riders Depot', 'Danilo Reyes', 'Store Manager', 'Davao City', 'Calinan', 'Quezon Street Near Terminal', '09171241009', 'calinanriders@example.com', '2026-06-24 10:45:00.000000', 0),
  (10, 'Panabo MotoPoint Trading', 'Rhea Bautista', 'Owner', 'Panabo City', 'Gredu', 'Mabini Street', '09171241010', 'panabomotopoint@example.com', '2026-06-09 09:35:00.000000', 0),
  (11, 'Tagum Two-Wheel Service', 'Carlo Mendoza', 'Service Director', 'Tagum City', 'Magugpo East', 'Pioneer Avenue', '09171241011', 'tagumtwowheel@example.com', '2026-06-20 15:50:00.000000', 0),
  (12, 'Digos RoadRunner Parts', 'Angelica Flores', 'Purchasing Officer', 'Digos City', 'Zone 3', 'Rizal Avenue', '09171241012', 'digosroadrunner@example.com', '2026-06-13 12:05:00.000000', 0);

INSERT INTO `api_customer`
  (`id`, `customer_name`, `phone_number`, `date_created`, `is_deleted`)
VALUES
  (1, 'Nico Villanueva', '09172230005', '2026-07-04 01:30:00.000000', 0),
  (2, 'Samuel Navarro', '09172230009', '2026-07-06 18:30:00.000000', 0),
  (3, 'Jessa Ladores', '09172230014', '2026-07-07 19:30:00.000000', 0),
  (4, 'Monica Arrieta', '09172230018', '2026-07-10 12:30:00.000000', 0),
  (5, 'Rafael Ocampo', '09172230003', '2026-07-11 13:30:00.000000', 0),
  (6, 'Marco Soriano', '09172230007', '2026-07-14 06:30:00.000000', 0),
  (7, 'Alyssa Montejo', '09172230012', '2026-07-15 07:30:00.000000', 0),
  (8, 'Ivy Manalastas', '09172230016', '2026-07-18 00:30:00.000000', 0),
  (9, 'Jonel Garcia', '09172230001', '2026-07-19 01:30:00.000000', 0),
  (10, 'Patricia Ramos', '09172230006', '2026-07-20 02:30:00.000000', 0),
  (11, 'Bianca Flores', '09172230010', '2026-07-22 19:30:00.000000', 0);

INSERT INTO `api_employee`
  (`id`, `city`, `barangay`, `street`, `phone_number`, `email`, `date_created`, `first_name`, `last_name`, `middle_name`, `is_deleted`)
VALUES
  (1, 'Davao City', 'Catalunan Pequeno', 'Block 8, Lot 27, Old San Isidro', '09566921912', 'jose.idpan@motobai.local', '2026-07-01 09:00:00.000000', 'Jose Emmanuel', 'Idpan', 'R.', 0),
  (2, 'Davao City', 'Camella', 'Homes Drive', '09866321911', 'ram.nacar@motobai.local', '2026-07-01 09:05:00.000000', 'Ram Christian', 'Nacar', 'N.', 0),
  (3, 'Davao City', 'Ecoland', 'Tulip Drive', '09865921911', 'thaddeus.domingo@motobai.local', '2026-07-01 09:10:00.000000', 'Thaddeus', 'Domingo', 'C.', 0),
  (4, 'Davao City', 'Matina', 'Gem Village', '09173340002', 'andrea.velasco@motobai.local', '2026-07-01 09:15:00.000000', 'Andrea', 'Velasco', 'P.', 0),
  (5, 'Davao City', 'Lanang', 'Palm Drive', '09173340001', 'mikael.dizon@motobai.local', '2026-07-01 09:20:00.000000', 'Mikael', 'Dizon', 'A.', 0),
  (6, 'Davao City', 'Buhangin', 'NHA Road', '09173340003', 'pauline.mercado@motobai.local', '2026-07-01 09:25:00.000000', 'Pauline', 'Mercado', 'L.', 0);

INSERT INTO `api_product`
  (`id`, `product_name`, `price`, `brand`, `description`, `product_type`, `vehicle_type`, `sku`)
VALUES
  (1, 'Shell Advance AX7 10W-40', 420.00, 'Shell', 'Synthetic technology motorcycle engine oil', 'Oils & Fluids', 'Motorcycle', 'OIL-MC-SHL-AX7-10W40'),
  (2, 'Shell Advance Ultra 4T 10W-40', 650.00, 'Shell', 'Fully synthetic premium motorcycle oil', 'Oils & Fluids', 'Motorcycle', 'OIL-MC-SHL-ULTRA-10W40'),
  (3, 'Motul Scooter Power LE 5W-40', 550.00, 'Motul', 'Fully synthetic scooter engine oil', 'Oils & Fluids', 'Scooter', 'OIL-SC-MTL-PWRLE-5W40'),
  (4, 'Motul 5100 4T 10W-40', 680.00, 'Motul', 'Ester technology motorcycle lubricant', 'Oils & Fluids', 'Motorcycle', 'OIL-MC-MTL-5100-10W40'),
  (5, 'Yamalube Gear Oil 10W-40', 220.00, 'Yamalube', 'Gear oil for scooters and motorcycles', 'Oils & Fluids', 'Scooter', 'OIL-SC-YML-GEAR-10W40'),
  (6, 'Pro Honda Engine Oil 10W-30 SL', 315.00, 'Pro Honda', 'Daily-use Honda motorcycle engine oil', 'Oils & Fluids', 'Motorcycle', 'OIL-MC-HND-10W30SL'),
  (7, 'NGK Iridium Spark Plug CR8EIX', 480.00, 'NGK', 'Iridium spark plug for regular service', 'Parts', 'Motorcycle', 'PRT-MC-NGK-CR8EIX'),
  (8, 'TSMP WF Pulley Set', 550.00, 'TSMP', 'WF pulley set for NMAX and Aerox', 'Parts', 'Scooter', 'PRT-SC-TSMP-WFPS'),
  (9, 'TSMP Clutch Bell', 350.00, 'TSMP', 'Replacement clutch bell for scooters', 'Parts', 'Scooter', 'PRT-SC-TSMP-CBELL'),
  (10, 'TSMP Clutch Lining Assembly', 550.00, 'TSMP', 'Clutch lining assembly for scooter service', 'Parts', 'Scooter', 'PRT-SC-TSMP-CLUTCH'),
  (11, 'RK-M Takasago Drive Chain 428H', 1250.00, 'RK-M', 'Heavy duty motorcycle drive chain', 'Parts', 'Motorcycle', 'PRT-MC-RKM-428H'),
  (12, 'Bendix Brake Pads Front Set', 720.00, 'Bendix', 'Front brake pad set for city riding', 'Parts', 'Motorcycle', 'PRT-MC-BDX-FPAD'),
  (13, 'GIVI Z191 Compression Spring', 50.00, 'GIVI', 'Replacement spring for top box latch', 'Parts', 'Motorcycle', 'PRT-MC-GIVI-Z191'),
  (14, 'Oxford Cargo Net 17x17', 490.00, 'Oxford', 'Elastic cargo net for motorcycles', 'Accessories', 'Motorcycle', 'ACC-MC-OXF-CNET17'),
  (15, 'DID CVT Belt NMAX/Aerox', 1450.00, 'DID', 'CVT belt replacement for NMAX and Aerox', 'Parts', 'Scooter', 'PRT-SC-DID-CVT-NA');

INSERT INTO `api_inventory`
  (`id`, `stock`, `stock_minimum_threshold`, `date_added`, `date_updated`, `product_id`, `is_deleted`)
VALUES
  (1, 200, 60, '2026-07-01 09:30:00.000000', '2026-07-27 18:00:00.000000', 1, 0),
  (2, 185, 45, '2026-07-01 09:31:00.000000', '2026-07-27 18:00:00.000000', 2, 0),
  (3, 160, 55, '2026-07-01 09:32:00.000000', '2026-07-27 18:00:00.000000', 3, 0),
  (4, 145, 35, '2026-07-01 09:33:00.000000', '2026-07-27 18:00:00.000000', 4, 0),
  (5, 132, 50, '2026-07-01 09:34:00.000000', '2026-07-27 18:00:00.000000', 5, 0),
  (6, 118, 80, '2026-07-01 09:35:00.000000', '2026-07-27 18:00:00.000000', 6, 0),
  (7, 95, 30, '2026-07-01 09:36:00.000000', '2026-07-27 18:00:00.000000', 7, 0),
  (8, 84, 40, '2026-07-01 09:37:00.000000', '2026-07-27 18:00:00.000000', 8, 0),
  (9, 72, 55, '2026-07-01 09:38:00.000000', '2026-07-27 18:00:00.000000', 9, 0),
  (10, 60, 35, '2026-07-01 09:39:00.000000', '2026-07-27 18:00:00.000000', 10, 0),
  (11, 45, 25, '2026-07-01 09:40:00.000000', '2026-07-27 18:00:00.000000', 11, 0),
  (12, 30, 25, '2026-07-01 09:41:00.000000', '2026-07-27 18:00:00.000000', 12, 0),
  (13, 10, 8, '2026-07-01 09:42:00.000000', '2026-07-27 18:00:00.000000', 13, 0),
  (14, 0, 20, '2026-07-01 09:43:00.000000', '2026-07-27 18:00:00.000000', 14, 0),
  (15, 155, 18, '2026-07-01 09:44:00.000000', '2026-07-27 18:00:00.000000', 15, 0);

INSERT INTO `api_supplier`
  (`id`, `supplier_name`, `phone_number`, `description`, `is_deleted`)
VALUES
  (1, 'Davao Lubricants Distribution Corp.', '09174450001', 'Bulk lubricants and motorcycle fluids', 0),
  (2, 'Mindanao MotoParts Wholesale', '09174450002', 'Fast-moving scooter and motorcycle parts', 0),
  (3, 'Shell Advance Authorized Dealer Davao', '09174450003', 'Shell Advance oil distributor', 0),
  (4, 'Motul Philippines Davao Hub', '09174450004', 'Motul oil and service fluid distributor', 0),
  (5, 'NGK Spark Plugs Philippines', '09174450005', 'Spark plugs and ignition service items', 0),
  (6, 'Oxford-Givi Accessories Distributor', '09174450006', 'Motorcycle accessories and cargo systems', 0);

INSERT INTO `api_inboundstock`
  (`id`, `supplier_id`, `employee_id`, `reference_number`, `date_created`)
VALUES
  (1, 3, 1, 'SHL-DR-2026-0701-9482', '2026-07-01 10:20:00.000000'),
  (2, 4, 2, 'MTL-INV-2026-0703-5176', '2026-07-03 09:45:00.000000'),
  (3, 2, 3, 'MMW-PO-2026-0706-3928', '2026-07-06 14:10:00.000000'),
  (4, 1, 4, 'DLD-SI-2026-0710-7461', '2026-07-10 11:35:00.000000'),
  (5, 5, 5, 'NGK-DR-2026-0713-2059', '2026-07-13 15:25:00.000000'),
  (6, 6, 6, 'OXG-SO-2026-0716-8844', '2026-07-16 10:55:00.000000'),
  (7, 2, 1, 'MMW-DR-2026-0720-6317', '2026-07-20 13:40:00.000000'),
  (8, 1, 2, 'DLD-INV-2026-0724-1193', '2026-07-24 16:05:00.000000');

INSERT INTO `api_inboundstockitem`
  (`id`, `inventory_id`, `quantity`, `inbound_stock_id`)
VALUES
  (1, 1, 160, 1),
  (2, 2, 120, 1),
  (3, 6, 180, 1),
  (4, 3, 150, 2),
  (5, 4, 100, 2),
  (6, 5, 140, 2),
  (7, 8, 80, 3),
  (8, 9, 120, 3),
  (9, 10, 90, 3),
  (10, 15, 45, 3),
  (11, 1, 100, 4),
  (12, 5, 70, 4),
  (13, 6, 120, 4),
  (14, 7, 95, 5),
  (15, 13, 180, 5),
  (16, 12, 75, 6),
  (17, 14, 60, 6),
  (18, 8, 105, 7),
  (19, 9, 110, 7),
  (20, 10, 85, 7),
  (21, 11, 60, 7),
  (22, 2, 90, 8),
  (23, 3, 100, 8),
  (24, 4, 80, 8),
  (25, 15, 30, 8);

INSERT INTO `api_outboundstock`
  (`id`, `employee_id`, `reason`, `date_created`)
VALUES
  (1, 4, 'Warranty pullout - cracked bottle caps', '2026-07-05 16:20:00.000000'),
  (2, 5, 'Technician training allocation', '2026-07-08 11:10:00.000000'),
  (3, 2, 'Internal maintenance use', '2026-07-12 15:35:00.000000'),
  (4, 6, 'Supplier documentation return', '2026-07-17 10:40:00.000000'),
  (5, 1, 'Damaged shipping carton', '2026-07-21 09:55:00.000000'),
  (6, 3, 'Showroom display allocation', '2026-07-25 14:15:00.000000');

INSERT INTO `api_outboundstockitem`
  (`id`, `inventory_id`, `quantity`, `outbound_stock_id`)
VALUES
  (1, 1, 6, 1),
  (2, 3, 4, 1),
  (3, 8, 2, 2),
  (4, 14, 1, 2),
  (5, 6, 5, 3),
  (6, 13, 10, 3),
  (7, 7, 3, 4),
  (8, 12, 2, 4),
  (9, 4, 4, 5),
  (10, 5, 6, 5),
  (11, 9, 3, 6),
  (12, 10, 2, 6),
  (13, 15, 1, 6);

INSERT INTO `api_order`
  (`id`, `account_id`, `employee_id`, `order_type`, `order_date`, `reference_number`, `account_name`, `representative_name`, `city`, `barangay`, `street`, `phone_number`, `deductions`, `customer_name`, `employee_first_name`, `employee_middle_name`, `employee_last_name`)
VALUES
  (1, 1, 1, 'Delivery', '2026-07-01 08:30:00.000000', 'DO3000260000', 'Metro Davao Motorcycle Center', 'Leonardo Cruz', 'Davao City', 'Poblacion', 'Rizal Street Corner Bolton Extension', '09171241001', 25.00, NULL, 'Jose Emmanuel', 'R.', 'Idpan'),
  (2, 2, 2, 'Delivery', '2026-07-02 19:30:00.000000', 'DO3000260001', 'Bajada Scooter Service Hub', 'Maribel Tan', 'Davao City', 'Bajada', 'Door 3, JP Laurel Avenue', '09171241002', 50.00, NULL, 'Ram Christian', 'N.', 'Nacar'),
  (3, 3, 3, 'Delivery', '2026-07-04 06:30:00.000000', 'DO3000260002', 'Toril Riders Parts Supply', 'Hector Alvarez', 'Davao City', 'Toril', 'National Highway, Crossing Bayabas', '09171241003', 100.00, NULL, 'Thaddeus', 'C.', 'Domingo'),
  (4, 4, 4, 'Delivery', '2026-07-02 14:30:00.000000', 'DO3000260003', 'Buhangin MotoCare Trading', 'Sofia Mercado', 'Davao City', 'Buhangin', 'Km 6 Diversion Road', '09171241004', 150.00, NULL, 'Andrea', 'P.', 'Velasco'),
  (5, NULL, 5, 'Walkin', '2026-07-04 01:30:00.000000', 'WO3000260004', NULL, NULL, NULL, NULL, NULL, '09172230005', 200.00, 'Nico Villanueva', 'Mikael', 'A.', 'Dizon'),
  (6, 6, 6, 'Delivery', '2026-07-05 12:30:00.000000', 'DO3000260005', 'Agdao Fleet Maintenance', 'Irene Santos', 'Davao City', 'Agdao', 'Warehouse 4, Lapu-Lapu Street', '09171241006', 250.00, NULL, 'Pauline', 'L.', 'Mercado'),
  (7, 7, 1, 'Delivery', '2026-07-03 20:30:00.000000', 'DO3000260006', 'Lanang AutoMoto Supply', 'Victor Lim', 'Davao City', 'Lanang', 'Palm Drive Commercial Strip', '09171241007', 300.00, NULL, 'Jose Emmanuel', 'R.', 'Idpan'),
  (8, 8, 2, 'Delivery', '2026-07-05 07:30:00.000000', 'DO3000260007', 'Mintal Workshop Cooperative', 'Grace Molina', 'Davao City', 'Mintal', 'Mintal Public Market Road', '09171241008', 350.00, NULL, 'Ram Christian', 'N.', 'Nacar'),
  (9, NULL, 3, 'Walkin', '2026-07-06 18:30:00.000000', 'WO3000260008', NULL, NULL, NULL, NULL, NULL, '09172230009', 400.00, 'Samuel Navarro', 'Thaddeus', 'C.', 'Domingo'),
  (10, 10, 4, 'Delivery', '2026-07-05 02:30:00.000000', 'DO3000260009', 'Panabo MotoPoint Trading', 'Rhea Bautista', 'Panabo City', 'Gredu', 'Mabini Street', '09171241010', 0.00, NULL, 'Andrea', 'P.', 'Velasco'),
  (11, 11, 5, 'Delivery', '2026-07-06 13:30:00.000000', 'DO3000260010', 'Tagum Two-Wheel Service', 'Carlo Mendoza', 'Tagum City', 'Magugpo East', 'Pioneer Avenue', '09171241011', 25.00, NULL, 'Mikael', 'A.', 'Dizon'),
  (12, 12, 6, 'Delivery', '2026-07-08 00:30:00.000000', 'DO3000260011', 'Digos RoadRunner Parts', 'Angelica Flores', 'Digos City', 'Zone 3', 'Rizal Avenue', '09171241012', 50.00, NULL, 'Pauline', 'L.', 'Mercado'),
  (13, 1, 1, 'Delivery', '2026-07-06 08:30:00.000000', 'DO3000260012', 'Metro Davao Motorcycle Center', 'Leonardo Cruz', 'Davao City', 'Poblacion', 'Rizal Street Corner Bolton Extension', '09171241001', 100.00, NULL, 'Jose Emmanuel', 'R.', 'Idpan'),
  (14, NULL, 2, 'Walkin', '2026-07-07 19:30:00.000000', 'WO3000260013', NULL, NULL, NULL, NULL, NULL, '09172230014', 150.00, 'Jessa Ladores', 'Ram Christian', 'N.', 'Nacar'),
  (15, 3, 3, 'Delivery', '2026-07-09 06:30:00.000000', 'DO3000260014', 'Toril Riders Parts Supply', 'Hector Alvarez', 'Davao City', 'Toril', 'National Highway, Crossing Bayabas', '09171241003', 200.00, NULL, 'Thaddeus', 'C.', 'Domingo'),
  (16, 4, 4, 'Delivery', '2026-07-07 14:30:00.000000', 'DO3000260015', 'Buhangin MotoCare Trading', 'Sofia Mercado', 'Davao City', 'Buhangin', 'Km 6 Diversion Road', '09171241004', 250.00, NULL, 'Andrea', 'P.', 'Velasco'),
  (17, 5, 5, 'Delivery', '2026-07-09 01:30:00.000000', 'DO3000260016', 'Matina Express Cyclehaus', 'Nestor Villanueva', 'Davao City', 'Matina', 'MacArthur Highway Frontage Road', '09171241005', 300.00, NULL, 'Mikael', 'A.', 'Dizon'),
  (18, NULL, 6, 'Walkin', '2026-07-10 12:30:00.000000', 'WO3000260017', NULL, NULL, NULL, NULL, NULL, '09172230018', 350.00, 'Monica Arrieta', 'Pauline', 'L.', 'Mercado'),
  (19, 7, 1, 'Delivery', '2026-07-08 20:30:00.000000', 'DO3000260018', 'Lanang AutoMoto Supply', 'Victor Lim', 'Davao City', 'Lanang', 'Palm Drive Commercial Strip', '09171241007', 400.00, NULL, 'Jose Emmanuel', 'R.', 'Idpan'),
  (20, 8, 2, 'Delivery', '2026-07-10 07:30:00.000000', 'DO3000260019', 'Mintal Workshop Cooperative', 'Grace Molina', 'Davao City', 'Mintal', 'Mintal Public Market Road', '09171241008', 0.00, NULL, 'Ram Christian', 'N.', 'Nacar'),
  (21, 9, 3, 'Delivery', '2026-07-11 18:30:00.000000', 'DO3000260020', 'Calinan Riders Depot', 'Danilo Reyes', 'Davao City', 'Calinan', 'Quezon Street Near Terminal', '09171241009', 25.00, NULL, 'Thaddeus', 'C.', 'Domingo'),
  (22, 10, 4, 'Delivery', '2026-07-10 02:30:00.000000', 'DO3000260021', 'Panabo MotoPoint Trading', 'Rhea Bautista', 'Panabo City', 'Gredu', 'Mabini Street', '09171241010', 50.00, NULL, 'Andrea', 'P.', 'Velasco'),
  (23, NULL, 5, 'Walkin', '2026-07-11 13:30:00.000000', 'WO3000260022', NULL, NULL, NULL, NULL, NULL, '09172230003', 100.00, 'Rafael Ocampo', 'Mikael', 'A.', 'Dizon'),
  (24, 12, 6, 'Delivery', '2026-07-13 00:30:00.000000', 'DO3000260023', 'Digos RoadRunner Parts', 'Angelica Flores', 'Digos City', 'Zone 3', 'Rizal Avenue', '09171241012', 150.00, NULL, 'Pauline', 'L.', 'Mercado'),
  (25, 1, 1, 'Delivery', '2026-07-11 08:30:00.000000', 'DO3000260024', 'Metro Davao Motorcycle Center', 'Leonardo Cruz', 'Davao City', 'Poblacion', 'Rizal Street Corner Bolton Extension', '09171241001', 200.00, NULL, 'Jose Emmanuel', 'R.', 'Idpan'),
  (26, 2, 2, 'Delivery', '2026-07-12 19:30:00.000000', 'DO3000260025', 'Bajada Scooter Service Hub', 'Maribel Tan', 'Davao City', 'Bajada', 'Door 3, JP Laurel Avenue', '09171241002', 250.00, NULL, 'Ram Christian', 'N.', 'Nacar'),
  (27, NULL, 3, 'Walkin', '2026-07-14 06:30:00.000000', 'WO3000260026', NULL, NULL, NULL, NULL, NULL, '09172230007', 300.00, 'Marco Soriano', 'Thaddeus', 'C.', 'Domingo'),
  (28, 4, 4, 'Delivery', '2026-07-12 14:30:00.000000', 'DO3000260027', 'Buhangin MotoCare Trading', 'Sofia Mercado', 'Davao City', 'Buhangin', 'Km 6 Diversion Road', '09171241004', 350.00, NULL, 'Andrea', 'P.', 'Velasco'),
  (29, 5, 5, 'Delivery', '2026-07-14 01:30:00.000000', 'DO3000260028', 'Matina Express Cyclehaus', 'Nestor Villanueva', 'Davao City', 'Matina', 'MacArthur Highway Frontage Road', '09171241005', 400.00, NULL, 'Mikael', 'A.', 'Dizon'),
  (30, 6, 6, 'Delivery', '2026-07-15 12:30:00.000000', 'DO3000260029', 'Agdao Fleet Maintenance', 'Irene Santos', 'Davao City', 'Agdao', 'Warehouse 4, Lapu-Lapu Street', '09171241006', 0.00, NULL, 'Pauline', 'L.', 'Mercado'),
  (31, 7, 1, 'Delivery', '2026-07-13 20:30:00.000000', 'DO3000260030', 'Lanang AutoMoto Supply', 'Victor Lim', 'Davao City', 'Lanang', 'Palm Drive Commercial Strip', '09171241007', 25.00, NULL, 'Jose Emmanuel', 'R.', 'Idpan'),
  (32, NULL, 2, 'Walkin', '2026-07-15 07:30:00.000000', 'WO3000260031', NULL, NULL, NULL, NULL, NULL, '09172230012', 50.00, 'Alyssa Montejo', 'Ram Christian', 'N.', 'Nacar'),
  (33, 9, 3, 'Delivery', '2026-07-16 18:30:00.000000', 'DO3000260032', 'Calinan Riders Depot', 'Danilo Reyes', 'Davao City', 'Calinan', 'Quezon Street Near Terminal', '09171241009', 100.00, NULL, 'Thaddeus', 'C.', 'Domingo'),
  (34, 10, 4, 'Delivery', '2026-07-15 02:30:00.000000', 'DO3000260033', 'Panabo MotoPoint Trading', 'Rhea Bautista', 'Panabo City', 'Gredu', 'Mabini Street', '09171241010', 150.00, NULL, 'Andrea', 'P.', 'Velasco'),
  (35, 11, 5, 'Delivery', '2026-07-16 13:30:00.000000', 'DO3000260034', 'Tagum Two-Wheel Service', 'Carlo Mendoza', 'Tagum City', 'Magugpo East', 'Pioneer Avenue', '09171241011', 200.00, NULL, 'Mikael', 'A.', 'Dizon'),
  (36, NULL, 6, 'Walkin', '2026-07-18 00:30:00.000000', 'WO3000260035', NULL, NULL, NULL, NULL, NULL, '09172230016', 250.00, 'Ivy Manalastas', 'Pauline', 'L.', 'Mercado'),
  (37, 1, 1, 'Delivery', '2026-07-16 08:30:00.000000', 'DO3000260036', 'Metro Davao Motorcycle Center', 'Leonardo Cruz', 'Davao City', 'Poblacion', 'Rizal Street Corner Bolton Extension', '09171241001', 300.00, NULL, 'Jose Emmanuel', 'R.', 'Idpan'),
  (38, 2, 2, 'Delivery', '2026-07-17 19:30:00.000000', 'DO3000260037', 'Bajada Scooter Service Hub', 'Maribel Tan', 'Davao City', 'Bajada', 'Door 3, JP Laurel Avenue', '09171241002', 350.00, NULL, 'Ram Christian', 'N.', 'Nacar'),
  (39, 3, 3, 'Delivery', '2026-07-19 06:30:00.000000', 'DO3000260038', 'Toril Riders Parts Supply', 'Hector Alvarez', 'Davao City', 'Toril', 'National Highway, Crossing Bayabas', '09171241003', 400.00, NULL, 'Thaddeus', 'C.', 'Domingo'),
  (40, 4, 4, 'Delivery', '2026-07-17 14:30:00.000000', 'DO3000260039', 'Buhangin MotoCare Trading', 'Sofia Mercado', 'Davao City', 'Buhangin', 'Km 6 Diversion Road', '09171241004', 0.00, NULL, 'Andrea', 'P.', 'Velasco'),
  (41, NULL, 5, 'Walkin', '2026-07-19 01:30:00.000000', 'WO3000260040', NULL, NULL, NULL, NULL, NULL, '09172230001', 25.00, 'Jonel Garcia', 'Mikael', 'A.', 'Dizon'),
  (42, 6, 6, 'Delivery', '2026-07-20 12:30:00.000000', 'DO3000260041', 'Agdao Fleet Maintenance', 'Irene Santos', 'Davao City', 'Agdao', 'Warehouse 4, Lapu-Lapu Street', '09171241006', 50.00, NULL, 'Pauline', 'L.', 'Mercado'),
  (43, 7, 1, 'Delivery', '2026-07-18 20:30:00.000000', 'DO3000260042', 'Lanang AutoMoto Supply', 'Victor Lim', 'Davao City', 'Lanang', 'Palm Drive Commercial Strip', '09171241007', 100.00, NULL, 'Jose Emmanuel', 'R.', 'Idpan'),
  (44, 8, 2, 'Delivery', '2026-07-20 07:30:00.000000', 'DO3000260043', 'Mintal Workshop Cooperative', 'Grace Molina', 'Davao City', 'Mintal', 'Mintal Public Market Road', '09171241008', 150.00, NULL, 'Ram Christian', 'N.', 'Nacar'),
  (45, 9, 3, 'Delivery', '2026-07-21 18:30:00.000000', 'DO3000260044', 'Calinan Riders Depot', 'Danilo Reyes', 'Davao City', 'Calinan', 'Quezon Street Near Terminal', '09171241009', 200.00, NULL, 'Thaddeus', 'C.', 'Domingo'),
  (46, NULL, 4, 'Walkin', '2026-07-20 02:30:00.000000', 'WO3000260045', NULL, NULL, NULL, NULL, NULL, '09172230006', 250.00, 'Patricia Ramos', 'Andrea', 'P.', 'Velasco'),
  (47, 11, 5, 'Delivery', '2026-07-21 13:30:00.000000', 'DO3000260046', 'Tagum Two-Wheel Service', 'Carlo Mendoza', 'Tagum City', 'Magugpo East', 'Pioneer Avenue', '09171241011', 300.00, NULL, 'Mikael', 'A.', 'Dizon'),
  (48, 12, 6, 'Delivery', '2026-07-23 00:30:00.000000', 'DO3000260047', 'Digos RoadRunner Parts', 'Angelica Flores', 'Digos City', 'Zone 3', 'Rizal Avenue', '09171241012', 350.00, NULL, 'Pauline', 'L.', 'Mercado'),
  (49, 1, 1, 'Delivery', '2026-07-21 08:30:00.000000', 'DO3000260048', 'Metro Davao Motorcycle Center', 'Leonardo Cruz', 'Davao City', 'Poblacion', 'Rizal Street Corner Bolton Extension', '09171241001', 400.00, NULL, 'Jose Emmanuel', 'R.', 'Idpan'),
  (50, NULL, 2, 'Walkin', '2026-07-22 19:30:00.000000', 'WO3000260049', NULL, NULL, NULL, NULL, NULL, '09172230010', 0.00, 'Bianca Flores', 'Ram Christian', 'N.', 'Nacar'),
  (51, 3, 3, 'Delivery', '2026-07-24 06:30:00.000000', 'DO3000260050', 'Toril Riders Parts Supply', 'Hector Alvarez', 'Davao City', 'Toril', 'National Highway, Crossing Bayabas', '09171241003', 25.00, NULL, 'Thaddeus', 'C.', 'Domingo');

INSERT INTO `api_orderdetails`
  (`id`, `order_id`, `inventory_id`, `quantity`, `sku_hold`, `product_price`, `product_name`)
VALUES
  (1, 1, 1, 12, 'OIL-MC-SHL-AX7-10W40', 420.00, 'Shell Advance AX7 10W-40'),
  (2, 1, 6, 8, 'OIL-MC-HND-10W30SL', 315.00, 'Pro Honda Engine Oil 10W-30 SL'),
  (3, 1, 7, 2, 'PRT-MC-NGK-CR8EIX', 480.00, 'NGK Iridium Spark Plug CR8EIX'),
  (4, 2, 3, 8, 'OIL-SC-MTL-PWRLE-5W40', 550.00, 'Motul Scooter Power LE 5W-40'),
  (5, 2, 5, 12, 'OIL-SC-YML-GEAR-10W40', 220.00, 'Yamalube Gear Oil 10W-40'),
  (6, 3, 8, 6, 'PRT-SC-TSMP-WFPS', 550.00, 'TSMP WF Pulley Set'),
  (7, 3, 9, 10, 'PRT-SC-TSMP-CBELL', 350.00, 'TSMP Clutch Bell'),
  (8, 3, 10, 5, 'PRT-SC-TSMP-CLUTCH', 550.00, 'TSMP Clutch Lining Assembly'),
  (9, 4, 11, 2, 'PRT-MC-RKM-428H', 1250.00, 'RK-M Takasago Drive Chain 428H'),
  (10, 4, 12, 4, 'PRT-MC-BDX-FPAD', 720.00, 'Bendix Brake Pads Front Set'),
  (11, 5, 2, 8, 'OIL-MC-SHL-ULTRA-10W40', 650.00, 'Shell Advance Ultra 4T 10W-40'),
  (12, 5, 4, 5, 'OIL-MC-MTL-5100-10W40', 680.00, 'Motul 5100 4T 10W-40'),
  (13, 6, 1, 16, 'OIL-MC-SHL-AX7-10W40', 420.00, 'Shell Advance AX7 10W-40'),
  (14, 6, 13, 8, 'PRT-MC-GIVI-Z191', 50.00, 'GIVI Z191 Compression Spring'),
  (15, 7, 15, 2, 'PRT-SC-DID-CVT-NA', 1450.00, 'DID CVT Belt NMAX/Aerox'),
  (16, 7, 3, 4, 'OIL-SC-MTL-PWRLE-5W40', 550.00, 'Motul Scooter Power LE 5W-40'),
  (17, 8, 6, 10, 'OIL-MC-HND-10W30SL', 315.00, 'Pro Honda Engine Oil 10W-30 SL'),
  (18, 8, 5, 10, 'OIL-SC-YML-GEAR-10W40', 220.00, 'Yamalube Gear Oil 10W-40'),
  (19, 8, 7, 3, 'PRT-MC-NGK-CR8EIX', 480.00, 'NGK Iridium Spark Plug CR8EIX'),
  (20, 9, 7, 1, 'PRT-MC-NGK-CR8EIX', 480.00, 'NGK Iridium Spark Plug CR8EIX'),
  (21, 9, 13, 4, 'PRT-MC-GIVI-Z191', 50.00, 'GIVI Z191 Compression Spring'),
  (22, 10, 5, 3, 'OIL-SC-YML-GEAR-10W40', 220.00, 'Yamalube Gear Oil 10W-40'),
  (23, 10, 12, 1, 'PRT-MC-BDX-FPAD', 720.00, 'Bendix Brake Pads Front Set'),
  (24, 11, 1, 10, 'OIL-MC-SHL-AX7-10W40', 420.00, 'Shell Advance AX7 10W-40'),
  (25, 11, 2, 6, 'OIL-MC-SHL-ULTRA-10W40', 650.00, 'Shell Advance Ultra 4T 10W-40'),
  (26, 12, 3, 7, 'OIL-SC-MTL-PWRLE-5W40', 550.00, 'Motul Scooter Power LE 5W-40'),
  (27, 12, 15, 1, 'PRT-SC-DID-CVT-NA', 1450.00, 'DID CVT Belt NMAX/Aerox'),
  (28, 13, 6, 12, 'OIL-MC-HND-10W30SL', 315.00, 'Pro Honda Engine Oil 10W-30 SL'),
  (29, 13, 5, 9, 'OIL-SC-YML-GEAR-10W40', 220.00, 'Yamalube Gear Oil 10W-40'),
  (30, 13, 13, 6, 'PRT-MC-GIVI-Z191', 50.00, 'GIVI Z191 Compression Spring'),
  (31, 14, 11, 1, 'PRT-MC-RKM-428H', 1250.00, 'RK-M Takasago Drive Chain 428H'),
  (32, 14, 12, 3, 'PRT-MC-BDX-FPAD', 720.00, 'Bendix Brake Pads Front Set'),
  (33, 15, 8, 5, 'PRT-SC-TSMP-WFPS', 550.00, 'TSMP WF Pulley Set'),
  (34, 15, 9, 8, 'PRT-SC-TSMP-CBELL', 350.00, 'TSMP Clutch Bell'),
  (35, 16, 4, 4, 'OIL-MC-MTL-5100-10W40', 680.00, 'Motul 5100 4T 10W-40'),
  (36, 16, 2, 5, 'OIL-MC-SHL-ULTRA-10W40', 650.00, 'Shell Advance Ultra 4T 10W-40'),
  (37, 17, 10, 5, 'PRT-SC-TSMP-CLUTCH', 550.00, 'TSMP Clutch Lining Assembly'),
  (38, 17, 7, 4, 'PRT-MC-NGK-CR8EIX', 480.00, 'NGK Iridium Spark Plug CR8EIX'),
  (39, 18, 12, 3, 'PRT-MC-BDX-FPAD', 720.00, 'Bendix Brake Pads Front Set'),
  (40, 18, 13, 5, 'PRT-MC-GIVI-Z191', 50.00, 'GIVI Z191 Compression Spring'),
  (41, 19, 1, 9, 'OIL-MC-SHL-AX7-10W40', 420.00, 'Shell Advance AX7 10W-40'),
  (42, 19, 6, 11, 'OIL-MC-HND-10W30SL', 315.00, 'Pro Honda Engine Oil 10W-30 SL'),
  (43, 20, 3, 5, 'OIL-SC-MTL-PWRLE-5W40', 550.00, 'Motul Scooter Power LE 5W-40'),
  (44, 20, 5, 8, 'OIL-SC-YML-GEAR-10W40', 220.00, 'Yamalube Gear Oil 10W-40'),
  (45, 21, 8, 6, 'PRT-SC-TSMP-WFPS', 550.00, 'TSMP WF Pulley Set'),
  (46, 21, 10, 4, 'PRT-SC-TSMP-CLUTCH', 550.00, 'TSMP Clutch Lining Assembly'),
  (47, 22, 2, 7, 'OIL-MC-SHL-ULTRA-10W40', 650.00, 'Shell Advance Ultra 4T 10W-40'),
  (48, 22, 4, 3, 'OIL-MC-MTL-5100-10W40', 680.00, 'Motul 5100 4T 10W-40'),
  (49, 23, 11, 2, 'PRT-MC-RKM-428H', 1250.00, 'RK-M Takasago Drive Chain 428H'),
  (50, 23, 7, 4, 'PRT-MC-NGK-CR8EIX', 480.00, 'NGK Iridium Spark Plug CR8EIX'),
  (51, 24, 15, 2, 'PRT-SC-DID-CVT-NA', 1450.00, 'DID CVT Belt NMAX/Aerox'),
  (52, 24, 9, 6, 'PRT-SC-TSMP-CBELL', 350.00, 'TSMP Clutch Bell'),
  (53, 25, 6, 14, 'OIL-MC-HND-10W30SL', 315.00, 'Pro Honda Engine Oil 10W-30 SL'),
  (54, 25, 1, 10, 'OIL-MC-SHL-AX7-10W40', 420.00, 'Shell Advance AX7 10W-40'),
  (55, 25, 13, 5, 'PRT-MC-GIVI-Z191', 50.00, 'GIVI Z191 Compression Spring'),
  (56, 26, 3, 9, 'OIL-SC-MTL-PWRLE-5W40', 550.00, 'Motul Scooter Power LE 5W-40'),
  (57, 26, 5, 12, 'OIL-SC-YML-GEAR-10W40', 220.00, 'Yamalube Gear Oil 10W-40'),
  (58, 27, 8, 8, 'PRT-SC-TSMP-WFPS', 550.00, 'TSMP WF Pulley Set'),
  (59, 27, 9, 10, 'PRT-SC-TSMP-CBELL', 350.00, 'TSMP Clutch Bell'),
  (60, 27, 10, 5, 'PRT-SC-TSMP-CLUTCH', 550.00, 'TSMP Clutch Lining Assembly'),
  (61, 28, 2, 9, 'OIL-MC-SHL-ULTRA-10W40', 650.00, 'Shell Advance Ultra 4T 10W-40'),
  (62, 28, 4, 5, 'OIL-MC-MTL-5100-10W40', 680.00, 'Motul 5100 4T 10W-40'),
  (63, 29, 11, 3, 'PRT-MC-RKM-428H', 1250.00, 'RK-M Takasago Drive Chain 428H'),
  (64, 29, 12, 5, 'PRT-MC-BDX-FPAD', 720.00, 'Bendix Brake Pads Front Set'),
  (65, 30, 15, 3, 'PRT-SC-DID-CVT-NA', 1450.00, 'DID CVT Belt NMAX/Aerox'),
  (66, 30, 12, 2, 'PRT-MC-BDX-FPAD', 720.00, 'Bendix Brake Pads Front Set'),
  (67, 31, 1, 8, 'OIL-MC-SHL-AX7-10W40', 420.00, 'Shell Advance AX7 10W-40'),
  (68, 31, 6, 7, 'OIL-MC-HND-10W30SL', 315.00, 'Pro Honda Engine Oil 10W-30 SL'),
  (69, 31, 7, 3, 'PRT-MC-NGK-CR8EIX', 480.00, 'NGK Iridium Spark Plug CR8EIX'),
  (70, 32, 5, 4, 'OIL-SC-YML-GEAR-10W40', 220.00, 'Yamalube Gear Oil 10W-40'),
  (71, 32, 13, 5, 'PRT-MC-GIVI-Z191', 50.00, 'GIVI Z191 Compression Spring'),
  (72, 33, 3, 4, 'OIL-SC-MTL-PWRLE-5W40', 550.00, 'Motul Scooter Power LE 5W-40'),
  (73, 33, 7, 2, 'PRT-MC-NGK-CR8EIX', 480.00, 'NGK Iridium Spark Plug CR8EIX'),
  (74, 34, 2, 5, 'OIL-MC-SHL-ULTRA-10W40', 650.00, 'Shell Advance Ultra 4T 10W-40'),
  (75, 34, 4, 3, 'OIL-MC-MTL-5100-10W40', 680.00, 'Motul 5100 4T 10W-40'),
  (76, 35, 8, 4, 'PRT-SC-TSMP-WFPS', 550.00, 'TSMP WF Pulley Set'),
  (77, 35, 15, 1, 'PRT-SC-DID-CVT-NA', 1450.00, 'DID CVT Belt NMAX/Aerox'),
  (78, 36, 6, 2, 'OIL-MC-HND-10W30SL', 315.00, 'Pro Honda Engine Oil 10W-30 SL'),
  (79, 36, 5, 2, 'OIL-SC-YML-GEAR-10W40', 220.00, 'Yamalube Gear Oil 10W-40'),
  (80, 36, 13, 3, 'PRT-MC-GIVI-Z191', 50.00, 'GIVI Z191 Compression Spring'),
  (81, 37, 14, 1, 'ACC-MC-OXF-CNET17', 490.00, 'Oxford Cargo Net 17x17'),
  (82, 37, 12, 2, 'PRT-MC-BDX-FPAD', 720.00, 'Bendix Brake Pads Front Set'),
  (83, 38, 1, 7, 'OIL-MC-SHL-AX7-10W40', 420.00, 'Shell Advance AX7 10W-40'),
  (84, 38, 2, 4, 'OIL-MC-SHL-ULTRA-10W40', 650.00, 'Shell Advance Ultra 4T 10W-40'),
  (85, 39, 3, 6, 'OIL-SC-MTL-PWRLE-5W40', 550.00, 'Motul Scooter Power LE 5W-40'),
  (86, 39, 4, 4, 'OIL-MC-MTL-5100-10W40', 680.00, 'Motul 5100 4T 10W-40'),
  (87, 40, 8, 5, 'PRT-SC-TSMP-WFPS', 550.00, 'TSMP WF Pulley Set'),
  (88, 40, 9, 7, 'PRT-SC-TSMP-CBELL', 350.00, 'TSMP Clutch Bell'),
  (89, 41, 10, 4, 'PRT-SC-TSMP-CLUTCH', 550.00, 'TSMP Clutch Lining Assembly'),
  (90, 41, 7, 3, 'PRT-MC-NGK-CR8EIX', 480.00, 'NGK Iridium Spark Plug CR8EIX'),
  (91, 42, 15, 2, 'PRT-SC-DID-CVT-NA', 1450.00, 'DID CVT Belt NMAX/Aerox'),
  (92, 42, 5, 5, 'OIL-SC-YML-GEAR-10W40', 220.00, 'Yamalube Gear Oil 10W-40'),
  (93, 43, 11, 1, 'PRT-MC-RKM-428H', 1250.00, 'RK-M Takasago Drive Chain 428H'),
  (94, 43, 12, 2, 'PRT-MC-BDX-FPAD', 720.00, 'Bendix Brake Pads Front Set'),
  (95, 44, 1, 11, 'OIL-MC-SHL-AX7-10W40', 420.00, 'Shell Advance AX7 10W-40'),
  (96, 44, 6, 5, 'OIL-MC-HND-10W30SL', 315.00, 'Pro Honda Engine Oil 10W-30 SL'),
  (97, 45, 3, 6, 'OIL-SC-MTL-PWRLE-5W40', 550.00, 'Motul Scooter Power LE 5W-40'),
  (98, 45, 13, 4, 'PRT-MC-GIVI-Z191', 50.00, 'GIVI Z191 Compression Spring'),
  (99, 46, 2, 4, 'OIL-MC-SHL-ULTRA-10W40', 650.00, 'Shell Advance Ultra 4T 10W-40'),
  (100, 46, 4, 2, 'OIL-MC-MTL-5100-10W40', 680.00, 'Motul 5100 4T 10W-40'),
  (101, 47, 8, 4, 'PRT-SC-TSMP-WFPS', 550.00, 'TSMP WF Pulley Set'),
  (102, 47, 10, 3, 'PRT-SC-TSMP-CLUTCH', 550.00, 'TSMP Clutch Lining Assembly'),
  (103, 48, 12, 2, 'PRT-MC-BDX-FPAD', 720.00, 'Bendix Brake Pads Front Set'),
  (104, 48, 7, 2, 'PRT-MC-NGK-CR8EIX', 480.00, 'NGK Iridium Spark Plug CR8EIX'),
  (105, 49, 5, 2, 'OIL-SC-YML-GEAR-10W40', 220.00, 'Yamalube Gear Oil 10W-40'),
  (106, 49, 13, 3, 'PRT-MC-GIVI-Z191', 50.00, 'GIVI Z191 Compression Spring'),
  (107, 50, 1, 6, 'OIL-MC-SHL-AX7-10W40', 420.00, 'Shell Advance AX7 10W-40'),
  (108, 50, 6, 3, 'OIL-MC-HND-10W30SL', 315.00, 'Pro Honda Engine Oil 10W-30 SL'),
  (109, 50, 7, 1, 'PRT-MC-NGK-CR8EIX', 480.00, 'NGK Iridium Spark Plug CR8EIX'),
  (110, 51, 3, 5, 'OIL-SC-MTL-PWRLE-5W40', 550.00, 'Motul Scooter Power LE 5W-40'),
  (111, 51, 15, 1, 'PRT-SC-DID-CVT-NA', 1450.00, 'DID CVT Belt NMAX/Aerox');

INSERT INTO `api_ordertracking`
  (`id`, `order_id`, `status`, `reference_number`, `date_created`, `date_validated`, `date_shipped`, `date_received`, `date_completed`, `date_cancelled`, `date_returned`, `last_updated`)
VALUES
  (1, 1, 'returned', NULL, '2026-07-01 08:30:00.000000', '2026-07-01 09:15:00.000000', '2026-07-01 12:30:00.000000', '2026-07-02 07:50:00.000000', NULL, NULL, '2026-07-02 10:15:00.000000', '2026-07-02 10:15:00.000000'),
  (2, 2, 'received', NULL, '2026-07-02 19:30:00.000000', '2026-07-02 20:15:00.000000', '2026-07-02 23:45:00.000000', '2026-07-03 20:05:00.000000', NULL, NULL, NULL, '2026-07-03 20:05:00.000000'),
  (3, 3, 'unvalidated', NULL, '2026-07-04 06:30:00.000000', NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-04 06:30:00.000000'),
  (4, 4, 'received', NULL, '2026-07-02 14:30:00.000000', '2026-07-02 15:15:00.000000', '2026-07-02 18:15:00.000000', '2026-07-03 16:35:00.000000', NULL, NULL, NULL, '2026-07-03 16:35:00.000000'),
  (5, 5, 'completed', 'PAY-OR-2026-7400', '2026-07-04 01:30:00.000000', NULL, NULL, NULL, '2026-07-04 02:25:00.000000', NULL, NULL, '2026-07-04 02:25:00.000000'),
  (6, 6, 'validated', NULL, '2026-07-05 12:30:00.000000', '2026-07-05 13:15:00.000000', NULL, NULL, NULL, NULL, NULL, '2026-07-05 13:15:00.000000'),
  (7, 7, 'returned', NULL, '2026-07-03 20:30:00.000000', '2026-07-03 21:15:00.000000', '2026-07-04 01:00:00.000000', '2026-07-04 21:20:00.000000', NULL, NULL, '2026-07-05 00:05:00.000000', '2026-07-05 00:05:00.000000'),
  (8, 8, 'completed', 'PAY-OR-2026-7401', '2026-07-05 07:30:00.000000', '2026-07-05 08:15:00.000000', '2026-07-05 11:15:00.000000', '2026-07-06 08:35:00.000000', '2026-07-06 10:15:00.000000', NULL, NULL, '2026-07-06 10:15:00.000000'),
  (9, 9, 'unvalidated', NULL, '2026-07-06 18:30:00.000000', NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-06 18:30:00.000000'),
  (10, 10, 'shipped', NULL, '2026-07-05 02:30:00.000000', '2026-07-05 03:15:00.000000', '2026-07-05 06:45:00.000000', NULL, NULL, NULL, NULL, '2026-07-05 06:45:00.000000'),
  (11, 11, 'shipped', NULL, '2026-07-06 13:30:00.000000', '2026-07-06 14:15:00.000000', '2026-07-06 18:00:00.000000', NULL, NULL, NULL, NULL, '2026-07-06 18:00:00.000000'),
  (12, 12, 'unvalidated', NULL, '2026-07-08 00:30:00.000000', NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-08 00:30:00.000000'),
  (13, 13, 'received', NULL, '2026-07-06 08:30:00.000000', '2026-07-06 09:15:00.000000', '2026-07-06 12:30:00.000000', '2026-07-07 09:50:00.000000', NULL, NULL, NULL, '2026-07-07 09:50:00.000000'),
  (14, 14, 'cancelled', NULL, '2026-07-07 19:30:00.000000', NULL, NULL, NULL, NULL, '2026-07-07 20:35:00.000000', NULL, '2026-07-07 20:35:00.000000'),
  (15, 15, 'received', NULL, '2026-07-09 06:30:00.000000', '2026-07-09 07:15:00.000000', '2026-07-09 11:00:00.000000', '2026-07-10 05:20:00.000000', NULL, NULL, NULL, '2026-07-10 05:20:00.000000'),
  (16, 16, 'returned', NULL, '2026-07-07 14:30:00.000000', '2026-07-07 15:15:00.000000', '2026-07-07 18:15:00.000000', '2026-07-08 13:35:00.000000', NULL, NULL, '2026-07-08 15:50:00.000000', '2026-07-08 15:50:00.000000'),
  (17, 17, 'validated', NULL, '2026-07-09 01:30:00.000000', '2026-07-09 02:15:00.000000', NULL, NULL, NULL, NULL, NULL, '2026-07-09 02:15:00.000000'),
  (18, 18, 'completed', 'PAY-OR-2026-7402', '2026-07-10 12:30:00.000000', NULL, NULL, NULL, '2026-07-10 13:35:00.000000', NULL, NULL, '2026-07-10 13:35:00.000000'),
  (19, 19, 'shipped', NULL, '2026-07-08 20:30:00.000000', '2026-07-08 21:15:00.000000', '2026-07-09 01:00:00.000000', NULL, NULL, NULL, NULL, '2026-07-09 01:00:00.000000'),
  (20, 20, 'unvalidated', NULL, '2026-07-10 07:30:00.000000', NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-10 07:30:00.000000'),
  (21, 21, 'validated', NULL, '2026-07-11 18:30:00.000000', '2026-07-11 19:15:00.000000', NULL, NULL, NULL, NULL, NULL, '2026-07-11 19:15:00.000000'),
  (22, 22, 'unvalidated', NULL, '2026-07-10 02:30:00.000000', NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-10 02:30:00.000000'),
  (23, 23, 'unvalidated', NULL, '2026-07-11 13:30:00.000000', NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-11 13:30:00.000000'),
  (24, 24, 'unvalidated', NULL, '2026-07-13 00:30:00.000000', NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 00:30:00.000000'),
  (25, 25, 'returned', NULL, '2026-07-11 08:30:00.000000', '2026-07-11 09:15:00.000000', '2026-07-11 12:30:00.000000', '2026-07-12 06:50:00.000000', NULL, NULL, '2026-07-12 09:15:00.000000', '2026-07-12 09:15:00.000000'),
  (26, 26, 'unvalidated', NULL, '2026-07-12 19:30:00.000000', NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-12 19:30:00.000000'),
  (27, 27, 'completed', 'PAY-OR-2026-7403', '2026-07-14 06:30:00.000000', NULL, NULL, NULL, '2026-07-14 07:45:00.000000', NULL, NULL, '2026-07-14 07:45:00.000000'),
  (28, 28, 'cancelled', NULL, '2026-07-12 14:30:00.000000', NULL, NULL, NULL, NULL, '2026-07-12 15:35:00.000000', NULL, '2026-07-12 15:35:00.000000'),
  (29, 29, 'completed', 'PAY-OR-2026-7404', '2026-07-14 01:30:00.000000', '2026-07-14 02:15:00.000000', '2026-07-14 05:30:00.000000', '2026-07-15 03:50:00.000000', '2026-07-15 05:30:00.000000', NULL, NULL, '2026-07-15 05:30:00.000000'),
  (30, 30, 'returned', NULL, '2026-07-15 12:30:00.000000', '2026-07-15 13:15:00.000000', '2026-07-15 16:45:00.000000', '2026-07-16 11:05:00.000000', NULL, NULL, '2026-07-16 13:40:00.000000', '2026-07-16 13:40:00.000000'),
  (31, 31, 'validated', NULL, '2026-07-13 20:30:00.000000', '2026-07-13 21:15:00.000000', NULL, NULL, NULL, NULL, NULL, '2026-07-13 21:15:00.000000'),
  (32, 32, 'cancelled', NULL, '2026-07-15 07:30:00.000000', NULL, NULL, NULL, NULL, '2026-07-15 08:15:00.000000', NULL, '2026-07-15 08:15:00.000000'),
  (33, 33, 'cancelled', NULL, '2026-07-16 18:30:00.000000', NULL, NULL, NULL, NULL, '2026-07-16 19:35:00.000000', NULL, '2026-07-16 19:35:00.000000'),
  (34, 34, 'received', NULL, '2026-07-15 02:30:00.000000', '2026-07-15 03:15:00.000000', '2026-07-15 06:45:00.000000', '2026-07-16 05:05:00.000000', NULL, NULL, NULL, '2026-07-16 05:05:00.000000'),
  (35, 35, 'unvalidated', NULL, '2026-07-16 13:30:00.000000', NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-16 13:30:00.000000'),
  (36, 36, 'unvalidated', NULL, '2026-07-18 00:30:00.000000', NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-18 00:30:00.000000'),
  (37, 37, 'shipped', NULL, '2026-07-16 08:30:00.000000', '2026-07-16 09:15:00.000000', '2026-07-16 12:30:00.000000', NULL, NULL, NULL, NULL, '2026-07-16 12:30:00.000000'),
  (38, 38, 'returned', NULL, '2026-07-17 19:30:00.000000', '2026-07-17 20:15:00.000000', '2026-07-17 23:45:00.000000', '2026-07-18 21:05:00.000000', NULL, NULL, '2026-07-18 23:40:00.000000', '2026-07-18 23:40:00.000000'),
  (39, 39, 'validated', NULL, '2026-07-19 06:30:00.000000', '2026-07-19 07:15:00.000000', NULL, NULL, NULL, NULL, NULL, '2026-07-19 07:15:00.000000'),
  (40, 40, 'validated', NULL, '2026-07-17 14:30:00.000000', '2026-07-17 15:15:00.000000', NULL, NULL, NULL, NULL, NULL, '2026-07-17 15:15:00.000000'),
  (41, 41, 'completed', 'PAY-OR-2026-7405', '2026-07-19 01:30:00.000000', NULL, NULL, NULL, '2026-07-19 02:25:00.000000', NULL, NULL, '2026-07-19 02:25:00.000000'),
  (42, 42, 'cancelled', NULL, '2026-07-20 12:30:00.000000', NULL, NULL, NULL, NULL, '2026-07-20 13:25:00.000000', NULL, '2026-07-20 13:25:00.000000'),
  (43, 43, 'validated', NULL, '2026-07-18 20:30:00.000000', '2026-07-18 21:15:00.000000', NULL, NULL, NULL, NULL, NULL, '2026-07-18 21:15:00.000000'),
  (44, 44, 'shipped', NULL, '2026-07-20 07:30:00.000000', '2026-07-20 08:15:00.000000', '2026-07-20 11:15:00.000000', NULL, NULL, NULL, NULL, '2026-07-20 11:15:00.000000'),
  (45, 45, 'shipped', NULL, '2026-07-21 18:30:00.000000', '2026-07-21 19:15:00.000000', '2026-07-21 22:30:00.000000', NULL, NULL, NULL, NULL, '2026-07-21 22:30:00.000000'),
  (46, 46, 'cancelled', NULL, '2026-07-20 02:30:00.000000', NULL, NULL, NULL, NULL, '2026-07-20 03:05:00.000000', NULL, '2026-07-20 03:05:00.000000'),
  (47, 47, 'validated', NULL, '2026-07-21 13:30:00.000000', '2026-07-21 14:15:00.000000', NULL, NULL, NULL, NULL, NULL, '2026-07-21 14:15:00.000000'),
  (48, 48, 'received', NULL, '2026-07-23 00:30:00.000000', '2026-07-23 01:15:00.000000', '2026-07-23 04:15:00.000000', '2026-07-24 01:35:00.000000', NULL, NULL, NULL, '2026-07-24 01:35:00.000000'),
  (49, 49, 'completed', 'PAY-OR-2026-7406', '2026-07-21 08:30:00.000000', '2026-07-21 09:15:00.000000', '2026-07-21 12:30:00.000000', '2026-07-22 10:50:00.000000', '2026-07-22 12:20:00.000000', NULL, NULL, '2026-07-22 12:20:00.000000'),
  (50, 50, 'unvalidated', NULL, '2026-07-22 19:30:00.000000', NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-22 19:30:00.000000'),
  (51, 51, 'completed', 'PAY-OR-2026-7407', '2026-07-24 06:30:00.000000', '2026-07-24 07:15:00.000000', '2026-07-24 11:00:00.000000', '2026-07-25 06:20:00.000000', '2026-07-25 07:40:00.000000', NULL, NULL, '2026-07-25 07:40:00.000000');

INSERT INTO `api_payment`
  (`id`, `order_id`, `total_balance`, `initial_balance`, `deductions`)
VALUES
  (1, 1, 8495.00, 8520.00, 25.00),
  (2, 2, 6990.00, 7040.00, 50.00),
  (3, 3, 9450.00, 9550.00, 100.00),
  (4, 4, 5230.00, 5380.00, 150.00),
  (5, 5, 8400.00, 8600.00, 200.00),
  (6, 6, 6870.00, 7120.00, 250.00),
  (7, 7, 4800.00, 5100.00, 300.00),
  (8, 8, 6440.00, 6790.00, 350.00),
  (9, 9, 280.00, 680.00, 400.00),
  (10, 10, 1380.00, 1380.00, 0.00),
  (11, 11, 8075.00, 8100.00, 25.00),
  (12, 12, 5250.00, 5300.00, 50.00),
  (13, 13, 5960.00, 6060.00, 100.00),
  (14, 14, 3260.00, 3410.00, 150.00),
  (15, 15, 5350.00, 5550.00, 200.00),
  (16, 16, 5720.00, 5970.00, 250.00),
  (17, 17, 4370.00, 4670.00, 300.00),
  (18, 18, 2060.00, 2410.00, 350.00),
  (19, 19, 6845.00, 7245.00, 400.00),
  (20, 20, 4510.00, 4510.00, 0.00),
  (21, 21, 5475.00, 5500.00, 25.00),
  (22, 22, 6540.00, 6590.00, 50.00),
  (23, 23, 4320.00, 4420.00, 100.00),
  (24, 24, 4850.00, 5000.00, 150.00),
  (25, 25, 8660.00, 8860.00, 200.00),
  (26, 26, 7340.00, 7590.00, 250.00),
  (27, 27, 10350.00, 10650.00, 300.00),
  (28, 28, 8900.00, 9250.00, 350.00),
  (29, 29, 6950.00, 7350.00, 400.00),
  (30, 30, 5790.00, 5790.00, 0.00),
  (31, 31, 6980.00, 7005.00, 25.00),
  (32, 32, 1080.00, 1130.00, 50.00),
  (33, 33, 3060.00, 3160.00, 100.00),
  (34, 34, 5140.00, 5290.00, 150.00),
  (35, 35, 3450.00, 3650.00, 200.00),
  (36, 36, 970.00, 1220.00, 250.00),
  (37, 37, 1630.00, 1930.00, 300.00),
  (38, 38, 5190.00, 5540.00, 350.00),
  (39, 39, 5620.00, 6020.00, 400.00),
  (40, 40, 5200.00, 5200.00, 0.00),
  (41, 41, 3615.00, 3640.00, 25.00),
  (42, 42, 3950.00, 4000.00, 50.00),
  (43, 43, 2590.00, 2690.00, 100.00),
  (44, 44, 6045.00, 6195.00, 150.00),
  (45, 45, 3300.00, 3500.00, 200.00),
  (46, 46, 3710.00, 3960.00, 250.00),
  (47, 47, 3550.00, 3850.00, 300.00),
  (48, 48, 2050.00, 2400.00, 350.00),
  (49, 49, 190.00, 590.00, 400.00),
  (50, 50, 3945.00, 3945.00, 0.00),
  (51, 51, 4175.00, 4200.00, 25.00);

UPDATE `auth_user`
SET
  `password` = 'pbkdf2_sha256$600000$n19WSYpp4LIMlnzfnw9kaT$uOR8AkEE7zpqYWDH1ECPG8zpPWGxHRtYl1U5vXmmf0E=',
  `is_superuser` = 1,
  `username` = 'motobai_admin',
  `first_name` = 'Motobai',
  `last_name` = 'Admin',
  `email` = 'admin@motobai.local',
  `is_staff` = 1,
  `is_active` = 1
WHERE `username` = '123'
  AND NOT EXISTS (
    SELECT 1
    FROM (SELECT `id` FROM `auth_user` WHERE `username` = 'motobai_admin') AS existing_seed_user
  );

DELETE FROM `auth_user`
WHERE `username` = '123';

INSERT INTO `auth_user`
  (`password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`)
VALUES
  ('pbkdf2_sha256$600000$n19WSYpp4LIMlnzfnw9kaT$uOR8AkEE7zpqYWDH1ECPG8zpPWGxHRtYl1U5vXmmf0E=', NULL, 1, 'motobai_admin', 'Motobai', 'Admin', 'admin@motobai.local', 1, 1, '2026-07-01 08:00:00.000000')
ON DUPLICATE KEY UPDATE
  `password` = VALUES(`password`),
  `is_superuser` = VALUES(`is_superuser`),
  `first_name` = VALUES(`first_name`),
  `last_name` = VALUES(`last_name`),
  `email` = VALUES(`email`),
  `is_staff` = VALUES(`is_staff`),
  `is_active` = VALUES(`is_active`);

COMMIT;
