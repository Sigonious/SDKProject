USE [master]
GO
/****** Object:  Database [KebabDB]    Script Date: 10/20/2016 10:54:57 AM ******/
CREATE DATABASE [KebabDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'KebabDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.TESTDB\MSSQL\DATA\KebabDB.mdf' , SIZE = 4096KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'KebabDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.TESTDB\MSSQL\DATA\KebabDB_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [KebabDB] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [KebabDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [KebabDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [KebabDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [KebabDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [KebabDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [KebabDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [KebabDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [KebabDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [KebabDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [KebabDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [KebabDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [KebabDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [KebabDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [KebabDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [KebabDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [KebabDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [KebabDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [KebabDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [KebabDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [KebabDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [KebabDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [KebabDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [KebabDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [KebabDB] SET RECOVERY FULL 
GO
ALTER DATABASE [KebabDB] SET  MULTI_USER 
GO
ALTER DATABASE [KebabDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [KebabDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [KebabDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [KebabDB] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [KebabDB] SET DELAYED_DURABILITY = DISABLED 
GO
USE [KebabDB]
GO
/****** Object:  Table [dbo].[beverages]    Script Date: 10/20/2016 10:54:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[beverages](
	[itemName] [varchar](35) NULL,
	[price] [decimal](6, 2) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bobaTea]    Script Date: 10/20/2016 10:54:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bobaTea](
	[itemName] [varchar](35) NULL,
	[price] [decimal](6, 2) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[extras]    Script Date: 10/20/2016 10:54:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[extras](
	[itemName] [varchar](35) NULL,
	[price] [decimal](6, 2) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[food]    Script Date: 10/20/2016 10:54:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[food](
	[itemName] [varchar](25) NULL,
	[price] [decimal](6, 2) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[beverages] ([itemName], [price]) VALUES (N'coke', CAST(1.50 AS Decimal(6, 2)))
INSERT [dbo].[beverages] ([itemName], [price]) VALUES (N'dietCoke', CAST(1.50 AS Decimal(6, 2)))
INSERT [dbo].[beverages] ([itemName], [price]) VALUES (N'orangeFanta', CAST(1.50 AS Decimal(6, 2)))
INSERT [dbo].[beverages] ([itemName], [price]) VALUES (N'sprite', CAST(1.50 AS Decimal(6, 2)))
INSERT [dbo].[beverages] ([itemName], [price]) VALUES (N'liptonTea', CAST(1.50 AS Decimal(6, 2)))
INSERT [dbo].[beverages] ([itemName], [price]) VALUES (N'bottledWater', CAST(1.50 AS Decimal(6, 2)))
INSERT [dbo].[bobaTea] ([itemName], [price]) VALUES (N'taroBoba', CAST(3.50 AS Decimal(6, 2)))
INSERT [dbo].[bobaTea] ([itemName], [price]) VALUES (N'honeydewBoba', CAST(3.50 AS Decimal(6, 2)))
INSERT [dbo].[bobaTea] ([itemName], [price]) VALUES (N'mangoBoba', CAST(3.50 AS Decimal(6, 2)))
INSERT [dbo].[bobaTea] ([itemName], [price]) VALUES (N'coconutBoba', CAST(3.50 AS Decimal(6, 2)))
INSERT [dbo].[bobaTea] ([itemName], [price]) VALUES (N'strawberryBoba', CAST(3.50 AS Decimal(6, 2)))
INSERT [dbo].[bobaTea] ([itemName], [price]) VALUES (N'mochaBoba', CAST(3.50 AS Decimal(6, 2)))
INSERT [dbo].[bobaTea] ([itemName], [price]) VALUES (N'tapiocaPearls', CAST(0.50 AS Decimal(6, 2)))
INSERT [dbo].[extras] ([itemName], [price]) VALUES (N'fries', CAST(1.00 AS Decimal(6, 2)))
INSERT [dbo].[extras] ([itemName], [price]) VALUES (N'whiteRice', CAST(1.00 AS Decimal(6, 2)))
INSERT [dbo].[extras] ([itemName], [price]) VALUES (N'fetaCheese', CAST(1.00 AS Decimal(6, 2)))
INSERT [dbo].[extras] ([itemName], [price]) VALUES (N'chiliFlakes', CAST(0.00 AS Decimal(6, 2)))
INSERT [dbo].[extras] ([itemName], [price]) VALUES (N'yogurtSauce', CAST(0.00 AS Decimal(6, 2)))
INSERT [dbo].[extras] ([itemName], [price]) VALUES (N'garlicYogurtSauce', CAST(0.00 AS Decimal(6, 2)))
INSERT [dbo].[extras] ([itemName], [price]) VALUES (N'hotSauce', CAST(0.00 AS Decimal(6, 2)))
INSERT [dbo].[extras] ([itemName], [price]) VALUES (N'extraMeat', CAST(2.00 AS Decimal(6, 2)))
INSERT [dbo].[food] ([itemName], [price]) VALUES (N'kebabBox', CAST(4.99 AS Decimal(6, 2)))
INSERT [dbo].[food] ([itemName], [price]) VALUES (N'kebabPita', CAST(5.99 AS Decimal(6, 2)))
INSERT [dbo].[food] ([itemName], [price]) VALUES (N'donerKebab', CAST(6.49 AS Decimal(6, 2)))
INSERT [dbo].[food] ([itemName], [price]) VALUES (N'kebabWrap', CAST(6.49 AS Decimal(6, 2)))
INSERT [dbo].[food] ([itemName], [price]) VALUES (N'kebabPlateFries', CAST(7.99 AS Decimal(6, 2)))
INSERT [dbo].[food] ([itemName], [price]) VALUES (N'kebabPlateRice', CAST(7.99 AS Decimal(6, 2)))
INSERT [dbo].[food] ([itemName], [price]) VALUES (N'kebabPlateWhiteBread', CAST(7.99 AS Decimal(6, 2)))
INSERT [dbo].[food] ([itemName], [price]) VALUES (N'kebabPlatePitaBread', CAST(7.99 AS Decimal(6, 2)))
INSERT [dbo].[food] ([itemName], [price]) VALUES (N'kebabPlateFlatBread', CAST(7.99 AS Decimal(6, 2)))
INSERT [dbo].[food] ([itemName], [price]) VALUES (N'kebabVegetarian', CAST(7.99 AS Decimal(6, 2)))
USE [master]
GO
ALTER DATABASE [KebabDB] SET  READ_WRITE 
GO
