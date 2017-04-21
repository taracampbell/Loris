const MS_TO_DAYS = 1/(1000 * 60 * 60 * 24);
const SIDEBAR_WIDTH = "24%";
const COMPRESS_TBL_WIDTH = "75%";
const HIGHLIGHT_COLOR = "#E9EBF3";
const GET_DATA_URL = loris.BaseURL + "/dashboard/ajax/getData.php";

function SiteFilter(props) {
    let options = [];

    if (props.sites.size > 1) {
        options.push(<option value="all">Show All Sites</option>);
    }
    props.sites.forEach(function (name, alias) {
           options.push(<option key={alias} value={alias}>{name}</option>);
        }
    );
    return (
        <select className="form-control input-sm" onChange={props.filterSites}>
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

class CandidateFilter extends React.Component{
    constructor(props) {
        super(props);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
    }
    handleTextInputChange(e) {
        this.props.filterCand(e.target.value);
    }
    render() {
        return (
            <input className="form-control input-sm"
                   type="text"
                   name="filterCand"
                   value={this.props.filterCandText}
                   onChange={this.handleTextInputChange}
                   placeholder="Search by PSCID"
            />
        );
    }
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
            <div class="row">
                <div className="col-md-3">
                    <CandidateFilter
                        filterCand={this.props.filterCand}
                    />
                </div>
                <div className="col-md-3">
                    <SiteFilter
                        sites={this.props.sites}
                        filterSites={this.props.filterSites}
                    />
                </div>
                <div className="col-md-3">
                    <TeamFilter
                        teams={this.props.teams}
                        filterTeams={this.props.filterTeams}
                    />
                </div>
                <div className="col-md-3">
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

        let bold = {fontWeight: "bold"};

        let instListURL = loris.BaseURL
            + "/instrument_list/?candID=" + this.props.candid
            + "&sessionID=" + this.props.sessionID;
        content.push(
            <h3 className="center">
                <a href={instListURL} target="_blank">
                    Participant {this.props.pscid}
                </a>
            </h3>
        );
        let data = this.props.data;
        let sessionID = this.props.sessionID;
        let candid = this.props.candid;
        let style = {
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "block"
        };
        for (let sg in data) {
            content.push(<h4 style={bold}>&nbsp;{sg}</h4>);
            for (let t in data[sg]) {
                let inst = data[sg][t];
                let url = loris.BaseURL +
                    "/" + inst.testName +
                    "/?commentID="+ inst.commentID +
                    "&sessionID=" + sessionID +
                    "&candID=" + candid;
                let flagCompletion;
                if (inst.ddeCompletion === "Complete") {
                    flagCompletion = <span
                        className="complete left-align"
                        style={bold}
                    >
                        &#10003;&#10003;
                    </span>
                } else if (inst.completion === "Complete") {
                    flagCompletion = <span
                        className="complete left-align"
                        style={bold}
                    >
                        &#10003;
                    </span>
                } else {
                    flagCompletion = <span
                        className="deadline-past left-align"
                        style={bold}
                    >
                        ! &nbsp;
                    </span>
                }
                content.push(
                    <div>
                        <a href={url} target="_blank" className="left-indent" style={style}>
                            {flagCompletion}
                            {inst.fullName}
                        </a>
                    </div>
                );
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
        let fontSize = {fontSize: "1.10em"};
        visits.forEach(
            function(v) {
                if (v.cohort === this.props.currentCohort || this.props.currentCohort === "all") {
                    let url = loris.BaseURL + "/";
                    let vr = prettyStatus(v.visitRegStatus, v.visitRegDueDate);
                    let de = prettyStatus(v.dataEntryStatus, v.dataEntryDueDate);
                    if (vr.status === "complete" && de.status === "complete") {
                        url += "instrument_list/?candID="+candid+"&sessionID="+v.sessionID;
                        visitContent.push(
                            <div>
                                <p style={fontSize}>
                                    &nbsp;
                                    <a href={url} target="_blank">&nbsp;{v.visitLabel}:</a>
                                    {vr.html}
                                </p>
                            </div>
                        );
                    } else if(de.html){
                        url += "instrument_list/?candID="+candid+"&sessionID="+v.sessionID;
                        visitContent.push(
                            <div>
                                &nbsp;
                                <a href={url} target="_blank" style={fontSize}>
                                {v.visitLabel}:
                                </a>
                                <p className="left-indent">Visit Registration: {vr.html}</p>
                                <p className="left-indent">Data Entry: {de.html}</p>
                            </div>
                        );
                    } else {
                        url += candid;
                        visitContent.push(
                            <div>
                                &nbsp;
                                <a href={url} target="_blank" style={fontSize}>
                                    {v.visitLabel}:
                                </a>
                                <p className="left-indent">Visit Registration: {vr.html}</p>
                            </div>
                        );
                    }
                }
            }.bind(this)
        );
        if (visitContent.length === 0) {
            visitContent = <p className="center">
                    No applicable visits for this participant for cohort {this.props.currentCohort}
                </p>
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
        content = content.concat(
            <div className="SideBarHeader">
                <h5>
                    {this.props.visit} Visit
                </h5>
            </div>
        );

        /*let subheader; // Displays which cohort and visit is in focus
        if (this.props.currentSite !== "all" && this.props.currentCohort !== "all") {
            subheader = "Visits for " + this.props.currentCohort + " at " + this.props.currentSite;
        } else if (this.props.currentSite !== "all") {
            subheader = "Visits at " + this.props.currentSite;
        } else if (this.props.currentCohort !== "all") {
            subheader = "Visits for " + this.props.currentCohort;
        }

        if (subheader) {
            content = content.concat(<h4 className="center">{subheader}</h4>)
        }*/

        let visitDeadlines = [<h5>Upcoming Visit Deadlines</h5>];
        let dataDeadlines = [<h5>Upcoming Data Entry Deadlines</h5>];

        let visitsSortable = [];
        let dataSortable = [];
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
                            visitsSortable.push(
                                {
                                    "prettyStatus":vr,
                                    "URL": timepointListURL,
                                    "pscid": pscid
                                }
                            );
                        }
                        let de = prettyStatus(v.dataEntryStatus, v.dataEntryDueDate);
                        if (de.status === "deadline-past" || de.status === "deadline-approaching") {
                            dataSortable.push(
                                {
                                    "prettyStatus":de,
                                    "URL": instListUrl,
                                    "pscid": pscid
                                }
                            );
                        }
                    }
                    break;
                }
            }
        }

        visitsSortable = visitsSortable.sort(function(a,b){
           return a.prettyStatus.daysLeft - b.prettyStatus.daysLeft;
        });
        dataSortable = dataSortable.sort(function(a,b) {
            return a.prettyStatus.daysLeft - b.prettyStatus.daysLeft;
        });

        for (let vr of visitsSortable) {
            visitDeadlines.push(
                    <p className="left-indent">
                        <a href={vr.URL} target="_blank">{vr.pscid}:</a>
                        {vr.prettyStatus.html}
                    </p>
            );
        }
        for (let de of dataSortable) {
            dataDeadlines.push(
                <p className="left-indent">
                    <a href={de.URL} target="_blank">{de.pscid}:</a>
                    {de.prettyStatus.html}
                </p>
            );
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
                <div className="SideBarContent">
                    <a
                        href="#"
                        className="closebtn"
                        onClick={this.props.closeSideBar}
                        >
                            &times;
                    </a>
                    {this.props.sideBarContent}
                </div>
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

            let sidebarArgs = {
                sessionID: visit.sessionID,
                pscid: this.props.pscid,
                candid: this.props.candid
            };

            return (
                <td className={visit.visitLabel} style={bgColor}>
                    <div onClick={() => this.props.showCandInstFocus(sidebarArgs)}
                         data-tip data-for={visit.sessionID}
                         className={visitClass}
                    >
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
        // if click occurs on a circle with data-entry in the class
        // then it is both a Visit Circle and has instrument related data
        // to be displayed.
        // otherwise, show
        if (!~event.target.className.indexOf('data-entry')) {
            this.props.showCandFocus(event);
        }

    }

    render() {
        let style = {};
        let visits = this.props.visits.map(function(v, index) {
                return <VisitCell
                    key={index}
                    visit={v}
                    pscid={this.props.pscid}
                    candid={this.props.candid}
                    currentCohort={this.props.currentCohort}
                    currentVisit={this.props.currentVisit}
                    showCandInstFocus={this.props.showCandInstFocus}
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
    constructor(props) {
        super(props);
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
             currentSideBarFocus: null,
             filterCandText: "",
             active: this.props.active
        };
        this.showCandInstFocus = this.showCandInstFocus.bind(this);
        this.showCandFocus = this.showCandFocus.bind(this);
        this.showVisitFocus = this.showVisitFocus.bind(this);
        this.showSideBar = this.showSideBar.bind(this);
        this.closeSideBar = this.closeSideBar.bind(this);
        this.filterCand = this.filterCand.bind(this);
        this.filterSites = this.filterSites.bind(this);
        this.filterTeams = this.filterTeams.bind(this);
        this.filterCohorts = this.filterCohorts.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.rowHasCurrentCohortVisit = this.rowHasCurrentCohortVisit.bind(this);
    }

    loadDataFromServer() {
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

    componentDidMount() {
        this.loadDataFromServer();
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.active != this.state.active) {
        this.setState({
          active: nextProps.active
        });
      }
    }

    showCandInstFocus(sidebarArgs) {
        this.setState({
            currentPSCID: sidebarArgs.pscid,
            currentVisit: null,
            currentSideBarFocus: "candidate_instruments"
        });

        if (sidebarArgs.sessionID > 0) {
            $.get(GET_DATA_URL, {data: "instruments", "sessionID":sidebarArgs.sessionID}, function(data,status) {
                if (status === "success") {
                    let sideBarContent = <SideBarCandInstContent
                        sessionID={sidebarArgs.sessionID}
                        pscid={sidebarArgs.pscid}
                        candid={sidebarArgs.candid}
                        data={data}
                    />;
                    this.setState({
                        sideBarContent: sideBarContent
                    });
                    this.showSideBar();
                }
            }.bind(this));
        }
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
        $(".table, .row").css("width", COMPRESS_TBL_WIDTH);
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

    filterCand(filterCandText) {
        this.setState({
            filterCandText: filterCandText
        });
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

    renderRow(row) {
        if (this.rowHasCurrentCohortVisit(row) &&
            (row.psc === this.state.currentSite || this.state.currentSite === "all") &&
            row.pscid.startsWith(this.state.filterCandText)
        ) {
            return true;
        }
        //console.log(~row.pscid.indexOf(this.state.filterCandText));
        return false;
    }

    render() {
        if (this.state.active == false) {
            return null;
        }
        // Filter out the entire row for candidates at sites other than
        // the currently selected one or if the candidate has no visits for
        // the currently selected cohort
        let dataRows = this.state.rows.map(function (row) {
                if(this.renderRow(row)) {
                    return (
                        <StudyTrackerRow
                            key={row.pscid}
                            pscid={row.pscid}
                            candid={row.candid}
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
                            filterCand={this.filterCand}
                            sites={this.state.sites}
                            filterSites={this.filterSites}
                            teams={this.state.teams}
                            filterTeams={this.filterTeams}
                            cohorts={this.state.cohorts}
                            filterCohorts={this.filterCohorts}
                        />
                    </div>
                </div>
                <div className="study-tracker-table">
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
            </div>
        );
    }
}

// Returns an object which contains a clean status and styled html to display
function prettyStatus(status, dueDate) {
    let html, toReturn;


    toReturn = {
        "status": "",
        "html": "",
        "daysLeft": null
    };

    if (!status) return toReturn;

    if (~status.indexOf("complete")) {
        html = <span className="complete right-align right-indent">complete</span>;
        toReturn = {
            "status":"complete",
            "html":html
        };
    } else if (~status.indexOf("deadline-approaching")) {
        let daysLeft = Math.ceil((new Date(dueDate) - new Date()) * MS_TO_DAYS);
        let strDaysLeft = daysLeft + "";
        strDaysLeft += daysLeft == 1 ? " day" : " days";
        html = <span className="deadline-approaching right-align right-indent">due in {strDaysLeft}</span>;
        toReturn = {
            "status":"deadline-approaching",
            "html":html,
            "daysLeft": daysLeft
        };
    } else if (~status.indexOf("deadline-past")) {
        let daysPast = Math.ceil((new Date() - new Date(dueDate)) * MS_TO_DAYS);
        let strDaysPast = daysPast + "";
        strDaysPast += daysPast == 1 ? " day" : " days";
        html = <span className="deadline-past right-align right-indent">{strDaysPast} late</span>;
        toReturn = {
            "status":"deadline-past",
            "html":html,
            "daysLeft": -daysPast
        };
    } else if (~status.indexOf("cancelled")) {
        html = <span className="cancelled right-align right-indent">visit cancelled</span>;
        toReturn = {
            "status":"cancelled",
            "html":html
        };

    } else if (~status.indexOf("no-deadline")) {
        html = <span className="no-deadline right-align right-indent">no deadline specified</span>;
        toReturn = {
            "status":"no-deadline",
            "html":html
        };
    }

    return toReturn;
}