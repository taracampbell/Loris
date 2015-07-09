CREATE TABLE `news` (
    `ID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `Author` varchar(255) NOT NULL,
    `Timestamp` timestamp NOT NULL,
    `Posting` text NOT NULL,
    PRIMARY KEY (`ID`),
    CONSTRAINT `FK_news_1` FOREIGN KEY (`Author`) REFERENCES `users` (`UserID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;