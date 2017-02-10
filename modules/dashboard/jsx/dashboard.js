var dummyData = [
    {
        "pscid": "JGH0000",
        "psc": "JGH",
        "visits": [
            {
                "sessionID": "1",
                "visitRegStatus": "complete-visit",
                "dataEntryStatus": "complete-data-entry",
                "visitRegDueDate": randomDate(),
                "dataEntryDueDate": randomDate(),
                "instrumentsCompleted": 1,
                "totalInstruments": 22,
                "visitLabel": "Screening",
                "cohort": "MCI"
            },
            {
                "sessionID": "2",
                "visitRegStatus": "no-deadline-visit",
                "dataEntryStatus": "deadline-approaching-data-entry",
                "visitRegDueDate": randomDate(),
                "dataEntryDueDate": randomDate(),
                "instrumentsCompleted": 2,
                "totalInstruments": 22,
                "visitLabel": "Clinical",
                "cohort": "AD"
            },
            {
                "sessionID": "3",
                "visitRegStatus": "deadline-approaching-visit",
                "dataEntryStatus": "complete-data-entry",
                "visitRegDueDate": randomDate(),
                "dataEntryDueDate": randomDate(),
                "instrumentsCompleted": 3,
                "totalInstruments": 22,
                "visitLabel": "Neuropsych",
                "cohort": "AD"
            }
        ]
    },
    {
        "pscid": "PKD0001",
        "psc": "PKD",
        "visits": [
            {
                "sessionID": "4",
                "visitRegStatus": "complete-visit",
                "dataEntryStatus": "cancelled-data",
                "visitRegDueDate": randomDate(),
                "dataEntryDueDate": randomDate(),
                "instrumentsCompleted": 1,
                "totalInstruments": 22,
                "visitLabel": "Screening",
                "cohort": "AD"
            },
            {
                "sessionID": "5",
                "visitRegStatus": "deadline-past-visit",
                "dataEntryStatus": "deadline-approaching-data-entry",
                "visitRegDueDate": randomDate(),
                "dataEntryDueDate": randomDate(),
                "instrumentsCompleted": 2,
                "totalInstruments": 22,
                "visitLabel": "Clinical",
                "cohort": "SCI"
            },
            {
                "sessionID": "6",
                "visitRegStatus": "deadline-approaching-visit",
                "dataEntryStatus": "deadline-past-data-entry",
                "visitRegDueDate": randomDate(),
                "dataEntryDueDate": randomDate(),
                "instrumentsCompleted": 3,
                "totalInstruments": 22,
                "visitLabel": "Neuropsych",
                "cohort": "MCI"
            }
        ]
    },
    {
        "pscid": "JGH0010",
        "psc": "JGH",
        "visits": [
            {
                "sessionID": "7",
                "visitRegStatus": "complete-visit",
                "dataEntryStatus": "deadline-approaching-data-entry",
                "visitRegDueDate": randomDate(),
                "dataEntryDueDate": randomDate(),
                "instrumentsCompleted": 1,
                "totalInstruments": 22,
                "visitLabel": "Screening",
                "cohort": "SCI"
            },
            {
                "sessionID": "8",
                "visitRegStatus": "deadline-past-visit",
                "dataEntryStatus": "deadline-approaching-data-entry",
                "visitRegDueDate": randomDate(),
                "dataEntryDueDate": randomDate(),
                "instrumentsCompleted": 2,
                "totalInstruments": 22,
                "visitLabel": "Clinical",
                "cohort": "SCI"

            },
            {
                "sessionID": "9",
                "visitRegStatus": "deadline-past-visit",
                "dataEntryStatus": "deadline-approaching-data-entry",
                "visitRegDueDate": randomDate(),
                "dataEntryDueDate": randomDate(),
                "instrumentsCompleted": 3,
                "totalInstruments": 22,
                "visitLabel": "Neuropsych",
                "cohort": "SCI"
            }
        ]
    },
    {
        "pscid": "PKD0011",
        "psc": "PKD",
        "visits": [
            {
                "sessionID": "10",
                "visitRegStatus": "complete-visit",
                "dataEntryStatus": "deadline-approaching-data-entry",
                "visitRegDueDate": randomDate(),
                "dataEntryDueDate": randomDate(),
                "instrumentsCompleted": 1,
                "totalInstruments": 22,
                "visitLabel": "Screening",
                "cohort": "AD"
            },
            {
                "sessionID": "11",
                "dataEntryStatus": "deadline-approaching-data-entry",
                "visitRegStatus": "deadline-approaching-visit",
                "visitRegDueDate": randomDate(),
                "dataEntryDueDate": randomDate(),
                "instrumentsCompleted": 2,
                "totalInstruments": 22,
                "visitLabel": "Clinical",
                "cohort": "AD"
            },
            {
                "sessionID": "12",
                "visitRegStatus": "deadline-approaching-visit",
                "dataEntryStatus": "deadline-approaching-data-entry",
                "visitRegDueDate": randomDate(),
                "dataEntryDueDate": randomDate(),
                "instrumentsCompleted": 3,
                "totalInstruments": 22,
                "visitLabel": "Neuropsych",
                "cohort": "AD"
            }
        ]
    }
];

