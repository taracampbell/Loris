const MS_TO_DAYS = 1/(1000 * 60 * 60 * 24);
const SIDEBAR_WIDTH = "20%";
const HIGHLIGHT_COLOR = "#E9EBF3";

function SiteFilter(props) {
    let options = [];
    props.sites.forEach(function (name, alias) {
           options.push(<option key={alias} value={alias}>{name}</option>);
        }
    );
    return (
        <select className="form-control input-sm" onChange={props.filterSites}>
            <option value="all">Show All Sites</option>
            {options}
        </select>
    );
}

function TeamFilter(props) {
    return (
        <select className="form-control input-sm" onChange={props.filterTeams}>
            <option value="COMPASS-ND">COMPASS-ND</option>
        </select>
    );
}

function CohortFilter(props) {
    let options = props.cohorts.map((cohort) =>
        <option key={cohort} value={cohort}>{cohort}</option>
    );
    return (
        <select className="form-control input-sm" onChange={props.filterCohorts}>
            <option value="all">Show All Cohorts</option>
            {options}
        </select>
    );
}

class Filters extends React.Component {
    // pass sites, teams, and cohort data once available
    render() {
        return(
            <div>
                <div className="col-md-4">
                    <SiteFilter
                        sites={this.props.sites}
                        filterSites={this.props.filterSites}
                    />
                </div>
                <div className="col-md-4">
                    <TeamFilter
                        teams={this.props.teams}
                        filterTeams={this.props.filterTeams}
                    />
                </div>
                <div className="col-md-4">
                    <CohortFilter
                        cohorts={this.props.cohorts}
                        filterCohorts={this.props.filterCohorts}
                    />
                </div>
            </div>
        );
    }
}

class SideBarCandContent extends React.Component {
    render () {
        let content = [];

        content[0] = <h3 className="center">Participant {this.props.pscid}</h3>;
        if (this.props.currentCohort !== "all") {
            content = content.concat(<h4 className="center">{this.props.currentCohort} Visits</h4>);
        }
        let visits;

        for(let i = 0; i < this.props.rows.length; i++) {
            let r = this.props.rows[i];
            if (r.pscid === this.props.pscid) {
                visits = r.visits;
                break;
            }
        }

        let visitContent = [];
        visits.forEach(
            function(v) {
                if (v.cohort === this.props.currentCohort || this.props.currentCohort === "all") {
                    let vr = this.props.prettyStatus(v.visitRegStatus, v.visitRegDueDate);
                    let de = this.props.prettyStatus(v.dataEntryStatus, v.dataEntryDueDate);
                    if (vr.status === "complete" && de.status === "complete") {
                        visitContent = visitContent.concat(
                            <p style={{fontSize: "18px"}}>
                                {v.visitLabel}:
                                {vr.html}
                                <span className="complete right-align">&#10003;</span>
                            </p>
                        );
                    } else {
                        visitContent = visitContent.concat(
                            <div>
                                <h4>{v.visitLabel}:</h4>
                                <p className="left-indent">Visit Registration: {vr.html}</p>
                                <p className="left-indent">Data Entry: {de.html}</p>
                            </div>
                        );
                    }
                }
            }.bind(this)
        );
        if (visitContent.length === 0) {
            visitContent = <p className="center">No applicable visits for this participant for cohort {this.props.currentCohort}</p>
        }
        content = content.concat(visitContent);

        return (
            <div className="SideBarCandContent">
                {content}
            </div>
        );
    }
}

