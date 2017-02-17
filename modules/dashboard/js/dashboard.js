"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dummyData = [{
    "pscid": "JGH0000",
    "psc": "JGH",
    "visits": [{
        "sessionID": "1",
        "visitRegStatus": "complete-visit",
        "dataEntryStatus": "complete-data-entry",
        "visitRegDueDate": randomDate(),
        "dataEntryDueDate": randomDate(),
        "instrCompleted": 1,
        "totalInstrs": 22,
        "visitLabel": "Screening",
        "cohort": "MCI"
    }, {
        "sessionID": "2",
        "visitRegStatus": "no-deadline-visit",
        "dataEntryStatus": "deadline-approaching-data-entry",
        "visitRegDueDate": randomDate(),
        "dataEntryDueDate": randomDate(),
        "instrCompleted": 2,
        "totalInstrs": 22,
        "visitLabel": "Clinical",
        "cohort": "AD"
    }, {
        "sessionID": "3",
        "visitRegStatus": "deadline-approaching-visit",
        "dataEntryStatus": "complete-data-entry",
        "visitRegDueDate": randomDate(),
        "dataEntryDueDate": randomDate(),
        "instrCompleted": 3,
        "totalInstrs": 22,
        "visitLabel": "Neuropsych",
        "cohort": "AD"
    }]
}, {
    "pscid": "PKD0001",
    "psc": "PKD",
    "visits": [{
        "sessionID": "4",
        "visitRegStatus": "complete-visit",
        "dataEntryStatus": "cancelled-data",
        "visitRegDueDate": randomDate(),
        "dataEntryDueDate": randomDate(),
        "instrCompleted": 1,
        "totalInstrs": 22,
        "visitLabel": "Screening",
        "cohort": "AD"
    }, {
        "sessionID": "5",
        "visitRegStatus": "deadline-past-visit",
        "dataEntryStatus": "deadline-approaching-data-entry",
        "visitRegDueDate": randomDate(),
        "dataEntryDueDate": randomDate(),
        "instrCompleted": 2,
        "totalInstrs": 22,
        "visitLabel": "Clinical",
        "cohort": "SCI"
    }, {
        "sessionID": "6",
        "visitRegStatus": "deadline-approaching-visit",
        "dataEntryStatus": "deadline-past-data-entry",
        "visitRegDueDate": randomDate(),
        "dataEntryDueDate": randomDate(),
        "instrCompleted": 3,
        "totalInstrs": 22,
        "visitLabel": "Neuropsych",
        "cohort": "MCI"
    }]
}, {
    "pscid": "JGH0010",
    "psc": "JGH",
    "visits": [{
        "sessionID": "7",
        "visitRegStatus": "complete-visit",
        "dataEntryStatus": "deadline-approaching-data-entry",
        "visitRegDueDate": randomDate(),
        "dataEntryDueDate": randomDate(),
        "instrCompleted": 1,
        "totalInstrs": 22,
        "visitLabel": "Screening",
        "cohort": "SCI"
    }, {
        "sessionID": "8",
        "visitRegStatus": "deadline-past-visit",
        "dataEntryStatus": "deadline-approaching-data-entry",
        "visitRegDueDate": randomDate(),
        "dataEntryDueDate": randomDate(),
        "instrCompleted": 2,
        "totalInstrs": 22,
        "visitLabel": "Clinical",
        "cohort": "SCI"

    }, {
        "sessionID": "9",
        "visitRegStatus": "deadline-past-visit",
        "dataEntryStatus": "deadline-approaching-data-entry",
        "visitRegDueDate": randomDate(),
        "dataEntryDueDate": randomDate(),
        "instrCompleted": 3,
        "totalInstrs": 22,
        "visitLabel": "Neuropsych",
        "cohort": "SCI"
    }]
}, {
    "pscid": "PKD0011",
    "psc": "PKD",
    "visits": [{
        "sessionID": "10",
        "visitRegStatus": "complete-visit",
        "dataEntryStatus": "deadline-approaching-data-entry",
        "visitRegDueDate": randomDate(),
        "dataEntryDueDate": randomDate(),
        "instrCompleted": 1,
        "totalInstrs": 22,
        "visitLabel": "Screening",
        "cohort": "AD"
    }, {
        "sessionID": "11",
        "dataEntryStatus": "deadline-approaching-data-entry",
        "visitRegStatus": "deadline-approaching-visit",
        "visitRegDueDate": randomDate(),
        "dataEntryDueDate": randomDate(),
        "instrCompleted": 2,
        "totalInstrs": 22,
        "visitLabel": "Clinical",
        "cohort": "AD"
    }, {
        "sessionID": "12",
        "visitRegStatus": "deadline-approaching-visit",
        "dataEntryStatus": "deadline-approaching-data-entry",
        "visitRegDueDate": randomDate(),
        "dataEntryDueDate": randomDate(),
        "instrCompleted": 3,
        "totalInstrs": 22,
        "visitLabel": "Neuropsych",
        "cohort": "AD"
    }]
}];

