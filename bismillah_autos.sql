-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2020 at 11:27 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bismillah_autos`
--

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` bigint(255) NOT NULL,
  `brand_name` varchar(255) DEFAULT NULL,
  `number` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `credit` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `brand_name`, `number`, `address`, `creation_date`, `credit`) VALUES
(3, 'Hi Speed', '0312345678', 'larkana', '2020-10-06', 515000);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(255) NOT NULL,
  `serial_number` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `cast` varchar(100) DEFAULT NULL,
  `number` varchar(100) DEFAULT NULL,
  `cnic` bigint(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `account_creation_date` date DEFAULT NULL,
  `debit` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `serial_number`, `name`, `cast`, `number`, `cnic`, `address`, `account_creation_date`, `debit`) VALUES
(21, 'C-21', 'Shahzaib', 'Bhurt', '03012543002', 4120442533701, 'jamshoro', '2020-10-06', 3000),
(22, 'C-22', 'Ab basit', 'Memon', '03332158525', 42526645265632, 'larkana', '2020-10-06', -72500),
(23, 'C-23', 'Gaffar', 'Pahore', '03312544255', 4522452563256, 'johi', '2020-10-06', 0);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(255) NOT NULL,
  `e_date` date DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `model` int(11) DEFAULT NULL,
  `motor_type` varchar(100) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `cc` varchar(50) DEFAULT NULL,
  `engin_number` varchar(100) DEFAULT NULL,
  `chasis_number` varchar(100) DEFAULT NULL,
  `total_price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `e_date`, `brand`, `model`, `motor_type`, `color`, `cc`, `engin_number`, `chasis_number`, `total_price`) VALUES
(75, '2020-10-06', 'Hi Speed', 2020, 'MotorCycle', 'Black', '125', 'ddd-1213213', 'eee-231233', 105000),
(76, '2020-10-06', 'Hi Speed', 2020, 'MotorCycle', 'Black', '70', 'hhh-12312', 'ooo-23131', 55000),
(77, '2020-10-10', 'Hi Speed', 2021, 'Loader', 'White', '150', '123456', '789456', 50000),
(83, '2020-10-11', 'Hi Speed', 2020, 'MotorCycle', 'Red', '70', '3479115', '4282221', 51000),
(87, '2020-10-11', 'Hi Speed', 2020, 'MotorCycle', 'Red', '70', '3477341', '4282190', 51000);

-- --------------------------------------------------------

--
-- Table structure for table `purchase_history`
--

CREATE TABLE `purchase_history` (
  `id` bigint(255) NOT NULL,
  `e_date` date DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `model` int(11) DEFAULT NULL,
  `motor_type` varchar(100) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `cc` varchar(50) DEFAULT NULL,
  `engin_number` varchar(100) DEFAULT NULL,
  `chasis_number` varchar(100) DEFAULT NULL,
  `total_price` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `cash` int(11) DEFAULT NULL,
  `balance` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchase_history`
--

