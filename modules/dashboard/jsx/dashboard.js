var dummyData = [
    {
        "pscid": "JGH0000",
        "psc": "JGH",
        "visits": [
            {
                "status": "deadline-past-data-entry",
                "dueDate": randomDate(),
                "instrumentsCompleted": 1,
                "totalInstruments": 22,
                "visitLabel": "Initial_Assessment_Screening",
                "cohort": "MCI"
            },
            {
                "status": "no-deadline-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 2,
                "totalInstruments": 22,
                "visitLabel": "Clinical_Assessment",
                "cohort": "SCI"
            },
            {
                "status": "complete-data-entry",
                "dueDate": randomDate(),
                "instrumentsCompleted": 3,
                "totalInstruments": 22,
                "visitLabel": "Neuropsych_Assessment",
                "cohort": "AD"
            }
        ]
    },
    {
        "pscid": "PKD0001",
        "psc": "PKD",
        "visits": [
            {
                "status": "cancelled-data",
                "dueDate": randomDate(),
                "instrumentsCompleted": 1,
                "totalInstruments": 22,
                "visitLabel": "Initial_Assessment_Screening",
                "cohort": "MCI"
            },
            {
                "status": "deadline-past-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 2,
                "totalInstruments": 22,
                "visitLabel": "Clinical_Assessment",
                "cohort": "SCI"
            },
            {
                "status": "deadline-past-data-entry",
                "dueDate": randomDate(),
                "instrumentsCompleted": 3,
                "totalInstruments": 22,
                "visitLabel": "Neuropsych_Assessment",
                "cohort": "AD"
            }
        ]
    },
    {
        "pscid": "JGH0010",
        "psc": "JGH",
        "visits": [
            {
                "status": "no-deadline-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 1,
                "totalInstruments": 22,
                "visitLabel": "Initial_Assessment_Screening",
                "cohort": "MCI"
            },
            {
                "status": "deadline-past-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 2,
                "totalInstruments": 22,
                "visitLabel": "Clinical_Assessment",
                "cohort": "SCI"

            },
            {
                "status": "deadline-past-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 3,
                "totalInstruments": 22,
                "visitLabel": "Neuropsych_Assessment",
                "cohort": "AD"
            }
        ]
    },
    {
        "pscid": "PKD0011",
        "psc": "PKD",
        "visits": [
            {
                "status": "no-deadline-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 1,
                "totalInstruments": 22,
                "visitLabel": "Initial_Assessment_Screening",
                "cohort": "MCI"
            },
            {
                "status": "deadline-approaching-data-entry",
                "dueDate": randomDate(),
                "instrumentsCompleted": 2,
                "totalInstruments": 22,
                "visitLabel": "Clinical_Assessment",
                "cohort": "SCI"
            },
            {
                "status": "deadline-approaching-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 3,
                "totalInstruments": 22,
                "visitLabel": "Neuropsych_Assessment",
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
            <select>
                <option value="team">Team</option>
            </select>
        </td>
    );
}

function CohortFilter(props) {
    return (
        <td>
            <select>
                <option value="cohort">Cohort</option>
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
                        <TeamFilter />
                        <CohortFilter />
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
    var visitClass = "circle " + props.visit.status;
    return (
        <td>
            {<div data-tip='React-tooltip' className={visitClass} />
            /*<ReactToolTip place="top" type="dark" effect="solid">
                <span>Visit Registration: <br/></span>
                <span>Data Entry: due in x days<br/></span>
                <span><i>x/y instruments entered</i></span>
            </ReactToolTip>*/}
        </td>
    );
}

class StudyTrackerHeader extends React.Component {
  render() {
    var visitLabelHeaders = this.props.visitLabels.map((vl) =>
        <th key={vl}>{vl}</th>
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

class StudyTrackerRow extends React.Component {
    render() {
        var visits = this.props.visits.map((v, index) =>
            <VisitCell key={index} visit={v} />
        );
        return(
            <tr className="StudyTrackerRow">
                <PSCIDCell pscid={this.props.pscid}/>
                {visits}
            </tr>
        );
    }
}

class StudyTracker extends React.Component {
    constructor() {
        super();
        this.state = {
            // Rows should be passed to this class
            // as JSON objects
             rows: dummyData,
             visitLabels: visitLabels,
             currentSite: "all",
             sites: sites
        };

        this.filterSites = this.filterSites.bind(this);
    }

    filterSites(event) {
        this.setState({currentSite: event.target.value});
    }

    render() {
        var dataRows = this.state.rows.map(function (row) {
                if(row.psc === this.state.currentSite || this.state.currentSite === "all") {
                    return <StudyTrackerRow key={row.pscid} pscid={row.pscid} visits={row.visits}/>
                }
            }.bind(this)
        );
        return (
            <div className="StudyTracker">
                <h1>Hello, Study Tracker!</h1>
                <Filters sites={this.state.sites} filterSites={this.filterSites}/>
                <table>
                    <StudyTrackerHeader visitLabels={this.state.visitLabels}/>
                    <tbody>
                    {dataRows}
                    </tbody>
                </table>
            </div>
        );
    }
    componentWillMount() {
       // this.getRandomRowData = this.getRowData.bind(this);
       // this.getRandomRowData();
    }
    // Random data generator
    getRandomRowData() {
        var tempData = [
            "PSCID0000",
            "PSCID0001",
            "PSCID0010",
            "PSCID0011",
            "PSCID0100",
            "PSCID0101",
            "PSCID0110",
            "PSCID0111",
            "PSCID1000",
            "PSCID1001",
            "PSCID1010",
            "PSCID1011",
            "PSCID1100",
            "PSCID1101",
            "PSCID1110",
            "PSCID1111",
        ];
        var rows = [];

        for (var i = 0; i < tempData.length; i++) {
            var pscVisits = [];
            var status = [
                "complete-data-entry",
                "deadline-approaching-data-entry",
                "deadline-past-data-entry",
                "complete-visit",
                "deadline-approaching-visit",
                "deadline-past-visit",
                "no-deadline-visit",
                "cancelled-visit",
                "cancelled-data"
            ];
          for (var j = 0; j < this.state.visitLabels.length; j++) {
              pscVisits.push(
                  status[Math.floor((Math.random() * status.length))]
              );
          }
          var row = {
              pscid: tempData[i],
              visits: pscVisits
          };
          rows.push(row);
      }
      this.setState({rows: rows});
  }
}

function randomDate() {
    return new Date();
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