class SideBarVisitContent extends React.Component {
    render () {
        let content = [];
        content = content.concat(<h3 className="center">{this.props.visit} Visit</h3>);

        let subheader; // Displays which cohort and visit is in focus
        if (this.props.currentSite !== "all" && this.props.currentCohort !== "all") {
            subheader = "Visits for " + this.props.currentCohort + " at " + this.props.currentSite;
        } else if (this.props.currentSite !== "all") {
            subheader = "Visits at " + this.props.currentSite;
        } else if (this.props.currentCohort !== "all") {
            subheader = "Visits for " + this.props.currentCohort;
        }

        if (subheader) {
            content = content.concat(<h4 className="center">{subheader}</h4>)
        }

        let visitDeadlines = [<h4>Upcoming Visit Deadlines</h4>];
        let dataDeadlines = [<h4>Upcoming Data Entry Deadlines</h4>];
        // Loop through rows
        for (let row of this.props.rows) {
            if (row.psc !== this.props.currentSite && this.props.currentSite !== "all") {
                continue;
            }
            let pscid = row.pscid;
            // Look for visit with corresponding visit label
            for(let v of row.visits) {
                if (v.visitLabel === this.props.visit) {
                    if(v.cohort === this.props.currentCohort || this.props.currentCohort === "all") {
                        let vr = this.props.prettyStatus(v.visitRegStatus, v.visitRegDueDate);
                        if (vr.status === "deadline-past" || vr.status === "deadline-approaching") {
                            visitDeadlines = visitDeadlines.concat(
                                <p className="left-indent">{pscid}: {vr.html}</p>
                            );
                        }
                        let de = this.props.prettyStatus(v.dataEntryStatus, v.dataEntryDueDate);
                        if (de.status === "deadline-past" || de.status === "deadline-approaching") {
                            dataDeadlines = dataDeadlines.concat(
                                <p className="left-indent">{pscid}: {de.html}</p>
                            );
                        }
                    }
                    break;
                }
            }
        }
        if (visitDeadlines.length <= 1) {
            visitDeadlines = visitDeadlines.concat(
                <p className="complete left-indent">No upcoming visit deadlines</p>
            );
        }
        if (dataDeadlines.length <= 1) {
            dataDeadlines = dataDeadlines.concat(
                <p className="complete left-indent">No upcoming data entry deadlines</p>
            );
        }

        content = content.concat(visitDeadlines, dataDeadlines);

        return (
            <div className="SideBarVisitContent">
                {content}
            </div>
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
        let style = {};
        if (this.props.visit.visitLabel === this.props.currentVisit) {
            style = {backgroundColor: HIGHLIGHT_COLOR};
        }
        if (this.props.visit.cohort === this.props.currentCohort
            || this.props.currentCohort === "all") {
            let visitClass = "circle "
                + this.props.visit.dataEntryStatus + " "
                + this.props.visit.visitRegStatus;

            let tooltipContent = [];
            let vr = this.props.prettyStatus(this.props.visit.visitRegStatus, this.props.visit.visitRegDueDate);
            tooltipContent.push(<p>Visit Registration: {vr.html}</p>);

            if (this.props.visit.dataEntryStatus) {
                let de = this.props.prettyStatus(this.props.visit.dataEntryStatus, this.props.visit.dataEntryDueDate);
                tooltipContent.push(<p>Data Entry: {de.html}</p>);
                tooltipContent.push(
                    <p className="center">
                        <i>
                            {this.props.visit.instrCompleted}/{this.props.visit.totalInstrs} instruments entered
                        </i>
                    </p>
                );
            }

            return (
                <td className={this.props.visit.visitLabel} style={style}>
                    <div data-tip data-for={this.props.visit.sessionID} className={visitClass}>
                        <ReactTooltip id={this.props.visit.sessionID} place="top" type="dark" effect="solid">
                            <div className="ReactTooltipContent">
                                {tooltipContent}
                            </div>
                        </ReactTooltip>
                    </div>
                </td>
            );
        } else {
            return (<td className={this.props.visit.visitLabel} style={style}/>);
        }
    }
}

class PSCIDCell extends React.Component {
    render() {
        return (
            <td
                className='PSCIDCell'
                onClick={this.props.clickHandler}>
                {this.props.pscid}
            </td>
        );
    }
}

class StudyTrackerRow extends React.Component {
    constructor(props) {
        super(props);

        this.highlightRow = this.highlightRow.bind(this);
        this.unhighlightRow = this.unhighlightRow.bind(this);
        this.keepHighlightedShowCandFocus = this.keepHighlightedShowCandFocus.bind(this);
    }

    highlightRow() {
        $("#"+this.props.pscid).css("background-color", HIGHLIGHT_COLOR);
    }

    unhighlightRow() {
        if (this.props.currentPSCID !== this.props.pscid) {
            $("#" + this.props.pscid).css("background-color", "");
        }
    }

    keepHighlightedShowCandFocus(event){
        // unset all other highlights
        $(".StudyTrackerRow").css("background-color", "");
        this.props.visits.forEach( function(v) {
            $("."+v.visitLabel).css("background-color","");
        });
        this.highlightRow();
        this.props.showCandFocus(event);
    }

