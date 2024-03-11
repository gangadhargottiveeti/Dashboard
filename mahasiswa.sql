-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 29, 2024 at 10:51 AM
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
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id_mahasiswa` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `nim` char(20) NOT NULL,
  `email` varchar(254) NOT NULL,
  `jenis_kelamin` enum('L','P') NOT NULL,
  `kelas_id` int(11) NOT NULL COMMENT 'kelas&jurusan',
  `registration_type` enum('1','2') DEFAULT NULL COMMENT '1 is registered by internal team, 2 is registered by students',
  `exam_start_time` datetime DEFAULT NULL,
  `exam_end_time` datetime DEFAULT NULL,
  `reschedule_status` enum('0','1') NOT NULL DEFAULT '0',
  `page_status` enum('0','1','2','3') NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`id_mahasiswa`, `nama`, `nim`, `email`, `jenis_kelamin`, `kelas_id`, `registration_type`, `exam_start_time`, `exam_end_time`, `reschedule_status`, `page_status`) VALUES
(1, 'Tharun Sundar', '8297194864', 'tharun.sundar.three3@gmail.com', 'L', 1, '2', '2024-01-29 17:00:00', '2024-01-29 19:00:00', '1', '3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`id_mahasiswa`),
  ADD UNIQUE KEY `nim` (`nim`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `kelas_id` (`kelas_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `id_mahasiswa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=548;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
