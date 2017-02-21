<?php
/**
 * Returns data for study tracker
 *
 * PHP Version 5
 *
 * @category Main
 * @package  Loris
 * @author   Various <example@example.com>
 * @license  Loris license
 * @link     https://www.github.com/aces/Loris-Trunk/
 */
set_include_path(get_include_path().":".__DIR__."/../../php/libraries:");

$client = new NDB_Client();
$client->makeCommandLine();
$client->initialize(__DIR__."/../config.xml");
$config = NDB_Config::singleton();
$db =& Database::singleton();
$database = $config->getSetting('database');
$base = $config->getSetting('base');
$db->_trackChanges = false;

$rows = [];

$pscids = $db->pselect(
    "SELECT PSCID, CenterID, CandID, Date_registered 
     FROM candidate WHERE CenterID <> 1 AND PSCID <> 'scanner'",
    array()
);

foreach($pscids as $p) {
    // get name of site
    $site = $db->pselectOne(
        "SELECT Name FROM psc WHERE CenterID = :cid",
        array(
            'cid' => $p['CenterID']
        )
    );

    // Get all visit data
    $rawVisits = $db->pselect(
        "SELECT ID, Visit_label, SubprojectID, Date_registered, Visit FROM session WHERE CandID=:cid",
        array("cid" => $p["CandID"])
    );

    $visits = [];
    foreach($rawVisits as $v) {
        $visit = array(
            'sessionID' => '',
            'visitLabel' => '',
            'cohort' => '',
            'visitRegStatus' => '',
            'dataEntryStatus' => '',
            'visitRegDueDate' => '',
            'dataEntryDueDate' => '',
            'instrComplete' => '',
            'totalInstrs' => '',
        );

        // The easy stuff
        $visit['sessionID'] = $v["ID"];
        $visit['visitLabel'] = $v['Visit_label'];
        $visit['cohort'] = $db->pselectOne(
            "SELECT title FROM subproject WHERE SubprojectID = :spid",
            array("spid" => $v['SubprojectID'])
        );

        // VISIT REGISTRATION STATUS
        // if visit has a non-null date registered field then set to complete
        if ($v['Date_registered']) {
            $visit['visitRegStatus'] = 'complete';
        } else {
            // determine a deadline or whether it was cancelled
        }

        // DATA ENTRY STATUS
        // If the Visit column is set to pass, then all instruments have been set to
        // complete
        if ($v['Visit'] === "Pass") {
            $visit['dataEntryStatus'] = "complete";
        } else {
            // determine the number of instruments completed and due date
            $testNames = $db->pselect(
                "SELECT Test_name FROM test_battery 
                WHERE Visit_label=:vl AND SubprojectID=:spid",
                array(
                    "vl" => $v['Visit_label'],
                    "spid" => $v['SubprojectID']
                )
            );

            foreach($testNames as $tn) {
                if ($db->tableExists($tn['Test_name'])) {
                    
                }
            }
        }

        // TOTAL INSTRUMENTS
        $totalInstrs = $db->pselectOne(
            "SELECT COUNT(*) FROM test_battery 
            WHERE Visit_label=:vl AND SubprojectID=:spid",
            array(
                "vl" => $v['Visit_label'],
                "spid" => $v['SubprojectID']
            )
        );

        $visit['totalInstrs'] = $totalInstrs;
    }

    $rows[] = array(
        'PSCID' => $p['PSCID'],
        'PSC' => $site,
    );
}

echo json_encode($rows);