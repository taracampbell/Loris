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
                        &nbsp; &#10003;
                    </span>
                } else {
                    flagCompletion = <span
                        className="deadline-past left-align"
                        style={bold}
                    >
                        ! &nbsp;
                    </span>
                }
                let conflicts = [];
                if (inst.conflicts) {
                    conflicts.push(
                        <a className="center-block"
                           href="#"
                           onClick={() => openConflictResolver(candid, inst.testName)}
                        >
                            This instrument has conflicts
                        </a>
                    );
                }
                content.push(
                    <div>
                        <a href={url} target="_blank" className="left-indent" style={style}>
                            {flagCompletion}
                            {inst.fullName}
                        </a>
                        {conflicts}
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
        // use local variables for less typing
        let visits   = this.props.row.visits;
        let pscid    = this.props.row.pscid;
        let candid   = this.props.row.candid;
        let feedback = this.props.row.feedback;
        let dateReg = formatDate(new Date(this.props.row.dateReg));
        let iconColor = {color: "#444444"};
        // determine if participant has profile level feedback and add appropriate
        // links and display as such
        let profileURL = loris.BaseURL + "/" + candid;
        let feedbackIcon = [];
        if (feedback.profile) {
            feedbackIcon.push(
                <span
                    className="glyphicon glyphicon-edit"
                    style={iconColor}
                />
            );
            content.push(
                <h3 className="center">
                    {feedbackIcon}
                    <a href="#" target="_blank" onClick={() => openBVLFeedback(candid)}>
                        Participant {pscid}
                    </a>
                </h3>
            );
        } else {
            content.push(
                <h3 className="center">
                    <a href={profileURL} target="_blank">
                        Participant {pscid}
                    </a>
                </h3>
            );
        }

        // add a subheader if looking at specific cohort
        if (this.props.currentCohort !== "all") {
            content.push(
                <h4 className="center">
                    {this.props.currentCohort} Visits
                </h4>
            );
        }

        let visitContent = [];
        let fontSize = {fontSize: "1.10em"};
        visits.forEach(
            function(v) {
                // make sure visit is part of current cohort
                if (v.cohort === this.props.currentCohort || this.props.currentCohort === "all") {
                    let url = loris.BaseURL + "/";
                    let vr = prettyStatus(v.visitRegStatus, v.visitRegDueDate);
                    let de = prettyStatus(v.dataEntryStatus, v.dataEntryDueDate);
                    let visitLink = [];
                    let instrumentFeedback = [];

                    // determine if participant has visit level feedback and display as such
                    if (feedback.visits && feedback.visits.hasOwnProperty(v.sessionID)) {
                        visitLink.push(
                            <a href="#"
                               target="_blank"
                               style={fontSize}
                               onClick={() => openBVLFeedback(candid, v.sessionID)}
                            >
                                <span className="glyphicon glyphicon-edit" style={iconColor}/>
                                {v.visitLabel}:
                            </a>
                        );
                    } else {
                        url += "instrument_list/?candID="+candid+"&sessionID="+v.sessionID;
                        visitLink.push(
                            <a href={url}
                               target="_blank"
                               style={fontSize}
                            >
                                {v.visitLabel}:
                            </a>
                        );
                    }
                    // Check if there is instrument feedback and whether this
                    // particular visit
                    if (feedback.instruments && feedback.instruments.hasOwnProperty(v.sessionID)) {
                        let iconColor = {color: "#444444"};
                        let instLinkStyle =
                            {
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                display: "block",
                                margin: "5px"
                            };
                        for (let f in feedback.instruments) {
                            if (!feedback.instruments[f].commentID) {
                                continue;
                            }
                            let fb = feedback.instruments[f];
                            instrumentFeedback.push(
                                <a href="#"
                                   onClick={() => openBVLFeedback(candid, v.sessionID, fb.commentID, fb.testName)}
                                   style={instLinkStyle}
                                >
                                    <span className="glyphicon glyphicon-edit" style={iconColor} />
                                    {fb.fullName}
                                </a>
                            );
                        }
                    }
                    if (vr.status === "complete" && de.status === "complete") {

                        visitContent.push(
                            <div>
                                &nbsp;
                                {visitLink}
                                {vr.html}
                                {instrumentFeedback}
                            </div>
                        );
                    } else if(de.html){
                        url += "instrument_list/?candID="+candid+"&sessionID="+v.sessionID;
                        visitContent.push(
                            <div>
                                &nbsp;
                                {visitLink}
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
        content.push(
            <p className="right-align">
                Candidate was registered on {dateReg} &nbsp;
            </p>
        );
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
        let headerSize = {fontSize: "1.5em"};
        content = content.concat(
            <p className="center" style={headerSize}>
                {this.props.visit} Visits
            </p>
        );

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

        let visitDeadlines = [<h4>&nbsp;Upcoming Visit Deadlines</h4>];
        let dataDeadlines = [<h4>&nbsp;Upcoming Data Entry Deadlines</h4>];

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
                    fontSize: "120%",
                    lineHeight: "120%"
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
                } else if (visit.visitRegStatus === "cancelled-visit") {
                    innerCircleStyle.color = "#888888";
                    innerCircleStyle.fontSize = "200%";
                    innerCircleStyle.lineHeight = "60%";
                    innerCircleInfo = <div className="center" style={innerCircleStyle}>x</div>;
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
        let feedBackIcon = [];

        if (Object.keys(this.props.feedback).length) {
            let style = {color: "#444444"};
            feedBackIcon.push(
                <span className="glyphicon glyphicon-edit" style={style}/>
            );
        }
        return (
            <td
                className='PSCIDCell'
                onClick={this.props.clickHandler}>
                {this.props.pscid}
                &nbsp;
                {feedBackIcon}
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
                    feedback={this.props.feedback}
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
        this.switchOrder = this.switchOrder.bind(this);
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

    switchOrder() {
        if (document.getElementById("order-toggle").classList.contains("glyphicon-chevron-down")) {
            document.getElementById("order-toggle").classList.remove("glyphicon-chevron-down");
            document.getElementById("order-toggle").classList.add("glyphicon-chevron-up");
        } else {
            document.getElementById("order-toggle").classList.remove("glyphicon-chevron-up");
            document.getElementById("order-toggle").classList.add("glyphicon-chevron-down");
        }
        this.props.switchOrder();
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
                <th id="order-toggle"
                    className="col-md-1 center glyphicon glyphicon-chevron-down"
                    style={{color: "#444444"}}
                    onClick={this.switchOrder}
                />
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
             currentSideBarFocus: null,
             filterCandText: ""
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
        this.switchOrder = this.switchOrder.bind(this);
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

        let row;

        for (let r of this.state.rows) {
            if (r.pscid === pscid) {
                row = r;
            }
        }

        let sideBarContent = <SideBarCandContent
                currentCohort={this.state.currentCohort}
                row={row}
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

    switchOrder() {
        let rows = this.state.rows.reverse();
        this.setState(
            {rows: rows}
        );
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
        return false;
    }

    render() {
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
                            dateReg={row.dateReg}
                            feedback={row.feedback}
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
                <table className='table study-tracker-table'>
                    <StudyTrackerHeader
                        visitLabels={this.state.visitLabels}
                        currentVisit={this.state.currentVisit}
                        showVisitFocus={this.showVisitFocus}
                        switchOrder={this.switchOrder}
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
        "html": "",
        "daysLeft": null
    };

    if (!status) return toReturn;

    if (~status.indexOf("complete")) {
        html = <span className="complete right-align right-indent">Complete</span>;
        toReturn = {
            "status":"complete",
            "html":html
        };
    } else if (~status.indexOf("deadline-approaching")) {
        let daysLeft = Math.ceil((new Date(dueDate) - new Date()) * MS_TO_DAYS);
        let strDaysLeft = daysLeft + "";
        strDaysLeft += daysLeft == 1 ? " day" : " days";
        html = <span className="deadline-approaching right-align right-indent">Due in {strDaysLeft}</span>;
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

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

function openBVLFeedback(candID, sessionID, commentID, testName) {
    let url = loris.BaseURL + "/";
    if (candID && sessionID && commentID && testName) {
        url += testName
            + "/?commentID=" + commentID
            + "&sessionID=" + sessionID
            + "&candID=" +candID;
    }
    else if (candID && sessionID) {
        url += "instrument_list/?candID=" + candID + "&sessionID=" + sessionID;
    }
    else if (candID) {
        url += candID;
    } else {
        return;
    }
    let win = window.open(url, "_blank");
    win.onload = function() {
        win.document.querySelector("a.navbar-toggle").dispatchEvent(new MouseEvent("click"));
    }
}

function openConflictResolver(candID, testName){
    let url = loris.BaseURL + "/conflict_resolver";
    let win = window.open(url, "_blank");
    win.onload = function() {
        win.document.querySelector("input[name=CandID]").value = candID;
        win.document.querySelector("select[name=Instrument]").value = testName;
        win.document.querySelector("#testShowData1").dispatchEvent(new MouseEvent("click"));
    }
}