<?php
$DB = Database::singleton();

const DATA_ENTRY_DAYS = 14;
const VISIT_REG_DAYS  = 90;

if (isset($_GET['data'])) {
    $data = $_GET['data'];

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
            "cohorts"     => getCohorts(),
            "sites"       => getSites(),
            "tableData"   => getTableData(),
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
    global $DB;
    $sites = $DB->pselect(
        "SELECT DISTINCT p.Name, p.Alias
         FROM psc p
         INNER JOIN candidate c ON c.CenterID = p.CenterID",
        array()
    );

    return $sites;
}

function getVisitLabels() {
    //$visits = Utility::getVisitList();

    $visits = array(
        'Initial_Assessment_Screening',
        'Clinical_Assessment',
        'Neuropsychology_Assessment'
    );

    return $visits;
}

function getTableData() {
    global $DB;
    $visitLabels = getVisitLabels();
    $candidates = $DB->pselect(
        "SELECT c.PSCID, c.CandID, psc.Name, psc.Alias
         FROM candidate c
         LEFT JOIN psc USING (CenterID)
         WHERE c.Active='Y' AND c.Entity_type='human' AND c.CenterID <> 1",
        array()
    );
    $tableData = array();
    $sessIDPlaceHold = -1;
    foreach ($candidates as $candidate) {
        $pscid  = $candidate['PSCID'];
        $candID = $candidate['CandID'];
        $psc    = $candidate['Alias'];
        $visits = array();
        $screeningDone = false;
        foreach ($visitLabels as $visitLabel) {
            $session = $DB->pselectRow(
                "SELECT ID, SubprojectID, Date_visit
                 FROM session
                 WHERE CandID=:CID AND Visit_label=:VL",
                array('CID' => $candID, 'VL' => $visitLabel)
            );
            $sessionID        = null;
            $subproject       = null;
            $visitDate        = null;
            $visitRegStatus   = determineVisitRegStatus($visitLabel, $candID);
            $dataEntryStatus  = null;
            $dataEntryDueDate = null;
            $instrCompleted   = 0;
            if (!empty($session)) {
                $sessionID        = $session['ID'];
                $subproject       = $session['SubprojectID'];
                $visitDate        = $session['Date_visit'];
                $visitRegStatus   = 'complete-visit';
                $dataEntryStatus  = determineDataEntryStatus($sessionID, $visitDate);
                $dataEntryDueDate = determineDataEntryDueDate($visitDate);
                $instrCompleted   = getTotalInstrumentsCompleted($sessionID);
                if ($visitLabel === "Initial_Assessment_Screening") {
                    $screeningDone = true;
                }
            } else {
                $sessionID = $sessIDPlaceHold--;
            }
            $visit = array();
            $visit['sessionID']        = $sessionID;
            $visit['visitRegStatus']   = $visitRegStatus;
            $visit['dataEntryStatus']  = $dataEntryStatus;
            $visit['visitRegDueDate']  = determineVisitRegDueDate($visitLabel, $candID);
            $visit['dataEntryDueDate'] = $dataEntryDueDate;
            $visit['instrCompleted']   = $instrCompleted;
            $visit['totalInstrs']      = getTotalInstruments($visitLabel, $subproject);
            $visit['visitLabel']       = $visitLabel;
            $visit['cohort']           = getCohortName($subproject);
            array_push($visits, $visit);
        }
        if (!$screeningDone) {
            foreach ($visits as $k => $v) {
                $v['visitRegStatus'] = "no-deadline-visit";
                $visits[$k] = $v;
            }
        }
        array_push($tableData, array('pscid' => $pscid, 'psc' => $psc, 'visits' => $visits));
    }
    return $tableData;
}

function dateAdd($date, $days) {
    return date('Y-m-d', strtotime($date . ' + ' . $days . ' days'));
}

function datePast($date) {
    $date = new DateTime($date);
    $now  = new DateTime();

    if ($date < $now) {
        return true;
    }
    return false;
}

function determineVisitRegDueDate($visitLabel, $candID) {
    global $DB;

    if ($visitLabel == 'Initial_Assessment_Screening') {
        return null;
    } else {
        $initialDate = $DB->pselectOne(
            "SELECT Date_visit
             FROM session
             WHERE CandID=:CID AND Visit_label='Initial_Assessment_Screening'",
            array('CID' => $candID)
        );
        return dateAdd($initialDate, VISIT_REG_DAYS);
    }
}

function determineDataEntryDueDate($visitDate) {

    return dateAdd($visitDate, DATA_ENTRY_DAYS);
}

function determineVisitRegStatus($visitLabel, $candID) {
    if ($visitLabel == 'Initial_Assessment_Screening') {
        return 'no-deadline-visit';
    }

    if (!datePast(determineVisitRegDueDate($visitLabel, $candID))) {
        return 'deadline-approaching-visit';
    } else {
        return 'deadline-past-visit';
    }
}

function determineDataEntryStatus($sessionID, $visitDate) {
    global $DB;

    $session = $DB->pselect(
        "SELECT Submitted, Current_stage
         FROM session
         WHERE ID=:SID",
        array('SID' => $sessionID)
    );

    if ($session['Current_stage'] == 'Recycling Bin') {
        return 'cancelled-data';
    } else if ($session['Submitted'] =='Y') {
        return 'complete-data-entry';
    }

    if (!datePast(determineDataEntryDueDate($visitDate))) {
        return 'deadline-approaching-data-entry';
    } else {
        return 'deadline-past-data-entry';
    }
}

function getTotalInstruments($visitLabel, $subproject) {
    global $DB;

    $totalInstruments = $DB->pselectOne(
        "SELECT COUNT(*)
         FROM test_battery
         WHERE SubprojectID=:CID AND Visit_label=:V",
        array(
            'CID' => $subproject,
            'V'   => $visitLabel
        )
    );

    return $totalInstruments;
}

function getTotalInstrumentsCompleted($sessionID) {
    global $DB;

    $totalInstruments = $DB->pselectOne(
        "SELECT COUNT(ID)
         FROM flag
         WHERE SessionID=:SID AND Data_entry='Complete'",
        array('SID' => $sessionID)
    );

    return $totalInstruments;
}

function getCohortName($subproject) {
    global $DB;

    return $DB->pselectOne(
        "SELECT title 
         FROM subproject 
         WHERE SubprojectID=:sid",
        array("sid" => $subproject)
    );
}

?>