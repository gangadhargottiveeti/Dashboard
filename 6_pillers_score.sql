-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 29, 2024 at 10:52 AM
-- Server version: 10.6.17-MariaDB
-- PHP Version: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gdgwqeas_exam`
--

-- --------------------------------------------------------

--
-- Table structure for table `6_pillers_score`
--

CREATE TABLE `6_pillers_score` (
  `id` int(11) NOT NULL,
  `std_id` int(11) DEFAULT NULL,
  `overall_score` varchar(11) DEFAULT NULL,
  `ctps` varchar(11) DEFAULT NULL,
  `sdl` varchar(11) DEFAULT NULL,
  `ec` varchar(11) DEFAULT NULL,
  `colab` varchar(11) DEFAULT NULL,
  `academic_mindset` varchar(11) DEFAULT NULL,
  `mcac` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `6_pillers_score`
--

INSERT INTO `6_pillers_score` (`id`, `std_id`, `overall_score`, `ctps`, `sdl`, `ec`, `colab`, `academic_mindset`, `mcac`) VALUES
(1449, 1, '0.8', '2.3', '2.1', '0.3', '0.4', '0', '0.8');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `6_pillers_score`
--
ALTER TABLE `6_pillers_score`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `6_pillers_score`
--
ALTER TABLE `6_pillers_score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1743;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
