CREATE TABLE `permission_category` (
 `id` INTEGER unsigned NOT NULL AUTO_INCREMENT,
 `category_name` varchar(255),
 PRIMARY KEY (`id`)
);

INSERT INTO permission_category (category_name) VALUES ('Data Entry');

CREATE TABLE `permission_category_rel` (
  `categoryID` int(10) unsigned NOT NULL default '0',
  `permissionID` int(10) unsigned NOT NULL default '0',
  PRIMARY KEY  (`categoryID`,`permissionID`),
  CONSTRAINT `FK_permission_category_rel_1` FOREIGN KEY (`categoryID`) REFERENCES `permission_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_permission_category_rel_2` FOREIGN KEY (`permissionID`) REFERENCES `permissions` (`permID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data Entry
INSERT INTO permission_category_rel VALUES ((SELECT id FROM permission_category WHERE category_name='Data Entry'), (SELECT permID FROM permissions WHERE code='access_all_profiles'));
INSERT INTO permission_category_rel VALUES ((SELECT id FROM permission_category WHERE category_name='Data Entry'), (SELECT permID FROM permissions WHERE code='media_read'));
INSERT INTO permission_category_rel VALUES ((SELECT id FROM permission_category WHERE category_name='Data Entry'), (SELECT permID FROM permissions WHERE code='media_write'));
INSERT INTO permission_category_rel VALUES ((SELECT id FROM permission_category WHERE category_name='Data Entry'), (SELECT permID FROM permissions WHERE code='data_entry'));
INSERT INTO permission_category_rel VALUES ((SELECT id FROM permission_category WHERE category_name='Data Entry'), (SELECT permID FROM permissions WHERE code='bvl_feedback'));