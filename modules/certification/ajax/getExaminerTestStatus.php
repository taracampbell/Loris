<?php
/**
 * Certification module....
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

require_once "Database.class.inc";
require_once 'NDB_Config.class.inc';
require_once 'NDB_Client.class.inc';
$config =& NDB_Config::singleton();
$client = new NDB_Client();
$client->makeCommandLine();
$client->initialize();

$DB = Database::singleton();

// Get the ID for the instrument that was selected
$instrumentID = $_REQUEST['instrument'];

// Check what instruments for which the examiner is already certified -> how do you get the identifier???
/*$certifiedInstruments = $DB->pselect(
    "SELECT testID FROM certification WHERE certID=:CID",
    array('CID' => $_REQUEST['identifier'])
);*/

$certificationStatus = $DB->pselect(
    "SELECT pass FROM certification WHERE certID=:CID AND testID=:TID",
    array('CID' => 4, 'TID' => $instrumentID)
);

// Check if the examiner is certified for the selected instrument
if ($certificationStatus["pass"] == 'certified') {
    print 0;
} else if ($certificationStatus["pass"] == 'in_training') {
    print 1;
} else {
    print 2;
    //print json_encode($certificationStatus);
}
?>