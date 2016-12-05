<?php

$data = array(
         'roles' => getRoles(),
         'permissions' => getPermissions()
        );

echo json_encode($data);
exit();

function getRoles() {
    $DB =& Database::singleton();

    $categories = $DB->pselect(
        "SELECT ID as id, category_name as name
         FROM permission_category",
        array()
    );

    foreach ($categories as &$category) {
        $permissions = $DB->pselect(
            "SELECT permissionID
             FROM permission_category_rel
             WHERE categoryID=:CID",
            array('CID' => $category['id'])
        );
        $category['permissions'] = $permissions;
    }

    return $categories;
}

function getPermissions() {
    $DB =& Database::singleton();

    $permissions = $DB->pselect(
        "SELECT permID as id, description as name
         FROM permissions",
        array()
    );

    return $permissions;
}

?>