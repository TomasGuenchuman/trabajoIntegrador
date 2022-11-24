-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-11-2022 a las 21:06:12
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tpi`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `idCarrito` int(10) NOT NULL,
  `producto_id` int(10) NOT NULL,
  `cantidad` int(10) NOT NULL,
  `id_usuario` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`idCarrito`, `producto_id`, `cantidad`, `id_usuario`) VALUES
(108, 61, 1, 1),
(109, 62, 2, 1),
(110, 3, 2, 1),
(111, 4, 2, 1),
(113, 3, 4, 15),
(114, 4, 1, 15),
(115, 53, 1, 15),
(116, 52, 1, 15),
(117, 58, 3, 15),
(143, 17, 6, 0),
(144, 16, 2, 0),
(147, 20, 4, 0),
(149, 52, 2, 0),
(150, 53, 2, 0),
(151, 37, 12, 0),
(152, 38, 2, 0),
(153, 31, 7, 0),
(154, 32, 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(10) NOT NULL,
  `descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `descripcion`) VALUES
(1, 'notebook'),
(2, 'mother'),
(3, 'audio'),
(4, 'placa de video'),
(5, 'procesador'),
(6, 'smartwatch'),
(7, 'memoria ram'),
(8, 'gabinete'),
(9, 'fuente de alimentacion'),
(10, 'consola'),
(11, 'monitor'),
(12, 'almacenamiento'),
(26, 'teclado'),
(30, 'celular'),
(31, 'impresion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista_productos`
--

CREATE TABLE `lista_productos` (
  `id` int(10) NOT NULL,
  `producto_id` int(10) NOT NULL,
  `cantidad` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `lista_productos`
--

INSERT INTO `lista_productos` (`id`, `producto_id`, `cantidad`) VALUES
(1, 1, 5),
(2, 2, 10),
(3, 3, 15),
(4, 4, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(10) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `imagen` text NOT NULL,
  `categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `imagen`, `categoria`) VALUES
(3, 'Placa de Video Zotac GeForce RTX 4090 24GB', '810360', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_34744_Placa_de_Video_Zotac_GeForce_RTX_4090_24GB_GDDR6X_Trinity_86a78923-grn.jpg', '4'),
(4, 'Procesador AMD Ryzen 5 1600 AF Zen+ 12nm AM4', '31500', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_17898_Procesador_AMD_Ryzen_5_1600_AF_Zen__12nm_AM4_Wraith_Stealth_Cooler_187bb9ab-grn.jpg', '5'),
(8, 'Memoria GeiL DDR4 16GB 3000MHz RGB', '23000', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_31776_Memoria_GeiL_DDR4_16GB_3000MHz_Super_Luce_RGB_Black_646b61f7-grn.jpg', '7'),
(9, 'Auriculares HyperX Cloud Flight Black Wireless ', '22000', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_30990_Auriculares_HyperX_Cloud_Flight_Black_Wireless_ee2bc8f7-grn.jpg', '3'),
(10, 'Notebook Gamer AORUS KD 15.6 Core I7 11800H', '455500', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_30650_Notebook_Gamer_AORUS_KD_15.6__Core_I7_11800H_16GB__2x8GB__512GB_SSD_NVMe_RTX_3060_240Hz_W11_02c902ce-grn.jpg', '1'),
(11, 'Gabinete Kolink Inspire K3 RGB M-ATX Vidrio Templa', '13299', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_34567_Gabinete_Kolink_Inspire_K3_RGB__M-ATX_Vidrio_Templado_7306ef99-grn.jpg', '8'),
(12, 'Gabinete ASUS ROG STRIX Helios Aluminum Black RGB', '89160', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_21594_Gabinete_ASUS_ROG_STRIX_Helios_Aluminum_Black_RGB_81c9ec14-grn.jpg', '8'),
(13, 'Fuente ASUS ROG THOR 850W 80 Plus Platinum 850P', '54150', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_23295_Fuente_ASUS_ROG_THOR_850W_80_Plus_Platinum_850P_Full_modular_4de04ae6-grn.jpg', '9'),
(14, 'Mother ASUS PRIME A520M-K AM4', '17350', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_20551_Mother_ASUS_PRIME_A520M-K_AM4_f5d89e00-grn.jpg', '2'),
(15, 'Consola Microsoft XBOX Series S 512GB Digital', '128900', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_25495_Consola_Microsoft_XBOX_Series_S_512GB_Digital_f5fc94c4-grn.jpg', '10'),
(16, 'Monitor LG LED 19\'\' 19M38A-B VGA', '35820', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_8683_Monitor_LG_LED_19___19M38A-B_VGA_4607eba4-grn.jpg', '11'),
(17, 'Monitor Hikvision 22\'\' DS-D5022QE-E VGA HDMI', '40850', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_33977_Monitor_Hikvision_22___DS-D5022QE-E_VGA_HDMI_18808596-grn.jpg', '11'),
(18, 'Monitor LG LCD 49 49WL95C Curvo Ultra Wide', '477450', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_30683_Monitor_LG_LCD_49__49WL95C_Curvo_Ultra_Wide_DUAL_QHD_b4c30ae3-grn.jpg', '11'),
(19, 'Monitor Gamer LG 32 IPS QHD 32GP850-B 165Hz', '262630', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_32424_Monitor_Gamer_LG_32__IPS_QHD_32GP850-B_165Hz_da5d14a6-grn.jpg', '11'),
(20, 'Disco Rígido WD 1TB BLUE 64MB SATA 6.0GB/s', '8699', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_9018_Disco_R__gido_WD_1TB_BLUE_64MB_SATA_6.0GB_s__ca74d162-grn.jpg', '12'),
(24, 'Notebook ASUS ZenBook UX425 14\" Core I5 1135G7 8GB', '250950', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_30529_Notebook_ASUS_ZenBook_UX425_14__Core_I5_1135G7_8GB_512GB_SSD_W10_Home_68211288-grn.jpg', '1'),
(25, 'Auriculares Logitech H111 Single Jack', '2450', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_1172_Auriculares_Logitech_H111_Single_Jack_add9a544-grn.jpg', '3'),
(26, 'Auriculares Logitech G635 LightSync 7.1 ', '24000', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_13681_Auriculares_Logitech_G635_LightSync_7.1_da750b51-grn.jpg', '3'),
(27, 'Placa de Video GeForce MSI G210 1GB DDR3', '9940', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_26735_Placa_de_Video_GeForce_MSI_G210_1GB_DDR3_Low_Profile_c07b4910-grn.jpg', '4'),
(28, 'Placa de Video GALAX GeForce RTX 3050', '97750', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_35145_Placa_de_Video_GALAX_GeForce_RTX_3050_8GB_GDDR6_404d5e76-grn.jpg', '4'),
(29, 'Placa de Video PNY Quadro RTX 4000 8GB', '150000', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_29881_Placa_de_Video_PNY_Quadro_RTX_4000_8GB_GDDR6_Black_Box_ddaaa7b3-grn.jpg', '4'),
(30, 'Procesador AMD Ryzen 5 PRO 4650G 4.2GHz', '38500', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_21462_Procesador_AMD_Ryzen_5_PRO_4650G_4.2GHz_Turbo___Wraith_Stealth_Cooler_OEM_52f8e46a-grn.jpg', '5'),
(31, 'Procesador Intel Celeron G5905 3.5GHz', '8100', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_21913_Procesador_Intel_Celeron_G5905_3.5GHz_Socket_1200_aa932e7b-grn.jpg', '5'),
(32, 'Procesador Intel Celeron G6900 S1700', '14250', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_31468_Procesador_Intel_Celeron_G6900_S1700_12th_Gen_84b12400-grn.jpg', '5'),
(33, 'Procesador Intel Core i9 12900K 5.2GHz', '169700', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_29137_Procesador_Intel_Core_i9_12900K_5.2GHz_Turbo_Socket_1700_ef1d6e47-grn.jpg', '5'),
(34, 'Smartwatch Samsung Galaxy Watch5 Pro', '93490', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_34519_Smartwatch_Samsung_Galaxy_Watch5_Pro_Bluetooth_45mm_Grey_Titanium_-_SM-R920_fc9fc998-grn.jpg', '6'),
(35, 'Smartwatch Samsung Galaxy Watch5', '63400', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_34515_Smartwatch_Samsung_Galaxy_Watch5_Bluetooth_44mm_Silver_-_SM-R910_9b5511a8-grn.jpg', '6'),
(36, 'Smartwatch Samsung Galaxy Watch5', '59330', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_34507_Smartwatch_Samsung_Galaxy_Watch5_Bluetooth_40mm_Pink_Gold_-_SM-R900_1c777f15-grn.jpg', '6'),
(37, 'Memoria Adata DDR4 (2x8GB) 16GB 5000MHz', '187650', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_29885_Memoria_Adata_DDR4__2x8GB__16GB_5000MHz_XPG_Spectrix_D50_Xtreme_RGB_CL19_18133a6d-grn.jpg', '7'),
(38, 'Memoria Kingston DDR5 16GB 5200Mhz', '39700', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_30566_Memoria_Kingston_DDR5_16GB_5200Mhz_Fury_Beast_Black_8ce7507d-grn.jpg', '7'),
(39, 'Memoria Kingston DDR4 16GB 3200Mhz Fury Beast ', '26600', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_34066_Memoria_Kingston_DDR4_16GB_3200Mhz_Fury_Beast_RGB_CL16__00e802c3-grn.jpg', '7'),
(40, 'Mother Asrock X670E Taichi Carrara AM5 ', '186870', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_34911_Mother_Asrock_X670E_Taichi_Carrara_AM5_00f2f1c2-grn.jpg', '2'),
(41, 'Mother ASUS ROG STRIX B550-XE Gaming', '82350', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_24404_Mother_ASUS_ROG_STRIX_B550-XE_Gaming_Wifi_AM4_0daa3ca3-grn.jpg', '2'),
(42, 'Mother Asrock X570 Phantom Gaming 4 AM4', '36800', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_14225_Mother_Asrock_X570_Phantom_Gaming_4_AM4_PCIe_Gen4_60447878-grn.jpg', '2'),
(43, 'Gabinete Lian Li Odyssey X Black', '156700', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_32699_Gabinete_Lian_Li_Odyssey_X_Black_a41332f4-grn.jpg', '8'),
(44, 'Sony PlayStation 5 825GB Standard ', '334999', 'https://http2.mlstatic.com/D_NQ_NP_841787-MLA44484414455_012021-O.webp', '10'),
(45, 'Nintendo Switch Lite 32GB Standard', '101999', 'https://http2.mlstatic.com/D_NQ_NP_946244-MLA46868661375_072021-O.webp', '10'),
(46, 'Consola Kanji KJ-Pocket Standard', '4113', 'https://http2.mlstatic.com/D_NQ_NP_743522-MLA51571862443_092022-O.webp', '10'),
(47, 'Disco Solido SSD Externo USB', '98560', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_31409_Disco_Solido_SSD_Externo_USB_Type-C_Team_4TB_M200_2000MB_s_6c82fd0c-grn.jpg', '12'),
(48, 'Disco Rigido WD 14TB Red Pro 7.2K RPM 512MB', '95650', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_26481_Disco_Rigido_WD_14TB_Red_Pro_7.2K_RPM_512MB_c66a3fa3-grn.jpg', '12'),
(49, 'Disco Rigido WD 2TB BLUE 256MB SATA 6.0GB/s5', '11750', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_21014_Disco_Rigido_WD_2TB_BLUE_256MB_SATA_6.0GB_s5_44f766ac-grn.jpg', '12'),
(50, 'Disco Solido SSD KingDian 256GB S370 560MB/s', '5100', 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_32881_Disco_Solido_SSD_KingDian_256GB_S370_560MB_s_c98f29db-grn.jpg', '12'),
(52, 'T-Dagger Arena T-TGK321 QWERTY T-Dagger', '4930', 'https://http2.mlstatic.com/D_NQ_NP_645832-MLA50403770037_062022-O.webp', '26'),
(53, 'Teclado inalámbrico Logitech K400 Plus QWERTY', '7299', 'https://http2.mlstatic.com/D_NQ_NP_614187-MLA32722390623_102019-O.webp', '26'),
(54, 'Teclado Goma Flexible Siliconado', '2800', 'https://http2.mlstatic.com/D_NQ_NP_690744-MLA47755740764_102021-O.webp', '26'),
(55, 'Teclado Gamer Redragon Diti Mecanico 42 Teclas', '8499', 'https://http2.mlstatic.com/D_NQ_NP_930629-MLA47245572822_082021-O.webp', '26'),
(56, 'Noganet NKB-78011 QWERTY español', '666', 'https://http2.mlstatic.com/D_NQ_NP_634788-MLA42519841414_072020-O.webp', '26'),
(57, 'Noblex A50plus Negro 5 32/2gb Dualsim', '26499', 'https://http2.mlstatic.com/D_NQ_NP_637517-MLA52219675161_102022-O.webp', '30'),
(58, 'G42 128 Gb Verde Atlántico 4gb Ram', '62999', 'https://http2.mlstatic.com/D_NQ_NP_930921-MLA52181901586_102022-O.webp', '30'),
(59, 'Motorola Moto G52 128gb', '69999', 'https://http2.mlstatic.com/D_NQ_NP_756936-MLA50481070343_062022-O.webp', '30'),
(60, 'iPhone 13 Pro Gold 128 Gb', '1725000', 'https://http2.mlstatic.com/D_NQ_NP_866117-MLA47778565361_102021-O.webp', '30'),
(61, 'Samsung Galaxy S22 Ultra Verde 256gb', '899999', 'https://http2.mlstatic.com/D_NQ_NP_662572-MLA49879451811_052022-O.webp', '30'),
(62, 'Xiaomi Blackshark 5 12 256', '400000', 'https://http2.mlstatic.com/D_NQ_NP_915821-MLA50289048071_062022-O.webp', '30'),
(63, 'Xiaomi 12, 8gb Ram, 256gb, 5g', '259000', 'https://http2.mlstatic.com/D_NQ_NP_955650-MLA51461764174_092022-O.webp', '30'),
(64, 'Samsung F24T35 led 24', '53999', 'https://http2.mlstatic.com/D_NQ_NP_973781-MLA48131216539_112021-O.webp', '11'),
(65, 'Creality 3D Ender-3 Pro 100V/265V', '78370', 'https://http2.mlstatic.com/D_NQ_NP_993524-MLA44330273616_122020-O.webp', '31'),
(66, 'Impresora Fiscal Epson Tmt900fa', '156400', 'https://http2.mlstatic.com/D_NQ_NP_622239-MLA51179049921_082022-O.webp', '31'),
(67, 'Impresora Canon Pixma G1110', '38999', 'https://http2.mlstatic.com/D_NQ_NP_888857-MLA49637096644_042022-O.webp', '31'),
(68, 'Impresora HP Smart Tank 530 con wifi negra', '81077', 'https://http2.mlstatic.com/D_NQ_NP_717117-MLA45074626662_032021-O.webp', '31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ultimos_ingresos`
--

CREATE TABLE `ultimos_ingresos` (
  `id` int(10) NOT NULL,
  `cantidad` int(10) NOT NULL,
  `id_producto` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ultimos_ingresos`
--

INSERT INTO `ultimos_ingresos` (`id`, `cantidad`, `id_producto`) VALUES
(3, 29, 42),
(4, 10, 55),
(6, 50, 39),
(9, 8, 15),
(10, 1, 18),
(11, 66, 68),
(12, 80, 27),
(14, 456, 25),
(15, 22, 41),
(16, 2, 28),
(17, 65, 45),
(18, 98, 46),
(19, 98, 46),
(20, 98, 46),
(21, 98, 46),
(22, 20, 46),
(23, 25, 50),
(24, 25, 50),
(25, 23, 44),
(26, 4, 61),
(27, 1, 63),
(28, 5, 64),
(29, 65, 60),
(30, 5, 60),
(31, 10, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) NOT NULL,
  `avatar` text NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `email` varchar(300) NOT NULL,
  `permiso` varchar(20) NOT NULL,
  `contraseña` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `avatar`, `nombre`, `email`, `permiso`, `contraseña`) VALUES
(1, 'https://scontent.fush1-1.fna.fbcdn.net/v/t1.6435-9/46764810_10155994187967005_6335576983556063232_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_eui2=AeFucm0V00-RPo7vc175iiIx5c32TQFzKDrlzfZNAXMoOsD0ykeC5jZV6hgYNr-Tc7wK9fHBoXj3_0vvEMPsSPVk&_nc_ohc=D1aHptnYS44AX8mxb66&_nc_ht=scontent.fush1-1.fna&oh=00_AfC-G6kxHDdqKjkkBipjZHePXSCOBvcZ60r4mLSnk2yrLg&oe=639C6AD8', 'Tomas', 'aa@gmail.com', 'admin', 'a'),
(8, 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'NPC2', 'user3@gmail.com', 'admin', 'asdasd'),
(15, 'https://img.playbuzz.com/image/upload/ar_1.5,c_pad,f_jpg,b_auto/cdn/c6ec7035-16a1-4f43-81c9-a7f94572d012/cddecbdd-3b4a-41cb-b0e4-dd70a54212ad.jpg', 'NPC3', 'npc353245@gmail.com', 'user', 'asdfasdasd'),
(25, 'https://i.pinimg.com/564x/bf/52/5c/bf525c526834d976f2b26b9f3c6e0fed.jpg', 'NPC4', 'npsc353245@gmail.com', 'admin', 'asas'),
(26, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjPO9DY3vxhEUNbl9JjA3AX8_c83yrGzkKxKFfs7DKzQ&s', 'Cristian', 'pito@gmail.com', 'admin', '12'),
(39, 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'NPC ADMIN', 'npcAdmin@gmail.com', 'admin', 'a');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`idCarrito`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `lista_productos`
--
ALTER TABLE `lista_productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ultimos_ingresos`
--
ALTER TABLE `ultimos_ingresos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `idCarrito` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `lista_productos`
--
ALTER TABLE `lista_productos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `ultimos_ingresos`
--
ALTER TABLE `ultimos_ingresos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
