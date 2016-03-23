ALTER TABLE ExternalLinkTypes ADD LinkLabel varchar(255);

UPDATE ExternalLinkTypes SET LinkLabel = 'Footer Links' WHERE LinkType = 'FooterLink';
UPDATE ExternalLinkTypes SET LinkLabel = 'Study Links' WHERE LinkType = 'StudyLinks';
UPDATE ExternalLinkTypes SET LinkLabel = 'Dashboard Links' WHERE LinkType = 'dashboard';