var visitLabels = [
    "Screening",
    "Clinical",
    "Neuropsych"
];

var sites = [
    {
        'psc':'JGH',
        'fullname':'Jewish General Hospital'
    },
    {
        'psc':'PKD',
        'fullname':'Parkwood Institution'
    }
];

var cohorts = [
    "MCI",
    "SCI",
    "AD"
];

var MS_TO_DAYS = 1/(1000 * 60 * 60 * 24);

function SiteFilter(props) {
    var options = props.sites.map((site) =>
        <option key={site.psc} value={site.psc}>{site.fullname}</option>
    );
    return (
        <td>
            <select onChange={props.filterSites}>
                <option value="all">Show All Sites</option>
                {options}
            </select>
        </td>
    );
}

function TeamFilter(props) {
    return (
        <td>
            <select onChange={props.filterTeams}>
                <option value="COMPASS-ND">COMPASS-ND</option>
            </select>
        </td>
    );
}

function CohortFilter(props) {
    var options = props.cohorts.map((cohort) =>
        <option key={cohort} value={cohort}>{cohort}</option>
    );
    return (
        <td>
            <select onChange={props.filterCohorts}>
                <option value="all">Show All Cohorts</option>
                {options}
            </select>
        </td>
    );
}

class Filters extends React.Component {
    // pass sites, teams, and cohort data once available
    render() {
        return(
            <table className="Filters">
                <tbody>
                    <tr>
                        <SiteFilter
                            sites={this.props.sites}
                            filterSites={this.props.filterSites}
                        />
                        <TeamFilter
                            teams={this.props.teams}
                            filterTeams={this.props.filterTeams}
                        />
                        <CohortFilter
                            cohorts={this.props.cohorts}
                            filterCohorts={this.props.filterCohorts}
                        />
                    </tr>
                </tbody>
            </table>
        );
    }
}


class SideBar extends React.Component {
    render() {
        return (
            <div className="SideBar">
                <a href="#" className="closebtn" onClick={this.props.closeSideBar}>&times;</a>
                {this.props.sideBarContent}
            </div>
        );
    }
}

function VisitCell(props) {
    // will need to include additional data
    // for each visit
    if (props.visit.cohort === props.currentCohort || props.currentCohort === "all") {
        var visitClass = "circle "
            + props.visit.dataEntryStatus + " "
            + props.visit.visitRegStatus;

        var now = new Date();
        var vrDisplay = props.prettyStatus(props.visit.visitRegStatus, props.visit.visitRegDueDate);
        var deDisplay = props.prettyStatus(props.visit.dataEntryStatus, props.visit.dataEntryDueDate);
        return (
            <td className={props.visit.visitLabel}>
                <div data-tip data-for={props.visit.sessionID} className={visitClass}>
                    <ReactTooltip id={props.visit.sessionID} place="top" type="dark" effect="solid">
                        <table className="ReactTooltipContent">
                            <tr><td>Visit Registration:</td>{vrDisplay.html}</tr>
                            <tr><td>Data Entry:</td>{deDisplay.html}</tr>
                        </table>
                        <span><i>{props.visit.instrumentsCompleted}/{props.visit.totalInstruments} instruments entered</i></span>
                    </ReactTooltip>
                </div>
            </td>
        );
    } else {
        return (<td className={props.visit.visitLabel}></td>);
    }
}

class PSCIDCell extends React.Component {
    render() {
        return (
            <td
                className='PSCIDCell'
                onClick={this.props.showCandFocus}>
                {this.props.pscid}
            </td>
        );
    }
}

