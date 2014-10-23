--
-- CouchDB
--

-- CouchDB
INSERT INTO ConfigSettings (Name, Description, Visible, AllowMultiple) VALUES ('CouchDB', 'CouchDB settings', 1, 0);

-- database
INSERT INTO ConfigSettings (Name, Description, Visible, AllowMultiple, DataType, Parent) SELECT 'database', '', 1, 0, 'text', ID FROM ConfigSettings WHERE Name="CouchDB";

-- hostname
INSERT INTO ConfigSettings (Name, Description, Visible, AllowMultiple, DataType, Parent) SELECT 'hostname', '', 1, 0, 'text', ID FROM ConfigSettings WHERE Name="CouchDB";

-- port
INSERT INTO ConfigSettings (Name, Description, Visible, AllowMultiple, DataType, Parent) SELECT 'port', '', 1, 0, 'text', ID FROM ConfigSettings WHERE Name="CouchDB";

-- admin
INSERT INTO ConfigSettings (Name, Description, Visible, AllowMultiple, DataType, Parent) SELECT 'admin', '', 1, 0, 'text', ID FROM ConfigSettings WHERE Name="CouchDB";

-- adminpass
INSERT INTO ConfigSettings (Name, Description, Visible, AllowMultiple, DataType, Parent) SELECT 'adminpass', '', 1, 0, 'text', ID FROM ConfigSettings WHERE Name="CouchDB";

--
-- Add default CouchDB values
--

-- port
INSERT INTO Config (ConfigID, Value) SELECT ID, 5984 FROM ConfigSettings WHERE Name="additional_user_info";