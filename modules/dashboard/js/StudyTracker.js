"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MS_TO_DAYS = 1 / (1000 * 60 * 60 * 24);
var SIDEBAR_WIDTH = "24%";
var COMPRESS_TBL_WIDTH = "75%";
var HIGHLIGHT_COLOR = "#E9EBF3";
var GET_DATA_URL = loris.BaseURL + "/dashboard/ajax/getData.php";

function SiteFilter(props) {
    var options = [];

    if (props.sites.size > 1) {
        options.push(React.createElement(
            "option",
            { value: "all" },
            "Show All Sites"
        ));
    }
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

var CandidateFilter = function (_React$Component) {
    _inherits(CandidateFilter, _React$Component);

    function CandidateFilter(props) {
        _classCallCheck(this, CandidateFilter);

        var _this = _possibleConstructorReturn(this, (CandidateFilter.__proto__ || Object.getPrototypeOf(CandidateFilter)).call(this, props));

        _this.handleTextInputChange = _this.handleTextInputChange.bind(_this);
        return _this;
    }

    _createClass(CandidateFilter, [{
        key: "handleTextInputChange",
        value: function handleTextInputChange(e) {
            this.props.filterCand(e.target.value);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("input", { className: "form-control input-sm",
                type: "text",
                name: "filterCand",
                value: this.props.filterCandText,
                onChange: this.handleTextInputChange,
                placeholder: "Search by PSCID"
            });
        }
    }]);

    return CandidateFilter;
}(React.Component);

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

var Filters = function (_React$Component2) {
    _inherits(Filters, _React$Component2);

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
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-md-3" },
                    React.createElement(CandidateFilter, {
                        filterCand: this.props.filterCand
                    })
                ),
                React.createElement(
                    "div",
                    { className: "col-md-3" },
                    React.createElement(SiteFilter, {
                        sites: this.props.sites,
                        filterSites: this.props.filterSites
                    })
                ),
                React.createElement(
                    "div",
                    { className: "col-md-3" },
                    React.createElement(TeamFilter, {
                        teams: this.props.teams,
                        filterTeams: this.props.filterTeams
                    })
                ),
                React.createElement(
                    "div",
                    { className: "col-md-3" },
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

var SideBarCandInstContent = function (_React$Component3) {
    _inherits(SideBarCandInstContent, _React$Component3);

    function SideBarCandInstContent() {
        _classCallCheck(this, SideBarCandInstContent);

        return _possibleConstructorReturn(this, (SideBarCandInstContent.__proto__ || Object.getPrototypeOf(SideBarCandInstContent)).apply(this, arguments));
    }

    _createClass(SideBarCandInstContent, [{
        key: "render",
        value: function render() {
            var content = [];

            var bold = { fontWeight: "bold" };

            var instListURL = loris.BaseURL + "/instrument_list/?candID=" + this.props.candid + "&sessionID=" + this.props.sessionID;
            content.push(React.createElement(
                "div",
                { className: "SideBarHeader" },
                React.createElement(
                    "h5",
                    null,
                    React.createElement(
                        "a",
                        { href: instListURL },
                        "Participant ",
                        this.props.pscid
                    )
                )
            ));
            var data = this.props.data;
            var sessionID = this.props.sessionID;
            var candid = this.props.candid;
            var style = {
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                display: "block"
            };
            for (var sg in data) {
                content.push(React.createElement(
                    "h6",
                    null,
                    sg
                ));

                var _loop = function _loop(t) {
                    var inst = data[sg][t];
                    var url = loris.BaseURL + "/" + inst.testName + "/?commentID=" + inst.commentID + "&sessionID=" + sessionID + "&candID=" + candid;
                    var flagCompletion = void 0;
                    if (inst.ddeCompletion === "Complete") {
                        flagCompletion = React.createElement(
                            "span",
                            null,
                            React.createElement("span", { className: "glyphicon glyphicon-ok complete" }),
                            React.createElement("span", { className: "glyphicon glyphicon-ok complete" })
                        );
                    } else if (inst.completion === "Complete") {
                        flagCompletion = React.createElement("span", { className: "glyphicon glyphicon-ok complete" });
                    } else {
                        flagCompletion = React.createElement("span", { className: "glyphicon glyphicon-alert deadline-past" });
                    }
                    var conflicts = [];
                    if (inst.conflicts) {
                        conflicts.push(React.createElement(
                            "a",
                            { className: "left-indent2",
                                href: "#",
                                onClick: function onClick() {
                                    return openConflictResolver(candid, inst.testName);
                                }
                            },
                            React.createElement("span", { className: "glyphicon glyphicon-remove-circle" }),
                            "Conflicts"
                        ));
                    }
                    content.push(React.createElement(
                        "div",
                        { className: "SideBarInst" },
                        React.createElement(
                            "a",
                            { href: url, style: style },
                            flagCompletion,
                            inst.fullName
                        ),
                        conflicts
                    ));
                };

                for (var t in data[sg]) {
                    _loop(t);
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

var SideBarCandContent = function (_React$Component4) {
    _inherits(SideBarCandContent, _React$Component4);

    function SideBarCandContent() {
        _classCallCheck(this, SideBarCandContent);

        return _possibleConstructorReturn(this, (SideBarCandContent.__proto__ || Object.getPrototypeOf(SideBarCandContent)).apply(this, arguments));
    }

    _createClass(SideBarCandContent, [{
        key: "render",
        value: function render() {
            var content = [];
            // use local variables for less typing
            var visits = this.props.row.visits;
            var pscid = this.props.row.pscid;
            var candid = this.props.row.candid;
            var feedback = this.props.row.feedback;
            var statusDesc = this.props.row.statusDesc;
            var dateReg = formatDate(new Date(this.props.row.dateReg));
            var iconColor = { color: "#ddd" };
            // determine if participant has profile level feedback and add appropriate
            // links and display as such
            var profileURL = loris.BaseURL + "/" + candid;
            var feedbackIcon = [];
            if (feedback.profile) {
                feedbackIcon.push(React.createElement("span", {
                    className: "glyphicon glyphicon-edit",
                    style: iconColor
                }));
                content.push(React.createElement(
                    "div",
                    { className: "SideBarHeader" },
                    React.createElement(
                        "h5",
                        null,
                        feedbackIcon,
                        React.createElement(
                            "a",
                            { href: "#", onClick: function onClick() {
                                    return openBVLFeedback(candid);
                                } },
                            "Participant ",
                            pscid
                        )
                    )
                ));
            } else {
                content.push(React.createElement(
                    "div",
                    { className: "SideBarHeader" },
                    React.createElement(
                        "h5",
                        null,
                        React.createElement(
                            "a",
                            { href: profileURL },
                            "Participant ",
                            pscid
                        )
                    )
                ));
            }

            content.push(React.createElement(
                "p",
                { className: "small" },
                React.createElement(
                    "em",
                    null,
                    "Status: ",
                    statusDesc,
                    ", registered on ",
                    dateReg
                )
            ));

            var visitContent = [];
            visits.forEach(function (v) {
                // make sure visit is part of current cohort
                if (v.cohort === this.props.currentCohort || this.props.currentCohort === "all") {
                    var url = loris.BaseURL + "/";
                    var vr = prettyStatus(v.visitRegStatus, v.visitRegDueDate);
                    var de = prettyStatus(v.dataEntryStatus, v.dataEntryDueDate);
                    var visitLink = [];
                    var instrumentFeedback = [];

                    // determine if participant has visit level feedback and display as such
                    if (feedback.visits && feedback.visits.hasOwnProperty(v.sessionID)) {
                        visitLink.push(React.createElement(
                            "a",
                            { href: "#",
                                onClick: function onClick() {
                                    return openBVLFeedback(candid, v.sessionID);
                                }
                            },
                            React.createElement("span", { className: "glyphicon glyphicon-edit", style: iconColor }),
                            v.visitLabel
                        ));
                    } else {
                        url += "instrument_list/?candID=" + candid + "&sessionID=" + v.sessionID;
                        visitLink.push(React.createElement(
                            "a",
                            { href: url },
                            v.visitLabel
                        ));
                    }
                    // Check if there is instrument feedback and whether this
                    // particular visit
                    if (feedback.instruments && feedback.instruments.hasOwnProperty(v.sessionID)) {
                        var _iconColor = { color: "#444444" };
                        var instLinkStyle = {
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            display: "block",
                            margin: "5px"
                        };

                        var _loop2 = function _loop2(f) {
                            if (!feedback.instruments[f].commentID) {
                                return "continue";
                            }
                            var fb = feedback.instruments[f];
                            instrumentFeedback.push(React.createElement(
                                "a",
                                { href: "#",
                                    className: "sidebar-visit-status",
                                    onClick: function onClick() {
                                        return openBVLFeedback(candid, v.sessionID, fb.commentID, fb.testName);
                                    },
                                    style: instLinkStyle
                                },
                                React.createElement("span", { className: "glyphicon glyphicon-edit", style: _iconColor }),
                                " " + fb.fullName
                            ));
                        };

                        for (var f in feedback.instruments) {
                            var _ret2 = _loop2(f);

                            if (_ret2 === "continue") continue;
                        }
                    }
                    if (vr.status === "complete" && de.status === "complete") {

                        visitContent.push(React.createElement(
                            "div",
                            { className: "sidebar-visit" },
                            visitLink,
                            vr.html,
                            instrumentFeedback
                        ));
                    } else if (de.html) {
                        url += "instrument_list/?candID=" + candid + "&sessionID=" + v.sessionID;
                        visitContent.push(React.createElement(
                            "div",
                            { className: "sidebar-visit" },
                            visitLink,
                            React.createElement(
                                "p",
                                { className: "sidebar-visit-status" },
                                "Visit Registration ",
                                vr.html
                            ),
                            React.createElement(
                                "p",
                                { className: "sidebar-visit-status" },
                                "Data Entry ",
                                de.html
                            )
                        ));
                    } else {
                        url += candid;
                        visitContent.push(React.createElement(
                            "div",
                            { className: "sidebar-visit" },
                            React.createElement(
                                "a",
                                { href: url },
                                v.visitLabel,
                                ":"
                            ),
                            React.createElement(
                                "p",
                                { className: "sidebar-visit-status" },
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
                    null,
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

var SideBarVisitContent = function (_React$Component5) {
    _inherits(SideBarVisitContent, _React$Component5);

    function SideBarVisitContent() {
        _classCallCheck(this, SideBarVisitContent);

        return _possibleConstructorReturn(this, (SideBarVisitContent.__proto__ || Object.getPrototypeOf(SideBarVisitContent)).apply(this, arguments));
    }

    _createClass(SideBarVisitContent, [{
        key: "render",
        value: function render() {
            var visitDeadlines = [];
            var dataDeadlines = [];

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
                        null,
                        React.createElement(
                            "a",
                            { href: _vr.URL },
                            _vr.pscid
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
                        null,
                        React.createElement(
                            "a",
                            { href: _de.URL },
                            _de.pscid
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
                    { className: "complete" },
                    "No upcoming visit deadlines"
                ));
            }
            if (dataDeadlines.length <= 1) {
                dataDeadlines = dataDeadlines.concat(React.createElement(
                    "p",
                    { className: "complete" },
                    "No upcoming data entry deadlines"
                ));
            }

            return React.createElement(
                "div",
                { className: "SideBarVisitContent" },
                React.createElement(
                    "div",
                    { className: "SideBarHeader" },
                    React.createElement(
                        "h5",
                        null,
                        this.props.visit,
                        " Visit"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "SideBarSubContent" },
                    React.createElement(
                        "h5",
                        { className: "SideBarSubheader" },
                        "Upcoming Visit Deadlines"
                    ),
                    visitDeadlines
                ),
                React.createElement(
                    "div",
                    { className: "SideBarSubContent" },
                    React.createElement(
                        "h5",
                        { className: "SideBarSubheader" },
                        "Upcoming Data Entry Deadlines"
                    ),
                    dataDeadlines
                )
            );
        }
    }]);

    return SideBarVisitContent;
}(React.Component);

var SideBar = function (_React$Component6) {
    _inherits(SideBar, _React$Component6);

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
                    "div",
                    { className: "SideBarContent" },
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
                )
            );
        }
    }]);

    return SideBar;
}(React.Component);

var VisitCell = function (_React$Component7) {
    _inherits(VisitCell, _React$Component7);

    function VisitCell() {
        _classCallCheck(this, VisitCell);

        return _possibleConstructorReturn(this, (VisitCell.__proto__ || Object.getPrototypeOf(VisitCell)).apply(this, arguments));
    }

    _createClass(VisitCell, [{
        key: "render",
        value: function render() {
            var _this8 = this;

            var visit = this.props.visit;
            var bgColor = {};

            if (visit.visitLabel === this.props.currentVisit) {
                bgColor = { backgroundColor: HIGHLIGHT_COLOR };
            }
            if (visit.cohort === this.props.currentCohort || this.props.currentCohort === "all") {
                var _ret3 = function () {
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
                                visit.totalDDEInstrs,
                                " instruments entered"
                            )
                        ));

                        if (visit.numConflicts > 0) {
                            tooltipContent.push(React.createElement(
                                "p",
                                { className: "center" },
                                React.createElement("span", { className: "glyphicon glyphicon-remove-circle" }),
                                "\xA0",
                                visit.numConflicts,
                                " unresolved conflicts."
                            ));
                        }
                        if (visit.sentToDCC) {
                            innerCircleInfo = React.createElement("span", { className: "glyphicon glyphicon-ok inner-circle-glyph" });
                            tooltipContent.push(React.createElement(
                                "p",
                                { className: "complete" },
                                "Data sent to DCC"
                            ));
                        } else if (visit.ddeCompleted) {
                            innerCircleInfo = React.createElement(
                                "span",
                                { className: "inner-circle-text" },
                                "D"
                            );
                            tooltipContent.push(React.createElement(
                                "p",
                                { className: "deadline-approaching" },
                                "Data not yet sent to DCC"
                            ));
                        } else if (visit.visitRegStatus === "cancelled-visit") {
                            innerCircleInfo = React.createElement("span", { className: "glyphicon glyphicon-remove inner-circle-glyph" });
                        }
                    }

                    var visitClass = "circle " + visit.dataEntryStatus + " " + visit.visitRegStatus;

                    var sidebarArgs = {
                        sessionID: visit.sessionID,
                        pscid: _this8.props.pscid,
                        candid: _this8.props.candid
                    };

                    return {
                        v: React.createElement(
                            "td",
                            { className: visit.visitLabel, style: bgColor },
                            React.createElement(
                                "div",
                                { onClick: function onClick() {
                                        return _this8.props.showCandInstFocus(sidebarArgs);
                                    },
                                    "data-tip": true, "data-for": visit.sessionID,
                                    className: visitClass
                                },
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
                        )
                    };
                }();

                if ((typeof _ret3 === "undefined" ? "undefined" : _typeof(_ret3)) === "object") return _ret3.v;
            } else {
                return React.createElement(
                    "td",
                    { className: "center " + visit.visitLabel, style: bgColor },
                    "N/A"
                );
            }
        }
    }]);

    return VisitCell;
}(React.Component);

var PSCIDCell = function (_React$Component8) {
    _inherits(PSCIDCell, _React$Component8);

    function PSCIDCell() {
        _classCallCheck(this, PSCIDCell);

        return _possibleConstructorReturn(this, (PSCIDCell.__proto__ || Object.getPrototypeOf(PSCIDCell)).apply(this, arguments));
    }

    _createClass(PSCIDCell, [{
        key: "render",
        value: function render() {
            var feedBackIcon = [];

            if (Object.keys(this.props.feedback).length) {
                var style = { color: "#444444" };
                feedBackIcon.push(React.createElement("span", { className: "glyphicon glyphicon-edit", style: style }));
            }
            return React.createElement(
                "td",
                {
                    className: "PSCIDCell",
                    onClick: this.props.clickHandler },
                this.props.pscid,
                "\xA0",
                feedBackIcon
            );
        }
    }]);

    return PSCIDCell;
}(React.Component);

var StudyTrackerRow = function (_React$Component9) {
    _inherits(StudyTrackerRow, _React$Component9);

    function StudyTrackerRow(props) {
        _classCallCheck(this, StudyTrackerRow);

        var _this10 = _possibleConstructorReturn(this, (StudyTrackerRow.__proto__ || Object.getPrototypeOf(StudyTrackerRow)).call(this, props));

        _this10.highlightRow = _this10.highlightRow.bind(_this10);
        _this10.unhighlightRow = _this10.unhighlightRow.bind(_this10);
        _this10.keepHighlightedShowCandFocus = _this10.keepHighlightedShowCandFocus.bind(_this10);
        return _this10;
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
            // if click occurs on a circle with data-entry in the class
            // then it is both a Visit Circle and has instrument related data
            // to be displayed.
            // otherwise, show
            if (!~event.target.className.indexOf('data-entry')) {
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
                    pscid: this.props.pscid,
                    candid: this.props.candid,
                    currentCohort: this.props.currentCohort,
                    currentVisit: this.props.currentVisit,
                    showCandInstFocus: this.props.showCandInstFocus
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
                    feedback: this.props.feedback,
                    clickHandler: this.keepHighlightedShowCandFocus
                }),
                visits
            );
        }
    }]);

    return StudyTrackerRow;
}(React.Component);

var StudyTrackerHeader = function (_React$Component10) {
    _inherits(StudyTrackerHeader, _React$Component10);

    function StudyTrackerHeader(props) {
        _classCallCheck(this, StudyTrackerHeader);

        var _this11 = _possibleConstructorReturn(this, (StudyTrackerHeader.__proto__ || Object.getPrototypeOf(StudyTrackerHeader)).call(this, props));

        _this11.state = {
            visitInFocus: null
        };
        _this11.highlightColumns = _this11.highlightColumns.bind(_this11);
        _this11.unhighlightColumns = _this11.unhighlightColumns.bind(_this11);
        _this11.switchOrder = _this11.switchOrder.bind(_this11);
        _this11.keepHighlightedShowVisitFocus = _this11.keepHighlightedShowVisitFocus.bind(_this11);
        return _this11;
    }

    // When mouse enters header cell, highlight all cells for that visit
    // This means that the text that shows up in the column header
    // must be equal to the css class name which is perhaps bad design


    _createClass(StudyTrackerHeader, [{
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
        key: "switchOrder",
        value: function switchOrder() {
            if (document.getElementById("order-toggle").classList.contains("glyphicon-chevron-down")) {
                document.getElementById("order-toggle").classList.remove("glyphicon-chevron-down");
                document.getElementById("order-toggle").classList.add("glyphicon-chevron-up");
            } else {
                document.getElementById("order-toggle").classList.remove("glyphicon-chevron-up");
                document.getElementById("order-toggle").classList.add("glyphicon-chevron-down");
            }
            this.props.switchOrder();
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
                    React.createElement("th", { id: "order-toggle",
                        className: "col-md-1 center glyphicon glyphicon-chevron-down",
                        style: { color: "#444444" },
                        onClick: this.switchOrder
                    }),
                    visitLabelHeaders
                )
            );
        }
    }]);

    return StudyTrackerHeader;
}(React.Component);

var StudyTracker = function (_React$Component11) {
    _inherits(StudyTracker, _React$Component11);

    function StudyTracker(props) {
        _classCallCheck(this, StudyTracker);

        var _this12 = _possibleConstructorReturn(this, (StudyTracker.__proto__ || Object.getPrototypeOf(StudyTracker)).call(this, props));

        _this12.state = {
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
            active: _this12.props.active
        };
        _this12.showCandInstFocus = _this12.showCandInstFocus.bind(_this12);
        _this12.showCandFocus = _this12.showCandFocus.bind(_this12);
        _this12.showVisitFocus = _this12.showVisitFocus.bind(_this12);
        _this12.showSideBar = _this12.showSideBar.bind(_this12);
        _this12.closeSideBar = _this12.closeSideBar.bind(_this12);
        _this12.filterCand = _this12.filterCand.bind(_this12);
        _this12.filterSites = _this12.filterSites.bind(_this12);
        _this12.filterTeams = _this12.filterTeams.bind(_this12);
        _this12.filterCohorts = _this12.filterCohorts.bind(_this12);
        _this12.switchOrder = _this12.switchOrder.bind(_this12);
        _this12.renderRow = _this12.renderRow.bind(_this12);
        _this12.rowHasCurrentCohortVisit = _this12.rowHasCurrentCohortVisit.bind(_this12);
        return _this12;
    }

    _createClass(StudyTracker, [{
        key: "loadDataFromServer",
        value: function loadDataFromServer() {
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
            }.bind(this));
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.loadDataFromServer();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.active != this.state.active) {
                this.setState({
                    active: nextProps.active
                });
            }
        }
    }, {
        key: "showCandInstFocus",
        value: function showCandInstFocus(sidebarArgs) {
            this.setState({
                currentPSCID: sidebarArgs.pscid,
                currentVisit: null,
                currentSideBarFocus: "candidate_instruments"
            });

            if (sidebarArgs.sessionID > 0) {
                $.get(GET_DATA_URL, { data: "instruments", "sessionID": sidebarArgs.sessionID }, function (data, status) {
                    if (status === "success") {
                        var sideBarContent = React.createElement(SideBarCandInstContent, {
                            sessionID: sidebarArgs.sessionID,
                            pscid: sidebarArgs.pscid,
                            candid: sidebarArgs.candid,
                            data: data
                        });
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

            var row = void 0;

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.state.rows[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var r = _step5.value;

                    if (r.pscid === pscid) {
                        row = r;
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

            var sideBarContent = React.createElement(SideBarCandContent, {
                currentCohort: this.state.currentCohort,
                row: row
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
            $(".study-tracker-table, .study-tracker-header").css("width", COMPRESS_TBL_WIDTH);
        }
    }, {
        key: "closeSideBar",
        value: function closeSideBar() {
            $(".SideBar").css("width", "0px");
            $(".study-tracker-table, .study-tracker-header").css("width", "100%");

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
    }, {
        key: "filterCand",
        value: function filterCand(filterCandText) {
            this.setState({
                filterCandText: filterCandText
            });
        }
    }, {
        key: "switchOrder",
        value: function switchOrder() {
            var rows = this.state.rows.reverse();
            this.setState({ rows: rows });
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
        key: "renderRow",
        value: function renderRow(row) {
            if (this.rowHasCurrentCohortVisit(row) && (row.psc === this.state.currentSite || this.state.currentSite === "all") && row.pscid.startsWith(this.state.filterCandText)) {
                return true;
            }
            return false;
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.active == false) {
                return null;
            }
            // Filter out the entire row for candidates at sites other than
            // the currently selected one or if the candidate has no visits for
            // the currently selected cohort
            var dataRows = [];
            this.state.rows.forEach(function (row) {
                if (this.renderRow(row)) {
                    dataRows.push(React.createElement(StudyTrackerRow, {
                        key: row.pscid,
                        pscid: row.pscid,
                        candid: row.candid,
                        visits: row.visits,
                        dateReg: row.dateReg,
                        feedback: row.feedback,
                        currentCohort: this.state.currentCohort,
                        currentVisit: this.state.currentVisit,
                        currentPSCID: this.state.currentPSCID,
                        showCandFocus: this.showCandFocus,
                        showCandInstFocus: this.showCandInstFocus
                    }));
                }
            }.bind(this));

            if (dataRows.length === 0) {
                var noMatch = React.createElement(
                    "p",
                    null,
                    "No participants match the current search parameters."
                );
            }
            return React.createElement(
                "div",
                { className: "StudyTracker" },
                React.createElement(
                    "div",
                    { className: "row study-tracker-header" },
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
                            filterCand: this.filterCand,
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
                    "div",
                    null,
                    React.createElement(
                        "table",
                        { className: "table study-tracker-table" },
                        React.createElement(StudyTrackerHeader, {
                            visitLabels: this.state.visitLabels,
                            currentVisit: this.state.currentVisit,
                            showVisitFocus: this.showVisitFocus,
                            switchOrder: this.switchOrder
                        }),
                        React.createElement(
                            "tbody",
                            null,
                            dataRows
                        )
                    ),
                    noMatch,
                    React.createElement(SideBar, {
                        closeSideBar: this.closeSideBar,
                        sideBarContent: this.state.sideBarContent,
                        currentCohort: this.state.currentCohort
                    })
                )
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
            { className: "complete right-align" },
            "complete"
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
            { className: "deadline-approaching right-align" },
            "due in ",
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
            { className: "deadline-past right-align" },
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
            { className: "cancelled right-align" },
            "visit cancelled"
        );
        toReturn = {
            "status": "cancelled",
            "html": html
        };
    } else if (~status.indexOf("no-deadline")) {
        html = React.createElement(
            "span",
            { className: "no-deadline right-align" },
            "no deadline specified"
        );
        toReturn = {
            "status": "no-deadline",
            "html": html
        };
    }

    return toReturn;
}

function formatDate(date) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

function openBVLFeedback(candID, sessionID, commentID, testName) {
    var url = loris.BaseURL + "/";
    if (candID && sessionID && commentID && testName) {
        url += testName + "/?commentID=" + commentID + "&sessionID=" + sessionID + "&candID=" + candID;
    } else if (candID && sessionID) {
        url += "instrument_list/?candID=" + candID + "&sessionID=" + sessionID;
    } else if (candID) {
        url += candID;
    } else {
        return;
    }
    var win = window.open(url, "_blank");
    win.onload = function () {
        win.document.querySelector("a.navbar-toggle").dispatchEvent(new MouseEvent("click"));
    };
}

function openConflictResolver(candID, testName) {
    var url = loris.BaseURL + "/conflict_resolver";
    var win = window.open(url, "_blank");
    win.onload = function () {
        win.document.querySelector("input[name=CandID]").value = candID;
        win.document.querySelector("select[name=Instrument]").value = testName;
        win.document.querySelector("#testShowData1").dispatchEvent(new MouseEvent("click"));
    };
}