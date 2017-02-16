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

const cohorts = [
    "MCI",
    "SCI",
    "AD"
];

const MS_TO_DAYS = 1/(1000 * 60 * 60 * 24);

function SiteFilter(props) {
    let options = props.sites.map((site) =>
        <option key={site.psc} value={site.psc}>{site.fullname}</option>
    );
    return (
        <td>
            <select className="form-control input-sm" onChange={props.filterSites}>
                <option value="all">Show All Sites</option>
                {options}
            </select>
        </td>
    );
}

function TeamFilter(props) {
    return (
        <td>
            <select className="form-control input-sm" onChange={props.filterTeams}>
                <option value="COMPASS-ND">COMPASS-ND</option>
            </select>
        </td>
    );
}

function CohortFilter(props) {
    let options = props.cohorts.map((cohort) =>
        <option key={cohort} value={cohort}>{cohort}</option>
    );
    return (
        <td>
            <select className="form-control input-sm" onChange={props.filterCohorts}>
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
                <a
                    href="#"
                    className="closebtn"
                    onClick={this.props.closeSideBar}
                >
                    &times;
                </a>
                {this.props.sideBarContent}
            </div>
        );
    }
}

class VisitCell extends React.Component {
    render () {
        if (this.props.visit.cohort === this.props.currentCohort
            || this.props.currentCohort === "all") {
            let visitClass = "circle "
                + this.props.visit.dataEntryStatus + " "
                + this.props.visit.visitRegStatus;

            let vr = this.props.prettyStatus(this.props.visit.visitRegStatus, this.props.visit.visitRegDueDate);
            let de = this.props.prettyStatus(this.props.visit.dataEntryStatus, this.props.visit.dataEntryDueDate);
            return (
                <td className={this.props.visit.visitLabel}>
                    <div data-tip data-for={this.props.visit.sessionID} className={visitClass}>
                        <ReactTooltip id={this.props.visit.sessionID} place="top" type="dark" effect="solid">
                            <div className="ReactTooltipContent">
                                <p>Visit Registration: {vr.html}</p>
                                <p>Data Entry: {de.html}</p>
                                <p className="center">
                                    <i>
                                        {this.props.visit.instrumentsCompleted}/{this.props.visit.totalInstruments} instruments entered
                                    </i>
                                </p>
                            </div>
                        </ReactTooltip>
                    </div>
                </td>
            );
        } else {
            return (<td className={this.props.visit.visitLabel}/>);
        }
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
        let visits = this.props.visits.map(function(v) {
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
        let visitClass = "." + $(event.target).text();
        $(visitClass).css("background-color", "#f5f5f5");
    }
    unHighlightVisits(event) {
        let visitClass = "." + $(event.target).text();
        $(visitClass).css("background-color", "");
    }
  render() {
    let visitLabelHeaders = this.props.visitLabels.map(function(vl) {
            let cssClass = "VLHeader " + vl;
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
                <th/>
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
             sideBarContent: null,
             currentPSCID: null,
             currentVisit: null
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

    // Returns an object which contains a clean status and styled html to display
    prettyStatus(status, dueDate) {
        let html, toReturn;
        if (~status.indexOf("complete")) {
            html = <span className="complete right-align">Complete</span>;
            toReturn = {
                "status":"complete",
                "html":html
            };
        } else if (~status.indexOf("deadline-approaching")) {
            let daysLeft = Math.floor((dueDate - new Date()) * MS_TO_DAYS);
            daysLeft += daysLeft == 1 ? " day" : " days";
            html = <span className="deadline-approaching right-align">Due in {daysLeft}</span>;
            toReturn = {
                "status":"deadline-approaching",
                "html":html
            };
        } else if (~status.indexOf("deadline-past")) {
            let daysPast = Math.floor((new Date() - dueDate) * MS_TO_DAYS);
            daysPast += daysPast == 1 ? " day" : " days";
            html = <span className="deadline-past right-align">{daysPast} late</span>;
            toReturn = {
                "status":"deadline-past",
                "html":html
            };
        } else if (~status.indexOf("cancelled")) {
            html = <span className="cancelled right-align">Visit cancelled</span>;
            toReturn = {
                "status":"cancelled",
                "html":html
            };

        } else if (~status.indexOf("no-deadline")) {
            html = <span className="no-deadline right-align">No deadline specified</span>;
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
        let pscid;
        if(event) {
           pscid = $(event.target).text();
           this.setState({currentPSCID: pscid});
        } else {
            pscid = this.state.currentPSCID;
        }
        let content = [];

        content[0] = <h3 className="center">Participant {pscid}</h3>;

        let visits;

        for(let i = 0; i < this.state.rows.length; i++) {
            let r = this.state.rows[i];
            if (r.pscid === pscid) {
                visits = r.visits;
                break;
            }
        }

        let visitContent = visits.map(
            function(v) {
                console.log(this.state.currentCohort);
                if (v.cohort === this.state.currentCohort || this.state.currentCohort === "all") {
                    let vr = this.prettyStatus(v.visitRegStatus, v.visitRegDueDate);
                    let de = this.prettyStatus(v.dataEntryStatus, v.dataEntryDueDate);
                    if (vr.status === "complete" && de.status === "complete") {
                        return (
                            <p style={{fontSize: "18px"}}>
                                {v.visitLabel}:
                                <span className="complete right-align">&#10003;</span>
                                {vr.html}
                            </p>
                        )
                    } else {
                        return (
                            <div>
                                <h4>{v.visitLabel}:</h4>
                                <p className="indent">Visit Registration: {vr.html}</p>
                                <p className="indent">Data Registration: {de.html}</p>
                            </div>
                        )
                    }
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
        let visit = $(event.target).text();
        let content = [];
        content[0] = <h3 className="center">{visit} Visit</h3>;

        let visitDeadlines = [<h4>Upcoming Visit Deadlines</h4>];
        let dataDeadlines = [<h4>Upcoming Data Entry Deadlines</h4>];
        // Loop through rows
        for (let row of this.state.rows) {
            let pscid = row.pscid;
            // Look for visit with corresponding visit label
            for(let v of row.visits) {
                if (v.visitLabel === visit) {
                    let vr = this.prettyStatus(v.visitRegStatus, v.visitRegDueDate);
                    if (vr.status === "deadline-past" || vr.status === "deadline-approaching") {
                        visitDeadlines = visitDeadlines.concat(
                            <p className="indent">{pscid}: {vr.html}</p>
                        );
                    }
                    let de = this.prettyStatus(v.dataEntryStatus, v.dataEntryDueDate);
                    if (de.status === "deadline-past" || de.status === "deadline-approaching") {
                        dataDeadlines = dataDeadlines.concat(
                            <p className="indent">{pscid}: {de.html}</p>
                        );
                    }
                    break;
                }
            }
        }
        if (visitDeadlines.length <= 1) {
            visitDeadlines = visitDeadlines.concat(
                <p className="complete indent">No upcoming visit deadlines</p>
            );
        }
        if (dataDeadlines.length <= 1) {
            dataDeadlines = dataDeadlines.concat(
                <p className="complete indent">No upcoming data entry deadlines</p>
            );
        }

        content = content.concat(visitDeadlines, dataDeadlines);
        this.setState({
            sideBarContent: content
        });
        this.showSideBar();
    }

    showSideBar() {
        $(".SideBar").css("width", "300px");
    }

    closeSideBar() {
        $(".SideBar").css("width", "0px");
    }

    /* Function which is called when cohort filter is changed
        event is onChange when the select changes
     */
    filterCohorts(event) {
        // second argument defines callback so setState may behave synchronously
        this.setState({currentCohort: event.target.value}, this.showCandFocus);
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
        let result = false;

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
        let dataRows = this.state.rows.map(function (row) {
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
                <span style={{fontSize:24}}>Study Progression</span>
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
                    currentCohort={this.state.currentCohort}
                />
            </div>
        );
    }
}


function randomDate() {
    let now = new Date();
    return new Date(
        now.getFullYear(),
        now.getMonth() + Math.floor(Math.random() * 6) + 1,
        now.getDate() + 1,
        0,0,0,0
    );
}

window.onload = function() {
    let dashboard = (
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