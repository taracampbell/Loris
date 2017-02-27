<?php
if (isset($_GET['data'])) {
    $data = $_GET['data'];
    $db = Database::singleton();
    if ($data == "cohorts") {
        header('Content-Type: application/json');
        echo json_encode(getCohorts());
    } else if ($data == "sites") {
        header('Content-Type: application/json');
        echo json_encode(getSites());
    } else if ($data == "tableData") {
        header('Content-Type: application/json');
        echo json_encode(getTableData());
    } else if ($data == "visitLabels") {
        header('Content-Type: application/json');
        echo json_encode(getVisitLabels());
    } else if ($data == 'all') {
        header('Content-Type: application/json');
        $result = array(
            "cohorts" => getCohorts(),
            "sites" => getSites(),
            "tableData" => getTableData(),
            "visitLabels" => getVisitLabels()
        );
        echo json_encode($result);
    } else {
        header("HTTP/1.1 404 Not Found");
    }
}

exit();

function getCohorts() {
    $cohorts = Utility::getSubprojectList();
    return $cohorts;
}

function getSites() {
    //$sites = Utility::getSiteList();
    $DB = Database::singleton();
    $sites = $DB->pselect(
        "SELECT DISTINCT p.Name, p.Alias FROM psc p ".
        "INNER JOIN candidate c ON c.CenterID = p.CenterID"
    );

    return $sites;
}

function getVisitLabels() {
    $visits = Utility::getVisitList();
    return $visits;
}

function getTableData() {
    $candidates = $DB->pselect(
        "SELECT c.PSCID, c.CandID, psc.Name
         FROM candidate c
         LEFT JOIN psc USING (CenterID)
         WHERE c.Active='Y' AND c.Entity_type='human'"
    );

    $tableData = array();

    foreach ($candidates as $candidate) {
        $pscid  = $candidate['PSCID'];
        $candID = $candidate['CandID'];
        $psc    = $candidate['Name'];
        $visits = array();

        $sessionInfo = $DB->pselect(
            "SELECT ID, Visit_label, SubprojectID, Submitted, Date_visit
             FROM session
             WHERE CandID=:CID",
            array('CID' => $candID)
        );

        foreach ($sessionInfo as $session) {
            $sessionID  = $session['ID'];
            $subproject = $session['SubprojectID'];
            $visitLabel = $session['Visit_label']

            $visit = array();
            $visit['sessionID'] = $sessionID;
            $visit['visitRegStatus'] = 'no-deadline-visit';
            $visit['dataEntryStatus'] = 'no-deadline-visit';
            $visit['visitRegDueDate'] = null;
            $visit['dataEntryDueDate'] = null;
            $visit['instrCompleted'] = getTotalInstrumentsCompleted($sessionID);
            $visit['totalInstrs'] = getTotalInstruments($visitLabel, $subproject);
            $visit['visitLabel'] = $visitLabel;
            $visit['cohort'] = $subproject;

            array_push($visits, $visit);
        }

        array_push($tableData, array('pscid' => $pscid, 'psc' => $psc, 'visits' => $visits));
    }

    return $tableData;
}

function getTotalInstruments($visitLabel, $subproject) {
    global $DB;

    $totalInstruments = $DB->pselect(
        "SELECT COUNT(ID)
         FROM test_battery
         WHERE SubprojectID=:CID AND Visit_label=:V",
        array('CID' => $candID)
    );

    return $totalInstruments;
}

function getTotalInstrumentsCompleted($sessionID) {
    global $DB;

    $totalInstruments = $DB->pselect(
        "SELECT COUNT(ID)
         FROM flag
         WHERE SessionID=:SID AND Data_entry='Complete'",
        array('SID' => $sessionID)
    );

    return $totalInstruments;
}

?>