class StudyTrackerRow extends React.Component {
    render() {
        var visits = this.props.visits.map(function(v) {
                return <VisitCell
                    key={v.sessionID}
                    visit={v}
                    currentCohort={this.props.currentCohort}
                    prettyStatus={this.props.prettyStatus}
                />
            }.bind(this)
        );
        return(
            <tr className="StudyTrackerRow">
                <PSCIDCell
                    pscid={this.props.pscid}
                    showCandFocus={this.props.showCandFocus}
                />
                {visits}
            </tr>
        );
    }
}

class StudyTrackerHeader extends React.Component {
    constructor(props) {
        super(props);
        this.highlightVisits = this.highlightVisits.bind(this);
        this.unHighlightVisits = this.unHighlightVisits.bind(this);
    }

    // When mouse enters header cell, highlight all cells for that visit
    // This means that the text that shows up in the column header
    // must be equal to the css class name which is perhaps bad design
    highlightVisits(event) {
        var visitClass = "." + $(event.target).text();
        $(visitClass).css("background-color", "#f5f5f5");
    }
    unHighlightVisits(event) {
        var visitClass = "." + $(event.target).text();
        $(visitClass).css("background-color", "");
    }
  render() {
    var visitLabelHeaders = this.props.visitLabels.map(function(vl) {
            var cssClass = "VLHeader " + vl;
            return (
            <th
                onMouseEnter={this.highlightVisits}
                onMouseLeave={this.unHighlightVisits}
                onClick={this.props.showVisitFocus}
                key={vl}
                className={cssClass}>
                {vl}
            </th>)
        }.bind(this)
    );
    return (
        <thead className="StudyTrackerHeader">
            <tr>
                <th></th>
                {visitLabelHeaders}
            </tr>
        </thead>
    );
  }
}


class StudyTracker extends React.Component {
    constructor() {
        super();
        this.state = {
             rows: dummyData,
             visitLabels: visitLabels,
             currentSite: "all",
             sites: sites,
             teams: [],
             currentTeam: "COMPASS-ND",
             currentCohort: "all",
             cohorts: cohorts,
             sideBarContent: null
        };
        this.prettyStatus = this.prettyStatus.bind(this);
        this.showCandFocus = this.showCandFocus.bind(this);
        this.showVisitFocus = this.showVisitFocus.bind(this);
        this.showSideBar = this.showSideBar.bind(this);
        this.closeSideBar = this.closeSideBar.bind(this);
        this.filterSites = this.filterSites.bind(this);
        this.filterTeams = this.filterTeams.bind(this);
        this.filterCohorts = this.filterCohorts.bind(this);
        this.rowHasCurrentCohortVisit = this.rowHasCurrentCohortVisit.bind(this);
    }

    // Returns an object which contains the status and the html to display
    prettyStatus(status, dueDate) {
        var html, toReturn;
        if (~status.indexOf("complete")) {
            html = <td className="complete">Complete</td>;
            toReturn = {
                "status":"complete",
                "html":html
            };
        } else if (~status.indexOf("deadline-approaching")) {
            var daysLeft = Math.floor((dueDate - new Date()) * MS_TO_DAYS);
            html = <td className="deadline-approaching">Due in {daysLeft} days</td>;
            toReturn = {
                "status":"deadline-approaching",
                "html":html
            };
        } else if (~status.indexOf("deadline-past")) {
            var daysPast = Math.floor((new Date() - dueDate) * MS_TO_DAYS);
            html = <td className="deadline-past">{daysPast} days late</td>;
            toReturn = {
                "status":"deadline-past",
                "html":html
            };
        } else if (~status.indexOf("cancelled")) {
            html = <td className="cancelled">Visit cancelled</td>;
            toReturn = {
                "status":"cancelled",
                "html":html
            };

        } else if (~status.indexOf("no-deadline")) {
            html = <td className="no-deadline">No deadline specified</td>;
            toReturn = {
                "status":"no-deadline",
                "html":html
            };
        }

        return toReturn;
    }