var visitLabels = ["Screening", "Clinical", "Neuropsych"];

var sites = [{
    'psc': 'JGH',
    'fullname': 'Jewish General Hospital'
}, {
    'psc': 'PKD',
    'fullname': 'Parkwood Institution'
}];

var cohorts = ["MCI", "SCI", "AD"];

var MS_TO_DAYS = 1 / (1000 * 60 * 60 * 24);

function SiteFilter(props) {
    var options = props.sites.map(function (site) {
        return React.createElement(
            "option",
            { key: site.psc, value: site.psc },
            site.fullname
        );
    });
    return React.createElement(
        "td",
        null,
        React.createElement(
            "select",
            { className: "form-control input-sm", onChange: props.filterSites },
            React.createElement(
                "option",
                { value: "all" },
                "Show All Sites"
            ),
            options
        )
    );
}

function TeamFilter(props) {
    return React.createElement(
        "td",
        null,
        React.createElement(
            "select",
            { className: "form-control input-sm", onChange: props.filterTeams },
            React.createElement(
                "option",
                { value: "COMPASS-ND" },
                "COMPASS-ND"
            )
        )
    );
}

function CohortFilter(props) {
    var options = props.cohorts.map(function (cohort) {
        return React.createElement(
            "option",
            { key: cohort, value: cohort },
            cohort
        );
    });
    return React.createElement(
        "td",
        null,
        React.createElement(
            "select",
            { className: "form-control input-sm", onChange: props.filterCohorts },
            React.createElement(
                "option",
                { value: "all" },
                "Show All Cohorts"
            ),
            options
        )
    );
}

var Filters = function (_React$Component) {
    _inherits(Filters, _React$Component);

    function Filters() {
        _classCallCheck(this, Filters);

        return _possibleConstructorReturn(this, (Filters.__proto__ || Object.getPrototypeOf(Filters)).apply(this, arguments));
    }

    _createClass(Filters, [{
        key: "render",

        // pass sites, teams, and cohort data once available
        value: function render() {
            return React.createElement(
                "table",
                { className: "Filters" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(SiteFilter, {
                            sites: this.props.sites,
                            filterSites: this.props.filterSites
                        }),
                        React.createElement(TeamFilter, {
                            teams: this.props.teams,
                            filterTeams: this.props.filterTeams
                        }),
                        React.createElement(CohortFilter, {
                            cohorts: this.props.cohorts,
                            filterCohorts: this.props.filterCohorts
                        })
                    )
                )
            );
        }
    }]);

    return Filters;
}(React.Component);

var SideBar = function (_React$Component2) {
    _inherits(SideBar, _React$Component2);

    function SideBar() {
        _classCallCheck(this, SideBar);

        return _possibleConstructorReturn(this, (SideBar.__proto__ || Object.getPrototypeOf(SideBar)).apply(this, arguments));
    }

    _createClass(SideBar, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "SideBar" },
                React.createElement(
                    "a",
                    {
                        href: "#",
                        className: "closebtn",
                        onClick: this.props.closeSideBar
                    },
                    "\xD7"
                ),
                this.props.sideBarContent
            );
        }
    }]);

    return SideBar;
}(React.Component);

