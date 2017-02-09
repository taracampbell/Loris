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
        "dataEntryStatus": "deadline-past-data-entry",
        "dueDate": randomDate(),
        "instrumentsCompleted": 1,
        "totalInstruments": 22,
        "visitLabel": "Screening",
        "cohort": "MCI"
    }, {
        "sessionID": "2",
        "visitRegStatus": "no-deadline-visit",
        "dataEntryStatus": "deadline-approaching-data-entry",
        "dueDate": randomDate(),
        "instrumentsCompleted": 2,
        "totalInstruments": 22,
        "visitLabel": "Clinical",
        "cohort": "AD"
    }, {
        "sessionID": "3",
        "visitRegStatus": "deadline-approaching-visit",
        "dataEntryStatus": "complete-data-entry",
        "dueDate": randomDate(),
        "instrumentsCompleted": 3,
        "totalInstruments": 22,
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
        "dueDate": randomDate(),
        "instrumentsCompleted": 1,
        "totalInstruments": 22,
        "visitLabel": "Screening",
        "cohort": "AD"
    }, {
        "sessionID": "5",
        "visitRegStatus": "deadline-past-visit",
        "dataEntryStatus": "deadline-approaching-data-entry",
        "dueDate": randomDate(),
        "instrumentsCompleted": 2,
        "totalInstruments": 22,
        "visitLabel": "Clinical",
        "cohort": "SCI"
    }, {
        "sessionID": "6",
        "visitRegStatus": "deadline-approaching-visit",
        "dataEntryStatus": "deadline-past-data-entry",
        "dueDate": randomDate(),
        "instrumentsCompleted": 3,
        "totalInstruments": 22,
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
        "dueDate": randomDate(),
        "instrumentsCompleted": 1,
        "totalInstruments": 22,
        "visitLabel": "Screening",
        "cohort": "SCI"
    }, {
        "sessionID": "8",
        "visitRegStatus": "deadline-past-visit",
        "dataEntryStatus": "deadline-approaching-data-entry",
        "dueDate": randomDate(),
        "instrumentsCompleted": 2,
        "totalInstruments": 22,
        "visitLabel": "Clinical",
        "cohort": "SCI"

    }, {
        "sessionID": "9",
        "visitRegStatus": "deadline-past-visit",
        "dataEntryStatus": "deadline-approaching-data-entry",
        "dueDate": randomDate(),
        "instrumentsCompleted": 3,
        "totalInstruments": 22,
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
        "dueDate": randomDate(),
        "instrumentsCompleted": 1,
        "totalInstruments": 22,
        "visitLabel": "Screening",
        "cohort": "AD"
    }, {
        "sessionID": "11",
        "dataEntryStatus": "deadline-approaching-data-entry",
        "visitRegStatus": "deadline-approaching-visit",
        "dueDate": randomDate(),
        "instrumentsCompleted": 2,
        "totalInstruments": 22,
        "visitLabel": "Clinical",
        "cohort": "AD"
    }, {
        "sessionID": "12",
        "visitRegStatus": "deadline-approaching-visit",
        "dataEntryStatus": "deadline-approaching-data-entry",
        "dueDate": randomDate(),
        "instrumentsCompleted": 3,
        "totalInstruments": 22,
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
            { onChange: props.filterSites },
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
            { onChange: props.filterTeams },
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
            { onChange: props.filterCohorts },
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
                    { href: "#", className: "closebtn", onClick: this.props.closeSideBar },
                    "\xD7"
                ),
                this.props.sideBarContent
            );
        }
    }]);

    return SideBar;
}(React.Component);

function VisitCell(props) {
    // will need to include additional data
    // for each visit
    if (props.visit.cohort === props.currentCohort || props.currentCohort === "all") {
        var visitClass = "circle " + props.visit.dataEntryStatus + " " + props.visit.visitRegStatus;

        var now = new Date();
        var dueDate = props.visit.dueDate;
        var daysLeft = Math.floor((dueDate - now) / (1000 * 60 * 60 * 24));
        return React.createElement(
            "td",
            { className: props.visit.visitLabel },
            React.createElement(
                "div",
                { "data-tip": true, "data-for": props.visit.sessionID, className: visitClass },
                React.createElement(
                    ReactTooltip,
                    { id: props.visit.sessionID, place: "top", type: "dark", effect: "solid" },
                    React.createElement(
                        "span",
                        null,
                        "Visit Registration: ",
                        props.visit.visitRegStatus,
                        React.createElement("br", null)
                    ),
                    React.createElement(
                        "span",
                        null,
                        "Data Entry: due in ",
                        daysLeft,
                        " days",
                        React.createElement("br", null)
                    ),
                    React.createElement(
                        "span",
                        null,
                        React.createElement(
                            "i",
                            null,
                            props.visit.instrumentsCompleted,
                            "/",
                            props.visit.totalInstruments,
                            " instruments entered"
                        )
                    )
                )
            )
        );
    } else {
        return React.createElement("td", { className: props.visit.visitLabel });
    }
}

var PSCIDCell = function (_React$Component3) {
    _inherits(PSCIDCell, _React$Component3);

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
                    onClick: this.props.showCandFocus },
                this.props.pscid
            );
        }
    }]);

    return PSCIDCell;
}(React.Component);

