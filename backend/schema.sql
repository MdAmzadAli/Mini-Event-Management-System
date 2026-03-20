
CREATE DATABASE IF NOT EXISTS event_management;
USE event_management;

CREATE TABLE `User` (
  `id`        VARCHAR(36)  NOT NULL,
  `name`      VARCHAR(100) NOT NULL,
  `email`     VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `Event` (
  `id`               VARCHAR(36)  NOT NULL,
  `title`            VARCHAR(191) NOT NULL,
  `description`      VARCHAR(191)     NULL,
  `date`             DATETIME(3)  NOT NULL,
  `totalCapacity`    INT          NOT NULL,
  `remainingTickets` INT          NOT NULL,
  `createdAt`        DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),
  INDEX `Event_date_idx` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `Booking` (
  `id`          VARCHAR(36)  NOT NULL,
  `userId`      VARCHAR(36)  NOT NULL,
  `eventId`     VARCHAR(36)  NOT NULL,
  `bookingCode` VARCHAR(36)  NOT NULL,
  `bookingDate` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),
  UNIQUE KEY `Booking_bookingCode_key` (`bookingCode`),
  UNIQUE KEY `Booking_userId_eventId_key` (`userId`, `eventId`),
  INDEX `Booking_eventId_idx` (`eventId`),

  CONSTRAINT `Booking_userId_fkey`
    FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE,

  CONSTRAINT `Booking_eventId_fkey`
    FOREIGN KEY (`eventId`) REFERENCES `Event` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `EventAttendance` (
  `id`        VARCHAR(36) NOT NULL,
  `userId`    VARCHAR(36) NOT NULL,
  `eventId`   VARCHAR(36) NOT NULL,
  `entryTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),
  UNIQUE KEY `EventAttendance_userId_eventId_key` (`userId`, `eventId`),
  INDEX `EventAttendance_eventId_idx` (`eventId`),

  CONSTRAINT `EventAttendance_userId_fkey`
    FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE,

  CONSTRAINT `EventAttendance_eventId_fkey`
    FOREIGN KEY (`eventId`) REFERENCES `Event` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;