INSERT INTO `purchase_history` (`id`, `e_date`, `brand`, `model`, `motor_type`, `color`, `cc`, `engin_number`, `chasis_number`, `total_price`, `description`, `cash`, `balance`) VALUES
(5, '2020-10-06', 'Hi Speed', 2020, 'MotorCycle', 'Black', '70', 'aaa-123344', 'bbb_13123', 55000, NULL, NULL, 55000),
(6, '2020-10-06', 'Hi Speed', 2020, 'MotorCycle', 'Black', '70', 'bbb-121312', 'aaa-121321', 55000, NULL, NULL, 110000),
(7, '2020-10-06', 'Hi Speed', 2020, 'MotorCycle', 'Black', '125', 'ccc-123322', 'ddd-131233', 105000, NULL, NULL, 215000),
(8, '2020-10-06', 'Hi Speed', 2020, 'MotorCycle', 'Black', '125', 'ddd-1213213', 'eee-231233', 105000, NULL, NULL, 320000),
(9, '2020-10-06', 'Hi Speed', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'xyz', 21000, 299000),
(10, '2020-10-06', 'Hi Speed', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'abc', 64000, 235000),
(11, '2020-10-06', 'Hi Speed', 2020, 'MotorCycle', 'Black', '70', 'hhh-12312', 'ooo-23131', 55000, NULL, NULL, 290000),
(12, '2020-10-10', 'Hi Speed', 2021, 'Loader', 'White', '150', '123456', '789456', 50000, NULL, NULL, 340000),
(13, '2020-10-11', 'Hi Speed', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Own', 300000, 40000),
(14, '2020-10-11', 'Hi Speed', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Own', 30000, 10000),
(15, '2020-10-11', 'Hi Speed', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Own', 5000, 5000),
(16, '2020-10-11', 'Hi Speed', 2020, 'MotorCycle', 'Red', '70', '3481608', '4282184', 51000, NULL, NULL, 56000),
(17, '2020-10-11', 'Hi Speed', 2020, 'MotorCycle', 'Red', '70', '3481630', '4282173', 51000, NULL, NULL, 107000),
(18, '2020-10-11', 'Hi Speed', 2020, 'MotorCycle', 'Red', '70', '3477401', '4281911', 51000, NULL, NULL, 158000),
(19, '2020-10-11', 'Hi Speed', 2020, 'MotorCycle', 'Red', '70', '3477341', '4282190', 51000, NULL, NULL, 209000),
(20, '2020-10-11', 'Hi Speed', 2020, 'MotorCycle', 'Red', '70', '3477341', '4282190', 51000, NULL, NULL, 260000),
(21, '2020-10-11', 'Hi Speed', 2020, 'MotorCycle', 'Red', '70', '3479115', '4282221', 51000, NULL, NULL, 311000),
(22, '2020-10-11', 'Hi Speed', 2020, 'MotorCycle', 'Red', '70', '3481557', '4282232', 51000, NULL, NULL, 362000),
(23, '2020-10-11', 'Hi Speed', 2020, 'MotorCycle', 'Red', '70', '3481609', '4281956', 51000, NULL, NULL, 413000),
(24, '2020-10-11', 'Hi Speed', 2020, 'MotorCycle', 'Red', '70', '3477385', '4282178', 51000, NULL, NULL, 464000),
(25, '2020-10-11', 'Hi Speed', 2020, 'MotorCycle', 'Red', '70', '3477341', '4282190', 51000, NULL, NULL, 515000);

-- --------------------------------------------------------

--
-- Table structure for table `sales_history`
--

CREATE TABLE `sales_history` (
  `id` bigint(255) NOT NULL,
  `serial_number` varchar(100) DEFAULT NULL,
  `order_dateTime` datetime DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `cnic` bigint(100) DEFAULT NULL,
  `number` bigint(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `model` int(11) DEFAULT NULL,
  `motor_type` varchar(100) DEFAULT 'NULL',
  `cc` varchar(100) DEFAULT 'NULL',
  `color` varchar(100) DEFAULT NULL,
  `engine_number` varchar(100) DEFAULT NULL,
  `chasis_number` varchar(100) DEFAULT NULL,
  `total_price` int(11) DEFAULT NULL,
  `letter_status` varchar(50) DEFAULT NULL,
  `payment_type` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `cash` int(11) DEFAULT NULL,
  `balance` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sales_history`
--

INSERT INTO `sales_history` (`id`, `serial_number`, `order_dateTime`, `name`, `cnic`, `number`, `address`, `brand`, `model`, `motor_type`, `cc`, `color`, `engine_number`, `chasis_number`, `total_price`, `letter_status`, `payment_type`, `description`, `cash`, `balance`) VALUES
(126, 'S-1', '2020-10-06 22:52:38', 'Shahzaib Bhurt', 45646542132165, 3021546512, 'block c house no 14', 'Hi Speed', 2020, 'MotorCycle', '70', 'Black', 'aaa-123344', 'bbb_13123', 60000, 'Picked', NULL, NULL, NULL, 60000),
(127, 'C-21', '2020-10-06 23:10:13', 'Shahzaib', 4120442533701, 3012543002, 'jamshoro', 'Hi Speed', 2020, 'MotorCycle', '70', 'Black', 'bbb-121312', 'aaa-121321', 60000, NULL, NULL, NULL, NULL, 60000),
(128, 'C-21', '2020-10-06 23:10:13', 'Shahzaib', 4120442533701, 3012543002, 'jamshoro', 'Hi Speed', 2020, 'MotorCycle', '125', 'Black', 'ccc-123322', 'ddd-131233', 120000, NULL, NULL, NULL, NULL, 180000),
(129, 'c-21', '2020-10-06 23:24:51', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, 'Cash', 'xyz', 32000, 148000),
(130, 'c-21', '2020-10-06 23:25:14', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, 'Cash', 'abcde', 45000, 103000),
(131, NULL, '2020-10-10 01:44:39', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(132, 'c-21', '2020-10-10 21:19:41', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, 'Cash', 'through basit', 100000, 3000),
(133, 'c-21', '2020-10-10 22:33:15', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, NULL, 'Basit', 1000, 2000),
(134, 'c-21', '2020-10-10 22:33:31', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, NULL, 'Basit', 1000, NULL),
(135, 'c-21', '2020-10-10 22:36:27', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, NULL, 'fdfdf', 1000, NULL),
(136, 'c-21', '2020-10-10 22:42:51', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, NULL, 'sdsd', 1000, NULL),
(137, 'c-21', '2020-10-10 22:49:50', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, NULL, 'sdsds', 1000, 3000),
(138, 'c-21', '2020-10-10 22:50:19', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, NULL, 'qwqwq', 1000, 4000),
(139, 'c-21', '2020-10-10 22:59:03', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, 1000, NULL, 'Cash', 'fsfs', NULL, 5000),
(140, 'c-21', '2020-10-10 23:02:36', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, NULL, 'dgfhfd', 1000, 4000),
(141, 'c-22', '2020-10-10 23:06:25', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, 10000, NULL, 'Cash', 'Own', NULL, 10000),
(142, 'c-22', '2020-10-10 23:06:45', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, 'Cash', 'Own', 5000, 5000),
(143, 'c-22', '2020-10-10 23:07:02', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, 15000, NULL, 'Cash', 'Own', NULL, 20000),
(144, 'c-22', '2020-10-10 23:07:27', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, 'Cash', 'Own', 18000, 2000),
(145, 'c-22', '2020-10-11 17:15:26', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, 'Cash', 'Own', 1000, 1000),
(146, 'c-22', '2020-10-11 17:16:17', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, 10000, NULL, 'Cash', 'Own', NULL, 11000),
(147, 'S-147', '2020-10-11 19:43:17', 'Abdullah', 4320375843551, 3312606119, 'Larkana', 'Hi Speed', 2020, 'MotorCycle', '70', 'Red', '3481608', '4282184', 52000, 'Picked', NULL, NULL, NULL, 52000),
(148, 'S-148', '2020-10-11 19:45:18', 'Abdullah', 4320375843551, 3312606119, 'Larkana', 'Hi Speed', 2020, 'MotorCycle', '70', 'Red', '3481609', '4281956', 52000, NULL, NULL, NULL, NULL, 52000),
(149, 'C-22', '2020-10-11 19:58:58', 'Ab basit', 42526645265632, 3332158525, 'larkana', 'Hi Speed', 2020, 'MotorCycle', '70', 'Red', '3477401', '4281911', 51500, 'Picked', NULL, NULL, NULL, 62500),
(150, 'c-22', '2020-10-11 21:39:58', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, 15000, NULL, 'Cash', 'Own', NULL, 77500),
(151, 'c-22', '2020-10-11 21:40:55', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, 'Cash', 'Own', 150000, -72500),
(152, 'c-21', '2020-10-13 11:41:23', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, 'Cash', 'own', 1000, 3000);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(255) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'autos', '$2a$10$moe17weN7aAO7.WRxyk6yeZSUdKSsqNEOzQhck7E8vpV98/.vk/aO');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchase_history`
--
ALTER TABLE `purchase_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales_history`
--
ALTER TABLE `sales_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `purchase_history`
--
ALTER TABLE `purchase_history`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `sales_history`
--
ALTER TABLE `sales_history`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