var VisitCell = function (_React$Component3) {
    _inherits(VisitCell, _React$Component3);

    function VisitCell() {
        _classCallCheck(this, VisitCell);

        return _possibleConstructorReturn(this, (VisitCell.__proto__ || Object.getPrototypeOf(VisitCell)).apply(this, arguments));
    }

    _createClass(VisitCell, [{
        key: "render",
        value: function render() {
            var style = {};
            if (this.props.visit.visitLabel === this.props.currentVisit) {
                style = { backgroundColor: "#f5f5f5" };
            }
            if (this.props.visit.cohort === this.props.currentCohort || this.props.currentCohort === "all") {
                var visitClass = "circle " + this.props.visit.dataEntryStatus + " " + this.props.visit.visitRegStatus;

                var vr = this.props.prettyStatus(this.props.visit.visitRegStatus, this.props.visit.visitRegDueDate);
                var de = this.props.prettyStatus(this.props.visit.dataEntryStatus, this.props.visit.dataEntryDueDate);

                return React.createElement(
                    "td",
                    { className: this.props.visit.visitLabel, style: style },
                    React.createElement(
                        "div",
                        { "data-tip": true, "data-for": this.props.visit.sessionID, className: visitClass },
                        React.createElement(
                            ReactTooltip,
                            { id: this.props.visit.sessionID, place: "top", type: "dark", effect: "solid" },
                            React.createElement(
                                "div",
                                { className: "ReactTooltipContent" },
                                React.createElement(
                                    "p",
                                    null,
                                    "Visit Registration: ",
                                    vr.html
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "Data Entry: ",
                                    de.html
                                ),
                                React.createElement(
                                    "p",
                                    { className: "center" },
                                    React.createElement(
                                        "i",
                                        null,
                                        this.props.visit.instrCompleted,
                                        "/",
                                        this.props.visit.totalInstrs,
                                        " instruments entered"
                                    )
                                )
                            )
                        )
                    )
                );
            } else {
                return React.createElement("td", { className: this.props.visit.visitLabel, style: style });
            }
        }
    }]);

    return VisitCell;
}(React.Component);

var PSCIDCell = function (_React$Component4) {
    _inherits(PSCIDCell, _React$Component4);

    function PSCIDCell() {
        _classCallCheck(this, PSCIDCell);

        return _possibleConstructorReturn(this, (PSCIDCell.__proto__ || Object.getPrototypeOf(PSCIDCell)).apply(this, arguments));
    }

    _createClass(PSCIDCell, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "td",
                {
                    className: "PSCIDCell",
                    onClick: this.props.clickHandler },
                this.props.pscid
            );
        }
    }]);

    return PSCIDCell;
}(React.Component);

var StudyTrackerRow = function (_React$Component5) {
    _inherits(StudyTrackerRow, _React$Component5);

    function StudyTrackerRow(props) {
        _classCallCheck(this, StudyTrackerRow);

        var _this5 = _possibleConstructorReturn(this, (StudyTrackerRow.__proto__ || Object.getPrototypeOf(StudyTrackerRow)).call(this, props));

        _this5.highlightRow = _this5.highlightRow.bind(_this5);
        _this5.unhighlightRow = _this5.unhighlightRow.bind(_this5);
        _this5.keepHighlightedShowCandFocus = _this5.keepHighlightedShowCandFocus.bind(_this5);
        return _this5;
    }

    _createClass(StudyTrackerRow, [{
        key: "highlightRow",
        value: function highlightRow() {
            $("#" + this.props.pscid).css("background-color", "#f5f5f5");
        }
    }, {
        key: "unhighlightRow",
        value: function unhighlightRow() {
            if (this.props.currentPSCID !== this.props.pscid) {
                $("#" + this.props.pscid).css("background-color", "");
            }
        }
    }, {
        key: "keepHighlightedShowCandFocus",
        value: function keepHighlightedShowCandFocus(event) {
            // unset all other highlights
            $(".StudyTrackerRow").css("background-color", "");
            this.props.visits.forEach(function (v) {
                $("." + v.visitLabel).css("background-color", "");
            });
            this.highlightRow();
            this.props.showCandFocus(event);
        }
    }, {
        key: "render",
        value: function render() {
            var visits = this.props.visits.map(function (v) {
                return React.createElement(VisitCell, {
                    key: v.sessionID,
                    visit: v,
                    currentCohort: this.props.currentCohort,
                    currentVisit: this.props.currentVisit,
                    prettyStatus: this.props.prettyStatus
                });
            }.bind(this));
            return React.createElement(
                "tr",
                {
                    className: "StudyTrackerRow",
                    id: this.props.pscid,
                    onMouseEnter: this.highlightRow,
                    onMouseLeave: this.unhighlightRow
                },
                React.createElement(PSCIDCell, {
                    pscid: this.props.pscid,
                    clickHandler: this.keepHighlightedShowCandFocus
                }),
                visits
            );
        }
    }]);

    return StudyTrackerRow;
}(React.Component);

