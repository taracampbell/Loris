<?php
/**
 * This file contains the NDB_Menu_Filter_media class
 *
 * PHP Version 5
 *
 * @category Module
 * @package  Media
 * @author   Alex Ilea <ailea.mcin@gmail.com>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/CCNA/
 */

require_once 'NDB_Menu_Filter.class.inc';

/**
 * Main class for media module corresponding to /media/ URL
 * Child or Clinical section of the LorisMenu.
 *
 * Displays a list of media files and control panel to search them and upload
 * new ones.
 *
 * PHP Version 5
 *
 * @category Module
 * @package  Media
 * @author   Alex Ilea <ailea.mcin@gmail.com>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/CCNA/
 */
class NDB_Menu_Filter_Media extends NDB_Menu_Filter
{
    public $centerIDMap;
    public $hasWritePermission = false;

    /**
     * Check user permissions
     *
     * @return bool
     * @throws ConfigurationException
     */
    function _hasAccess()
    {
        //create user object
        $user =& User::singleton();

        // Set global permission to control access to different modules of media page
        $this->hasWritePermission = $user->hasPermission('media_write');

        return $user->hasPermission('media_read');
    }

    /**
     * Create a form to filter media by various criteria
     *
     * @return bool
     * @throws ConfigurationException
     * @throws DatabaseException
     * @throws Exception
     */
    function _setFilterForm()
    {
        $user =& User::singleton();
        $db   = Database::singleton();

        $siteList  = Utility::getSiteList(false);
        $visitList = [null => 'Any'] + Utility::getVisitList();

        // allow to view all sites data through filter
        if ($user->hasPermission('access_all_profiles')) {
            // get the list of study sites - to be replaced by the Site object
            if (is_array($siteList)) {
                $siteList = [null => 'Any'] + $siteList;
            }
        } else {
            // allow only to view own site data
            $site =& Site::singleton($user->getData('CenterID'));
            if ($site->isStudySite()) {
                $siteList = [
                             $user->getData('CenterID') => $user->getData('Site'),
                            ];
            }
        }

        $instrumentList   = [null => 'Any'];
        $instrumentsQuery = $db->pselect(
            "SELECT Test_name FROM test_names ORDER BY Test_name",
            []
        );
        foreach ($instrumentsQuery as $instrument) {
            $instrumentList[$instrument['Test_name']] = $instrument['Test_name'];
        }

        // Form Elements
        $this->addBasicText('pscid', 'PSCID:', ["size" => 9, "maxlength" => 7]);
        $this->addSelect('instrument', 'Instrument:', $instrumentList);
        $this->addSelect('visit_label', 'Visit Label:', $visitList);
        $this->addSelect('for_site', 'For Site:', $siteList);
        $this->addBasicText('uploaded_by', 'Uploaded By');

        $this->tpl_data["hasWritePermission"] = $this->hasWritePermission;

        return true;
    }

    /**
     * Build media list
     *
     * @return bool
     * @throws DatabaseException
     */
    function _setupVariables()
    {
        $db =& Database::singleton();

        // create the centerID map
        $pscRows = $db->pselect("SELECT CenterID, Name FROM psc", []);
        foreach ($pscRows as $row) {
            $this->centerIDMap[$row['CenterID']] = $row['Name'];
        }

        // the base query
        $query  = " FROM media v"; // left join candidate c using(pscid) ";
        $query .= " WHERE (v.hide_file=false OR v.hide_file IS NULL)";

        // set the class variables
        $this->columns
            = [
               'v.file_name',
               'v.pscid',
               'v.visit_label',
               '(SELECT Full_name FROM test_names WHERE Test_name=v.instrument)',
               '(SELECT name FROM psc WHERE CenterID=v.for_site)',
               'v.uploaded_by',
               'v.date_taken',
               'substring(v.comments, 1, 50) as comments',
               'v.date_uploaded',
               // candidate id
               "(SELECT CandID FROM candidate WHERE PSCID=v.pscid) as candID",
                // sessiod id
               "(SELECT ID FROM session WHERE CandID=(SELECT CandID FROM candidate ".
               "WHERE PSCID=v.pscid) AND Visit_label=v.visit_label)",
               'v.id',
              ];

        $this->query = $query;

        $this->group_by = '';
        $this->order_by = 'v.instrument';
        $this->headers  = [
                           'File Name',
                           'PSCID',
                           'Visit Label',
                           'Instrument',
                           'Site',
                           'Uploaded By',
                           'Date Taken',
                           'Comments',
                           'Date Uploaded',
                           'Cand ID',
                           'Session ID',
                          ];

        // Set header as hidden from the data table
        $this->tpl_data['hiddenHeaders'] = json_encode(['Cand ID', 'Session ID']);

        // Add Edit field if user has permissions
        if ($this->hasWritePermission) {
            array_push($this->headers, 'Edit Metadata');
        }

        $this->validFilters = [
                               'v.pscid',
                               'v.instrument',
                               'v.data_dir',
                               'v.for_site',
                               'v.visit_label',
                               'v.uploaded_by',
                              ];
        $this->formToFilter = [
                               'file_name'     => 'v.file_name',
                               'data_dir'      => 'v.data_dir',
                               'instrument'    => 'v.instrument',
                               'pscid'         => 'v.pscid',
                               'for_site'      => 'v.for_site',
                               'uploaded_by'   => 'v.uploaded_by',
                               'visit_label'   => 'v.visit_label',
                               'date_uploaded' => 'v.date_uploaded',
                               'comments'      => 'comments',
                              ];

        return true;
    }

    /**
     * Include additional CSS files:
     *  1. media.css
     *
     * @return array of javascript to be inserted
     */
    function getCSSDependencies()
    {
        $factory = NDB_Factory::singleton();
        $baseURL = $factory->settings()->getBaseURL();
        $deps    = parent::getCSSDependencies();
        return array_merge(
            $deps,
            [$baseURL . "/media/css/media.css"]
        );
    }

    /**
     * Include additional JS files:
     *  1. columnFormatter.js required to set links to Edit and Download file
     *  2. uploadForm.js - reactified form to upload files
     *
     * @return array of javascript to be inserted
     */
    function getJSDependencies()
    {
        $factory = NDB_Factory::singleton();
        $baseURL = $factory->settings()->getBaseURL();
        $deps    = parent::getJSDependencies();
        return array_merge(
            $deps,
            [
             $baseURL . "/media/js/columnFormatter.js",
             $baseURL . "/media/js/uploadForm.js",
            ]
        );
    }
}

