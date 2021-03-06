
-- Add 'media' tab to the menu under Clinical section
DELETE FROM LorisMenu WHERE Label='Media';
INSERT INTO LorisMenu (Label, Link, Parent, OrderNumber) VALUES ('Media', 'media/', (SELECT ID FROM LorisMenu as L WHERE Label='Clinical'), 5);


-- Add 'media' table
CREATE TABLE IF NOT EXISTS `media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pscid` varchar(255) NOT NULL DEFAULT '',
  `visit_label` varchar(255) NOT NULL DEFAULT '',
  `instrument` varchar(255) DEFAULT NULL,
  `for_site` int(2) DEFAULT NULL,
  `date_taken` date DEFAULT NULL,
  `comments` text,
  `file_name` varchar(255) DEFAULT NULL,
  `file_type` varchar(255) DEFAULT NULL,
  `file_size` bigint(20) unsigned DEFAULT NULL,
  `data_dir` varchar(255) DEFAULT NULL,
  `uploaded_by` varchar(255) DEFAULT NULL,
  `hide_file` tinyint(1) DEFAULT '0',
  `date_uploaded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);


-- Add user permissions

-- Upload/Edit/Hide Media Files
SET @uploadPermissionID = (SELECT permID FROM permissions WHERE code='media_write');
INSERT IGNORE INTO permissions (`permID`, `code`, `description`, `categoryID`) VALUES (
    @uploadPermissionID, 'media_write', 'Media files: Uploading/Downloading/Editing', 2
);
INSERT IGNORE INTO user_perm_rel (`userID`, `permID`) VALUES (
  (SELECT ID FROM users WHERE UserID = 'admin'), (SELECT permID FROM permissions WHERE code = 'media_write')
);

-- Browse Media Files
SET @browsePermissionID = (SELECT permID FROM permissions WHERE code='media_read');
INSERT IGNORE INTO permissions (`permID`, `code`, `description`, `categoryID`) VALUES (
    @browsePermissionID, 'media_read', 'Media files: Browsing ', 2
);
INSERT IGNORE INTO user_perm_rel (`userID`, `permID`) VALUES (
  (SELECT ID FROM users WHERE UserID = 'admin'), (SELECT permID FROM permissions WHERE code = 'media_read')
);



-- Set path to upload/download media
SET @parentID = (SELECT ID FROM ConfigSettings WHERE Name = 'paths');
DELETE FROM ConfigSettings WHERE Name='mediaPath';
INSERT INTO ConfigSettings (`Name`, `Description`, `Visible`, `AllowMultiple`, `DataType`, `Parent`, `Label`, `OrderNumber`) VALUES (
  'mediaPath', 'Path to uploaded media files', 1, 0, 'text', @parentID, 'Media', 10
);

DELETE FROM Config WHERE ConfigID=(SELECT ID FROM ConfigSettings WHERE Name='mediaPath');
INSERT INTO Config (`ConfigID`, `Value`) VALUES (
  (SELECT ID FROM ConfigSettings WHERE Name='mediaPath'), '/data/uploads/'
);


