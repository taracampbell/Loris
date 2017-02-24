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
    $DB = Database::singleton();

    $candidates = $DB->pselect(
        "SELECT c.CandID, c.PSCID, psc.Name
         FROM candidate c
         LEFT JOIN psc USING (CenterID)
         WHERE c.Active='Y' AND c.Entity_type='human'"
    );

    $tableData = array();

    foreach ($candidates as $candidate) {
        $pscid  = $candidate['PSCID'];
        $psc    = $candidate['Name'];
        $visits = getVisitData($candidate['CandID'], $pscid);
        array_push($tableData, array('pscid' => $pscid, 'psc' => $psc, 'visits' => $visits));
    }

    return $tableData;
}

function getVisitData($candID, $pscid) {
    $toReturn = array();

    $DB = Database::singleton();

    $visits = $DB->pselect(
        "SELECT * FROM session WHERE CandID=:cid",
        array("cid" => $candID)
    );

    foreach ($visits as $v) {
        $visit = array(
            'sessionID' => $v['ID'],
            'visitRegStatus' => '',
            'dataEntryStatus' => '',
            'visitRegDueDate' => '',
            'dataEntryDueDate' => '',
            'instrCompleted' => 0,
            'totalInstrs' => 0,
            'visitLabel' => $v['Visit_label'],
            'cohort' => ''
        );

        $visit['cohort'] = $DB->pselect(
            "SELECT title FROM subproject WHERE SubprojectID = :sid",
            array("sid" => $v['SubprojectID'])
        );

        $instruments = $DB->pselect(
            "SELECT test_name FROM test_battery ".
            "WHERE Visit_label = :vl AND SubprojectID = :sid",
            array(
                "vl" => $v['Visit_label'],
                "sid" => $v['SubprojectID']
            )
        );

        $visit['totalInstrs'] = count($instruments);

        foreach ($instruments as $i) {
            $complete = $DB->pselect(
                "SELECT Data_entry_completion_status FROM {$i['test_name']} ".
                "WHERE CommentID LIKE {$candID}.{$pscid}%",
                array()
            );
            if ($complete === "Complete") {
                $v['instrCompleted']++;
            }
        }

        // TODO: get visit registration & data entry status and due dates

        $toReturn[] = $visit;
    }

    return $toReturn;
}

?>