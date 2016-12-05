<?php

$data = array(
         'roles' => getRoles(),
         'permissions' => getPermissions(),
        );

echo json_encode($data);
exit();

function getRoles() {
    $DB =& Database::singleton();
    $user   = User::singleton();
    $userID = $user->getUserID();

    $roles = $DB->pselect(
        "SELECT ID as id, category_name as name
         FROM permission_category",
        array()
    );

    foreach ($roles as &$role) {
        $permissions = $DB->pselect(
            "SELECT permissionID
             FROM permission_category_rel
             WHERE categoryID=:CID",
            array('CID' => $role['id'])
        );
        $role['permissions'] = $permissions;

        foreach ($role['permissions'] as &$permission) {
            $enabled = $DB->pselectOne(
                "SELECT permID
                 FROM user_perm_rel
                 WHERE userID=:UID AND permID=:PID",
                array('UID' => $userID, 'PID' => $permission['permissionID'])
            );

            if (!$enabled) {
                $role['disabled'] = true;
                break;
            }
        }
    }

    return $roles;
}

function getPermissions() {
    $DB =& Database::singleton();

    $permissions = $DB->pselect(
        "SELECT permID as id, description as name
         FROM permissions",
        array()
    );

    // TODO: get user id dynamically
    $userEdit = $_REQUEST['identifier'];
    $userEditID = $DB->pselectOne(
        "SELECT ID
         FROM users
         WHERE UserID=:UID",
        array('UID' => $userEdit)
    );

    $user   = User::singleton();
    $userID = $user->getUserID();

    foreach ($permissions as &$permission) {
        $checked = $DB->pselectOne(
            "SELECT permID
             FROM user_perm_rel
             WHERE userID=:UID AND permID=:PID",
            array('UID' => $userEditID, 'PID' => $permission['id'])
        );

        if ($checked) {
            $permission['checked'] = true;
        } else {
            $permission['checked'] = false;
        }

        $enabled = $DB->pselectOne(
            "SELECT permID
             FROM user_perm_rel
             WHERE userID=:UID AND permID=:PID",
            array('UID' => $userID, 'PID' => $permission['id'])
        );

        if ($enabled) {
            $permission['disabled'] = false;
        } else {
            $permission['disabled'] = true;
        }
    }

    return $permissions;
}
?>