ALTER TABLE `permissions` DROP FOREIGN KEY `fk_permissions_1`;
ALTER TABLE `permissions` DROP INDEX `fk_permissions_1_idx`;
ALTER TABLE `permissions` DROP COLUMN `categoryID`;

DROP TABLE `permissions_category`;

CREATE TABLE `permission_category` (
 `PermissionCategoryID` INTEGER unsigned NOT NULL AUTO_INCREMENT,
 `Name` varchar(255),
 `Label` varchar(255),
 PRIMARY KEY (`PermissionCategoryID`),
 UNIQUE KEY `UK_Category` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `permission_category_permissions_rel` (
  `PermissionCategoryID` INTEGER unsigned NOT NULL,
  `PermissionID` INTEGER unsigned NOT NULL,
  PRIMARY KEY  (`PermissionCategoryID`,`PermissionID`),
  CONSTRAINT `FK_permission_category_permissions_rel_PermissionCategoryID` FOREIGN KEY (`PermissionCategoryID`) REFERENCES `permission_category` (`PermissionCategoryID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_permission_category_permissions_rel_PermissionID` FOREIGN KEY (`PermissionID`) REFERENCES `permissions` (`permID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `users_permission_category_rel` (
  `UserID` INTEGER unsigned NOT NULL,
  `PermissionCategoryID` INTEGER unsigned NOT NULL,
  PRIMARY KEY  (`UserID`,`PermissionCategoryID`),
  CONSTRAINT `FK_users_permission_category_rel_userID` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_users_permission_category_rel_PermissionCategoryID` FOREIGN KEY (`PermissionCategoryID`) REFERENCES `permission_category` (`PermissionCategoryID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;