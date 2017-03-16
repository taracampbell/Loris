"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MS_TO_DAYS = 1 / (1000 * 60 * 60 * 24);
var SIDEBAR_WIDTH = "20%";
var HIGHLIGHT_COLOR = "#E9EBF3";
var GET_DATA_URL = loris.BaseURL + "/dashboard/ajax/getData.php";

function SiteFilter(props) {
    var options = [];
    props.sites.forEach(function (name, alias) {
        options.push(React.createElement(
            "option",
            { key: alias, value: alias },
            name
        ));
    });
    return React.createElement(
        "select",
        { className: "form-control input-sm", onChange: props.filterSites },
        React.createElement(
            "option",
            { value: "all" },
            "Show All Sites"
        ),
        options
    );
}

function TeamFilter(props) {
    return React.createElement(
        "select",
        { className: "form-control input-sm", onChange: props.filterTeams },
        React.createElement(
            "option",
            { value: "COMPASS-ND" },
            "COMPASS-ND"
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
        "select",
        { className: "form-control input-sm", onChange: props.filterCohorts },
        React.createElement(
            "option",
            { value: "all" },
            "Show All Cohorts"
        ),
        options
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
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "col-md-4" },
                    React.createElement(SiteFilter, {
                        sites: this.props.sites,
                        filterSites: this.props.filterSites
                    })
                ),
                React.createElement(
                    "div",
                    { className: "col-md-4" },
                    React.createElement(TeamFilter, {
                        teams: this.props.teams,
                        filterTeams: this.props.filterTeams
                    })
                ),
                React.createElement(
                    "div",
                    { className: "col-md-4" },
                    React.createElement(CohortFilter, {
                        cohorts: this.props.cohorts,
                        filterCohorts: this.props.filterCohorts
                    })
                )
            );
        }
    }]);

    return Filters;
}(React.Component);

var SideBarCandInstContent = function (_React$Component2) {
    _inherits(SideBarCandInstContent, _React$Component2);

    function SideBarCandInstContent() {
        _classCallCheck(this, SideBarCandInstContent);

        return _possibleConstructorReturn(this, (SideBarCandInstContent.__proto__ || Object.getPrototypeOf(SideBarCandInstContent)).apply(this, arguments));
    }

    _createClass(SideBarCandInstContent, [{
        key: "render",
        value: function render() {
            var content = [];
            var bold = {
                fontWeight: "bold"
            };

            content[0] = React.createElement(
                "h3",
                { className: "center" },
                React.createElement(
                    "a",
                    { href: loris.BaseURL + "/" + this.props.candid, target: "_blank" },
                    "Participant ",
                    this.props.pscid
                )
            );
            var data = this.props.data;
            for (var v in data) {
                content.push(React.createElement(
                    "h4",
                    { style: bold },
                    v
                ));
                if (data[v].length === 0) {
                    content.push(React.createElement(
                        "p",
                        { className: "left-indent" },
                        "Visit has not been registered yet."
                    ));
                }
                for (var sg in data[v]) {
                    content.push(React.createElement(
                        "p",
                        { className: "left-indent", style: bold },
                        sg
                    ));
                    for (var i in data[v][sg]) {
                        var inst = data[v][sg][i];
                        var checkComplete = null;
                        if (inst.completion === "Complete") {
                            checkComplete = React.createElement(
                                "span",
                                {
                                    className: "complete left-align",
                                    style: bold
                                },
                                "\u2713"
                            );
                        }
                        content.push(React.createElement(
                            "p",
                            { className: "left-indent2" },
                            checkComplete,
                            inst.testName
                        ));
                    }
                }
            }
            return React.createElement(
                "div",
                null,
                content
            );
        }
    }]);

    return SideBarCandInstContent;
}(React.Component);