var StudyTrackerHeader = function (_React$Component6) {
    _inherits(StudyTrackerHeader, _React$Component6);

    function StudyTrackerHeader(props) {
        _classCallCheck(this, StudyTrackerHeader);

        var _this6 = _possibleConstructorReturn(this, (StudyTrackerHeader.__proto__ || Object.getPrototypeOf(StudyTrackerHeader)).call(this, props));

        _this6.state = {
            visitInFocus: null
        };
        _this6.highlightColumns = _this6.highlightColumns.bind(_this6);
        _this6.unhighlightColumns = _this6.unhighlightColumns.bind(_this6);
        _this6.keepHighlightedShowVisitFocus = _this6.keepHighlightedShowVisitFocus.bind(_this6);
        return _this6;
    }

    // When mouse enters header cell, highlight all cells for that visit
    // This means that the text that shows up in the column header
    // must be equal to the css class name which is perhaps bad design


    _createClass(StudyTrackerHeader, [{
        key: "highlightColumns",
        value: function highlightColumns(event) {
            var visitClass = "." + $(event.target).text();
            $(visitClass).css("background-color", "#f5f5f5");
        }
    }, {
        key: "unhighlightColumns",
        value: function unhighlightColumns(event) {
            if (this.props.currentVisit !== $(event.target).text()) {
                var visitClass = "." + $(event.target).text();
                $(visitClass).css("background-color", "");
            }
        }
    }, {
        key: "keepHighlightedShowVisitFocus",
        value: function keepHighlightedShowVisitFocus(event) {
            // // first unset all other highlights
            $(".StudyTrackerRow").css("background-color", "");
            this.props.visitLabels.forEach(function (vl) {
                $("." + vl).css("background-color", "");
            });
            // // then apply highlighting to only this column
            this.highlightColumns(event);

            this.props.showVisitFocus(event);
        }
    }, {
        key: "render",
        value: function render() {
            var visitLabelHeaders = this.props.visitLabels.map(function (vl) {
                var cssClass = "VLHeader " + vl;
                return React.createElement(
                    "th",
                    {
                        onMouseEnter: this.highlightColumns,
                        onMouseLeave: this.unhighlightColumns,
                        onClick: this.keepHighlightedShowVisitFocus,
                        key: vl,
                        className: cssClass },
                    vl
                );
            }.bind(this));
            return React.createElement(
                "thead",
                { className: "StudyTrackerHeader" },
                React.createElement(
                    "tr",
                    null,
                    React.createElement("th", null),
                    visitLabelHeaders
                )
            );
        }
    }]);

    return StudyTrackerHeader;
}(React.Component);

