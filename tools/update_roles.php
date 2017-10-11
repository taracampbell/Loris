<?php
/**
 * Script to add or remove permissions from a role
 *
 * How to use:
 *
 * To see the roles in the database:
 *     php update_roles.php roles
 *
 * To see the permissions in the database:
 *     php update_roles.php permissions
 * 
 * To see the permissions for a role:
 *     php update_roles.php [role]
 * 
 * To add a permission to the role:
 *     php update_roles.php [role] add [permission]
 *
 * To remove a permission from the role:
 *     php update_roles.php [role] remove [permission]
 *
 * To recalculate and reasign the roles for every user:
 *     php update_roles.php refresh
 *
 * PHP Version 7
 *
 * @category Main
 * @package  Loris
 * @author   Tara Campbell <tara.campbell@gmail.com>
 * @license  Loris license
 * @link     https://www.github.com/aces/Loris
 */

require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/generic_includes.php";

$client = new NDB_Client();
$client->makeCommandLine();
$client->initialize(__DIR__."/../project/config.xml");

$roles       = getRoles();
$permissions = getPermissions();

// User did not provide any
if (count($argv) === 1) {
    syntaxIncorrect();
    exit();
}

// User asking for the list of roles
if (isset($argv[1]) && $argv[1] === "roles") {
    if (!empty($roles)) {
        print "The roles in the database are:\n\n";
        prettyPrint($roles);
    } else {
        print "There are currently no roles in the database.\n";
    }
    
    exit();
}

// User asking for the list of permissions
if (isset($argv[1]) && $argv[1] === "permissions") {
    print "The permissions in the database are:\n\n";
    prettyPrint($permissions);
    exit();
}

// User asking to reassign roles based on the user permissions
if (isset($argv[1]) && $argv[1] === "refresh") {
    refresh();
    exit();
}

if (isset($argv[1]) && !isRole($argv[1])) {
    syntaxIncorrect();
    exit();
}

$role = $argv[1];

// User asking for the permissions associated with a role
if (count($argv) === 2) {
    print "The permissions for the " . $role . " role are :\n\n";
    prettyPrint(getRolePermissions($role));
    exit();
}

// User looking to add a permission to a role
if (isset($argv[2]) && $argv[2] === "add") {
    if (isset($argv[3])) {
        $permission = $argv[3];
        if (isPermission($permission)) {
            addPermission($role, $permission);
            exit();
        } else {
            echo $permission . " is not a valid permission.\n";
            exit();
        }
    } else {
        echo "You must include the permission you would like to add.\n";
        exit();
    }
}

// User looking to remove a permission from a role
if (isset($argv[2]) && $argv[2] === "remove") {
    if (isset($argv[3])) {
        $permission = $argv[3];
        if (isPermission($permission)) {
            removePermission($role, $permission);
            exit();
        } else {
            echo $permission . " is not a valid permission.\n";
            exit();
        }
    } else {
        echo "You must include the permission you would like to remove.\n";
        exit();
    }
}

syntaxIncorrect();
exit();

/**
 * SyntaxIncorrect
 *
 * Prints a message to users with the argument instructions
 *
 * @return nothing
 */
function syntaxIncorrect()
{
    print "You have not used the correct argument syntax for this script.\n\n".
          "To see the roles in the database: php update_roles.php roles\n".
          "To see the permissions in the database: php update_roles.php " .
          "permissions\n".
          "To see the permissions for a role: php update_roles.php [role]\n".
          "To add a permission to the role: php update_roles.php [role] add " .
          "[permission]\n".
          "To remove a permission from the role: php update_roles.php [role] " .
          "remove [permission]\n".
          "To recalculate and reasign the roles for every user: php " .
          "update_roles.php refresh\n";
}

/**
 * PrettyPrint
 *
 * Prints an array without the array keys
 *
 * @param array $array the array to be printed
 *
 * @return nothing
 */
function prettyPrint($array)
{
    foreach ($array as $child) {
        echo $child . "\n";
    }
}

/**
 * GetRoles
 *
 * Returns a processed array of the role names in the database
 *
 * @return array of the role names in the database
 */
function getRoles()
{
    $DB = Database::singleton();

    $roles = $DB->pselect(
        "SELECT category
         FROM permission_categories",
        array()
    );

    $processedRoles = array();

    foreach ($roles as $role) {
        array_push($processedRoles, $role['category']);
    }

    return $processedRoles;
}

/**
 * GetPermissions
 *
 * Returns a processed array of the permission names in the database
 *
 * @return array of the permission names in the database
 */
function getPermissions()
{
    $DB = Database::singleton();

    $permissions = $DB->pselect(
        "SELECT code
         FROM permissions",
        array()
    );

    $processedPermissions = array();

    foreach ($permissions as $permission) {
        array_push($processedPermissions, $permission['code']);
    }

    return $processedPermissions;
}

