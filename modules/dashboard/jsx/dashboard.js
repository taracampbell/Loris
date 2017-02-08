var dummyData = [
    {
        "pscid": "JGH0000",
        "psc": "JGH",
        "visits": [
            {
                "sessionID": "1",
                "status": "deadline-past-data-entry",
                "dueDate": randomDate(),
                "instrumentsCompleted": 1,
                "totalInstruments": 22,
                "visitLabel": "Screening",
                "cohort": "MCI"
            },
            {
                "sessionID": "2",
                "status": "no-deadline-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 2,
                "totalInstruments": 22,
                "visitLabel": "Clinical",
                "cohort": "AD"
            },
            {
                "sessionID": "3",
                "status": "complete-data-entry",
                "dueDate": randomDate(),
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
                "status": "cancelled-data",
                "dueDate": randomDate(),
                "instrumentsCompleted": 1,
                "totalInstruments": 22,
                "visitLabel": "Screening",
                "cohort": "AD"
            },
            {
                "sessionID": "5",
                "status": "deadline-past-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 2,
                "totalInstruments": 22,
                "visitLabel": "Clinical",
                "cohort": "SCI"
            },
            {
                "sessionID": "6",
                "status": "deadline-past-data-entry",
                "dueDate": randomDate(),
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
                "status": "no-deadline-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 1,
                "totalInstruments": 22,
                "visitLabel": "Screening",
                "cohort": "SCI"
            },
            {
                "sessionID": "8",
                "status": "deadline-past-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 2,
                "totalInstruments": 22,
                "visitLabel": "Clinical",
                "cohort": "SCI"

            },
            {
                "sessionID": "9",
                "status": "deadline-past-visit",
                "dueDate": randomDate(),
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
                "status": "no-deadline-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 1,
                "totalInstruments": 22,
                "visitLabel": "Screening",
                "cohort": "AD"
            },
            {
                "sessionID": "11",
                "status": "deadline-approaching-data-entry",
                "dueDate": randomDate(),
                "instrumentsCompleted": 2,
                "totalInstruments": 22,
                "visitLabel": "Clinical",
                "cohort": "AD"
            },
            {
                "sessionID": "12",
                "status": "deadline-approaching-visit",
                "dueDate": randomDate(),
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
                        <SiteFilter sites={this.props.sites} filterSites={this.props.filterSites}/>
                        <TeamFilter teams={this.props.teams} filterTeams={this.props.filterTeams}/>
                        <CohortFilter cohorts={this.props.cohorts} filterCohorts={this.props.filterCohorts}/>
                    </tr>
                </tbody>
            </table>
        );
    }
}

// Change to class if there is to be more than just
// rendering
function PSCIDCell(props) {
    return (
        <td>{props.pscid}</td>
    );
}

function VisitCell(props) {
    // will need to include additional data
    // for each visit
    if (props.visit.cohort === props.currentCohort || props.currentCohort === "all") {
        var visitClass = "circle " + props.visit.status;

        var now = new Date();
        var dueDate = props.visit.dueDate;
        var daysLeft = Math.floor((dueDate - now) / (1000 * 60 * 60 * 24));
        return (
            <td className={props.visit.visitLabel}>
                <div data-tip data-for={props.visit.sessionID} className={visitClass}>
                    <ReactTooltip id={props.visit.sessionID} place="top" type="dark" effect="solid">
                        <span>Visit Registration: <br/></span>
                        <span>Data Entry: due in {daysLeft} days<br/></span>
                        <span><i>{props.visit.instrumentsCompleted}/{props.visit.totalInstruments}
                            instruments entered</i></span>
                    </ReactTooltip>
                </div>
            </td>
        );
    } else {
        return (<td></td>);
    }
}


class StudyTrackerRow extends React.Component {
    render() {
        var visits = this.props.visits.map(function(v) {
                return <VisitCell
                    key={v.sessionID}
                    visit={v}
                    currentCohort={this.props.currentCohort}
                />
            }.bind(this)
        );
        return(
            <tr className="StudyTrackerRow">
                <PSCIDCell pscid={this.props.pscid}/>
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
             cohorts: cohorts
        };

        this.filterSites = this.filterSites.bind(this);
        this.filterTeams = this.filterTeams.bind(this);
        this.filterCohorts = this.filterCohorts.bind(this);
        this.rowHasCurrentCohortVisit = this.rowHasCurrentCohortVisit.bind(this);
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
                    return <StudyTrackerRow
                        key={row.pscid}
                        pscid={row.pscid}
                        visits={row.visits}
                        currentCohort={this.state.currentCohort}
                    />
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
                    <StudyTrackerHeader visitLabels={this.state.visitLabels}/>
                    <tbody>
                    {dataRows}
                    </tbody>
                </table>
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