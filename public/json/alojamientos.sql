-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: idw
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alojamientos`
--

DROP TABLE IF EXISTS `alojamientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alojamientos` (
  `idAlojamiento` int NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(255) NOT NULL,
  `Descripcion` text,
  `Latitud` decimal(10,8) NOT NULL,
  `Longitud` decimal(11,8) NOT NULL,
  `PrecioPorDia` decimal(10,2) NOT NULL,
  `CantidadDormitorios` int NOT NULL,
  `CantidadBanios` int NOT NULL,
  `Estado` enum('Disponible','Reservado') NOT NULL,
  `TipoAlojamiento` int DEFAULT NULL,
  `idTipoAlojamiento` int DEFAULT NULL,
  PRIMARY KEY (`idAlojamiento`),
  KEY `idTipoAlojamiento` (`idTipoAlojamiento`),
  CONSTRAINT `alojamientos_ibfk_1` FOREIGN KEY (`idTipoAlojamiento`) REFERENCES `tiposalojamiento` (`idTipoAlojamiento`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alojamientos`
--

LOCK TABLES `alojamientos` WRITE;
/*!40000 ALTER TABLE `alojamientos` DISABLE KEYS */;
INSERT INTO `alojamientos` VALUES (5,'Hotel Bicentenario Mendoza','El Hotel Bicentenario Suites & Spa se encuentra en Mendoza y ofrece un spa, piscina y centro de fitness.',10.10000000,10.10000000,15.40,1,1,'Disponible',1,9),(6,'Hotel Termas Victoria Wellness Spa','Con wifi gratis en todo el alojamiento, una terraza solárium con piscina, restaurante y centro de fitness.',9.20000000,13.22000000,30.50,1,1,'Reservado',11,11),(7,'Patagonia Plaza Hotel','El Patagonia Plaza Hotel cuenta con instalaciones de primera categoría, como piscina climatizada y gimnasio',93.00000000,11.50000000,25.20,3,2,'Disponible',10,10),(8,'Hotel Salta','Ubicado en el centro de Salta. Dispone de un restaurante con vistas panorámicas y ofrece aparcamiento gratuito.',99.20000000,54.22000000,43.00,2,1,'Reservado',7,7),(9,'Hotel Altos de la Viña','Sus habitaciones tienen WiFi gratuita y se encuentra en San Salvador de Jujuy. El Museo José Pasquini López está a 50 metros.',32.20000000,17.22000000,52.00,1,1,'Disponible',8,8),(10,'Los Acebos Ushuaia Hotel','Los Acebos ofrece sabores gourmet, decoración impecable y espléndidas vistas al canal Beagle desde todas sus habitaciones',10.20000000,11.22000000,55.50,3,3,'Disponible',9,9),(11,'Design Suites Bariloche','El establecimiento Design Suites Bariloche está situado frente al lago Nahuel Huapi y ofrece habitaciones con vistas al lago o a la montaña.',33.20100000,66.32100000,66.00,2,1,'Reservado',10,10),(12,'Hotel Costa Galana','Ofrece un alojamiento elegante, una gastronomía excelente y diversas instalaciones de ocio y de negocios.',50.20000000,26.22000000,105.50,1,1,'Disponible',11,11);
/*!40000 ALTER TABLE `alojamientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alojamientoservicios`
--

DROP TABLE IF EXISTS `alojamientoservicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alojamientoservicios` (
  `idAlojamientoServicio` int NOT NULL AUTO_INCREMENT,
  `idAlojamiento` int DEFAULT NULL,
  `idServicio` int DEFAULT NULL,
  PRIMARY KEY (`idAlojamientoServicio`),
  KEY `idAlojamiento` (`idAlojamiento`),
  KEY `idServicio` (`idServicio`),
  CONSTRAINT `alojamientoservicios_ibfk_1` FOREIGN KEY (`idAlojamiento`) REFERENCES `alojamientos` (`idAlojamiento`),
  CONSTRAINT `alojamientoservicios_ibfk_2` FOREIGN KEY (`idServicio`) REFERENCES `servicios` (`idServicio`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alojamientoservicios`
--

LOCK TABLES `alojamientoservicios` WRITE;
/*!40000 ALTER TABLE `alojamientoservicios` DISABLE KEYS */;
INSERT INTO `alojamientoservicios` VALUES (2,5,1),(3,5,3),(7,6,2),(8,6,4),(9,7,1),(10,7,3),(11,8,1),(12,8,2),(13,9,2),(14,9,3),(15,10,1),(16,10,2),(17,11,1),(18,11,2),(19,12,4),(20,12,3);
/*!40000 ALTER TABLE `alojamientoservicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `idImagen` int NOT NULL AUTO_INCREMENT,
  `idAlojamiento` int DEFAULT NULL,
  `RutaArchivo` varchar(255) NOT NULL,
  PRIMARY KEY (`idImagen`),
  KEY `idAlojamiento` (`idAlojamiento`),
  CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`idAlojamiento`) REFERENCES `alojamientos` (`idAlojamiento`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT INTO `imagenes` VALUES (21,5,'../json/img/bicen1.jpg'),(22,5,'../json/img/bicen2.jpg'),(23,5,'../json/img/bicen3.jpg'),(24,6,'../json/img/vic1.jpg'),(25,6,'../json/img/vic2.jpg'),(26,6,'../json/img/vic3.jpg'),(27,7,'../json/img/sanm1.jpg'),(28,7,'../json/img/sanm2.jpg'),(29,7,'../json/img/sanm3.jpg'),(30,8,'../json/img/sal1.jpg'),(31,8,'../json/img/sal2.jpg'),(32,8,'../json/img/sal3.jpg'),(33,9,'../json/img/juj1.jpg'),(34,9,'../json/img/juj2.jpg'),(35,9,'../json/img/juj3.jpg'),(36,10,'../json/img/ush1.jpg'),(37,10,'../json/img/ush2.jpg'),(38,10,'../json/img/ush3.jpg'),(39,11,'../json/img/bar1.jpg'),(40,11,'../json/img/bar2.jpg'),(41,11,'../json/img/bar3.jpg'),(42,12,'../json/img/mar1.jpg'),(43,12,'../json/img/mar2.jpg'),(44,12,'../json/img/mar3.jpg');
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `idServicio` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idServicio`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (1,'wifi'),(2,'estacionamiento'),(3,'secador de pelo'),(4,'piscina');
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiposalojamiento`
--

DROP TABLE IF EXISTS `tiposalojamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiposalojamiento` (
  `idTipoAlojamiento` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`idTipoAlojamiento`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiposalojamiento`
--

LOCK TABLES `tiposalojamiento` WRITE;
/*!40000 ALTER TABLE `tiposalojamiento` DISABLE KEYS */;
INSERT INTO `tiposalojamiento` VALUES (7,'Hostel'),(8,'Apartamento'),(9,'Hotel'),(10,'Habitacion privada'),(11,'Hotel/Spa');
/*!40000 ALTER TABLE `tiposalojamiento` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-26 21:05:55
