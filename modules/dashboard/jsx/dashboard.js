const MS_TO_DAYS = 1/(1000 * 60 * 60 * 24);
const SIDEBAR_WIDTH = "20%";
const HIGHLIGHT_COLOR = "#E9EBF3";
const GET_DATA_URL = loris.BaseURL + "/dashboard/ajax/getData.php";

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

class SideBarCandInstContent extends React.Component {
    render() {
        let content = [];
        let bold = {
            fontWeight: "bold"
        };

        content[0]
            = <h3 className="center">
                <a href={loris.BaseURL + "/" + this.props.candid} target="_blank">
                    Participant {this.props.pscid}
                </a>
            </h3>;
        let data = this.props.data;
        for(let v in data) {
            content.push(<h4 style={bold}>{v}</h4>);
            if (data[v].length === 0) {
                content.push(
                    <p className="left-indent">
                        Visit has not been registered yet.
                    </p>
                );
            }
            for(let sg in data[v]) {
                content.push(<p className="left-indent" style={bold}>{sg}</p>);
                for(let i in data[v][sg]) {
                    let inst = data[v][sg][i];
                    let checkComplete = null;
                    if (inst.completion === "Complete") {
                        checkComplete = <span
                            className="complete left-align"
                            style={bold}
                        >
                            &#10003;
                        </span>;
                    }
                    content.push(
                        <p className="left-indent2">
                            {checkComplete}
                            {inst.testName}
                        </p>
                    );
                }
            }

        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

class SideBarCandContent extends React.Component {
    render () {
        let content = [];
        content[0]
            = <h3 className="center">
                <a href={loris.BaseURL + "/" + this.props.candid} target="_blank">
                    Participant {this.props.pscid}
                </a>
            </h3>;
        if (this.props.currentCohort !== "all") {
            content = content.concat(<h4 className="center">{this.props.currentCohort} Visits</h4>);
        }
        let visits;
        let candid;
        for(let i = 0; i < this.props.rows.length; i++) {
            let r = this.props.rows[i];
            if (r.pscid === this.props.pscid) {
                candid = r.candid;
                visits = r.visits;
                break;
            }
        }

        let visitContent = [];
        visits.forEach(
            function(v) {
                if (v.cohort === this.props.currentCohort || this.props.currentCohort === "all") {
                    let url = loris.BaseURL + "/";
                    let vr = prettyStatus(v.visitRegStatus, v.visitRegDueDate);
                    let de = prettyStatus(v.dataEntryStatus, v.dataEntryDueDate);
                    if (vr.status === "complete" && de.status === "complete") {
                        url += "instrument_list/?candID="+candid+"&sessionID="+v.sessionID;
                        visitContent.push(
                            <p style={{fontSize: "18px"}}>
                                <a href={url} target="_blank">{v.visitLabel}:</a>
                                {vr.html}
                            </p>
                        );
                    } else if(de.html){
                        url += "instrument_list/?candID="+candid+"&sessionID="+v.sessionID;
                        visitContent.push(
                            <div>
                                <a href={url} target="_blank">
                                <h4>{v.visitLabel}:</h4>
                                </a>
                                <p className="left-indent">Visit Registration: {vr.html}</p>
                                <p className="left-indent">Data Entry: {de.html}</p>
                            </div>
                        );
                    } else {
                        url += candid;
                        visitContent.push(
                            <div>
                                <a href={url} target="_blank">
                                    <h4>{v.visitLabel}:</h4>
                                </a>
                                <p className="left-indent">Visit Registration: {vr.html}</p>
                            </div>
                        );
                    }
                }
            }.bind(this)
        );
        if (visitContent.length === 0) {
            visitContent = <p className="center">No applicable visits for this participant for cohort {this.props.currentCohort}</p>
        }
        content.push(visitContent);

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
            let candid = row.candid;
            let instListUrl = loris.BaseURL + "/instrument_list/?candID="+candid+"&sessionID=";
            let timepointListURL = loris.BaseURL + "/timepoint_list/?candID="+candid;
            // Look for visit with corresponding visit label
            for(let v of row.visits) {
                if (v.visitLabel === this.props.visit) {
                    if(v.cohort === this.props.currentCohort || this.props.currentCohort === "all") {
                        instListUrl += v.sessionID;
                        let vr = prettyStatus(v.visitRegStatus, v.visitRegDueDate);
                        if (vr.status === "deadline-past" || vr.status === "deadline-approaching") {
                            visitDeadlines = visitDeadlines.concat(
                                <p className="left-indent">
                                    <a href={timepointListURL} target="_blank">{pscid}:</a>
                                    {vr.html}
                                </p>
                            );
                        }
                        let de = prettyStatus(v.dataEntryStatus, v.dataEntryDueDate);
                        if (de.status === "deadline-past" || de.status === "deadline-approaching") {
                            dataDeadlines = dataDeadlines.concat(
                                <p className="left-indent">
                                    <a href={instListUrl} target="_blank">{pscid}:</a>
                                    {de.html}
                                </p>
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
        let visit = this.props.visit;
        let bgColor = {};

        if (visit.visitLabel === this.props.currentVisit) {
            bgColor = {backgroundColor: HIGHLIGHT_COLOR};
        }
        if (visit.cohort === this.props.currentCohort || this.props.currentCohort === "all") {
            let tooltipContent = [];
            let vr = prettyStatus(visit.visitRegStatus, visit.visitRegDueDate);
            tooltipContent.push(<p>Visit Registration: {vr.html}</p>);
            let innerCircleInfo = null;
            if (visit.dataEntryStatus) {
                let de = prettyStatus(visit.dataEntryStatus, visit.dataEntryDueDate);
                tooltipContent.push(
                    <p>Data Entry: {de.html}</p>,
                    <p className="center">
                        <i>
                            {visit.instrCompleted}/{visit.totalInstrs} instruments entered
                        </i>
                    </p>
                );
                tooltipContent.push(
                    <p>Double Data Entry:</p>,
                    <p className="center">
                        <i>
                            {visit.ddeInstCompleted}/{visit.totalInstrs} instruments entered
                        </i>
                    </p>
                );
                let innerCircleStyle = {
                    fontWeight: "bold",
                    color: "white",
                    position: "inherit",
                    fontSize: "110%"
                };
                if (visit.sentToDCC) {
                    innerCircleInfo = <div className="center" style={innerCircleStyle}>&#10003;</div>;
                    tooltipContent.push(
                        <p className="complete">
                            Data sent to DCC
                        </p>
                    );
                } else if (visit.ddeCompleted) {
                    innerCircleInfo = <div className="center" style={innerCircleStyle}>D</div>;
                    tooltipContent.push(
                        <p className="deadline-approaching">
                            Data not yet sent to DCC
                        </p>
                    );
                }
            }

            let visitClass = "circle "
                + visit.dataEntryStatus + " "
                + visit.visitRegStatus;

            return (
                <td className={visit.visitLabel} style={bgColor}>
                    <div data-tip data-for={visit.sessionID} className={visitClass}>
                        {innerCircleInfo}
                        <ReactTooltip id={visit.sessionID} place="top" type="dark" effect="solid">
                            <div className="ReactTooltipContent">
                                {tooltipContent}
                            </div>
                        </ReactTooltip>
                    </div>
                </td>
            );
        } else {
            return (<td className={visit.visitLabel} style={bgColor}/>);
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
        if ($(event.target).text() === this.props.pscid) {
            this.props.showCandInstFocus(event);
        } else {
            this.props.showCandFocus(event);
        }
    }

    render() {
        let style = {};
        let visits = this.props.visits.map(function(v, index) {
                return <VisitCell
                    key={index}
                    visit={v}
                    currentCohort={this.props.currentCohort}
                    currentVisit={this.props.currentVisit}
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
    let colWidth = 91.6666/this.props.visitLabels.length;
    let colStyle = {width: colWidth + '%'}
    let visitLabelHeaders = this.props.visitLabels.map(function(vl) {
            let cssClass = "VLHeader " + vl;
            return (
            <th
                style={colStyle}
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
                <th className="col-md-1"/>
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
        this.showCandInstFocus = this.showCandInstFocus.bind(this);
        this.showCandFocus = this.showCandFocus.bind(this);
        this.showVisitFocus = this.showVisitFocus.bind(this);
        this.showSideBar = this.showSideBar.bind(this);
        this.closeSideBar = this.closeSideBar.bind(this);
        this.filterSites = this.filterSites.bind(this);
        this.filterTeams = this.filterTeams.bind(this);
        this.filterCohorts = this.filterCohorts.bind(this);
        this.rowHasCurrentCohortVisit = this.rowHasCurrentCohortVisit.bind(this);

        $.get(GET_DATA_URL, {data: "all"}, function(data, status) {
           if (status === "success") {
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

    showCandInstFocus(event) {
        let pscid;
        if (event) {
            pscid = $(event.target).text();
            this.setState({
                currentPSCID: pscid,
                currentVisit: null,
                currentSideBarFocus: "candidate_instruments"
            });
        } else {
            pscid = this.state.currentPSCID;
        }

        let candid;
        for (let r of this.state.rows) {
            if (r.pscid === pscid) {
                candid = r.candid;
            }
        }

        $.get(GET_DATA_URL, {data: "instruments", pscid: pscid}, function(data, status) {
            if (status === "success") {
                let sideBarContent = <SideBarCandInstContent
                    pscid={pscid}
                    candid={candid}
                    data={data}
                />;

                this.setState({
                    sideBarContent: sideBarContent
                });

                this.showSideBar();
            }
        }.bind(this));
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

        let candid;

        for (let r of this.state.rows) {
            if (r.pscid === pscid) {
                candid = r.candid;
            }
        }

        let sideBarContent = <SideBarCandContent
                pscid={pscid}
                candid={candid}
                currentCohort={this.state.currentCohort}
                rows={this.state.rows}
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
        } else if (this.state.currentSideBarFocus === "candidate_instruments") {
            callback = this.showCandInstFocus;
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
        } else if (this.state.currentSideBarFocus === "candidate_instruments") {
            callback = this.showCandInstFocus;
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
                            showCandInstFocus={this.showCandInstFocus}
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

// Returns an object which contains a clean status and styled html to display
function prettyStatus(status, dueDate) {
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