var StudyTrackerRow = function (_React$Component4) {
    _inherits(StudyTrackerRow, _React$Component4);

    function StudyTrackerRow() {
        _classCallCheck(this, StudyTrackerRow);

        return _possibleConstructorReturn(this, (StudyTrackerRow.__proto__ || Object.getPrototypeOf(StudyTrackerRow)).apply(this, arguments));
    }

    _createClass(StudyTrackerRow, [{
        key: "render",
        value: function render() {
            var visits = this.props.visits.map(function (v) {
                return React.createElement(VisitCell, {
                    key: v.sessionID,
                    visit: v,
                    currentCohort: this.props.currentCohort });
            }.bind(this));
            return React.createElement(
                "tr",
                { className: "StudyTrackerRow" },
                React.createElement(PSCIDCell, {
                    pscid: this.props.pscid,
                    showCandFocus: this.props.showCandFocus
                }),
                visits
            );
        }
    }]);

    return StudyTrackerRow;
}(React.Component);

var StudyTrackerHeader = function (_React$Component5) {
    _inherits(StudyTrackerHeader, _React$Component5);

    function StudyTrackerHeader(props) {
        _classCallCheck(this, StudyTrackerHeader);

        var _this5 = _possibleConstructorReturn(this, (StudyTrackerHeader.__proto__ || Object.getPrototypeOf(StudyTrackerHeader)).call(this, props));

        _this5.highlightVisits = _this5.highlightVisits.bind(_this5);
        _this5.unHighlightVisits = _this5.unHighlightVisits.bind(_this5);
        return _this5;
    }

    // When mouse enters header cell, highlight all cells for that visit
    // This means that the text that shows up in the column header
    // must be equal to the css class name which is perhaps bad design


    _createClass(StudyTrackerHeader, [{
        key: "highlightVisits",
        value: function highlightVisits(event) {
            var visitClass = "." + $(event.target).text();
            $(visitClass).css("background-color", "#f5f5f5");
        }
    }, {
        key: "unHighlightVisits",
        value: function unHighlightVisits(event) {
            var visitClass = "." + $(event.target).text();
            $(visitClass).css("background-color", "");
        }
    }, {
        key: "render",
        value: function render() {
            var visitLabelHeaders = this.props.visitLabels.map(function (vl) {
                var cssClass = "VLHeader " + vl;
                return React.createElement(
                    "th",
                    {
                        onMouseEnter: this.highlightVisits,
                        onMouseLeave: this.unHighlightVisits,
                        onClick: this.props.showVisitFocus,
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

var StudyTracker = function (_React$Component6) {
    _inherits(StudyTracker, _React$Component6);

    function StudyTracker() {
        _classCallCheck(this, StudyTracker);

        var _this6 = _possibleConstructorReturn(this, (StudyTracker.__proto__ || Object.getPrototypeOf(StudyTracker)).call(this));

        _this6.state = {
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

        _this6.showCandFocus = _this6.showCandFocus.bind(_this6);
        _this6.showVisitFocus = _this6.showVisitFocus.bind(_this6);
        _this6.showSideBar = _this6.showSideBar.bind(_this6);
        _this6.closeSideBar = _this6.closeSideBar.bind(_this6);
        _this6.filterSites = _this6.filterSites.bind(_this6);
        _this6.filterTeams = _this6.filterTeams.bind(_this6);
        _this6.filterCohorts = _this6.filterCohorts.bind(_this6);
        _this6.rowHasCurrentCohortVisit = _this6.rowHasCurrentCohortVisit.bind(_this6);
        return _this6;
    }

    _createClass(StudyTracker, [{
        key: "showCandFocus",
        value: function showCandFocus(event) {
            var pscid = $(event.target).text();
            var content = [];

            content[0] = React.createElement(
                "span",
                null,
                "Participant ",
                pscid
            );

            var visits;

            for (var i = 0; i < this.state.rows.length; i++) {
                var r = this.state.rows[i];
                if (r.pscid === pscid) {
                    visits = r.visits;
                    break;
                }
            }

            var visitContent = visits.map(function (v) {
                return React.createElement(
                    "p",
                    null,
                    v.visitLabel,
                    ": ",
                    v.visitRegStatus,
                    " ",
                    v.dataEntryStatus,
                    React.createElement("br", null)
                );
            }.bind(this));

            content = content.concat(visitContent);

            this.setState({
                sideBarContent: content
            });
            this.showSideBar();
        }
    }, {
        key: "showVisitFocus",
        value: function showVisitFocus(event) {
            var visit = $(event.target).text();

            var content = React.createElement(
                "p",
                null,
                visit,
                " Visit"
            );
            this.setState({
                sideBarContent: content
            });
            this.showSideBar();
        }
    }, {
        key: "showSideBar",
        value: function showSideBar() {
            $(".SideBar").css("width", "250px");
        }
    }, {
        key: "closeSideBar",
        value: function closeSideBar() {
            $(".SideBar").css("width", "0px");
        }

        // Function which is called when cohort filter is changed

    }, {
        key: "filterCohorts",
        value: function filterCohorts(event) {
            this.setState({ currentCohort: event.target.value });
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
            this.setState({ currentSite: event.target.value });
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
                        showCandFocus: this.showCandFocus
                    });
                }
            }.bind(this));
            return React.createElement(
                "div",
                { className: "StudyTracker" },
                React.createElement(
                    "h1",
                    null,
                    "Hello, Study Tracker!"
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
                        showVisitFocus: this.showVisitFocus
                    }),
                    React.createElement(
                        "tbody",
                        null,
                        dataRows
                    )
                ),
                React.createElement(SideBar, {
                    closeSideBar: this.closeSideBar,
                    sideBarContent: this.state.sideBarContent
                })
            );
        }
    }]);

    return StudyTracker;
}(React.Component);

// Takes as input the status for visit registration and
// data entry and returns a formatted nicer looking
// text


function prettyStatus(visitReg, dataEntry) {}

function randomDate() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + Math.floor(Math.random() * 6) + 1, now.getDate(), 0, 0, 0, 0);
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