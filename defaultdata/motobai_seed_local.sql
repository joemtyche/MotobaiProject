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
  (5, 'Eversure', 'Christine Rivera', 'Owner', 'Davao City', 'Diversion Road', 'Block 8, Lot 27, Old San Isidro', '09822995969', 'eversosure@gmail.com', '2024-12-03 11:27:40.784390', 0);

INSERT IGNORE INTO `api_employee`
  (`id`, `city`, `barangay`, `street`, `phone_number`, `email`, `date_created`, `first_name`, `last_name`, `middle_name`, `is_deleted`)
VALUES
  (1, 'Davao City', 'Catalunan Pequeno', 'Block 8, Lot 27, Old San Isidro', '09566921912', 'joem@gmail.com', '2024-12-03 11:28:17.519558', 'Jose Emmanuel', 'Idpan', 'R.', 0),
  (2, 'Davao City', 'Ecoland', 'SM Megamall', '09865921911', 'thaddy@gmail.com', '2024-12-03 11:29:02.697559', 'Thaddeus', 'Domingo', 'C.', 0),
  (3, 'Davao City', 'Camella', 'Homes', '09866321911', 'ram@gmail.com', '2024-12-03 11:29:35.744666', 'Ram Christian', 'Nacar', 'N.', 0);

INSERT IGNORE INTO `api_product`
  (`id`, `product_name`, `price`, `brand`, `description`, `product_type`, `vehicle_type`, `sku`)
VALUES
  (1, 'TSMP WF Pulley', 550.00, 'TSMP', 'Nmax and Aerox models', 'Parts', 'Scooter', 'SCOOTER -001'),
  (2, 'TSMP Clutch Bell', 350.00, 'TSMP', 'Clutch Bell', 'Parts', 'Scooter', 'SCOOTER -002'),
  (3, 'TSMP Clutch Lining Assy', 550.00, 'TSMP', 'Nmax and Aerox', 'Parts', 'Scooter', 'SCOOTER -003'),
  (4, 'PRO HONDA ENGINE OIL 10W-30 SL', 315.00, 'PRO HONDA', '10W-30 SL API SERVICE JASO MB FULLY SYNTHETIC', 'Oils & Fluids', 'Motorcycle', 'MOTORCYCLE -001'),
  (5, 'MOTUL SCOOTER POWER LE 5w40', 550.00, 'MOTUL', '1Liter ( FULLY SYNTHETIC )', 'Oils & Fluids', 'Scooter', 'SCOOTER -004'),
  (6, 'OXFORD OX666 CARGO NET 17" X 17"', 490.00, 'OXFORD', 'CARGO NET 17" X 17"', 'Parts', 'Motorcycle', 'MOTORCYCLE -002'),
  (7, 'GIVI Z191 COMPRESSION SPRING', 50.00, 'GIVI', 'COMPRESSION SPRING', 'Parts', 'Motorcycle', 'MOTORCYCLE -003');

INSERT IGNORE INTO `api_inventory`
  (`id`, `stock`, `stock_minimum_threshold`, `date_added`, `date_updated`, `product_id`, `is_deleted`)
VALUES
  (1, 0, 50, '2024-12-03 11:32:48.502578', '2024-12-03 11:32:48.503578', 1, 0),
  (2, 0, 75, '2024-12-03 11:33:36.159245', '2024-12-03 11:33:36.159245', 2, 0),
  (3, 0, 100, '2024-12-03 11:34:24.814410', '2024-12-03 11:34:24.814410', 3, 0),
  (4, 0, 50, '2024-12-03 11:36:21.945341', '2024-12-03 11:36:21.945341', 4, 0),
  (5, 0, 135, '2024-12-03 11:38:26.814303', '2024-12-03 11:38:26.814303', 5, 0),
  (6, 0, 35, '2024-12-03 11:39:36.085666', '2024-12-03 11:39:36.085666', 6, 0),
  (7, 0, 250, '2024-12-03 11:40:24.703715', '2024-12-03 11:40:24.703715', 7, 0);

INSERT IGNORE INTO `api_supplier`
  (`id`, `supplier_name`, `phone_number`, `description`, `is_deleted`)
VALUES
  (1, 'Supplier 1', '09570311911', 'Secret Supplier', 0);

INSERT IGNORE INTO `auth_user`
  (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`)
VALUES
  (1, 'pbkdf2_sha256$720000$yY3CgY181NJgSobg9QBIoC$RCiYZ0NzsBrPokt+7r5KUw+XTmK4jclNMGDU6+dw/4s=', NULL, 0, '123', '', '', '', 0, 1, '2024-12-03 11:17:31.345176');

COMMIT;