/**
 * IsRole
 *
 * Detects if a string is a role within the database
 *
 * @param string $role the role to be checked
 *
 * @return boolean
 */
function isRole($role)
{
    $DB = Database::singleton();
    global $roles;

    if (in_array($role, $roles)) {
        return true;
    }
    return false;
}

/**
 * GetRoleID
 *
 * Returns the ID of a role given its name
 *
 * @param string $role the role
 *
 * @return int
 */
function getRoleID($role)
{
    $DB = Database::singleton();

    $roleID = $DB->pselectOne(
        "SELECT id
         FROM permission_categories
         WHERE category=:role",
        array("role" => $role)
    );
    return $roleID;
}

/**
 * IsPermission
 *
 * Detects if a string is a permission within the database
 *
 * @param string $permission the permission to be checked
 *
 * @return boolean
 */
function isPermission($permission)
{
    global $permissions;
    if (in_array($permission, $permissions)) {
        return true;
    }
    return false;
}

/**
 * GetPermissionID
 *
 * Returns the ID of a permission given its name
 *
 * @param string $permission the permission
 *
 * @return int
 */
function getPermissionID($permission)
{
    $DB = Database::singleton();

    $permissionID = $DB->pselectOne(
        "SELECT permID
         FROM permissions
         WHERE code=:permission",
        array("permission" => $permission)
    );
    return $permissionID;
}

/**
 * GetRolePermissions
 *
 * Returns the permissions associated to a role
 *
 * @param string $role the role
 *
 * @return array
 */
function getRolePermissions($role)
{
    $DB = Database::singleton();

    $permissions = $DB->pselect(
        "SELECT p.code
         FROM permissions p
         LEFT JOIN permission_categories_permissions_rel pcr
         ON p.permID=pcr.permission_id
         LEFT JOIN permission_categories pc
         ON pcr.permission_category_id=pc.ID
         WHERE pc.category=:role",
        array("role" => $role)
    );

    $processedPermissions = array();

    foreach ($permissions as $permission) {
        array_push($processedPermissions, $permission['code']);
    }

    return $processedPermissions;
}

/**
 * GetUserPermissions
 *
 * Returns the permissions associated to a user
 *
 * @param string $ID the user ID
 *
 * @return array
 */
function getUserPermissions($ID)
{
    $DB = Database::singleton();

    $userPermissions = $DB->pselect(
        "SELECT p.code
         FROM user_perm_rel upr
         LEFT JOIN permissions p USING (permID)
         WHERE userID=:user",
        array('user' => $ID)
    );

    $processedUserPermissions = array();

    foreach ($userPermissions as $permission) {
        array_push($processedUserPermissions, $permission['code']);
    }

    return $processedUserPermissions;
}

/**
 * GetUserIDs
 *
 * Returns all the user IDs in the database/
 *
 * @return array
 */
function getUserIDs()
{
    $DB = Database::singleton();

    $userIDs = $DB->pselect(
        "SELECT ID, Real_name
         FROM users",
        array()
    );

    return $userIDs;
}

/**
 * GetUsersWithRole
 *
 * Returns all the users with the permissions matching to a role
 *
 * @param string $role the role
 *
 * @return array
 */
function getUsersWithRole($role)
{
    $usersWithRole = array();

    foreach (getUserIDs() as $userID) {
        if (userHasRole($userID, $role)) {
            array_push($usersWithRole, $userID);
        }
    }
    return $usersWithRole;
}

/**
 * GetUserRolesByPermission
 *
 * Returns all the users with the permissions matching to a role
 *
 * @param int $userID the UserID
 *
 * @return array
 */
function getUserRolesByPermission($userID)
{
    global $roles;
    $userPermissions = getUserPermissions($userID);
    $userRoles       = array();

    foreach ($roles as $role) {
        $rolePermissions = getRolePermissions($role);
        if (!array_diff($rolePermissions, $userPermissions)) {
            array_push($userRoles, $role);
        }
    }

    return $userRoles;
}

/**
 * UserHasRole
 *
 * Checks if a given user has a given role
 *
 * @param int    $userID the user ID
 * @param string $role   the name of the role
 *
 * @return boolean
 */
function userHasRole($userID, $role)
{
    $DB = Database::singleton();

    $roleID = $DB->pselect(
        "SELECT upc.permission_category_id
         FROM users_permission_categories_rel upc
         LEFT JOIN permission_categories pc ON pc.id=upc.permission_category_id
         WHERE upc.user_id=:userID AND pc.category=:role",
        array(
         'userID' => $userID,
         'role'   => $role,
        )
    );

    if (empty($roleID)) {
        return false;
    }
    return true;
}