    render() {
        let style = {};
        let visits = this.props.visits.map(function(v, index) {
                return <VisitCell
                    key={index}
                    visit={v}
                    currentCohort={this.props.currentCohort}
                    currentVisit={this.props.currentVisit}
                    prettyStatus={this.props.prettyStatus}
                />
            }.bind(this)
        );
        if (this.props.pscid === this.props.currentPSCID) {
            style = {backgroundColor: HIGHLIGHT_COLOR}
        }
        return(
            <tr
                className="StudyTrackerRow"
                id={this.props.pscid}
                onClick={this.keepHighlightedShowCandFocus}
                onMouseEnter={this.highlightRow}
                onMouseLeave={this.unhighlightRow}
                style={style}
            >
                <PSCIDCell
                    pscid={this.props.pscid}
                    clickHandler={this.keepHighlightedShowCandFocus}
                />
                {visits}
            </tr>
        );
    }
}

class StudyTrackerHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          visitInFocus: null
        };
        this.highlightColumns = this.highlightColumns.bind(this);
        this.unhighlightColumns = this.unhighlightColumns.bind(this);
        this.keepHighlightedShowVisitFocus = this.keepHighlightedShowVisitFocus.bind(this);
    }

    // When mouse enters header cell, highlight all cells for that visit
    // This means that the text that shows up in the column header
    // must be equal to the css class name which is perhaps bad design
     highlightColumns(event) {
        let visitClass = "." + $(event.target).text();
        $(visitClass).css("background-color", HIGHLIGHT_COLOR);
    }
     unhighlightColumns(event) {
        if (this.props.currentVisit !== $(event.target).text()) {
            let visitClass = "." + $(event.target).text();
            $(visitClass).css("background-color", "");
        }
    }
    keepHighlightedShowVisitFocus(event) {
        // // first unset all other highlights
         $(".StudyTrackerRow").css("background-color", "");
         this.props.visitLabels.forEach( function(vl) {
             $("."+vl).css("background-color","");
         });
        // // then apply highlighting to only this column
        this.highlightColumns(event);

        this.props.showVisitFocus(event);
    }
  render() {
    let visitLabelHeaders = this.props.visitLabels.map(function(vl) {
            let cssClass = "VLHeader " + vl;
            return (
            <th
                onMouseEnter={this.highlightColumns}
                onMouseLeave={this.unhighlightColumns}
                onClick={this.keepHighlightedShowVisitFocus}
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
             rows: [],
             visitLabels: [],
             currentSite: "all",
             sites: new Map(),
             teams: [],
             currentTeam: "COMPASS-ND",
             currentCohort: "all",
             cohorts: [],
             sideBarContent: null,
             currentPSCID: null,
             currentVisit: null,
             currentSideBarFocus: null
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

        let url = loris.BaseURL + "/dashboard/ajax/getData.php";
        $.get(url, {data: "all"}, function(data, status) {
           if (status === "success") {
               console.log(data.tableData);
               let cohorts = [], visitLabels = [], rows = [];
               let sites = new Map();

               for (let r in data.tableData) {
                   rows.push(data.tableData[r]);
               }
               this.setState({rows: rows});

               for (let c in data.cohorts) {
                   cohorts.push(data.cohorts[c]);
               }
               this.setState({cohorts: cohorts});
               for (let s in data.sites) {
                   sites.set(data.sites[s].Alias, data.sites[s].Name);
               }
               this.setState({sites: sites});
               for (let v in data.visitLabels) {
                   visitLabels.push(data.visitLabels[v]);
               }
               this.setState({visitLabels: visitLabels});
           }
        }.bind(this));

    }

    // Returns an object which contains a clean status and styled html to display
    prettyStatus(status, dueDate) {
        let html, toReturn;


        toReturn = {
            "status": "",
            "html": ""
        };

        if (!status) return toReturn;

        if (~status.indexOf("complete")) {
            html = <span className="complete right-align right-indent">Complete</span>;
            toReturn = {
                "status":"complete",
                "html":html
            };
        } else if (~status.indexOf("deadline-approaching")) {
            let daysLeft = Math.ceil((new Date(dueDate) - new Date()) * MS_TO_DAYS) + "";

            daysLeft += daysLeft == 1 ? " day" : " days";
            html = <span className="deadline-approaching right-align right-indent">Due in {daysLeft}</span>;
            toReturn = {
                "status":"deadline-approaching",
                "html":html
            };
        } else if (~status.indexOf("deadline-past")) {
            let daysPast = Math.ceil((new Date() - new Date(dueDate)) * MS_TO_DAYS);
            daysPast += daysPast == 1 ? " day" : " days";
            html = <span className="deadline-past right-align right-indent">{daysPast} late</span>;
            toReturn = {
                "status":"deadline-past",
                "html":html
            };
        } else if (~status.indexOf("cancelled")) {
            html = <span className="cancelled right-align right-indent">Visit cancelled</span>;
            toReturn = {
                "status":"cancelled",
                "html":html
            };

        } else if (~status.indexOf("no-deadline")) {
            html = <span className="no-deadline right-align right-indent">No deadline specified</span>;
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
           pscid = $(event.target).closest(".StudyTrackerRow").attr("id");
           this.setState({
               currentPSCID: pscid,
               currentVisit: null,
               currentSideBarFocus: "candidate"
           });
        } else {
            pscid = this.state.currentPSCID;
        }

        let sideBarContent = <SideBarCandContent
                pscid={pscid}
                currentCohort={this.state.currentCohort}
                rows={this.state.rows}
                prettyStatus={this.prettyStatus}
            />;

        this.setState({
            sideBarContent: sideBarContent
        });

        if (event) {
            this.showSideBar();
        }
    }

    // Sets the content of the SideBar and then shows SideBar
    // for Visit Focus
    showVisitFocus(event){
        let visit;
        if (event) {
            visit = $(event.target).text();
            this.setState({
                currentVisit: visit,
                currentPSCID: null,
                currentSideBarFocus: "visit"
            });
        } else {
            visit = this.state.currentVisit;
        }

        let sidebarContent = <SideBarVisitContent
            visit={visit}
            currentSite={this.state.currentSite}
            currentCohort={this.state.currentCohort}
            rows={this.state.rows}
            prettyStatus={this.prettyStatus}
        />;
        this.setState(
            {sideBarContent: sidebarContent}
        );

        if (event) {
            this.showSideBar();
        }
    }

    showSideBar() {
        $(".SideBar").css("width", SIDEBAR_WIDTH);
        $(".table, .row").css("width", "82%"); // not great, need to figure out how to set this w/o magic numbers
    }

    closeSideBar() {
        $(".SideBar").css("width", "0px");
        $(".table, .row").css("width", "100%");

        this.setState({
            sideBarContent: null,
            currentPSCID: null,
            currentVisit: null,
            currentSideBarFocus: null
        });

        // VL Headers are being kind of stubborn
        // here is a hacky workaround
        $(".VLHeader").css("background-color",'');
    }

    // Function which is called when cohort filter is changed
    // event is onChange when the select changes
    filterCohorts(event) {
        let callback = function(){};
        if (this.state.currentSideBarFocus === "visit") {
            callback = this.showVisitFocus;
        } else if (this.state.currentSideBarFocus === "candidate") {
            callback = this.showCandFocus;
        }
        this.setState({currentCohort: event.target.value}, callback);
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
        let callback = function(){};
        if (this.state.currentSideBarFocus === "visit") {
            callback = this.showVisitFocus;
        } else if (this.state.currentSideBarFocus === "candidate") {
            callback = this.showCandFocus;
        }
        this.setState({currentSite: event.target.value}, callback);
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
                            currentVisit={this.state.currentVisit}
                            currentPSCID={this.state.currentPSCID}
                            showCandFocus={this.showCandFocus}
                            prettyStatus={this.prettyStatus}
                        />
                    )
                }
            }.bind(this)
        );
        return (
            <div className="StudyTracker">
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="dashboard-header">Study Progression</h3>
                    </div>
                    <div className="col-md-6">
                        <Filters
                            sites={this.state.sites}
                            filterSites={this.filterSites}
                            teams={this.state.teams}
                            filterTeams={this.filterTeams}
                            cohorts={this.state.cohorts}
                            filterCohorts={this.filterCohorts}
                        />
                    </div>
                </div>
                <table className='table study-tracker-table'>
                    <StudyTrackerHeader
                        visitLabels={this.state.visitLabels}
                        currentVisit={this.state.currentVisit}
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