var SideBarCandContent = function (_React$Component3) {
    _inherits(SideBarCandContent, _React$Component3);

    function SideBarCandContent() {
        _classCallCheck(this, SideBarCandContent);

        return _possibleConstructorReturn(this, (SideBarCandContent.__proto__ || Object.getPrototypeOf(SideBarCandContent)).apply(this, arguments));
    }

    _createClass(SideBarCandContent, [{
        key: "render",
        value: function render() {
            var content = [];
            content[0] = React.createElement(
                "h3",
                { className: "center" },
                React.createElement(
                    "a",
                    { href: loris.BaseURL + "/" + this.props.candid, target: "_blank" },
                    "Participant ",
                    this.props.pscid
                )
            );
            if (this.props.currentCohort !== "all") {
                content = content.concat(React.createElement(
                    "h4",
                    { className: "center" },
                    this.props.currentCohort,
                    " Visits"
                ));
            }
            var visits = void 0;
            var candid = void 0;
            for (var i = 0; i < this.props.rows.length; i++) {
                var r = this.props.rows[i];
                if (r.pscid === this.props.pscid) {
                    candid = r.candid;
                    visits = r.visits;
                    break;
                }
            }

            var visitContent = [];
            visits.forEach(function (v) {
                if (v.cohort === this.props.currentCohort || this.props.currentCohort === "all") {
                    var url = loris.BaseURL + "/";
                    var vr = prettyStatus(v.visitRegStatus, v.visitRegDueDate);
                    var de = prettyStatus(v.dataEntryStatus, v.dataEntryDueDate);
                    if (vr.status === "complete" && de.status === "complete") {
                        url += "instrument_list/?candID=" + candid + "&sessionID=" + v.sessionID;
                        visitContent.push(React.createElement(
                            "p",
                            { style: { fontSize: "18px" } },
                            React.createElement(
                                "a",
                                { href: url, target: "_blank" },
                                v.visitLabel,
                                ":"
                            ),
                            vr.html
                        ));
                    } else if (de.html) {
                        url += "instrument_list/?candID=" + candid + "&sessionID=" + v.sessionID;
                        visitContent.push(React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "a",
                                { href: url, target: "_blank" },
                                React.createElement(
                                    "h4",
                                    null,
                                    v.visitLabel,
                                    ":"
                                )
                            ),
                            React.createElement(
                                "p",
                                { className: "left-indent" },
                                "Visit Registration: ",
                                vr.html
                            ),
                            React.createElement(
                                "p",
                                { className: "left-indent" },
                                "Data Entry: ",
                                de.html
                            )
                        ));
                    } else {
                        url += candid;
                        visitContent.push(React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "a",
                                { href: url, target: "_blank" },
                                React.createElement(
                                    "h4",
                                    null,
                                    v.visitLabel,
                                    ":"
                                )
                            ),
                            React.createElement(
                                "p",
                                { className: "left-indent" },
                                "Visit Registration: ",
                                vr.html
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
                    this.props.currentCohort
                );
            }
            content.push(visitContent);

            return React.createElement(
                "div",
                { className: "SideBarCandContent" },
                content
            );
        }
    }]);

    return SideBarCandContent;
}(React.Component);

var SideBarVisitContent = function (_React$Component4) {
    _inherits(SideBarVisitContent, _React$Component4);

    function SideBarVisitContent() {
        _classCallCheck(this, SideBarVisitContent);

        return _possibleConstructorReturn(this, (SideBarVisitContent.__proto__ || Object.getPrototypeOf(SideBarVisitContent)).apply(this, arguments));
    }

    _createClass(SideBarVisitContent, [{
        key: "render",
        value: function render() {
            var content = [];
            content = content.concat(React.createElement(
                "h3",
                { className: "center" },
                this.props.visit,
                " Visit"
            ));

            var subheader = void 0; // Displays which cohort and visit is in focus
            if (this.props.currentSite !== "all" && this.props.currentCohort !== "all") {
                subheader = "Visits for " + this.props.currentCohort + " at " + this.props.currentSite;
            } else if (this.props.currentSite !== "all") {
                subheader = "Visits at " + this.props.currentSite;
            } else if (this.props.currentCohort !== "all") {
                subheader = "Visits for " + this.props.currentCohort;
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

            var visitsSortable = [];
            var dataSortable = [];
            // Loop through rows
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.props.rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var row = _step.value;

                    if (row.psc !== this.props.currentSite && this.props.currentSite !== "all") {
                        continue;
                    }
                    var pscid = row.pscid;
                    var candid = row.candid;
                    var instListUrl = loris.BaseURL + "/instrument_list/?candID=" + candid + "&sessionID=";
                    var timepointListURL = loris.BaseURL + "/timepoint_list/?candID=" + candid;
                    // Look for visit with corresponding visit label
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = row.visits[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var v = _step4.value;

                            if (v.visitLabel === this.props.visit) {
                                if (v.cohort === this.props.currentCohort || this.props.currentCohort === "all") {
                                    instListUrl += v.sessionID;
                                    var vr = prettyStatus(v.visitRegStatus, v.visitRegDueDate);
                                    if (vr.status === "deadline-past" || vr.status === "deadline-approaching") {
                                        visitsSortable.push({
                                            "prettyStatus": vr,
                                            "URL": timepointListURL,
                                            "pscid": pscid
                                        });
                                    }
                                    var de = prettyStatus(v.dataEntryStatus, v.dataEntryDueDate);
                                    if (de.status === "deadline-past" || de.status === "deadline-approaching") {
                                        dataSortable.push({
                                            "prettyStatus": de,
                                            "URL": instListUrl,
                                            "pscid": pscid
                                        });
                                    }
                                }
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
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

            visitsSortable = visitsSortable.sort(function (a, b) {
                return a.prettyStatus.daysLeft - b.prettyStatus.daysLeft;
            });
            dataSortable = dataSortable.sort(function (a, b) {
                return a.prettyStatus.daysLeft - b.prettyStatus.daysLeft;
            });

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = visitsSortable[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _vr = _step2.value;

                    visitDeadlines.push(React.createElement(
                        "p",
                        { className: "left-indent" },
                        React.createElement(
                            "a",
                            { href: _vr.URL, target: "_blank" },
                            _vr.pscid,
                            ":"
                        ),
                        _vr.prettyStatus.html
                    ));
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

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = dataSortable[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _de = _step3.value;

                    dataDeadlines.push(React.createElement(
                        "p",
                        { className: "left-indent" },
                        React.createElement(
                            "a",
                            { href: _de.URL, target: "_blank" },
                            _de.pscid,
                            ":"
                        ),
                        _de.prettyStatus.html
                    ));
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            if (visitDeadlines.length <= 1) {
                visitDeadlines = visitDeadlines.concat(React.createElement(
                    "p",
                    { className: "complete left-indent" },
                    "No upcoming visit deadlines"
                ));
            }
            if (dataDeadlines.length <= 1) {
                dataDeadlines = dataDeadlines.concat(React.createElement(
                    "p",
                    { className: "complete left-indent" },
                    "No upcoming data entry deadlines"
                ));
            }

            content = content.concat(visitDeadlines, dataDeadlines);

            return React.createElement(
                "div",
                { className: "SideBarVisitContent" },
                content
            );
        }
    }]);

    return SideBarVisitContent;
}(React.Component);

var SideBar = function (_React$Component5) {
    _inherits(SideBar, _React$Component5);

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

var VisitCell = function (_React$Component6) {
    _inherits(VisitCell, _React$Component6);

    function VisitCell() {
        _classCallCheck(this, VisitCell);

        return _possibleConstructorReturn(this, (VisitCell.__proto__ || Object.getPrototypeOf(VisitCell)).apply(this, arguments));
    }

    _createClass(VisitCell, [{
        key: "render",
        value: function render() {
            var visit = this.props.visit;
            var bgColor = {};

            if (visit.visitLabel === this.props.currentVisit) {
                bgColor = { backgroundColor: HIGHLIGHT_COLOR };
            }
            if (visit.cohort === this.props.currentCohort || this.props.currentCohort === "all") {
                var tooltipContent = [];
                var vr = prettyStatus(visit.visitRegStatus, visit.visitRegDueDate);
                tooltipContent.push(React.createElement(
                    "p",
                    null,
                    "Visit Registration: ",
                    vr.html
                ));
                var innerCircleInfo = null;
                if (visit.dataEntryStatus) {
                    var de = prettyStatus(visit.dataEntryStatus, visit.dataEntryDueDate);
                    tooltipContent.push(React.createElement(
                        "p",
                        null,
                        "Data Entry: ",
                        de.html
                    ), React.createElement(
                        "p",
                        { className: "center" },
                        React.createElement(
                            "i",
                            null,
                            visit.instrCompleted,
                            "/",
                            visit.totalInstrs,
                            " instruments entered"
                        )
                    ));
                    tooltipContent.push(React.createElement(
                        "p",
                        null,
                        "Double Data Entry:"
                    ), React.createElement(
                        "p",
                        { className: "center" },
                        React.createElement(
                            "i",
                            null,
                            visit.ddeInstCompleted,
                            "/",
                            visit.totalInstrs,
                            " instruments entered"
                        )
                    ));
                    var innerCircleStyle = {
                        fontWeight: "bold",
                        color: "white",
                        position: "inherit",
                        fontSize: "110%"
                    };
                    if (visit.sentToDCC) {
                        innerCircleInfo = React.createElement(
                            "div",
                            { className: "center", style: innerCircleStyle },
                            "\u2713"
                        );
                        tooltipContent.push(React.createElement(
                            "p",
                            { className: "complete" },
                            "Data sent to DCC"
                        ));
                    } else if (visit.ddeCompleted) {
                        innerCircleInfo = React.createElement(
                            "div",
                            { className: "center", style: innerCircleStyle },
                            "D"
                        );
                        tooltipContent.push(React.createElement(
                            "p",
                            { className: "deadline-approaching" },
                            "Data not yet sent to DCC"
                        ));
                    }
                }

                var visitClass = "circle " + visit.dataEntryStatus + " " + visit.visitRegStatus;

                return React.createElement(
                    "td",
                    { className: visit.visitLabel, style: bgColor },
                    React.createElement(
                        "div",
                        { "data-tip": true, "data-for": visit.sessionID, className: visitClass },
                        innerCircleInfo,
                        React.createElement(
                            ReactTooltip,
                            { id: visit.sessionID, place: "top", type: "dark", effect: "solid" },
                            React.createElement(
                                "div",
                                { className: "ReactTooltipContent" },
                                tooltipContent
                            )
                        )
                    )
                );
            } else {
                return React.createElement("td", { className: visit.visitLabel, style: bgColor });
            }
        }
    }]);

    return VisitCell;
}(React.Component);

var PSCIDCell = function (_React$Component7) {
    _inherits(PSCIDCell, _React$Component7);

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

var StudyTrackerRow = function (_React$Component8) {
    _inherits(StudyTrackerRow, _React$Component8);

    function StudyTrackerRow(props) {
        _classCallCheck(this, StudyTrackerRow);

        var _this8 = _possibleConstructorReturn(this, (StudyTrackerRow.__proto__ || Object.getPrototypeOf(StudyTrackerRow)).call(this, props));

        _this8.highlightRow = _this8.highlightRow.bind(_this8);
        _this8.unhighlightRow = _this8.unhighlightRow.bind(_this8);
        _this8.keepHighlightedShowCandFocus = _this8.keepHighlightedShowCandFocus.bind(_this8);
        return _this8;
    }

    _createClass(StudyTrackerRow, [{
        key: "highlightRow",
        value: function highlightRow() {
            $("#" + this.props.pscid).css("background-color", HIGHLIGHT_COLOR);
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
            if ($(event.target).text() === this.props.pscid) {
                this.props.showCandInstFocus(event);
            } else {
                this.props.showCandFocus(event);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var style = {};
            var visits = this.props.visits.map(function (v, index) {
                return React.createElement(VisitCell, {
                    key: index,
                    visit: v,
                    currentCohort: this.props.currentCohort,
                    currentVisit: this.props.currentVisit
                });
            }.bind(this));
            if (this.props.pscid === this.props.currentPSCID) {
                style = { backgroundColor: HIGHLIGHT_COLOR };
            }
            return React.createElement(
                "tr",
                {
                    className: "StudyTrackerRow",
                    id: this.props.pscid,
                    onClick: this.keepHighlightedShowCandFocus,
                    onMouseEnter: this.highlightRow,
                    onMouseLeave: this.unhighlightRow,
                    style: style
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

var StudyTrackerHeader = function (_React$Component9) {
    _inherits(StudyTrackerHeader, _React$Component9);

    function StudyTrackerHeader(props) {
        _classCallCheck(this, StudyTrackerHeader);

        var _this9 = _possibleConstructorReturn(this, (StudyTrackerHeader.__proto__ || Object.getPrototypeOf(StudyTrackerHeader)).call(this, props));

        _this9.state = {
            visitInFocus: null
        };
        _this9.showLegend = _this9.showLegend.bind(_this9);
        _this9.highlightColumns = _this9.highlightColumns.bind(_this9);
        _this9.unhighlightColumns = _this9.unhighlightColumns.bind(_this9);
        _this9.keepHighlightedShowVisitFocus = _this9.keepHighlightedShowVisitFocus.bind(_this9);
        return _this9;
    }

    _createClass(StudyTrackerHeader, [{
        key: "showLegend",
        value: function showLegend() {
            var LEGEND = "<div class='circle legend-visit-circle'></div>" + "<span>This outer circle represents the <em>Visit Registration</em> status</span>" + "<div class='circle legend-data-circle'></div>" + "<span>and the fill of the circle represents the <em>Data Entry</em> status.</span><br>" + "<span class='complete'>Blue indicates <em>completion.</em></span><br>" + "<span class='deadline-approaching'>Yellow indicates that the <em>deadline is approaching.</em></span><br>" + "<span class='deadline-past'>Red means the <em>deadline has past.</em></span><br>" + "<span class='no-deadline'>Dark gray means that the deadline has <em>not specified a deadline.</em></span><br>" + "<span class='cancelled'>Light gray means the visit has been <em>cancelled.</em></span>";
            swal({
                title: "Legend",
                text: LEGEND,
                html: true
            });
        }

        // When mouse enters header cell, highlight all cells for that visit
        // This means that the text that shows up in the column header
        // must be equal to the css class name which is perhaps bad design

    }, {
        key: "highlightColumns",
        value: function highlightColumns(event) {
            var visitClass = "." + $(event.target).text();
            $(visitClass).css("background-color", HIGHLIGHT_COLOR);
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
            var colWidth = 91.6666 / this.props.visitLabels.length;
            var colStyle = { width: colWidth + '%' };
            var visitLabelHeaders = this.props.visitLabels.map(function (vl) {
                var cssClass = "VLHeader " + vl;
                return React.createElement(
                    "th",
                    {
                        style: colStyle,
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
                    React.createElement(
                        "th",
                        { className: "col-md-1 legend-link-container" },
                        React.createElement(
                            "a",
                            { id: "legend-link", href: "#", onClick: this.showLegend },
                            "?"
                        )
                    ),
                    visitLabelHeaders
                )
            );
        }
    }]);

    return StudyTrackerHeader;
}(React.Component);

var StudyTracker = function (_React$Component10) {
    _inherits(StudyTracker, _React$Component10);

    function StudyTracker() {
        _classCallCheck(this, StudyTracker);

        var _this10 = _possibleConstructorReturn(this, (StudyTracker.__proto__ || Object.getPrototypeOf(StudyTracker)).call(this));

        _this10.state = {
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
        _this10.showCandInstFocus = _this10.showCandInstFocus.bind(_this10);
        _this10.showCandFocus = _this10.showCandFocus.bind(_this10);
        _this10.showVisitFocus = _this10.showVisitFocus.bind(_this10);
        _this10.showSideBar = _this10.showSideBar.bind(_this10);
        _this10.closeSideBar = _this10.closeSideBar.bind(_this10);
        _this10.filterSites = _this10.filterSites.bind(_this10);
        _this10.filterTeams = _this10.filterTeams.bind(_this10);
        _this10.filterCohorts = _this10.filterCohorts.bind(_this10);
        _this10.rowHasCurrentCohortVisit = _this10.rowHasCurrentCohortVisit.bind(_this10);

        $.get(GET_DATA_URL, { data: "all" }, function (data, status) {
            if (status === "success") {
                var cohorts = [],
                    visitLabels = [],
                    rows = [];
                var sites = new Map();

                for (var r in data.tableData) {
                    rows.push(data.tableData[r]);
                }
                this.setState({ rows: rows });

                for (var c in data.cohorts) {
                    cohorts.push(data.cohorts[c]);
                }
                this.setState({ cohorts: cohorts });
                for (var s in data.sites) {
                    sites.set(data.sites[s].Alias, data.sites[s].Name);
                }
                this.setState({ sites: sites });
                for (var v in data.visitLabels) {
                    visitLabels.push(data.visitLabels[v]);
                }
                this.setState({ visitLabels: visitLabels });
            }
        }.bind(_this10));

        return _this10;
    }

    _createClass(StudyTracker, [{
        key: "showCandInstFocus",
        value: function showCandInstFocus(event) {
            var pscid = void 0;
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

            var candid = void 0;
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.state.rows[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var r = _step5.value;

                    if (r.pscid === pscid) {
                        candid = r.candid;
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            $.get(GET_DATA_URL, { data: "instruments", pscid: pscid }, function (data, status) {
                if (status === "success") {
                    var sideBarContent = React.createElement(SideBarCandInstContent, {
                        pscid: pscid,
                        candid: candid,
                        data: data
                    });

                    this.setState({
                        sideBarContent: sideBarContent
                    });

                    this.showSideBar();
                }
            }.bind(this));
        }

        // Sets the content of the SideBar and then shows SideBar
        // for Candidate Focus

    }, {
        key: "showCandFocus",
        value: function showCandFocus(event) {
            var pscid = void 0;
            if (event) {
                pscid = $(event.target).closest(".StudyTrackerRow").attr("id");
                this.setState({
                    currentPSCID: pscid,
                    currentVisit: null,
                    currentSideBarFocus: "candidate"
                });
            } else {
                pscid = this.state.currentPSCID;
            }

            var candid = void 0;

            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.state.rows[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var r = _step6.value;

                    if (r.pscid === pscid) {
                        candid = r.candid;
                    }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            var sideBarContent = React.createElement(SideBarCandContent, {
                pscid: pscid,
                candid: candid,
                currentCohort: this.state.currentCohort,
                rows: this.state.rows
            });

            this.setState({
                sideBarContent: sideBarContent
            });

            if (event) {
                this.showSideBar();
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

            var sidebarContent = React.createElement(SideBarVisitContent, {
                visit: visit,
                currentSite: this.state.currentSite,
                currentCohort: this.state.currentCohort,
                rows: this.state.rows
            });
            this.setState({ sideBarContent: sidebarContent });

            if (event) {
                this.showSideBar();
            }
        }
    }, {
        key: "showSideBar",
        value: function showSideBar() {
            $(".SideBar").css("width", SIDEBAR_WIDTH);
            $(".table, .row").css("width", "82%"); // not great, need to figure out how to set this w/o magic numbers
        }
    }, {
        key: "closeSideBar",
        value: function closeSideBar() {
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
            $(".VLHeader").css("background-color", '');
        }

        // Function which is called when cohort filter is changed
        // event is onChange when the select changes

    }, {
        key: "filterCohorts",
        value: function filterCohorts(event) {
            var callback = function callback() {};
            if (this.state.currentSideBarFocus === "visit") {
                callback = this.showVisitFocus;
            } else if (this.state.currentSideBarFocus === "candidate") {
                callback = this.showCandFocus;
            } else if (this.state.currentSideBarFocus === "candidate_instruments") {
                callback = this.showCandInstFocus;
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
            } else if (this.state.currentSideBarFocus === "candidate_instruments") {
                callback = this.showCandInstFocus;
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
                        showCandInstFocus: this.showCandInstFocus
                    });
                }
            }.bind(this));
            return React.createElement(
                "div",
                { className: "StudyTracker" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-md-6" },
                        React.createElement(
                            "h3",
                            { className: "dashboard-header" },
                            "Study Progression"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-6" },
                        React.createElement(Filters, {
                            sites: this.state.sites,
                            filterSites: this.filterSites,
                            teams: this.state.teams,
                            filterTeams: this.filterTeams,
                            cohorts: this.state.cohorts,
                            filterCohorts: this.filterCohorts
                        })
                    )
                ),
                React.createElement(
                    "table",
                    { className: "table study-tracker-table" },
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
                    closeSideBar: this.closeSideBar,
                    sideBarContent: this.state.sideBarContent,
                    currentCohort: this.state.currentCohort
                })
            );
        }
    }]);

    return StudyTracker;
}(React.Component);

// Returns an object which contains a clean status and styled html to display


function prettyStatus(status, dueDate) {
    var html = void 0,
        toReturn = void 0;

    toReturn = {
        "status": "",
        "html": "",
        "daysLeft": null
    };

    if (!status) return toReturn;

    if (~status.indexOf("complete")) {
        html = React.createElement(
            "span",
            { className: "complete right-align right-indent" },
            "Complete"
        );
        toReturn = {
            "status": "complete",
            "html": html
        };
    } else if (~status.indexOf("deadline-approaching")) {
        var daysLeft = Math.ceil((new Date(dueDate) - new Date()) * MS_TO_DAYS);
        var strDaysLeft = daysLeft + "";
        strDaysLeft += daysLeft == 1 ? " day" : " days";
        html = React.createElement(
            "span",
            { className: "deadline-approaching right-align right-indent" },
            "Due in ",
            strDaysLeft
        );
        toReturn = {
            "status": "deadline-approaching",
            "html": html,
            "daysLeft": daysLeft
        };
    } else if (~status.indexOf("deadline-past")) {
        var daysPast = Math.ceil((new Date() - new Date(dueDate)) * MS_TO_DAYS);
        var strDaysPast = daysPast + "";
        strDaysPast += daysPast == 1 ? " day" : " days";
        html = React.createElement(
            "span",
            { className: "deadline-past right-align right-indent" },
            strDaysPast,
            " late"
        );
        toReturn = {
            "status": "deadline-past",
            "html": html,
            "daysLeft": -daysPast
        };
    } else if (~status.indexOf("cancelled")) {
        html = React.createElement(
            "span",
            { className: "cancelled right-align right-indent" },
            "Visit cancelled"
        );
        toReturn = {
            "status": "cancelled",
            "html": html
        };
    } else if (~status.indexOf("no-deadline")) {
        html = React.createElement(
            "span",
            { className: "no-deadline right-align right-indent" },
            "No deadline specified"
        );
        toReturn = {
            "status": "no-deadline",
            "html": html
        };
    }

    return toReturn;
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