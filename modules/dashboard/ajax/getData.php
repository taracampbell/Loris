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
    $sites = Utility::getSiteList();
    return $sites;
}

function getVisitLabels() {
    $visits = Utility::getVisitList();
    return $visits;
}

function getTableData() {
    $DB = Database::singleton();

    $candidates = $DB->pselect(
        "SELECT c.PSCID, psc.Name
         FROM candidate c
         LEFT JOIN psc USING (CenterID)
         WHERE c.Active='Y' AND c.Entity_type='human'"
    );

    $tableData = array();

    foreach ($candidates as $candidate) {
        $pscid  = $candidate['PSCID'];
        $psc    = $candidate['Name'];
        $visits = array();

        array_push($tableData, array('pscid' => $pscid, 'psc' => $psc, 'visits' => $visits));
    }

    return $tableData;
}

?>