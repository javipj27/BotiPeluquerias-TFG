-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: BotiPeluquerias
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cita`
--

DROP TABLE IF EXISTS `cita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cita` (
  `id` int NOT NULL AUTO_INCREMENT,
  `peluqueria` varchar(255) NOT NULL,
  `peluquero` varchar(100) NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `nombre_cliente` varchar(100) NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_3E379A62DB38439E` (`usuario_id`),
  CONSTRAINT `FK_3E379A62DB38439E` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cita`
--

LOCK TABLES `cita` WRITE;
/*!40000 ALTER TABLE `cita` DISABLE KEYS */;
INSERT INTO `cita` VALUES (1,'AG Barber','Gonzalo','2025-06-01 12:00:00','Javier',2),(2,'AG Barber','Adrian','2025-06-01 12:00:00','Javier',2),(3,'AG Barber','Adrian','2025-06-01 11:00:00','Sofia',4);
/*!40000 ALTER TABLE `cita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productos` json NOT NULL,
  `total` double NOT NULL,
  `fecha` datetime NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_9EC131FFDB38439E` (`usuario_id`),
  CONSTRAINT `FK_9EC131FFDB38439E` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES (1,'[{\"imagen\": \"http://localhost:8000/uploads/aftershave-683cbab05d351.webp\", \"nombre\": \"AfterShave\", \"precio\": \"10.71\", \"descripcion\": \"Conjunto de 3 AfterShave\"}]',10.71,'2025-06-01 20:49:44',2),(2,'[{\"imagen\": \"http://localhost:8000/uploads/cera-683cbb5933d3b.jpg\", \"nombre\": \"Cera Fijadora\", \"precio\": \"10.62\", \"descripcion\": \"Cera para el pelo fijadora\"}]',10.62,'2025-06-01 20:50:37',2),(3,'[{\"imagen\": \"http://localhost:8000/uploads/aftershave-683cbab05d351.webp\", \"nombre\": \"AfterShave\", \"precio\": \"12.90\", \"descripcion\": \"Conjunto de 3 AfterShave\"}]',12.9,'2025-06-01 21:21:01',4),(4,'[{\"imagen\": \"http://localhost:8000/uploads/champu-683cbdc4639a8.jpg\", \"nombre\": \"Champu\", \"precio\": \"11.93\", \"descripcion\": \"\"}]',11.93,'2025-06-01 21:21:47',4);
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctrine_migration_versions`
--

LOCK TABLES `doctrine_migration_versions` WRITE;
/*!40000 ALTER TABLE `doctrine_migration_versions` DISABLE KEYS */;
INSERT INTO `doctrine_migration_versions` VALUES ('DoctrineMigrations\\Version20250529235738','2025-06-01 14:09:25',619);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peluqueria`
--

DROP TABLE IF EXISTS `peluqueria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peluqueria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `descripcion` longtext NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `peluqueros` json DEFAULT NULL,
  `productos` json DEFAULT NULL,
  `galeria` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peluqueria`
--

LOCK TABLES `peluqueria` WRITE;
/*!40000 ALTER TABLE `peluqueria` DISABLE KEYS */;
INSERT INTO `peluqueria` VALUES (8,'sdcsd','sdcsd','sdcsd','sdcsdc','/uploads/bg-peluqueria-2-683f0c5027847.png','/uploads/logo-683f0c539d748.jpg','[\"scsdc\"]','[{\"imagen\": \"/uploads/polvos-683f0c5cb2adf.jpg\", \"nombre\": \"\", \"descripcion\": \"\"}]','[\"/uploads/pelo2-683f0c6232bc4.jpg\"]'),(9,'Peluquer├¡a Estilo ├Ünico','Calle Falsa 123, Madrid','912345678','Especialistas en cortes modernos y coloraci├│n.','https://ejemplo.com/imagen1.jpg','https://ejemplo.com/logo1.png','[{\"nombre\": \"Ana\", \"especialidad\": \"Color\"}, {\"nombre\": \"Luis\", \"especialidad\": \"Corte\"}]','[{\"nombre\": \"Champ├║ revitalizante\", \"precio\": 12.5}, {\"nombre\": \"Mascarilla nutritiva\", \"precio\": 15.0}]','[\"https://ejemplo.com/galeria1.jpg\", \"https://ejemplo.com/galeria2.jpg\"]'),(10,'Barber├¡a Moderna','Avenida Real 45, Barcelona','934567890','Barber├¡a tradicional y moderna para caballeros.','https://ejemplo.com/imagen2.jpg','https://ejemplo.com/logo2.png','[{\"nombre\": \"Carlos\", \"especialidad\": \"Barba\"}, {\"nombre\": \"Miguel\", \"especialidad\": \"Corte cl├ísico\"}]','[{\"nombre\": \"Cera para barba\", \"precio\": 8.0}]','[\"https://ejemplo.com/galeria3.jpg\"]');
/*!40000 ALTER TABLE `peluqueria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(180) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roles` json NOT NULL,
  `api_token` varchar(64) DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL,
  `verification_token` varchar(64) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `foto_perfil` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_2265B05DE7927C74` (`email`),
  UNIQUE KEY `UNIQ_2265B05DF85E0677` (`username`),
  UNIQUE KEY `UNIQ_2265B05D7BA2F5EB` (`api_token`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (2,'javipj27@gmail.com','$2y$13$yaGy3lLVd2MTqXBlYnao/uhOdE9puBbK0X7Nk3cU9LSfwvsodxFty','[\"ROLE_ADMIN\"]','V5kzPrKBN5cWiYWMPhpGBTHL2zMjs84u1XZDULVT',0,NULL,'javipj27','Javier','666144256',NULL),(3,'lucascp48@gmail.com','$2y$13$skDK2zA3M2sABUbbuuZ17.8II9dJVCte.KzISf3l9ReJlqrkL/xUe','[\"ROLE_USER\"]','NqKiHeXEfFAXiZjQe6oZYkZNkjwvzrtjhfxYtWLs',0,NULL,'lucascp','Lucas','123456789',NULL),(4,'sofia@gmail.com','$2y$13$ZYJtw01Gj9.px3t72fTMoujcuy8pRryE9nMDcNYqqbLloj5RSeTvm','[\"ROLE_USER\"]','RCw6cciiqJUvJn1sYGzEHUjN2Je3ARcFbRudRiSe',0,NULL,'Sofia','Sofia P├®rez','123456789',NULL),(5,'','$2y$13$taR7/zycK7kFVVbdgujAa.tFAyuWIkRcBDk3FyK.Fk9rqz.DtrPJa','[\"ROLE_USER\"]','NpkSWJxnmDASon52jeonPczeRmuGQtnAy2DckN9T',0,NULL,'','','',NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-03 17:58:03