/**
 * UserHasPermission
 *
 * Checks if a given user has a given permission
 *
 * @param int    $userID     the user ID
 * @param string $permission the name of the permission
 *
 * @return boolean
 */
function userHasPermission($userID, $permission)
{
    $DB = Database::singleton();

    $permission = $DB->pselect(
        "SELECT upr.userID
         FROM user_perm_rel upr
         LEFT JOIN permissions p USING (permID)
         WHERE upr.userID=:userID AND p.code=:permission",
        array(
         'userID'     => $userID,
         'permission' => $permission,
        )
    );

    if (empty($permission)) {
        return false;
    }
    return true;
}

/**
 * RoleHasPermission
 *
 * Checks if a given role contains a given permission
 *
 * @param string $role       the name of the role
 * @param string $permission the name of the permission
 *
 * @return boolean
 */
function roleHasPermission($role, $permission)
{
    $rolePermissions = getRolePermissions($role);

    if (in_array($permission, $rolePermissions)) {
        return true;
    }
    return false;
}

/**
 * RoleHasPermission
 *
 * Checks if a given role contains a given permission
 *
 * @return boolean
 */
function refresh()
{
    $DB = Database::singleton();

    // Iterate over each user, update their roles based on their permissions
    foreach (getUserIDs() as $user) {

        $userID = $user['ID'];

        echo "Updating roles for " . $user['Real_name'] . "\n";

        // delete existing roles
        $DB->delete(
            'users_permission_categories_rel',
            array('user_id' => $userID)
        );

        // recalculate their roles
        $newRoles = getUserRolesByPermission($user['ID']);

        // update their roles in the database
        foreach ($newRoles as $role) {
            echo "\tAdding " . $role . "\n";
            $DB->insert(
                'users_permission_categories_rel',
                array(
                 'user_id'                => $userID,
                 'permission_category_id' => getRoleID($role),
                )
            );
        }

        echo "\n";
    }
}

/**
 * AddPermission
 *
 * Adds a permission to a role
 * Updates users with that role
 *
 * @param string $role       the name of the role
 * @param string $permission the name of the permission
 *
 * @return nothing
 */
function addPermission($role, $permission)
{
    $DB = Database::singleton();

    echo "Adding the " . $permission . " permission to the " . $role .
        " role...\n\n";

    // Check is it has that permission already
    if (roleHasPermission($role, $permission)) {
        echo "The " . $role . " role already has the " . $permission .
            " permission. No changes to be made.\n";
        exit();
    }

    $roleID       = getRoleID($role);
    $permissionID = getPermissionID($permission);

    // Insert the permission into permission role rel table
    $DB->insert(
        'permission_categories_permissions_rel',
        array(
         'permission_category_id' => $roleID,
         'permission_id'          => $permissionID,
        )
    );

    echo "\n" . $permission . " was added to the " . $role . " category.\n\n";

    // Update the permissions for the user with the role
    echo "Updating the users with the " . $role . " role...\n\n";

    foreach (getUsersWithRole($role) as $user) {
        if (!userHasPermission($user['ID'], $permission)) {
            $DB->insert(
                'user_perm_rel',
                array(
                 'userID' => $user['ID'],
                 'permID' => $permissionID,
                )
            );

            echo $user['Real_name'] . " was granted the " . $permission .
                " permission.\n";
        } else {
            echo $user['Real_name'] . " already has the " . $permission .
                " permission.\n";
        }
    }
}

/**
 * RemovePermission
 *
 * Removes a permission from a role
 * Updates users with that role
 *
 * @param string $role       the name of the role
 * @param string $permission the name of the permission
 *
 * @return nothing
 */
function removePermission($role, $permission)
{
    $DB = Database::singleton();

    echo "Removing the " . $permission . " permission from the " . $role .
        " role...\n\n";

    // Check is it has that permission already
    if (!roleHasPermission($role, $permission)) {
        echo "The " . $role . " role does not contain the " . $permission .
            " permission. No changes to be made.\n";
        exit();
    }

    // Delete the role from the role permission rel table
    $DB->delete(
        'permission_categories_permissions_rel',
        array(
         'permission_category_id' => getRoleID($role),
         'permission_id'          => getPermissionID($permission),
        )
    );

    echo "\n" . $permission . " was removed from the " . $role . " category.\n";

    // Update the users with that role
    echo "Updating the user with the " . $role . " role...\n\n";

    foreach (getUsersWithRole($role) as $user) {
        if (userHasPermission($user['ID'], $permission)) {
            $DB->delete(
                'user_perm_rel',
                array(
                 'userID' => $user['ID'],
                 'permID' => getPermissionID($permission),
                )
            );

            echo $user['Real_name'] . " lost the " . $permission . " permission.\n";
        } else {
            echo $user['Real_name'] . " does not have the " . $permission .
                " permission. Nothing to delete.\n";
        }
    }
}
?>