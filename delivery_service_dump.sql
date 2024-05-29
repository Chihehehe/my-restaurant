-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: myrestaurant
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `idCustomer` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `gmail` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `membership` tinyint DEFAULT '0',
  `custLat` decimal(15,10) NOT NULL,
  `custLon` decimal(15,10) NOT NULL,
  PRIMARY KEY (`idCustomer`),
  UNIQUE KEY `idCustomer_UNIQUE` (`idCustomer`),
  UNIQUE KEY `gmail_UNIQUE` (`gmail`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Quynh Chi','0424012704','quynhchipham1801@gmail.com','180104',1,-34.4059342799,150.8727048404),(2,'Evelyn','0450445440','khanhlinhng114@gmail.com','110404',1,-34.4059342799,150.8727048404),(3,'Evelynhuhu','0123456778','hehe@gmail.com','12345678',0,-34.4059342799,150.8727048404);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `idfeedback` int NOT NULL AUTO_INCREMENT,
  `idorder` int NOT NULL,
  `feedback_text` varchar(150) DEFAULT NULL,
  `rating` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`idfeedback`),
  KEY `fk_idorder_idx` (`idorder`),
  KEY `fk_fbidorder_idx` (`idorder`),
  CONSTRAINT `fk_fbidorder` FOREIGN KEY (`idorder`) REFERENCES `order` (`idorder`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,2,'good',5.00),(2,2,'',5.00),(3,2,'',5.00),(4,2,'so good',5.00),(5,19,'amazing',5.00);
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `idmenu` int NOT NULL AUTO_INCREMENT,
  `foodName` varchar(45) NOT NULL,
  `desc` varchar(500) NOT NULL,
  `price` float NOT NULL,
  `image` varchar(200) NOT NULL,
  `idRest` int NOT NULL,
  `amount` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idmenu`),
  KEY `idRest_idx` (`idRest`),
  CONSTRAINT `restaurantFK` FOREIGN KEY (`idRest`) REFERENCES `restaurant` (`idrestaurant`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'Burrito','With rice, Jack cheese, black beans, salsa, and filling of your choice. Rolled in a flour tortilla',18.6,'https://cdn-img.scalabs.com.au/MTaz_QxGTf7dkIb_Ns5oTFX5k1Kjynw_1DBRq54a6fg/aHR0cHM6Ly9zdy1o/aXQtcHJkLnNjYWRp/Z2l0YWwuaW8vbWVk/aWEvNjY3MTUvYnVy/cml0by5qcGc_cHJl/c2V0PU1haW5JbWFn/ZQ',106,1),(2,'Spicy baby octopus salad','Grilled spicy baby octopus, rocket, onions, chive and oriental dressing',19,'https://hanokbbq.com.au/wp-content/uploads/2021/02/%E1%84%8D%E1%85%AE%E1%84%81%E1%85%AE%E1%84%86%E1%85%B5_1-%E6%8B%B7%E8%B4%9D.jpg',101,1),(3,'Spicy beef soup','Spicy beef soup with bracken, bean sprout, shallot, onions, mushroom and glass noodle',22,'https://hanokbbq.com.au/wp-content/uploads/2021/02/%E1%84%8B%E1%85%B2%E1%86%A8%E1%84%80%E1%85%A2%E1%84%8C%E1%85%A1%E1%86%BC_1-%E6%8B%B7%E8%B4%9D.jpg',101,1),(4,'Hot stone pot Bibim-Bap','korean rice dish that’s served with various vegetable and meat topping comes SIZZLING HOT in a stone pot',22,'https://hanokbbq.com.au/wp-content/uploads/2021/02/%E1%84%80%E1%85%A9%E1%84%80%E1%85%B5%E1%84%83%E1%85%A5%E1%87%81%E1%84%87%E1%85%A1%E1%86%B8_1-%E6%8B%B7%E8%B4%9D.jpg',101,1),(5,'Cold beef noodle soup','Cold beef soup with potato noodle, beef brisket, radish, cucumber and eggs',16,'https://hanokbbq.com.au/wp-content/uploads/2021/02/%E1%84%86%E1%85%AE%E1%86%AF%E1%84%82%E1%85%A2%E1%86%BC%E1%84%86%E1%85%A7%E1%86%AB_1-%E6%8B%B7%E8%B4%9D.jpg',101,1),(6,'Deep fried king prawn 5pcs','Deep fried king prawn served with fish roe dressing',24,'https://hanokbbq.com.au/wp-content/uploads/2021/02/%E1%84%89%E1%85%A2%E1%84%8B%E1%85%AE%E1%84%90%E1%85%B1%E1%84%80%E1%85%B5%E1%86%B7_1-%E6%8B%B7%E8%B4%9D.jpg',101,1),(7,'CHURROS GRAZING BOX','Mini churros, fresh strawberries, marshmallows, pretzels and brownies',59.95,'https://www.sanchurro.com/wp-content/uploads/2022/11/SC2210007-Summer-Menu_Website_Menu_600x350_Churros-Grazing-Box.jpg',102,1),(8,'CHURROS & FRUIT FOR TWO','6 churros, 2 dip-cups + strawberries & banana',23.95,'https://www.sanchurro.com/wp-content/uploads/2021/06/SC2105017_New_Crockery_Website_Menu_Images_Churros__Fruit_For_Two.jpg',102,1),(9,'CHURRO FRIES & CLASSIC SHAKE','Churro Fries and your choice of a Strawberry, Salted Caramel or Blue Heaven Classic Shake',13.9,'https://www.sanchurro.com/wp-content/uploads/2023/11/SC2309001-Summer-Menu_Website_Menu_600x350_ChurroFries_Shake.jpg',102,1),(10,'STRAWBERRY OREO CROFFLE','A warm cinnamon croffle topped with fresh strawberries, Oreos and milk chocolate',4.95,'https://www.sanchurro.com/wp-content/uploads/2023/11/SC2309001-Summer-Menu_Website_Menu_600x350_StrawberryOreoCroffle.jpg',102,1),(11,'Watermelon Punch','Green watermelon tea with watermelon slice, lemon slice and white pearls',8,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/83486175-a12b-4e41-b20a-3d6c8d7dd1a1-retina-large.jpg',103,1),(12,'Half Cheese Half Sausage Hot Dog','A mozzarella cheese hot dog coated with sugar with a choice of sauce',8,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/7bf9f552-1a15-49a4-813d-34e89818ade8-retina-large.jpg',103,1),(13,'Mango Bingsoo','Shaven milky snowflakes with fresh mango, ice cream, mango mochi and boba. Good size for two New presentation Great value for money',18,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/15ea1aa9-1948-4caa-b0eb-62daa699f23b-retina-large.jpg',103,1),(14,'Taro Yogurt','Purple yam, root vegetable, low in lactose and it\'s a must try!',9.5,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/cadbacb1-7cf0-4d35-85fa-a35bf82f2a25-retina-large.jpg',103,1),(15,'Double Fortune','Two toasted waffles, two scoops of gelato, strawberries and a drizzled melted chocolate on top.',24,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/88859c47-9fea-4cd5-b5e2-36967b250e9b-33a1cc2a-5d46-4185-ad92-a931836b622c-retina-large.jpg',104,1),(16,'Lava Super Shake','Your choice of shake, topped with lava cake, strawberries and chocolate syringe.',19.2,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/ac3924b7-8ca7-48b9-ae48-3336dcba3f2e-retina-large.jpg',104,1),(17,'Brownie Smackdown','Warm brownies topped with your choice of gelato, a waffle cone and a side of Belgian dark or milk chocolate',16.8,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/629c7485-faf8-4bfb-82bf-12bc554113c6-3420cca6-b825-4f3a-9cc1-917e959d57eb-retina-large.jpg',104,1),(18,'Romantic Croffle Night','Vegetarian. 0.5l of gelato, two croffles, chocolate shot, strawberries and bananas',42,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/42310923-dedb-4799-8729-386747cc29b2-f1d9458d-5b39-48fa-85ab-3a06ba581a25-retina-large.JPG',104,1),(19,'Meatball Melt','Our signature meatballs in rich tomato marinara sauce',10.85,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/b6044e55-7d6f-42ed-9ca6-9f594d461b1a-retina-large.png',105,1),(20,'6 Pack of Double Choc/Choc Chip Cookies','6 Subway® Cookies, 3 each of Double Choc, and Choc Chip',7.55,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/501fb454-4dee-4376-8ffc-f738c3dce38a-retina-large.jpg',105,1),(21,'Chicken Classic','A Subway® classic – a tender chicken patty with a flavour-packed coating',12.1,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/0d09bf3d-bcc5-49ff-aa8d-fda8f921641a-retina-large.png',105,1),(22,'Buffalo Chicken','Try it with the tangy Blue Cheese or creamy Ranch dressing.',12.1,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/6b6b50e6-765d-4fea-afc2-4533d2094a28-retina-large.png',105,1),(23,'Cali Burrito','With your choice of filling, topped with Chipotle fries, Jack Cheese, Sour Cream, Pico de Gallo, Guacamole and Pickled Jalapeno with Carrots for spicy',18.6,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/b9c5ecbc-debd-4903-b51d-22d6b08dd435-retina-large.jpg',106,1),(24,'Nacho Fries','GYG\'s skin on, real potato fries, melted Jack cheese, salsa, with the filling of your choice, topped with sour cream, guacamole and pickled jalapenos for spicy.',19.8,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/6ac0513b-7932-4ce5-9ac6-f557aabdcc5c-retina-large.jpg',106,1),(25,'Enchilada','With rice, Jack cheese, black beans, salsa, and filling of your choice. Rolled in a flour tortilla and topped with salsas melted Jack cheese, sour cream, guacamole, and GYG\'s corn chips.',20.3,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/5d1c8887-342d-4a99-b598-329565956d01-retina-large.jpg',106,1),(26,'Salad','Mixed greens, carrot, cucumber, Pico de Gallo salsa and filling with Chipotle Mayo drizzle.',17.1,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/fa06a0df-025f-4a3b-800f-967765795dcc-retina-large.jpg',106,1),(27,'Chicken McNuggets - 10pc','(1920 kJ.)',10.5,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/ae844575-3654-41ed-abd6-6c269cc8492b-retina-large.png',107,1),(28,'Double Quarter Pounder','(5328 kJ.)',15.95,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/5800154f-3f4f-4b5d-99dc-f6583d668337-retina-large.png',107,1),(29,'Hot Apple Pie','(1080 kJ.)',4.2,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/28088dbd-cf65-40af-8422-e54889015b27-retina-large.png',107,1),(30,'McCafé Deluxe Iced Coffee','(1110 kJ.)',7.6,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/747d7930-bbaf-4c52-aa02-3099d9c73468-retina-large.png',107,1),(31,'Mango Purple Rice Yoghurt (Regular)','2276KJ.',9.6,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/ad07918a-e510-4264-9c1d-b10fd6cbecd6-retina-large.jpg',108,1),(32,'Tiger Milk Tea (Large)','2092KJ.',9.6,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/7b2745f8-ed63-4430-a062-108172d48f1a-retina-large.jpg',108,1),(33,'Okinawa Milk Tea (Large)','956KJ.',9.1,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/18236ae9-04f4-4ef1-adbb-b34f9a2a752f-retina-large.jpg',108,1),(34,'Jasmine Green Milk Tea (Large)','1443KJ',8.1,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/c40b6f5f-7f33-4960-a79e-3f0f834a89a2-retina-large.jpg',108,1),(35,'HLB Special Vermicelli Salad','Stir-fried lemongrass chicken and beef, fried spring rolls, grilled pork and prawn served over thin vermicelli noodles, bean sprouts, cucumber, carrots and lettuce.',23.5,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photos/c9786dc6-7097-4add-ad72-c614b67d4cc4-retina-large-jpeg',109,1),(36,'Crunchy Spicy Squid','Lightly battered squid, wok tossed with a mixture of spices, diced capsicums, freshly cut chilli, garlic and onions.',15,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photos/589177ad-966b-469e-a30d-57a69fd17bb4-retina-large-jpeg',109,1),(37,'Rare Beef Pho','Noodles with beef broth',23,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photos/7ce1af31-745f-48e8-9906-1d70b48db8fd-retina-large-jpeg',109,1),(38,'Shaky Beef','Lean beef tossed in a flaming wok, presented with thinly sliced onions on a bed of lettuce, finished off with a squeeze of lemon to leave a refreshing tantalising taste.',27,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photos/0360ad2b-94bf-4f4b-a0b9-536ea74b5b23-retina-large-jpeg',109,1),(39,'Maxi Popcorn Chicken','Bite size pieces of real breast fillet chicken tumbled in our signature marinade and cooked in a crunchy coating',10.95,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/c8f65d20-5d8f-4f47-b162-59f97499f036-retina-large.png',110,1),(40,'Large Potato & Gravy','Soft and fluffy potato mash with warm, rich gravy. Mmmmm… 1094 kJ',7.45,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/c4e459db-a870-47aa-b6fb-14629cc14ff7-retina-large.png',110,1),(41,'10 Wicked Wings','Add some bite to your meal with 10 Wicked Wings with a spicy marinade and a crispy crunchy coating. 5039 kJ',13.95,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/9b6d3baf-e30c-47f2-b12b-d4e6de4cc2fa-retina-large.png',110,1),(42,'Zinger® Burger','100% breast fillet chicken coated in Zinger flavouring, lettuce and mayo all perfectly matched to deliver a spicy flavour hit. 1874 kJ',9.45,'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/df58ef44-587b-45c4-a773-a033a87337fa-retina-large.png',110,1);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `idorder` int NOT NULL AUTO_INCREMENT,
  `iduser` int NOT NULL,
  `idrest` int NOT NULL,
  `totalAmount` decimal(10,2) NOT NULL,
  `status` enum('pending','accepted','completed','cancelled') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idorder`),
  UNIQUE KEY `idorder_UNIQUE` (`idorder`),
  KEY `fk_iduser_idx` (`iduser`),
  KEY `fk_idrest_idx` (`idrest`),
  CONSTRAINT `fk_idrest` FOREIGN KEY (`idrest`) REFERENCES `restaurant` (`idrestaurant`),
  CONSTRAINT `fk_iduser` FOREIGN KEY (`iduser`) REFERENCES `customer` (`idCustomer`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,3,101,30.00,'completed','2024-05-22 15:38:37'),(2,2,101,25.99,'completed','2024-05-22 15:38:37'),(12,2,102,113.53,'cancelled','2024-05-22 10:02:32'),(13,2,108,28.93,'pending',NULL),(14,2,103,36.40,'pending','2024-05-22 10:33:22'),(15,2,110,25.56,'cancelled','2024-05-22 16:48:28'),(16,2,110,25.56,'pending','2024-05-22 16:48:31'),(17,2,102,91.98,'pending','2024-05-22 20:11:08'),(18,2,103,41.80,'pending','2024-05-22 20:11:38'),(19,2,110,49.27,'completed','2024-05-22 20:48:23'),(20,2,110,52.83,'pending','2024-05-27 23:46:14'),(21,2,110,54.83,'pending','2024-05-28 00:02:07'),(22,2,102,25.99,'pending','2024-05-22 15:38:37');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `idorder_items` int NOT NULL AUTO_INCREMENT,
  `idorder` int NOT NULL,
  `idfood` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `foodName` varchar(45) NOT NULL,
  PRIMARY KEY (`idorder_items`),
  KEY `fk_idorder_idx` (`idorder`),
  KEY `fk_idfood_idx` (`idfood`),
  CONSTRAINT `fk_idfood` FOREIGN KEY (`idfood`) REFERENCES `menu` (`idmenu`),
  CONSTRAINT `fk_idorder` FOREIGN KEY (`idorder`) REFERENCES `order` (`idorder`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,2,8,1,23.99,'CHURROS & FRUIT FOR TWO'),(4,2,9,3,50.00,'CHURRO FRIES & CLASSIC SHAKE'),(7,12,7,1,59.95,'CHURROS GRAZING BOX'),(8,12,9,2,13.90,'CHURRO FRIES & CLASSIC SHAKE'),(9,12,8,1,23.95,'CHURROS & FRUIT FOR TWO'),(10,13,31,1,9.60,'Mango Purple Rice Yoghurt (Regular)'),(11,13,34,1,8.10,'Jasmine Green Milk Tea (Large)'),(12,14,11,1,8.00,'Watermelon Punch'),(13,14,13,1,18.00,'Mango Bingsoo'),(14,15,41,1,13.95,'10 Wicked Wings'),(15,16,41,1,13.95,'10 Wicked Wings'),(16,17,7,1,59.95,'CHURROS GRAZING BOX'),(17,17,9,2,13.90,'CHURRO FRIES & CLASSIC SHAKE'),(18,18,11,3,8.00,'Watermelon Punch'),(19,18,12,1,8.00,'Half Cheese Half Sausage Hot Dog'),(20,19,39,3,10.95,'Maxi Popcorn Chicken'),(21,19,40,1,7.45,'Large Potato & Gravy'),(22,20,40,3,7.45,'Large Potato & Gravy'),(23,20,39,2,10.95,'Maxi Popcorn Chicken'),(24,21,40,3,7.45,'Large Potato & Gravy'),(25,21,39,2,10.95,'Maxi Popcorn Chicken'),(26,22,10,2,8.99,'hehe'),(27,22,12,1,7.99,'huhu');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `idrestaurant` int NOT NULL AUTO_INCREMENT,
  `restName` varchar(45) NOT NULL,
  `addressRes` varchar(200) NOT NULL,
  `Ratings` float NOT NULL,
  `image` varchar(500) NOT NULL,
  `category` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `gmail` varchar(45) NOT NULL,
  `lon` decimal(20,15) NOT NULL,
  `lat` decimal(20,15) NOT NULL,
  PRIMARY KEY (`idrestaurant`),
  UNIQUE KEY `idrestaurant_UNIQUE` (`idrestaurant`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (101,'Hanok','W119/200 Keira St, Wollongong NSW 2500',4.8,'https://resizer.otstatic.com/v2/photos/wide-huge/2/50019341.jpg','Asian food','11223344','hanok@gmail.com',150.893132738650800,-34.424039524106924),(102,'San Churro','2/148 Crown St, Wollongong NSW 2500',4.2,'https://hillarysboatharbour.com.au/wp-content/uploads/2021/03/San-churro_1.jpg','Fastfood','11223344','sanchurro@gmail.com',150.895485211119850,-34.424937273141860),(103,'Bubbleberry Frozen Yogurt and Bubble Tea','1/76-78A Market St, Wollongong NSW 2500',4.3,'https://tb-static.uber.com/prod/image-proc/processed_images/e80666b2593accdcc9fca61a44480686/16bb0a3ab8ea98cfe8906135767f7bf4.jpeg','Dessert','11223344','bubble@gmail.com',150.893745023198020,-34.423201122150516),(104,'C9 Chocolate and Gelato Wollongong','Shop 5/166 Keira St, Wollongong NSW 2500',4.6,'https://assets.atdw-online.com.au/images/23dc84958afcafed0ceecacb6b4f4249.jpeg?rect=1%2C25%2C2048%2C1536&w=745&h=559&&rot=360&q=eyJ0eXBlIjoibGlzdGluZyIsImxpc3RpbmdJZCI6IjY0NmFkM2EyNWE0OWFmODYyNWVlZTlhMyIsImRpc3RyaWJ1dG9ySWQiOiI1NmIxZWI5MzQ0ZmVjYTNkZjJlMzIwYzgiLCJhcGlrZXlJZCI6IjU2YjFlZTU5MGNmMjEzYWQyMGRjNTgxOSJ9','Dessert','11223344','c9@gmail.com',150.893216823197970,-34.423543872789110),(105,'Subway','145-149 King St, Warrawong NSW 2502',3.9,'https://tb-static.uber.com/prod/image-proc/processed_images/cb7a299a6062790cd3a497a74689f562/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg','Fastfood','11223344','subway@gmail.com',150.889454025055040,-34.495844895309350),(106,'Guzman y Gomez - Wollongong','103/105 Princes Hwy, Fairy Meadow NSW 2519',3.9,'https://tb-static.uber.com/prod/image-proc/processed_images/4e15bd9102ae609f6c828342dc6cd549/c9252e6c6cd289c588c3381bc77b1dfc.jpeg','Fastfood','11223344','guzman@gmail.com',150.891396593254300,-34.400103676499945),(107,'McDonald\'s Wollongong','Cnr Burelli, Stewart, Corrimal St, Wollongong NSW 2500',3.4,'https://www.realestatesource.com.au/wp-content/uploads/2023/08/McDonalds-Wollongong-1.jpg','Fastfood','11223344','mc@gmail.com',150.899847053887700,-34.427125281889005),(108,'Sharetea Wollongong',' 83 Crown St, Wollongong NSW 2500',4.2,'https://tb-static.uber.com/prod/image-proc/processed_images/a3a063bf3b7b9b639c7e69c074fcab53/50446f64f31cbefe66558fc47f50a9d6.jpeg','Dessert','11223344','sharetea@gmail.com',150.898496596215320,-34.425655376790470),(109,'Ha Long Bay Vietnamese Restaurant','Shop 5/63/65 Crown St, Wollongong NSW 2500',4.3,'https://just-eat-prod-sg-res.cloudinary.com/image/upload/c_fill,f_auto,q_auto,w_1200,h_630,d_au:cuisines:vietnamese-0.jpg/v1/au/restaurants/11011450.jpg','Asian food','11223344','halong@gmail.com',150.898857825051520,-34.425897227001550),(110,'KFC','200 Crown St, Wollongong NSW 2500',3.7,'https://www.shefinds.com/files/2023/02/KFC-meal.jpg','Fastfood','11223344','kfc@gmail.com',150.850173488562550,-34.450346291666186);
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-30  1:51:36
