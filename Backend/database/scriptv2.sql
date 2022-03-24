-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: 34.72.212.208    Database: sa
-- ------------------------------------------------------
-- Server version	5.7.36-google

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
-- Table structure for table `Competencia`
--

DROP TABLE IF EXISTS `Competencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Competencia` (
  `id_competencia` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `champion_team` int(11) DEFAULT NULL,
  `type` varchar(100) NOT NULL,
  `year` int(11) NOT NULL,
  `id_Country` int(11) NOT NULL,
  PRIMARY KEY (`id_competencia`,`id_Country`),
  KEY `fk_Competencia_Country1` (`id_Country`),
  CONSTRAINT `fk_Competencia_Country1` FOREIGN KEY (`id_Country`) REFERENCES `Country` (`id_Country`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Competencia`
--

LOCK TABLES `Competencia` WRITE;
/*!40000 ALTER TABLE `Competencia` DISABLE KEYS */;
INSERT INTO `Competencia` VALUES (1,'Champions',1,'Liga',2010,1);
/*!40000 ALTER TABLE `Competencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Country`
--

DROP TABLE IF EXISTS `Country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Country` (
  `id_Country` int(11) NOT NULL AUTO_INCREMENT,
  `country` varchar(45) NOT NULL,
  `nationality` varchar(45) DEFAULT NULL,
  `iso` char(2) NOT NULL,
  `nicename` varchar(80) NOT NULL,
  `iso3` char(3) DEFAULT NULL,
  `numcode` smallint(6) DEFAULT NULL,
  `phonecode` int(5) NOT NULL,
  PRIMARY KEY (`id_Country`)
) ENGINE=InnoDB AUTO_INCREMENT=180 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Country`
--

LOCK TABLES `Country` WRITE;
/*!40000 ALTER TABLE `Country` DISABLE KEYS */;
INSERT INTO `Country` VALUES (1,'Guatemala','Guatemalteco','','','',0,0),(2,'AFGHANISTAN',NULL,'AF','Afghanistan','AFG',4,93),(3,'ALBANIA',NULL,'AL','Albania','ALB',8,355),(4,'ALGERIA',NULL,'DZ','Algeria','DZA',12,213),(5,'AMERICAN SAMOA',NULL,'AS','American Samoa','ASM',16,1684),(6,'ANDORRA',NULL,'AD','Andorra','AND',20,376),(7,'ANGOLA',NULL,'AO','Angola','AGO',24,244),(8,'ANGUILLA',NULL,'AI','Anguilla','AIA',660,1264),(9,'ANTARCTICA',NULL,'AQ','Antarctica',NULL,NULL,0),(10,'ANTIGUA AND BARBUDA',NULL,'AG','Antigua and Barbuda','ATG',28,1268),(11,'ARGENTINA',NULL,'AR','Argentina','ARG',32,54),(12,'ARMENIA',NULL,'AM','Armenia','ARM',51,374),(13,'ARUBA',NULL,'AW','Aruba','ABW',533,297),(14,'AUSTRALIA',NULL,'AU','Australia','AUS',36,61),(15,'AUSTRIA',NULL,'AT','Austria','AUT',40,43),(16,'AZERBAIJAN',NULL,'AZ','Azerbaijan','AZE',31,994),(17,'BAHAMAS',NULL,'BS','Bahamas','BHS',44,1242),(18,'BAHRAIN',NULL,'BH','Bahrain','BHR',48,973),(19,'BANGLADESH',NULL,'BD','Bangladesh','BGD',50,880),(20,'BARBADOS',NULL,'BB','Barbados','BRB',52,1246),(21,'BELARUS',NULL,'BY','Belarus','BLR',112,375),(22,'BELGIUM',NULL,'BE','Belgium','BEL',56,32),(23,'BELIZE',NULL,'BZ','Belize','BLZ',84,501),(24,'BENIN',NULL,'BJ','Benin','BEN',204,229),(25,'BERMUDA',NULL,'BM','Bermuda','BMU',60,1441),(26,'BHUTAN',NULL,'BT','Bhutan','BTN',64,975),(27,'BOLIVIA',NULL,'BO','Bolivia','BOL',68,591),(28,'BOSNIA AND HERZEGOVINA',NULL,'BA','Bosnia and Herzegovina','BIH',70,387),(29,'BOTSWANA',NULL,'BW','Botswana','BWA',72,267),(30,'BOUVET ISLAND',NULL,'BV','Bouvet Island',NULL,NULL,0),(31,'BRAZIL',NULL,'BR','Brazil','BRA',76,55),(32,'BRITISH INDIAN OCEAN TERRITORY',NULL,'IO','British Indian Ocean Territory',NULL,NULL,246),(33,'BRUNEI DARUSSALAM',NULL,'BN','Brunei Darussalam','BRN',96,673),(34,'BULGARIA',NULL,'BG','Bulgaria','BGR',100,359),(35,'BURKINA FASO',NULL,'BF','Burkina Faso','BFA',854,226),(36,'BURUNDI',NULL,'BI','Burundi','BDI',108,257),(37,'CAMBODIA',NULL,'KH','Cambodia','KHM',116,855),(38,'CAMEROON',NULL,'CM','Cameroon','CMR',120,237),(39,'CANADA',NULL,'CA','Canada','CAN',124,1),(40,'CAPE VERDE',NULL,'CV','Cape Verde','CPV',132,238),(41,'CAYMAN ISLANDS',NULL,'KY','Cayman Islands','CYM',136,1345),(42,'CENTRAL AFRICAN REPUBLIC',NULL,'CF','Central African Republic','CAF',140,236),(43,'CHAD',NULL,'TD','Chad','TCD',148,235),(44,'CHILE',NULL,'CL','Chile','CHL',152,56),(45,'CHINA',NULL,'CN','China','CHN',156,86),(46,'CHRISTMAS ISLAND',NULL,'CX','Christmas Island',NULL,NULL,61),(47,'COCOS (KEELING) ISLANDS',NULL,'CC','Cocos (Keeling) Islands',NULL,NULL,672),(48,'COLOMBIA',NULL,'CO','Colombia','COL',170,57),(49,'COMOROS',NULL,'KM','Comoros','COM',174,269),(50,'CONGO',NULL,'CG','Congo','COG',178,242),(51,'CONGO, THE DEMOCRATIC REPUBLIC OF THE',NULL,'CD','Congo, the Democratic Republic of the','COD',180,242),(52,'COOK ISLANDS',NULL,'CK','Cook Islands','COK',184,682),(53,'COSTA RICA',NULL,'CR','Costa Rica','CRI',188,506),(54,'COTE D\'IVOIRE',NULL,'CI','Cote D\'Ivoire','CIV',384,225),(55,'CROATIA',NULL,'HR','Croatia','HRV',191,385),(56,'CUBA',NULL,'CU','Cuba','CUB',192,53),(57,'CYPRUS',NULL,'CY','Cyprus','CYP',196,357),(58,'CZECH REPUBLIC',NULL,'CZ','Czech Republic','CZE',203,420),(59,'DENMARK',NULL,'DK','Denmark','DNK',208,45),(60,'DJIBOUTI',NULL,'DJ','Djibouti','DJI',262,253),(61,'DOMINICA',NULL,'DM','Dominica','DMA',212,1767),(62,'DOMINICAN REPUBLIC',NULL,'DO','Dominican Republic','DOM',214,1809),(63,'ECUADOR',NULL,'EC','Ecuador','ECU',218,593),(64,'EGYPT',NULL,'EG','Egypt','EGY',818,20),(65,'EL SALVADOR',NULL,'SV','El Salvador','SLV',222,503),(66,'EQUATORIAL GUINEA',NULL,'GQ','Equatorial Guinea','GNQ',226,240),(67,'ERITREA',NULL,'ER','Eritrea','ERI',232,291),(68,'ESTONIA',NULL,'EE','Estonia','EST',233,372),(69,'ETHIOPIA',NULL,'ET','Ethiopia','ETH',231,251),(70,'FALKLAND ISLANDS (MALVINAS)',NULL,'FK','Falkland Islands (Malvinas)','FLK',238,500),(71,'FAROE ISLANDS',NULL,'FO','Faroe Islands','FRO',234,298),(72,'FIJI',NULL,'FJ','Fiji','FJI',242,679),(73,'FINLAND',NULL,'FI','Finland','FIN',246,358),(74,'FRANCE',NULL,'FR','France','FRA',250,33),(75,'FRENCH GUIANA',NULL,'GF','French Guiana','GUF',254,594),(76,'FRENCH POLYNESIA',NULL,'PF','French Polynesia','PYF',258,689),(77,'FRENCH SOUTHERN TERRITORIES',NULL,'TF','French Southern Territories',NULL,NULL,0),(78,'GABON',NULL,'GA','Gabon','GAB',266,241),(79,'GAMBIA',NULL,'GM','Gambia','GMB',270,220),(80,'GEORGIA',NULL,'GE','Georgia','GEO',268,995),(81,'GERMANY',NULL,'DE','Germany','DEU',276,49),(82,'GHANA',NULL,'GH','Ghana','GHA',288,233),(83,'GIBRALTAR',NULL,'GI','Gibraltar','GIB',292,350),(84,'GREECE',NULL,'GR','Greece','GRC',300,30),(85,'GREENLAND',NULL,'GL','Greenland','GRL',304,299),(86,'GRENADA',NULL,'GD','Grenada','GRD',308,1473),(87,'GUADELOUPE',NULL,'GP','Guadeloupe','GLP',312,590),(88,'GUAM',NULL,'GU','Guam','GUM',316,1671),(89,'GUATEMALA2',NULL,'GT','Guatemala2','GTM',320,502),(90,'GUINEA',NULL,'GN','Guinea','GIN',324,224),(91,'GUINEA-BISSAU',NULL,'GW','Guinea-Bissau','GNB',624,245),(92,'GUYANA',NULL,'GY','Guyana','GUY',328,592),(93,'HAITI',NULL,'HT','Haiti','HTI',332,509),(94,'HEARD ISLAND AND MCDONALD ISLANDS',NULL,'HM','Heard Island and Mcdonald Islands',NULL,NULL,0),(95,'HOLY SEE (VATICAN CITY STATE)',NULL,'VA','Holy See (Vatican City State)','VAT',336,39),(96,'HONDURAS',NULL,'HN','Honduras','HND',340,504),(97,'HONG KONG',NULL,'HK','Hong Kong','HKG',344,852),(98,'HUNGARY',NULL,'HU','Hungary','HUN',348,36),(99,'ICELAND',NULL,'IS','Iceland','ISL',352,354),(100,'INDIA',NULL,'IN','India','IND',356,91),(101,'INDONESIA',NULL,'ID','Indonesia','IDN',360,62),(102,'IRAN, ISLAMIC REPUBLIC OF',NULL,'IR','Iran, Islamic Republic of','IRN',364,98),(103,'IRAQ',NULL,'IQ','Iraq','IRQ',368,964),(104,'IRELAND',NULL,'IE','Ireland','IRL',372,353),(105,'ISRAEL',NULL,'IL','Israel','ISR',376,972),(106,'ITALY',NULL,'IT','Italy','ITA',380,39),(107,'JAMAICA',NULL,'JM','Jamaica','JAM',388,1876),(108,'JAPAN',NULL,'JP','Japan','JPN',392,81),(109,'JORDAN',NULL,'JO','Jordan','JOR',400,962),(110,'KAZAKHSTAN',NULL,'KZ','Kazakhstan','KAZ',398,7),(111,'KENYA',NULL,'KE','Kenya','KEN',404,254),(112,'KIRIBATI',NULL,'KI','Kiribati','KIR',296,686),(113,'KOREA, DEMOCRATIC PEOPLE\'S REPUBLIC OF',NULL,'KP','Korea, Democratic People\'s Republic of','PRK',408,850),(114,'KOREA, REPUBLIC OF',NULL,'KR','Korea, Republic of','KOR',410,82),(115,'KUWAIT',NULL,'KW','Kuwait','KWT',414,965),(116,'KYRGYZSTAN',NULL,'KG','Kyrgyzstan','KGZ',417,996),(117,'LAO PEOPLE\'S DEMOCRATIC REPUBLIC',NULL,'LA','Lao People\'s Democratic Republic','LAO',418,856),(118,'LATVIA',NULL,'LV','Latvia','LVA',428,371),(119,'LEBANON',NULL,'LB','Lebanon','LBN',422,961),(120,'LESOTHO',NULL,'LS','Lesotho','LSO',426,266),(121,'LIBERIA',NULL,'LR','Liberia','LBR',430,231),(122,'LIBYAN ARAB JAMAHIRIYA',NULL,'LY','Libyan Arab Jamahiriya','LBY',434,218),(123,'LIECHTENSTEIN',NULL,'LI','Liechtenstein','LIE',438,423),(124,'LITHUANIA',NULL,'LT','Lithuania','LTU',440,370),(125,'LUXEMBOURG',NULL,'LU','Luxembourg','LUX',442,352),(126,'MACAO',NULL,'MO','Macao','MAC',446,853),(127,'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF',NULL,'MK','Macedonia, the Former Yugoslav Republic of','MKD',807,389),(128,'MADAGASCAR',NULL,'MG','Madagascar','MDG',450,261),(129,'MALAWI',NULL,'MW','Malawi','MWI',454,265),(130,'MALAYSIA',NULL,'MY','Malaysia','MYS',458,60),(131,'MALDIVES',NULL,'MV','Maldives','MDV',462,960),(132,'MALI',NULL,'ML','Mali','MLI',466,223),(133,'MALTA',NULL,'MT','Malta','MLT',470,356),(134,'MARSHALL ISLANDS',NULL,'MH','Marshall Islands','MHL',584,692),(135,'MARTINIQUE',NULL,'MQ','Martinique','MTQ',474,596),(136,'MAURITANIA',NULL,'MR','Mauritania','MRT',478,222),(137,'MAURITIUS',NULL,'MU','Mauritius','MUS',480,230),(138,'MAYOTTE',NULL,'YT','Mayotte',NULL,NULL,269),(139,'MEXICO',NULL,'MX','Mexico','MEX',484,52),(140,'MICRONESIA, FEDERATED STATES OF',NULL,'FM','Micronesia, Federated States of','FSM',583,691),(141,'MOLDOVA, REPUBLIC OF',NULL,'MD','Moldova, Republic of','MDA',498,373),(142,'MONACO',NULL,'MC','Monaco','MCO',492,377),(143,'MONGOLIA',NULL,'MN','Mongolia','MNG',496,976),(144,'MONTSERRAT',NULL,'MS','Montserrat','MSR',500,1664),(145,'MOROCCO',NULL,'MA','Morocco','MAR',504,212),(146,'MOZAMBIQUE',NULL,'MZ','Mozambique','MOZ',508,258),(147,'MYANMAR',NULL,'MM','Myanmar','MMR',104,95),(148,'NAMIBIA',NULL,'NA','Namibia','NAM',516,264),(149,'NAURU',NULL,'NR','Nauru','NRU',520,674),(150,'NEPAL',NULL,'NP','Nepal','NPL',524,977),(151,'NETHERLANDS',NULL,'NL','Netherlands','NLD',528,31),(152,'NETHERLANDS ANTILLES',NULL,'AN','Netherlands Antilles','ANT',530,599),(153,'NEW CALEDONIA',NULL,'NC','New Caledonia','NCL',540,687),(154,'NEW ZEALAND',NULL,'NZ','New Zealand','NZL',554,64),(155,'NICARAGUA',NULL,'NI','Nicaragua','NIC',558,505),(156,'NIGER',NULL,'NE','Niger','NER',562,227),(157,'NIGERIA',NULL,'NG','Nigeria','NGA',566,234),(158,'NIUE',NULL,'NU','Niue','NIU',570,683),(159,'NORFOLK ISLAND',NULL,'NF','Norfolk Island','NFK',574,672),(160,'NORTHERN MARIANA ISLANDS',NULL,'MP','Northern Mariana Islands','MNP',580,1670),(161,'NORWAY',NULL,'NO','Norway','NOR',578,47),(162,'OMAN',NULL,'OM','Oman','OMN',512,968),(163,'PAKISTAN',NULL,'PK','Pakistan','PAK',586,92),(164,'PALAU',NULL,'PW','Palau','PLW',585,680),(165,'PALESTINIAN TERRITORY, OCCUPIED',NULL,'PS','Palestinian Territory, Occupied',NULL,NULL,970),(166,'PANAMA',NULL,'PA','Panama','PAN',591,507),(167,'PAPUA NEW GUINEA',NULL,'PG','Papua New Guinea','PNG',598,675),(168,'PARAGUAY',NULL,'PY','Paraguay','PRY',600,595),(169,'PERU',NULL,'PE','Peru','PER',604,51),(170,'PHILIPPINES',NULL,'PH','Philippines','PHL',608,63),(171,'PITCAIRN',NULL,'PN','Pitcairn','PCN',612,0),(172,'POLAND',NULL,'PL','Poland','POL',616,48),(173,'PORTUGAL',NULL,'PT','Portugal','PRT',620,351),(174,'PUERTO RICO',NULL,'PR','Puerto Rico','PRI',630,1787),(175,'QATAR',NULL,'QA','Qatar','QAT',634,974),(176,'REUNION',NULL,'RE','Reunion','REU',638,262),(177,'ROMANIA',NULL,'RO','Romania','ROM',642,40),(178,'RUSSIAN FEDERATION',NULL,'RU','Russian Federation','RUS',643,70),(179,'RWANDA',NULL,'RW','Rwanda','RWA',646,250);
/*!40000 ALTER TABLE `Country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Equipo`
--

DROP TABLE IF EXISTS `Equipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Equipo` (
  `id_team` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `fundation_date` date NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `id_Country` int(11) NOT NULL,
  PRIMARY KEY (`id_team`,`id_Country`),
  KEY `fk_Equipo_Country1` (`id_Country`),
  CONSTRAINT `fk_Equipo_Country1` FOREIGN KEY (`id_Country`) REFERENCES `Country` (`id_Country`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Equipo`
--

LOCK TABLES `Equipo` WRITE;
/*!40000 ALTER TABLE `Equipo` DISABLE KEYS */;
INSERT INTO `Equipo` VALUES (1,'Equipo22','2021-02-21','fotografia 2',1),(2,'Equipo3','2021-02-21','fotografia 2',1),(3,'Equipo2','2021-02-21','fotografia 2',1),(4,'Equipo 4','2021-02-21','fotografia 2',1),(5,'Atletico de Madrid','2022-03-22','https://e7.pngegg.com/pngimages/146/551/png-clipart-user-login-mobile-phones-password-user-miscellaneous-blue.png',2),(6,'Real Madrid','2022-03-22','https://e7.pngegg.com/pngimages/146/551/png-clipart-user-login-mobile-phones-password-user-miscellaneous-blue.png',2),(7,'Barcelona','2022-03-22','https://e7.pngegg.com/pngimages/146/551/png-clipart-user-login-mobile-phones-password-user-miscellaneous-blue.png',2),(8,'Manchester United','2022-03-22','https://e7.pngegg.com/pngimages/146/551/png-clipart-user-login-mobile-phones-password-user-miscellaneous-blue.png',3);
/*!40000 ALTER TABLE `Equipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Equipos_Seguidos`
--

DROP TABLE IF EXISTS `Equipos_Seguidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Equipos_Seguidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_team` int(11) NOT NULL,
  `status` smallint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_team` (`id_team`),
  CONSTRAINT `Equipos_Seguidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_user`) ON DELETE CASCADE,
  CONSTRAINT `Equipos_Seguidos_ibfk_2` FOREIGN KEY (`id_team`) REFERENCES `Equipo` (`id_team`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Equipos_Seguidos`
--

LOCK TABLES `Equipos_Seguidos` WRITE;
/*!40000 ALTER TABLE `Equipos_Seguidos` DISABLE KEYS */;
INSERT INTO `Equipos_Seguidos` VALUES (1,1,2,1),(2,1,3,1),(3,1,3,1),(4,1,3,1),(5,1,3,1),(6,1,3,1);
/*!40000 ALTER TABLE `Equipos_Seguidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Estadio`
--

DROP TABLE IF EXISTS `Estadio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Estadio` (
  `id_Estadio` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `fundation_date` date NOT NULL,
  `photo` varchar(45) NOT NULL,
  `capacity` int(11) NOT NULL,
  `state` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `id_Country` int(11) NOT NULL,
  PRIMARY KEY (`id_Estadio`,`id_Country`),
  KEY `fk_Estadio_Country1` (`id_Country`),
  CONSTRAINT `fk_Estadio_Country1` FOREIGN KEY (`id_Country`) REFERENCES `Country` (`id_Country`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Estadio`
--

LOCK TABLES `Estadio` WRITE;
/*!40000 ALTER TABLE `Estadio` DISABLE KEYS */;
INSERT INTO `Estadio` VALUES (1,'Estadio3','2021-02-14','fotografia 1',100,'prueba','Guatemala, Guatemala',1),(2,'Estadio4','2021-02-14','fotografia 1',100,'prueba','Guatemala, Guatemala',1);
/*!40000 ALTER TABLE `Estadio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Incidencia`
--

DROP TABLE IF EXISTS `Incidencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Incidencia` (
  `id_incidencia` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  `minuto` int(11) NOT NULL,
  `id_person` int(11) NOT NULL,
  `id_team` int(11) NOT NULL,
  `id_partido` int(11) NOT NULL,
  PRIMARY KEY (`id_incidencia`,`id_person`,`id_team`,`id_partido`),
  KEY `fk_Incidencia_Person1` (`id_person`,`id_team`),
  KEY `fk_Incidencia_Partido1` (`id_partido`),
  CONSTRAINT `fk_Incidencia_Partido1` FOREIGN KEY (`id_partido`) REFERENCES `Partido` (`id_partido`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_Incidencia_Person1` FOREIGN KEY (`id_person`, `id_team`) REFERENCES `Person` (`id_person`, `id_team`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Incidencia`
--

LOCK TABLES `Incidencia` WRITE;
/*!40000 ALTER TABLE `Incidencia` DISABLE KEYS */;
INSERT INTO `Incidencia` VALUES (4,'choque de cabezas',14,6,7,4),(10,'Tarjeta Amarilla',14,6,7,4);
/*!40000 ALTER TABLE `Incidencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Noticia`
--

DROP TABLE IF EXISTS `Noticia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Noticia` (
  `id_new` int(11) NOT NULL AUTO_INCREMENT,
  `news` varchar(300) NOT NULL,
  `Equipo_id_team` int(11) NOT NULL,
  `title` varchar(80) NOT NULL,
  `fecha` date DEFAULT NULL,
  `empleado` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_new`,`Equipo_id_team`),
  KEY `fk_Noticia_Equipo1` (`Equipo_id_team`),
  KEY `fk_empleado_noticia` (`empleado`),
  CONSTRAINT `fk_Noticia_Equipo1` FOREIGN KEY (`Equipo_id_team`) REFERENCES `Equipo` (`id_team`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_empleado_noticia` FOREIGN KEY (`empleado`) REFERENCES `Usuario` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Noticia`
--

LOCK TABLES `Noticia` WRITE;
/*!40000 ALTER TABLE `Noticia` DISABLE KEYS */;
INSERT INTO `Noticia` VALUES (1,'CR7 ELIMINADO EN CHAMPIOS',1,'Algo',NULL,NULL),(2,'JOAO A LA FINAL',2,'Algo2',NULL,NULL),(3,'Fichan a joven con talento',5,'Nuevo Fichaje','2022-01-08',NULL),(4,'esta noticia es falsa',5,'Haland al Madrid','2022-01-08',2);
/*!40000 ALTER TABLE `Noticia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Partido`
--

DROP TABLE IF EXISTS `Partido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Partido` (
  `id_partido` int(11) NOT NULL AUTO_INCREMENT,
  `game_date` date NOT NULL,
  `attendees` int(11) NOT NULL,
  `result_local` int(11) NOT NULL,
  `result_visiting` int(11) NOT NULL,
  `state` varchar(45) NOT NULL,
  `incidents` int(11) DEFAULT NULL,
  `id_stadium` int(11) NOT NULL,
  `id_team_local` int(11) NOT NULL,
  `id_team_visiting` int(11) NOT NULL,
  PRIMARY KEY (`id_partido`,`id_stadium`,`id_team_local`,`id_team_visiting`),
  KEY `fk_Equipo_Estadio1` (`id_stadium`),
  KEY `fk_Partido_Equipo1` (`id_team_local`),
  KEY `fk_Partido_Equipo2` (`id_team_visiting`),
  CONSTRAINT `fk_Equipo_Estadio1` FOREIGN KEY (`id_stadium`) REFERENCES `Estadio` (`id_Estadio`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_Partido_Equipo1` FOREIGN KEY (`id_team_local`) REFERENCES `Equipo` (`id_team`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_Partido_Equipo2` FOREIGN KEY (`id_team_visiting`) REFERENCES `Equipo` (`id_team`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Partido`
--

LOCK TABLES `Partido` WRITE;
/*!40000 ALTER TABLE `Partido` DISABLE KEYS */;
INSERT INTO `Partido` VALUES (3,'2020-02-14',150,3,1,'terminado',NULL,1,1,2),(4,'2022-03-22',140,2,2,'Sin iniciar',NULL,2,7,6);
/*!40000 ALTER TABLE `Partido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Person`
--

DROP TABLE IF EXISTS `Person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Person` (
  `id_person` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `birthday` date NOT NULL,
  `status` varchar(45) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `id_stand` int(11) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `id_team` int(11) NOT NULL,
  `nationality` int(11) NOT NULL,
  PRIMARY KEY (`id_person`,`id_team`,`nationality`),
  KEY `fk_Jugador_Posicion1` (`id_stand`),
  KEY `fk_Jugador_Equipo1` (`id_team`,`nationality`),
  KEY `fk_Jugador_Nacionalidad` (`nationality`),
  CONSTRAINT `fk_Jugador_Equipo` FOREIGN KEY (`id_team`) REFERENCES `Equipo` (`id_team`) ON DELETE CASCADE,
  CONSTRAINT `fk_Jugador_Nacionalidad` FOREIGN KEY (`nationality`) REFERENCES `Country` (`id_Country`) ON DELETE CASCADE,
  CONSTRAINT `fk_Jugador_Posicion1` FOREIGN KEY (`id_stand`) REFERENCES `Posicion` (`id_stand`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Person`
--

LOCK TABLES `Person` WRITE;
/*!40000 ALTER TABLE `Person` DISABLE KEYS */;
INSERT INTO `Person` VALUES (4,'Persona A','Persona A','2022-03-22','Jugador','https://e7.pngegg.com/pngimages/146/551/png-clipart-user-login-mobile-phones-password-user-miscellaneous-blue.png',1,1,4,1),(5,'Persona B','Persona B','2022-03-22','Jugador','https://e7.pngegg.com/pngimages/146/551/png-clipart-user-login-mobile-phones-password-user-miscellaneous-blue.png',5,1,6,3),(6,'Persona C','Persona C','2022-03-22','1','https://e7.pngegg.com/pngimages/146/551/png-clipart-user-login-mobile-phones-password-user-miscellaneous-blue.png',4,1,7,4),(7,'Persona D','Persona D','2022-03-22','Jugador','https://e7.pngegg.com/pngimages/146/551/png-clipart-user-login-mobile-phones-password-user-miscellaneous-blue.png',3,1,8,5);
/*!40000 ALTER TABLE `Person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posicion`
--

DROP TABLE IF EXISTS `Posicion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Posicion` (
  `id_stand` int(11) NOT NULL AUTO_INCREMENT,
  `stand` varchar(45) NOT NULL,
  PRIMARY KEY (`id_stand`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posicion`
--

LOCK TABLES `Posicion` WRITE;
/*!40000 ALTER TABLE `Posicion` DISABLE KEYS */;
INSERT INTO `Posicion` VALUES (1,'Portero'),(2,'Defensa'),(3,'Lateral'),(4,'Delantero'),(5,'Medio Campo');
/*!40000 ALTER TABLE `Posicion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Quiniela`
--

DROP TABLE IF EXISTS `Quiniela`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Quiniela` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_visitor_id` int(11) NOT NULL,
  `team_local_id` int(11) NOT NULL,
  `id_partido` int(11) NOT NULL,
  `goals_local` int(11) DEFAULT NULL,
  `goals_visitor` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Quiniela_FK` (`status`),
  CONSTRAINT `Quiniela_FK` FOREIGN KEY (`status`) REFERENCES `Quiniela_Status` (`status_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Quiniela`
--

LOCK TABLES `Quiniela` WRITE;
/*!40000 ALTER TABLE `Quiniela` DISABLE KEYS */;
INSERT INTO `Quiniela` VALUES (1,2,5,3,NULL,NULL,1);
/*!40000 ALTER TABLE `Quiniela` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QuinielaDetail`
--

DROP TABLE IF EXISTS `QuinielaDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `QuinielaDetail` (
  `id_quiniela` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `result_1` int(11) NOT NULL,
  `result_2` int(11) NOT NULL,
  PRIMARY KEY (`id_quiniela`,`id_client`),
  CONSTRAINT `QuinielaDetail_FK` FOREIGN KEY (`id_quiniela`) REFERENCES `Quiniela` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuinielaDetail`
--

LOCK TABLES `QuinielaDetail` WRITE;
/*!40000 ALTER TABLE `QuinielaDetail` DISABLE KEYS */;
INSERT INTO `QuinielaDetail` VALUES (1,1,3,2),(1,3,3,0);
/*!40000 ALTER TABLE `QuinielaDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Quiniela_Status`
--

DROP TABLE IF EXISTS `Quiniela_Status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Quiniela_Status` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Quiniela_Status`
--

LOCK TABLES `Quiniela_Status` WRITE;
/*!40000 ALTER TABLE `Quiniela_Status` DISABLE KEYS */;
INSERT INTO `Quiniela_Status` VALUES (1,'Pending'),(2,'On Course'),(3,'Ended'),(4,'Cancelled');
/*!40000 ALTER TABLE `Quiniela_Status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rol`
--

DROP TABLE IF EXISTS `Rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rol` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(45) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rol`
--

LOCK TABLES `Rol` WRITE;
/*!40000 ALTER TABLE `Rol` DISABLE KEYS */;
INSERT INTO `Rol` VALUES (1,'Admin'),(2,'Empleado'),(3,'Cliente');
/*!40000 ALTER TABLE `Rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transferencias`
--

DROP TABLE IF EXISTS `Transferencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Transferencias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_date` date NOT NULL,
  `Last_date` date NOT NULL,
  `Person_id` int(11) NOT NULL,
  `team_origin` int(11) NOT NULL,
  `team_destination` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Transferencias_Person1` (`Person_id`),
  KEY `fk_Transferencias_Equipo1` (`team_origin`),
  KEY `fk_Transferencias_Equipo2` (`team_destination`),
  CONSTRAINT `fk_Transferencias_Equipo1` FOREIGN KEY (`team_origin`) REFERENCES `Equipo` (`id_team`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_Transferencias_Equipo2` FOREIGN KEY (`team_destination`) REFERENCES `Equipo` (`id_team`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_Transferencias_Person1` FOREIGN KEY (`Person_id`) REFERENCES `Person` (`id_person`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transferencias`
--

LOCK TABLES `Transferencias` WRITE;
/*!40000 ALTER TABLE `Transferencias` DISABLE KEYS */;
INSERT INTO `Transferencias` VALUES (1,'2022-03-22','2022-03-22',5,4,6),(2,'2022-03-22','2022-03-22',7,8,5),(3,'2022-03-22','2022-03-22',7,8,5),(4,'2022-03-22','2022-03-22',7,8,5);
/*!40000 ALTER TABLE `Transferencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuario` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `lastname` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telephone` varchar(12) NOT NULL,
  `photo` varchar(200) NOT NULL,
  `genre` varchar(5) NOT NULL,
  `birthday` date NOT NULL,
  `created` date NOT NULL,
  `address` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `membership` tinyint(4) NOT NULL,
  `id_status` varchar(45) NOT NULL,
  `verify` tinyint(4) NOT NULL,
  `id_Country` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_Country`,`id_rol`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_Usuario_Country` (`id_Country`),
  KEY `fk_Usuario_Rol1` (`id_rol`),
  CONSTRAINT `fk_Usuario_Country` FOREIGN KEY (`id_Country`) REFERENCES `Country` (`id_Country`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuario_Rol1` FOREIGN KEY (`id_rol`) REFERENCES `Rol` (`id_rol`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario`
--

LOCK TABLES `Usuario` WRITE;
/*!40000 ALTER TABLE `Usuario` DISABLE KEYS */;
INSERT INTO `Usuario` VALUES (1,'Luis','Perez','asdf@1234','luis@gmail.com','22443366','https://mifoto.com','M','1996-12-31','2022-02-25','Colonia Las Flores, Chiquimula',25,0,'1',1,89,1),(2,'Jose','Martinez','asdf@1234','josema@gmail.com','22443366','https://mifoto.com','M','1983-12-31','2022-02-25','Colonia Las Flores, Chiquimula',39,0,'1',1,89,2),(3,'Victor','Gomez','asdf@1234','victor_gomez@gmail.com','22443366','https://mifoto.com','M','1999-03-23','2022-02-25','Colonia Las Flores, Chiquimula',22,0,'1',1,89,3),(4,'Jesus','Mansilla','123456','chusanic@gmail.com','31764120','https://cdn-icons-png.flaticon.com/512/1177/1177568.png','M','1998-01-08','2022-03-21','direccion',0,0,'Status',0,1,1);
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'sa'
--
/*!50003 DROP PROCEDURE IF EXISTS `confirmEmail` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`grupoH`@`%` PROCEDURE `confirmEmail`(
        p_email varchar(50), p_id_status varchar(45)
    )
BEGIN
    IF (SELECT id_user FROM Usuario WHERE p_email = email and p_id_status = id_status) IS NOT NULL THEN
        UPDATE Usuario SET verify = 1, id_status = MD5(RAND()) WHERE email = p_email;
        SELECT ('Se ha habilitado/restablecido la cuenta') AS MSG;
    ELSE
        SELECT ('ocurrio un error dehabilitando la cuenta') AS MSG;
    END IF;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EliminarUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`grupoH`@`%` PROCEDURE `EliminarUsuario`(
        p_id int)
BEGIN
    DELETE FROM Usuario WHERE id_user = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetNoticia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`grupoH`@`%` PROCEDURE `GetNoticia`(
    p_team int
)
BEGIN
   IF p_team IS NULL THEN
       SELECT *FROM Noticia;
    ELSE
       SELECT *FROM Noticia WHERE p_team = Equipo_id_team;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getTrans` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`grupoH`@`%` PROCEDURE `getTrans`()
BEGIN
    SELECT TR.id AS Id_, P.name AS name_origin, E1.id_team As id_team_origin_,
       E1.name as team_oringin_ , E2.id_team as id_team_dest_, E2.name AS name_dest,
       TR.first_date, TR.last_date FROM
    Transferencias TR INNER JOIN
    Person P ON TR.Person_id = P.id_person INNER JOIN
    Equipo E1 ON TR.team_origin = E1.id_team INNER JOIN
    Equipo E2 ON TR.team_destination = E2.id_team;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`grupoH`@`%` PROCEDURE `getUser`(
    p_id_user int
)
BEGIN
    SELECT *FROM Usuario WHERE id_user = p_id_user;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertIncidencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`grupoH`@`%` PROCEDURE `InsertIncidencia`(
        p_descripcion varchar(100), p_minuto int, p_id_person int,p_id_team int, p_id_partido int)
BEGIN
    Insert Into Incidencia(descripcion, minuto, id_person, id_team, id_partido)
    values (p_descripcion, p_minuto, p_id_person, p_id_team, p_id_partido);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertNoticia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`grupoH`@`%` PROCEDURE `InsertNoticia`(
    p_news varchar(300), p_equipo_id_team int, p_title varchar(80), p_fecha varchar(25), p_empleado INT
    )
BEGIN
   INSERT INTO Noticia(news, Equipo_id_team, title, fecha, Noticia.empleado)
   VALUES (p_news, p_equipo_id_team, p_title, str_to_date(p_fecha, '%m/%d/%Y'), p_empleado);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`grupoH`@`%` PROCEDURE `InsertUsuario`(
    p_name VARCHAR(25),
    p_lastname VARCHAR(25),
    p_password varchar(25),
    p_email varchar(25),
    p_telephone varchar(12),
    p_photo varchar(200),
    p_genre varchar(5),
    p_birthday varchar(255),
    p_address varchar(100),
    p_id_status varchar(45),
    p_id_Country int,
    p_id_rol int
    )
BEGIN
   INSERT INTO Usuario(name, lastname, password, email, telephone, photo, genre, birthday, created, address, age, membership, id_status, verify, id_Country, id_rol)
   VALUES (p_name, p_lastname, MD5(p_password), p_email, p_telephone, p_photo, p_genre, str_to_date(p_birthday, '%m/%d/%Y'), (SELECT NOW()), p_address, 0, 0, p_id_status, 0, p_id_Country, p_id_rol);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`grupoH`@`%` PROCEDURE `Login`(
    p_email varchar(50), p_password varchar(25)
)
BEGIN
    SELECT *FROM Usuario WHERE p_email = email and MD5(p_password) = password;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateStatePerson` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`grupoH`@`%` PROCEDURE `UpdateStatePerson`(
        p_id_person int, p_state int)
BEGIN
    UPDATE Person SET status = p_state WHERE p_id_person = id_person;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`grupoH`@`%` PROCEDURE `UpdateUser`(
    p_id_user int,
    p_name VARCHAR(25),
    p_lastname VARCHAR(25),
    p_password varchar(25),
    p_email varchar(25),
    p_telephone varchar(12),
    p_photo varchar(200),
    p_genre varchar(5),
    p_birthday varchar(255),
    p_address varchar(100),
    p_id_status varchar(45),
    p_verify tinyint,
    p_id_Country int,
    p_id_rol int
)
BEGIN
    UPDATE Usuario SET
            name = p_name,
            lastname = p_lastname,
            password = p_password, email = p_email, telephone = p_telephone, verify = p_verify,
            photo = p_photo, genre = p_genre, birthday = str_to_date(p_birthday, '%m/%d/%Y'),
            address = p_address, id_status = p_id_status, id_Country = p_id_Country,
            id_rol = p_id_rol WHERE id_user = p_id_user;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-23  2:44:33