    // Sets the content of the SideBar and then shows SideBar
    // for Candidate Focus
    showCandFocus(event) {
        var pscid = $(event.target).text();
        var content = [];

        content[0] = <h4>Participant {pscid}</h4>;

        var visits;

        for(var i = 0; i < this.state.rows.length; i++) {
            var r = this.state.rows[i];
            if (r.pscid === pscid) {
                visits = r.visits;
                break;
            }
        }

        var visitContent = visits.map( function(v) {
                var vr = this.prettyStatus(v.visitRegStatus, v.visitRegDueDate);
                var de = this.prettyStatus(v.dataEntryStatus, v.dataEntryDueDate);
                if (vr.status === "complete" && de.status === "complete") {
                    return <tr><td>{v.visitLabel}:</td>{vr.html}</tr>
                } else if (vr.status === "complete") {
                    return <tr><td>{v.visitLabel}: Data entry</td>{de.html}</tr>
                } else {
                    return <tr><td>{v.visitLabel}: Visit registration</td>{vr.html}</tr>
                }
            }.bind(this)
        );

        content = content.concat(visitContent);

        this.setState({
            sideBarContent: content
        });
        this.showSideBar();
    }

    // Sets the content of the SideBar and then shows SideBar
    // for Visit Focus
    showVisitFocus(event){
        var visit = $(event.target).text();

        var content = <span>{visit} Visit</span>;
        this.setState({
            sideBarContent: content
        });
        this.showSideBar();
    }

    showSideBar() {
        $(".SideBar").css("width", "400px");
    }

    closeSideBar() {
        $(".SideBar").css("width", "0px");
    }

    // Function which is called when cohort filter is changed
    filterCohorts(event) {
        this.setState({currentCohort: event.target.value});
    }

    // Function which will handle team filtering
    filterTeams(event) {
        // Here there should be an AJAX call which fetches a new
        // data object and then updates the state like:
        // this.setState({rows: newRows, visitLabels: newVLs});
        // or something
    }

    // Function which is called when site filter is changed
    filterSites(event) {
        this.setState({currentSite: event.target.value});
    }

    //Checks to see if a row has a visit with the selected cohort
    rowHasCurrentCohortVisit(row) {
        if (this.state.currentCohort === "all") {
            return true;
        }
        var result = false;

        row.visits.forEach( function (v) {
                if (v.cohort === this.state.currentCohort) {
                    result = true;
                }
            }.bind(this)
        );
        return result;
    }

    render() {
        // Filter out the entire row for candidates at sites other than
        // the currently selected one or if the candidate has no visits for
        // the currently selected cohort
        var dataRows = this.state.rows.map(function (row) {
                if(this.rowHasCurrentCohortVisit(row) &&
                    (row.psc === this.state.currentSite || this.state.currentSite === "all")) {
                    return (
                        <StudyTrackerRow
                            key={row.pscid}
                            pscid={row.pscid}
                            visits={row.visits}
                            currentCohort={this.state.currentCohort}
                            showCandFocus={this.showCandFocus}
                            prettyStatus={this.prettyStatus}
                        />
                    )
                }
            }.bind(this)
        );
        return (
            <div className="StudyTracker">
                <h1>Hello, Study Tracker!</h1>
                <Filters
                    sites={this.state.sites}
                    filterSites={this.filterSites}
                    teams={this.state.teams}
                    filterTeams={this.filterTeams}
                    cohorts={this.state.cohorts}
                    filterCohorts={this.filterCohorts}
                />
                <table>
                    <StudyTrackerHeader
                        visitLabels={this.state.visitLabels}
                        showVisitFocus={this.showVisitFocus}
                    />
                    <tbody>
                    {dataRows}
                    </tbody>
                </table>
                <SideBar
                    closeSideBar={this.closeSideBar}
                    sideBarContent={this.state.sideBarContent}
                />
            </div>
        );
    }
}


function randomDate() {
    var now = new Date();
    return new Date(
        now.getFullYear(),
        now.getMonth() + Math.floor(Math.random() * 6) + 1,
        now.getDate(),
        0,0,0,0
    );
}

window.onload = function() {
    var dashboard = (
        <StudyTracker />
    );

    // Create a wrapper div in which react component will be loaded
    const dashboardDOM = document.createElement('div');
    dashboardDOM.id = 'page-dashboard';

    // Append wrapper div to page content
    const rootDOM = document.getElementById("lorisworkspace");
    rootDOM.appendChild(dashboardDOM);

    ReactDOM.render(dashboard, document.getElementById("page-dashboard"));
};