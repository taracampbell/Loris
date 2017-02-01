"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dummyData = [{
    "pscid": "JGH0000",
    "psc": "JGH",
    "visits": [{
        "status": "deadline-past-data-entry",
        "dueDate": randomDate(),
        "instrumentsCompleted": 1,
        "totalInstruments": 22,
        "visitLabel": "Initial_Assessment_Screening",
        "cohort": "MCI"
    }, {
        "status": "no-deadline-visit",
        "dueDate": randomDate(),
        "instrumentsCompleted": 2,
        "totalInstruments": 22,
        "visitLabel": "Clinical_Assessment",
        "cohort": "SCI"
    }, {
        "status": "complete-data-entry",
        "dueDate": randomDate(),
        "instrumentsCompleted": 3,
        "totalInstruments": 22,
        "visitLabel": "Neuropsych_Assessment",
        "cohort": "AD"
    }]
}, {
    "pscid": "PKD0001",
    "psc": "PKD",
    "visits": [{
        "status": "cancelled-data",
        "dueDate": randomDate(),
        "instrumentsCompleted": 1,
        "totalInstruments": 22,
        "visitLabel": "Initial_Assessment_Screening",
        "cohort": "MCI"
    }, {
        "status": "deadline-past-visit",
        "dueDate": randomDate(),
        "instrumentsCompleted": 2,
        "totalInstruments": 22,
        "visitLabel": "Clinical_Assessment",
        "cohort": "SCI"
    }, {
        "status": "deadline-past-data-entry",
        "dueDate": randomDate(),
        "instrumentsCompleted": 3,
        "totalInstruments": 22,
        "visitLabel": "Neuropsych_Assessment",
        "cohort": "AD"
    }]
}, {
    "pscid": "JGH0010",
    "psc": "JGH",
    "visits": [{
        "status": "no-deadline-visit",
        "dueDate": randomDate(),
        "instrumentsCompleted": 1,
        "totalInstruments": 22,
        "visitLabel": "Initial_Assessment_Screening",
        "cohort": "MCI"
    }, {
        "status": "deadline-past-visit",
        "dueDate": randomDate(),
        "instrumentsCompleted": 2,
        "totalInstruments": 22,
        "visitLabel": "Clinical_Assessment",
        "cohort": "SCI"

    }, {
        "status": "deadline-past-visit",
        "dueDate": randomDate(),
        "instrumentsCompleted": 3,
        "totalInstruments": 22,
        "visitLabel": "Neuropsych_Assessment",
        "cohort": "AD"
    }]
}, {
    "pscid": "PKD0011",
    "psc": "PKD",
    "visits": [{
        "status": "no-deadline-visit",
        "dueDate": randomDate(),
        "instrumentsCompleted": 1,
        "totalInstruments": 22,
        "visitLabel": "Initial_Assessment_Screening",
        "cohort": "MCI"
    }, {
        "status": "deadline-approaching-data-entry",
        "dueDate": randomDate(),
        "instrumentsCompleted": 2,
        "totalInstruments": 22,
        "visitLabel": "Clinical_Assessment",
        "cohort": "SCI"
    }, {
        "status": "deadline-approaching-visit",
        "dueDate": randomDate(),
        "instrumentsCompleted": 3,
        "totalInstruments": 22,
        "visitLabel": "Neuropsych_Assessment",
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
            null,
            React.createElement(
                "option",
                { value: "team" },
                "Team"
            )
        )
    );
}

function CohortFilter(props) {
    return React.createElement(
        "td",
        null,
        React.createElement(
            "select",
            null,
            React.createElement(
                "option",
                { value: "cohort" },
                "Cohort"
            )
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
                        React.createElement(SiteFilter, { sites: this.props.sites, filterSites: this.props.filterSites }),
                        React.createElement(TeamFilter, null),
                        React.createElement(CohortFilter, null)
                    )
                )
            );
        }
    }]);

    return Filters;
}(React.Component);

// Change to class if there is to be more than just
// rendering


function PSCIDCell(props) {
    return React.createElement(
        "td",
        null,
        props.pscid
    );
}

function VisitCell(props) {
    // will need to include additional data
    // for each visit
    var visitClass = "circle " + props.visit.status;
    return React.createElement(
        "td",
        null,
        React.createElement("div", { "data-tip": "React-tooltip", className: visitClass })
        /*<ReactToolTip place="top" type="dark" effect="solid">
            <span>Visit Registration: <br/></span>
            <span>Data Entry: due in x days<br/></span>
            <span><i>x/y instruments entered</i></span>
        </ReactToolTip>*/
    );
}