var StudyTracker = function (_React$Component7) {
    _inherits(StudyTracker, _React$Component7);

    function StudyTracker() {
        _classCallCheck(this, StudyTracker);

        var _this7 = _possibleConstructorReturn(this, (StudyTracker.__proto__ || Object.getPrototypeOf(StudyTracker)).call(this));

        _this7.state = {
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
            currentVisit: null,
            currentSideBarFocus: null
        };
        _this7.prettyStatus = _this7.prettyStatus.bind(_this7);
        _this7.showCandFocus = _this7.showCandFocus.bind(_this7);
        _this7.showVisitFocus = _this7.showVisitFocus.bind(_this7);
        _this7.filterSites = _this7.filterSites.bind(_this7);
        _this7.filterTeams = _this7.filterTeams.bind(_this7);
        _this7.filterCohorts = _this7.filterCohorts.bind(_this7);
        _this7.rowHasCurrentCohortVisit = _this7.rowHasCurrentCohortVisit.bind(_this7);
        return _this7;
    }

    // Returns an object which contains a clean status and styled html to display


    _createClass(StudyTracker, [{
        key: "prettyStatus",
        value: function prettyStatus(status, dueDate) {
            var html = void 0,
                toReturn = void 0;
            if (~status.indexOf("complete")) {
                html = React.createElement(
                    "span",
                    { className: "complete right-align" },
                    "Complete"
                );
                toReturn = {
                    "status": "complete",
                    "html": html
                };
            } else if (~status.indexOf("deadline-approaching")) {
                var daysLeft = Math.floor((dueDate - new Date()) * MS_TO_DAYS);
                daysLeft += daysLeft == 1 ? " day" : " days";
                html = React.createElement(
                    "span",
                    { className: "deadline-approaching right-align" },
                    "Due in ",
                    daysLeft
                );
                toReturn = {
                    "status": "deadline-approaching",
                    "html": html
                };
            } else if (~status.indexOf("deadline-past")) {
                var daysPast = Math.floor((new Date() - dueDate) * MS_TO_DAYS);
                daysPast += daysPast == 1 ? " day" : " days";
                html = React.createElement(
                    "span",
                    { className: "deadline-past right-align" },
                    daysPast,
                    " late"
                );
                toReturn = {
                    "status": "deadline-past",
                    "html": html
                };
            } else if (~status.indexOf("cancelled")) {
                html = React.createElement(
                    "span",
                    { className: "cancelled right-align" },
                    "Visit cancelled"
                );
                toReturn = {
                    "status": "cancelled",
                    "html": html
                };
            } else if (~status.indexOf("no-deadline")) {
                html = React.createElement(
                    "span",
                    { className: "no-deadline right-align" },
                    "No deadline specified"
                );
                toReturn = {
                    "status": "no-deadline",
                    "html": html
                };
            }

            return toReturn;
        }

        // Sets the content of the SideBar and then shows SideBar
        // for Candidate Focus

    }, {
        key: "showCandFocus",
        value: function showCandFocus(event) {
            var pscid = void 0;
            if (event) {
                pscid = $(event.target).text();
                this.setState({
                    currentPSCID: pscid,
                    currentVisit: null,
                    currentSideBarFocus: "candidate"
                });
            } else {
                pscid = this.state.currentPSCID;
            }
            var content = [];

            content[0] = React.createElement(
                "h3",
                { className: "center" },
                "Participant ",
                pscid
            );
            if (this.state.currentCohort !== "all") {
                content = content.concat(React.createElement(
                    "h4",
                    { className: "center" },
                    this.state.currentCohort,
                    " Visits"
                ));
            }
            var visits = void 0;

            for (var i = 0; i < this.state.rows.length; i++) {
                var r = this.state.rows[i];
                if (r.pscid === pscid) {
                    visits = r.visits;
                    break;
                }
            }

            var visitContent = [];
            visits.forEach(function (v) {
                if (v.cohort === this.state.currentCohort || this.state.currentCohort === "all") {
                    var vr = this.prettyStatus(v.visitRegStatus, v.visitRegDueDate);
                    var de = this.prettyStatus(v.dataEntryStatus, v.dataEntryDueDate);
                    if (vr.status === "complete" && de.status === "complete") {
                        visitContent = visitContent.concat(React.createElement(
                            "p",
                            { style: { fontSize: "18px" } },
                            v.visitLabel,
                            ":",
                            React.createElement(
                                "span",
                                { className: "complete right-align" },
                                "\u2713"
                            ),
                            vr.html
                        ));
                    } else {
                        visitContent = visitContent.concat(React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "h4",
                                null,
                                v.visitLabel,
                                ":"
                            ),
                            React.createElement(
                                "p",
                                { className: "indent" },
                                "Visit Registration: ",
                                vr.html
                            ),
                            React.createElement(
                                "p",
                                { className: "indent" },
                                "Data Registration: ",
                                de.html
                            )
                        ));
                    }
                }
            }.bind(this));
            if (visitContent.length === 0) {
                visitContent = React.createElement(
                    "p",
                    { className: "center" },
                    "No applicable visits for this participant for cohort ",
                    this.state.currentCohort
                );
            }
            content = content.concat(visitContent);

            this.setState({
                sideBarContent: content
            });
            if (event) {
                StudyTracker.showSideBar();
            }
        }

        // Sets the content of the SideBar and then shows SideBar
        // for Visit Focus

    }, {
        key: "showVisitFocus",
        value: function showVisitFocus(event) {
            var visit = void 0;
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
            var content = [];
            content[0] = React.createElement(
                "h3",
                { className: "center" },
                visit,
                " Visit"
            );

            var subheader = void 0;
            if (this.state.currentSite !== "all" && this.state.currentCohort !== "all") {
                subheader = "Visits for " + this.state.currentCohort + " at " + this.state.currentSite;
            } else if (this.state.currentSite !== "all") {
                subheader = "Visits at " + this.state.currentSite;
            } else if (this.state.currentCohort !== "all") {
                subheader = "Visits for " + this.state.currentCohort;
            }

            if (subheader) {
                content = content.concat(React.createElement(
                    "h4",
                    { className: "center" },
                    subheader
                ));
            }

            var visitDeadlines = [React.createElement(
                "h4",
                null,
                "Upcoming Visit Deadlines"
            )];
            var dataDeadlines = [React.createElement(
                "h4",
                null,
                "Upcoming Data Entry Deadlines"
            )];
            // Loop through rows
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.state.rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var row = _step.value;

                    if (row.psc !== this.state.currentSite && this.state.currentSite !== "all") {
                        continue;
                    }
                    var pscid = row.pscid;
                    // Look for visit with corresponding visit label
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = row.visits[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var v = _step2.value;

                            if (v.visitLabel === visit) {
                                if (v.cohort === this.state.currentCohort || this.state.currentCohort === "all") {
                                    var vr = this.prettyStatus(v.visitRegStatus, v.visitRegDueDate);
                                    if (vr.status === "deadline-past" || vr.status === "deadline-approaching") {
                                        visitDeadlines = visitDeadlines.concat(React.createElement(
                                            "p",
                                            { className: "indent" },
                                            pscid,
                                            ": ",
                                            vr.html
                                        ));
                                    }
                                    var de = this.prettyStatus(v.dataEntryStatus, v.dataEntryDueDate);
                                    if (de.status === "deadline-past" || de.status === "deadline-approaching") {
                                        dataDeadlines = dataDeadlines.concat(React.createElement(
                                            "p",
                                            { className: "indent" },
                                            pscid,
                                            ": ",
                                            de.html
                                        ));
                                    }
                                }
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (visitDeadlines.length <= 1) {
                visitDeadlines = visitDeadlines.concat(React.createElement(
                    "p",
                    { className: "complete indent" },
                    "No upcoming visit deadlines"
                ));
            }
            if (dataDeadlines.length <= 1) {
                dataDeadlines = dataDeadlines.concat(React.createElement(
                    "p",
                    { className: "complete indent" },
                    "No upcoming data entry deadlines"
                ));
            }

            content = content.concat(visitDeadlines, dataDeadlines);
            this.setState({
                sideBarContent: content
            });
            // only show if event is set, i.e., when the PSCID is clicked
            // not when filter by cohort is done
            if (event) {
                StudyTracker.showSideBar();
            }
        }
    }, {
        key: "filterCohorts",


        /* Function which is called when cohort filter is changed
            event is onChange when the select changes
         */
        value: function filterCohorts(event) {
            var callback = function callback() {};
            if (this.state.currentSideBarFocus === "visit") {
                callback = this.showVisitFocus;
            } else if (this.state.currentSideBarFocus === "candidate") {
                callback = this.showCandFocus;
            }
            this.setState({ currentCohort: event.target.value }, callback);
        }

        // Function which will handle team filtering

    }, {
        key: "filterTeams",
        value: function filterTeams(event) {}
        // Here there should be an AJAX call which fetches a new
        // data object and then updates the state like:
        // this.setState({rows: newRows, visitLabels: newVLs});
        // or something


        // Function which is called when site filter is changed

    }, {
        key: "filterSites",
        value: function filterSites(event) {
            var callback = function callback() {};
            if (this.state.currentSideBarFocus === "visit") {
                callback = this.showVisitFocus;
            } else if (this.state.currentSideBarFocus === "candidate") {
                callback = this.showCandFocus;
            }
            this.setState({ currentSite: event.target.value }, callback);
        }

        //Checks to see if a row has a visit with the selected cohort

    }, {
        key: "rowHasCurrentCohortVisit",
        value: function rowHasCurrentCohortVisit(row) {
            if (this.state.currentCohort === "all") {
                return true;
            }
            var result = false;

            row.visits.forEach(function (v) {
                if (v.cohort === this.state.currentCohort) {
                    result = true;
                }
            }.bind(this));
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            // Filter out the entire row for candidates at sites other than
            // the currently selected one or if the candidate has no visits for
            // the currently selected cohort
            var dataRows = this.state.rows.map(function (row) {
                if (this.rowHasCurrentCohortVisit(row) && (row.psc === this.state.currentSite || this.state.currentSite === "all")) {
                    return React.createElement(StudyTrackerRow, {
                        key: row.pscid,
                        pscid: row.pscid,
                        visits: row.visits,
                        currentCohort: this.state.currentCohort,
                        currentVisit: this.state.currentVisit,
                        currentPSCID: this.state.currentPSCID,
                        showCandFocus: this.showCandFocus,
                        prettyStatus: this.prettyStatus
                    });
                }
            }.bind(this));
            return React.createElement(
                "div",
                { className: "StudyTracker" },
                React.createElement(
                    "span",
                    { style: { fontSize: 24 } },
                    "Study Progression"
                ),
                React.createElement(Filters, {
                    sites: this.state.sites,
                    filterSites: this.filterSites,
                    teams: this.state.teams,
                    filterTeams: this.filterTeams,
                    cohorts: this.state.cohorts,
                    filterCohorts: this.filterCohorts
                }),
                React.createElement(
                    "table",
                    null,
                    React.createElement(StudyTrackerHeader, {
                        visitLabels: this.state.visitLabels,
                        currentVisit: this.state.currentVisit,
                        showVisitFocus: this.showVisitFocus
                    }),
                    React.createElement(
                        "tbody",
                        null,
                        dataRows
                    )
                ),
                React.createElement(SideBar, {
                    closeSideBar: StudyTracker.closeSideBar,
                    sideBarContent: this.state.sideBarContent,
                    currentCohort: this.state.currentCohort
                })
            );
        }
    }], [{
        key: "showSideBar",
        value: function showSideBar() {
            $(".SideBar").css("width", "350px");
        }
    }, {
        key: "closeSideBar",
        value: function closeSideBar() {
            $(".SideBar").css("width", "0px");
        }
    }]);

    return StudyTracker;
}(React.Component);

function randomDate() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + Math.floor(Math.random() * 6) + 1, now.getDate() + 1, 0, 0, 0, 0);
}

window.onload = function () {
    var dashboard = React.createElement(StudyTracker, null);

    // Create a wrapper div in which react component will be loaded
    var dashboardDOM = document.createElement('div');
    dashboardDOM.id = 'page-dashboard';

    // Append wrapper div to page content
    var rootDOM = document.getElementById("lorisworkspace");
    rootDOM.appendChild(dashboardDOM);

    ReactDOM.render(dashboard, document.getElementById("page-dashboard"));
};