<?php

if (isset($_GET['data'])) {
    $data = $_GET['data'];
    if ($data == "cohorts") {
        echo json_encode(getCohorts());
    } else if ($data == "sites") {
        echo json_encode(getSites());
    } else if ($data == "tableData") {
        echo json_encode(getTableData());
    } else if ($data == "visitLabels") {
        echo json_encode(getVisitLabels());
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
}

?>