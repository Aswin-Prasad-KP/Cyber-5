-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2024 at 06:51 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `redact`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `aid` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(256) NOT NULL,
  `pwd` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`aid`, `name`, `email`, `pwd`) VALUES
(1, 'John', 'jk@mail.co', '$2y$10$UCiSWYMRRJjQ3H81uO814O0kwm38KF5Kl8fPJdCOCRNnwHmwsw5sW');

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE `file` (
  `fid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `location` text NOT NULL,
  `type` enum('image','video','pdf','doc') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `file`
--

INSERT INTO `file` (`fid`, `uid`, `location`, `type`) VALUES
(9, 4, '4f587acfa9704f2729b734e18907efbae.pdf', 'pdf'),
(10, 4, '451ed968f58f3766c9cabf39fa272aee0.jpg', 'image'),
(11, 4, '498715b7c8d0be0dd2204ec44690c8b2e.docx', 'doc'),
(12, 4, '445825ec1e934f89798ea531c30cda0ad.jpg', 'image'),
(13, 4, '41ff358ecdc7001101af3d88049a3c8d7.pdf', 'pdf'),
(14, 4, '448f1e38daf2b25e018b5d9cb427c5742.docx', 'doc'),
(15, 4, 'redacted_20240911_082305.jpeg', 'image'),
(16, 4, 'redacted_20240911_082453.jpeg', 'image');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int(11) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `lname` varchar(30) DEFAULT NULL,
  `email` varchar(256) NOT NULL,
  `pwd` varchar(256) NOT NULL,
  `img` varchar(256) NOT NULL DEFAULT 'defimg.png'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `fname`, `lname`, `email`, `pwd`, `img`) VALUES
(4, 'Johny', 'Doe', 'jd@mail.co', '$2y$10$hF7LHu2ZJtF3vAiHC3iJgu/tpr0e1ST9x.L1mQ3v2BTW7xBwmAQK.', 'defimg.png'),
(5, 'Stuat', 'Little', 'sl@mail.co', '$2y$10$6ZdrkMMv4MbjfWLATXTb7OSEXJP0vWCQtcWFxQpY5dmAZn0I7VxCy', 'defimg.png'),
(6, 'lydia', 'joanna', 'abc@gmail.com', '$2y$10$HnayT6nvgpbH1.jlfD6apuHNGWdLDDQ9PQW5898V6asAs.Z5H.KYG', 'defimg.png');

-- --------------------------------------------------------

--
-- Table structure for table `verify`
--

CREATE TABLE `verify` (
  `id` int(11) NOT NULL,
  `email` varchar(256) NOT NULL,
  `token` varchar(256) NOT NULL DEFAULT 'x0y1z2',
  `otp` varchar(6) NOT NULL DEFAULT '000000'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`aid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`fid`),
  ADD UNIQUE KEY `location` (`location`) USING HASH,
  ADD KEY `UID_FK` (`uid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `verify`
--
ALTER TABLE `verify`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `file`
--
ALTER TABLE `file`
  MODIFY `fid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `verify`
--
ALTER TABLE `verify`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `file`
--
ALTER TABLE `file`
  ADD CONSTRAINT `UID_FK` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
