<?php
/**
 * Certification training: Creates the html for the tab navigation,
 * and the divs that will hold the tab content.
 *
 * PHP Version 5
 *
 * @category Behavioural
 * @package  Loris
 * @author   Tara Campbell <tara.campbell@mail.mcgill.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://github.com/aces/Loris
 */
set_include_path(get_include_path().":../project/libraries:../php/libraries:");
ini_set('default_charset', 'utf-8');

require_once __DIR__ . "/../../../vendor/autoload.php";

$DB = Database::singleton();

// Get the tab titles
$news = $DB->pselect(
    "SELECT Author, DATE_FORMAT(Timestamp, '%b %d %Y %h:%i %p') as Timestamp, Posting
     FROM news
     ORDER BY Timestamp DESC
     LIMIT 15",
    array()
);

print json_encode($news);
?>