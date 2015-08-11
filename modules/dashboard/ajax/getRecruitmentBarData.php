<?php
/**
 * Send the data for the recruitment bar chart in JSON format
 *
 * PHP Version 5
 *
 * @category Dashboard
 * @package  Loris
 * @author   Tara Campbell <tara.campbell@mail.mcgill.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://github.com/aces/Loris
 */
set_include_path(get_include_path().":../project/libraries:../php/libraries:");
ini_set('default_charset', 'utf-8');

require_once __DIR__ . "/../../../vendor/autoload.php";

$DB = Database::singleton();

// Check request for site and project
$siteID    = $_REQUEST['siteID'];
$projectID = $_REQUEST['projectID'];

// Check that the user has access to the site they are requesting
if (!canUserAccessSite($siteID)) {
    error_log("ERROR: User is trying to access a site they are forbidden from accessing.");
    header("HTTP/1.1 400 Bad Request");
    exit(1);
} 

// Check that projects are being used
if (!usingProjects()) {
    error_log("ERROR: User is trying to filter by projects when projects are not being used.");
    header("HTTP/1.1 400 Bad Request");
    exit(2);
} 

// Build the query
// Get list of subprojects
// Iterate through subprojects and grab the data
$data = $DB->pselect(
    "",
    array()
);

print json_encode($data);
header("HTTP/1.1 200 OK");
print '{ "ok" : "Success" }';
exit();

/**
 * Determines whether a user has permission to view specific recruitment data
 * about a site. That is, whether they are trying to access their own site's data
 * or if they have access_all_profiles permission
 *
 * @param boolean $siteID  ID of the site the user is trying to filter by
 *
 * @return boolean
 */
function canUserAccessSite($siteID)
{
    $user = User::singleton();

    if ($user->hasPermission('access_all_profiles') || $user->getCenterID() === $siteID) {
        return true;
    } else {
        return false;
    }
}

/**
 * Checks whether the config setting useProjects is true or false
 *
 * @return boolean
 */
function usingProjects()
{
    $config = NDB_Config::singleton();
    if ($config->getSetting('useProjects')) {
        return true;
    } else {
        return false;
    }
}
?>