-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 19-10-2019 a las 02:42:28
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.2.22

--
-- Estructura de base de datos de:
-- La Candelaria - Turmero
-- Desarrollado por Recker
--
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `candeDB`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admins`
--
-- Creación: 01-10-2019 a las 18:39:04
--

CREATE TABLE `admins` (
  `cedula` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'A-',
  `user` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(75) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'admin/avatars/default.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anuncios`
--
-- Creación: 18-10-2019 a las 16:05:17
-- Última actualización: 18-10-2019 a las 21:10:58
--

CREATE TABLE `anuncios` (
  `id` int(10) NOT NULL,
  `title` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL,
  `byUser` varchar(60) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `baneos`
--
-- Creación: 01-10-2019 a las 18:39:06
-- Última actualización: 18-10-2019 a las 23:54:35
--

CREATE TABLE `baneos` (
  `ban_cedula` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `ban_user` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `time` int(16) NOT NULL,
  `attempts` int(1) NOT NULL DEFAULT 0,
  `locks` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `creadores`
--
-- Creación: 17-10-2019 a las 12:09:24
--

CREATE TABLE `creadores` (
  `cedula` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'CR-',
  `user` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(75) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'creadores/avatars/default.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--
-- Creación: 01-10-2019 a las 18:39:08
--

CREATE TABLE `cursos` (
  `id_c` varchar(7) COLLATE utf8_unicode_ci NOT NULL,
  `curso` varchar(7) COLLATE utf8_unicode_ci NOT NULL,
  `seccion` varchar(1) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--
-- Creación: 01-10-2019 a las 18:39:24
--

CREATE TABLE `estudiantes` (
  `e_id` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `archivo` int(3) NOT NULL,
  `horario` enum('0','1') COLLATE utf8_unicode_ci NOT NULL,
  `nota` enum('0','1') COLLATE utf8_unicode_ci NOT NULL,
  `curso_id` varchar(7) COLLATE utf8_unicode_ci NOT NULL,
  `profeGuia_id` varchar(7) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--
-- Creación: 01-10-2019 a las 18:39:26
--

CREATE TABLE `login` (
  `cedula` varchar(16) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'V-',
  `user` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(75) COLLATE utf8_unicode_ci NOT NULL,
  `estudi_id` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'user/avatars/default.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs`
--
-- Creación: 01-10-2019 a las 18:39:21
-- Última actualización: 19-10-2019 a las 00:38:12
--

CREATE TABLE `logs` (
  `log_id` int(11) NOT NULL,
  `log_cedula` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `log_user` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL,
  `time` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `accion` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `news`
--
-- Creación: 15-10-2019 a las 06:33:19
-- Última actualización: 19-10-2019 a las 00:19:38
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8_unicode_ci NOT NULL,
  `img` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `fecha` datetime NOT NULL,
  `owner` varchar(40) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preinscripcion`
--
-- Creación: 01-10-2019 a las 18:39:15
--

CREATE TABLE `preinscripcion` (
  `cedula` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'P-',
  `user` varchar(30) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'candelaria',
  `password` varchar(75) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores_guia`
--
-- Creación: 01-10-2019 a las 18:39:15
--

CREATE TABLE `profesores_guia` (
  `id_pg` varchar(7) COLLATE utf8_unicode_ci NOT NULL,
  `user_pg` varchar(25) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reloginID`
--
-- Creación: 01-10-2019 a las 18:39:22
-- Última actualización: 19-10-2019 a las 00:38:12
--

CREATE TABLE `reloginID` (
  `relogin_id` int(11) NOT NULL,
  `relogin_encript` varchar(75) COLLATE utf8_unicode_ci NOT NULL,
  `relogin_user` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `relogin_cedula` varchar(40) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`cedula`);

--
-- Indices de la tabla `anuncios`
--
ALTER TABLE `anuncios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `byUser` (`byUser`);

--
-- Indices de la tabla `baneos`
--
ALTER TABLE `baneos`
  ADD PRIMARY KEY (`ban_cedula`);

--
-- Indices de la tabla `creadores`
--
ALTER TABLE `creadores`
  ADD PRIMARY KEY (`cedula`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id_c`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`e_id`),
  ADD KEY `curso_id` (`curso_id`,`profeGuia_id`),
  ADD KEY `profeGuia_id` (`profeGuia_id`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`cedula`),
  ADD KEY `estudi_id` (`estudi_id`);

--
-- Indices de la tabla `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `log_cedula` (`log_cedula`);

--
-- Indices de la tabla `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `preinscripcion`
--
ALTER TABLE `preinscripcion`
  ADD PRIMARY KEY (`cedula`);

--
-- Indices de la tabla `profesores_guia`
--
ALTER TABLE `profesores_guia`
  ADD PRIMARY KEY (`id_pg`);

--
-- Indices de la tabla `reloginID`
--
ALTER TABLE `reloginID`
  ADD PRIMARY KEY (`relogin_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anuncios`
--
ALTER TABLE `anuncios`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `logs`
--
ALTER TABLE `logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reloginID`
--
ALTER TABLE `reloginID`
  MODIFY `relogin_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD CONSTRAINT `estudiantes_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id_c`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `estudiantes_ibfk_2` FOREIGN KEY (`profeGuia_id`) REFERENCES `profesores_guia` (`id_pg`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `login_ibfk_1` FOREIGN KEY (`estudi_id`) REFERENCES `estudiantes` (`e_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
