<?php
/**
 * Dashboard: displays recruitment and study progression charts,
 * user tasks and document repository notifications
 *
 * PHP Version 5
 *
 * @category Main
 * @package  Loris
 * @author   Tara Campbell <tara.campbell@mail.mcgill.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/Loris
 */

/**
 * Dashboard: displays recruitment and study progression charts,
 * user tasks and document repository notifications
 *
 * @category Main
 * @package  Loris
 * @author   Tara Campbell <tara.campbell@mail.mcgill.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/Loris
 */

class NDB_Form_Dashboard extends NDB_Form
{

    /**
     * Creates the template data for the dashboard
     *
     * @return void
     */
    function dashboard()
    {
    }

    /**
     * Include additional CSS files:
     *  1. dashboard.css
     *
     * @return array of css to be included
     */
    function getCSSDependencies()
    {
        $factory = NDB_Factory::singleton();
        $baseurl = $factory->settings()->getBaseURL();
        $deps    = parent::getCSSDependencies();

        return array_merge(
            $deps,
            array(
             $baseurl . '/dashboard/css/dashboard.css',
             $baseurl . '/dashboard/css/SideNav.css',
             $baseurl . '/dashboard/css/StudyTracker.css',
             $baseurl . '/css/c3.css',
            )
        );
    }

    /**
     * Add dependency on D3 and C3 javascript libraries
     * for the pretty dashboards in the chart
     *
     * @return array of javascript files to be included
     */
    function getJSDependencies()
    {
        $factory = NDB_Factory::singleton();
        $config  = $factory->config();

        $www     = $config->getSetting('www');
        $baseurl = $www['url'];

        $baseDeps = parent::getJSDependencies();

        return array_merge(
            $baseDeps,
            array(
             $baseurl . '/dashboard/js/react-tooltip.min.js',
             $baseurl . '/dashboard/js/Dashboard.js',
             $baseurl . '/dashboard/js/SideNav.js',
             $baseurl . '/dashboard/js/Home.js',
             $baseurl . '/dashboard/js/StudyTracker.js',
             $baseurl . '/js/d3.min.js',
             $baseurl . '/js/c3.min.js',
             $baseurl . '/dashboard/js/dashboard-helper.js',
            )
        );

    }
}
?>