var StudyTrackerHeader = function (_React$Component2) {
    _inherits(StudyTrackerHeader, _React$Component2);

    function StudyTrackerHeader() {
        _classCallCheck(this, StudyTrackerHeader);

        return _possibleConstructorReturn(this, (StudyTrackerHeader.__proto__ || Object.getPrototypeOf(StudyTrackerHeader)).apply(this, arguments));
    }

    _createClass(StudyTrackerHeader, [{
        key: "render",
        value: function render() {
            var visitLabelHeaders = this.props.visitLabels.map(function (vl) {
                return React.createElement(
                    "th",
                    { key: vl, className: "VLHeader" },
                    vl
                );
            });
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

var StudyTrackerRow = function (_React$Component3) {
    _inherits(StudyTrackerRow, _React$Component3);

    function StudyTrackerRow() {
        _classCallCheck(this, StudyTrackerRow);

        return _possibleConstructorReturn(this, (StudyTrackerRow.__proto__ || Object.getPrototypeOf(StudyTrackerRow)).apply(this, arguments));
    }

    _createClass(StudyTrackerRow, [{
        key: "render",
        value: function render() {
            var visits = this.props.visits.map(function (v, index) {
                return React.createElement(VisitCell, { key: index, visit: v });
            });
            return React.createElement(
                "tr",
                { className: "StudyTrackerRow" },
                React.createElement(PSCIDCell, { pscid: this.props.pscid }),
                visits
            );
        }
    }]);

    return StudyTrackerRow;
}(React.Component);

var StudyTracker = function (_React$Component4) {
    _inherits(StudyTracker, _React$Component4);

    function StudyTracker() {
        _classCallCheck(this, StudyTracker);

        var _this4 = _possibleConstructorReturn(this, (StudyTracker.__proto__ || Object.getPrototypeOf(StudyTracker)).call(this));

        _this4.state = {
            // Rows should be passed to this class
            // as JSON objects
            rows: dummyData,
            visitLabels: visitLabels,
            currentSite: "all",
            sites: sites
        };

        _this4.filterSites = _this4.filterSites.bind(_this4);
        return _this4;
    }

    _createClass(StudyTracker, [{
        key: "filterSites",
        value: function filterSites(event) {
            this.setState({ currentSite: event.target.value });
        }
    }, {
        key: "render",
        value: function render() {
            var dataRows = this.state.rows.map(function (row) {
                if (row.psc === this.state.currentSite || this.state.currentSite === "all") {
                    return React.createElement(StudyTrackerRow, { key: row.pscid, pscid: row.pscid, visits: row.visits });
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
                React.createElement(Filters, { sites: this.state.sites, filterSites: this.filterSites }),
                React.createElement(
                    "table",
                    null,
                    React.createElement(StudyTrackerHeader, { visitLabels: this.state.visitLabels }),
                    React.createElement(
                        "tbody",
                        null,
                        dataRows
                    )
                )
            );
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {}
        // this.getRandomRowData = this.getRowData.bind(this);
        // this.getRandomRowData();

        // Random data generator

    }, {
        key: "getRandomRowData",
        value: function getRandomRowData() {
            var tempData = ["PSCID0000", "PSCID0001", "PSCID0010", "PSCID0011", "PSCID0100", "PSCID0101", "PSCID0110", "PSCID0111", "PSCID1000", "PSCID1001", "PSCID1010", "PSCID1011", "PSCID1100", "PSCID1101", "PSCID1110", "PSCID1111"];
            var rows = [];

            for (var i = 0; i < tempData.length; i++) {
                var pscVisits = [];
                var status = ["complete-data-entry", "deadline-approaching-data-entry", "deadline-past-data-entry", "complete-visit", "deadline-approaching-visit", "deadline-past-visit", "no-deadline-visit", "cancelled-visit", "cancelled-data"];
                for (var j = 0; j < this.state.visitLabels.length; j++) {
                    pscVisits.push(status[Math.floor(Math.random() * status.length)]);
                }
                var row = {
                    pscid: tempData[i],
                    visits: pscVisits
                };
                rows.push(row);
            }
            this.setState({ rows: rows });
        }
    }]);

    return StudyTracker;
}(React.Component);

function randomDate() {
    return new Date();
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