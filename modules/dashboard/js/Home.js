"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: Fix bars between links
var WelcomePanel = function (_React$Component) {
  _inherits(WelcomePanel, _React$Component);

  function WelcomePanel() {
    _classCallCheck(this, WelcomePanel);

    return _possibleConstructorReturn(this, (WelcomePanel.__proto__ || Object.getPrototypeOf(WelcomePanel)).apply(this, arguments));
  }

  _createClass(WelcomePanel, [{
    key: "render",
    value: function render() {
      var linkJSX = "";
      if (this.props.links) {
        var links = this.props.links.map(function (link) {
          return React.createElement(
            "a",
            { href: link.url, target: link.windowName, key: link.url },
            link.label
          );
        });

        linkJSX = React.createElement(
          "div",
          { className: "panel-footer" },
          links
        );
      }

      return React.createElement(
        "div",
        { className: "panel panel-default" },
        React.createElement(
          "div",
          { className: "panel-body" },
          React.createElement(
            "h3",
            { className: "welcome" },
            "Welcome, ",
            this.props.username
          ),
          React.createElement(
            "p",
            { className: "pull-right small login-time" },
            "Last login: ",
            this.props.lastlogin
          ),
          React.createElement(
            "p",
            { className: "project-description" },
            this.props.description
          )
        ),
        linkJSX
      );
    }
  }]);

  return WelcomePanel;
}(React.Component);

var ProgressBar = function (_React$Component2) {
  _inherits(ProgressBar, _React$Component2);

  function ProgressBar() {
    _classCallCheck(this, ProgressBar);

    return _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).apply(this, arguments));
  }

  _createClass(ProgressBar, [{
    key: "render",
    value: function render() {
      var progressBar = React.createElement(
        "p",
        null,
        "Please add a recruitment target for ",
        this.props.data.title,
        "."
      );
      if (this.props.data.recruitment_target) {

        var femaleStyle = {
          width: this.props.data.female_percent + '%'
        };
        var maleStyle = {
          width: this.props.data.male_percent + '%'
        };

        var progressBarRec = React.createElement(
          "div",
          { className: "progress" },
          React.createElement(
            "div",
            { className: "progress-bar progress-bar-female", role: "progressbar", style: femaleStyle, "data-toggle": "tooltip", "data-placement": "bottom", title: this.props.data.female_percent + '%' },
            React.createElement(
              "p",
              null,
              this.props.data.female_total,
              React.createElement("br", null),
              "Females"
            )
          ),
          React.createElement(
            "div",
            { className: "progress-bar progress-bar-male", "data-toggle": "tooltip", "data-placement": "bottom", role: "progressbar", style: maleStyle, title: this.props.data.male_percent + '%' },
            React.createElement(
              "p",
              null,
              this.props.data.male_total,
              React.createElement("br", null),
              "Males"
            )
          ),
          React.createElement(
            "p",
            { className: "pull-right small target" },
            "Target: ",
            this.props.data.recruitment_target
          )
        );

        progressBar = React.createElement(
          "div",
          null,
          React.createElement(
            "h5",
            null,
            this.props.data.title
          ),
          this.props.data.surpassed_recruitment && React.createElement(
            "p",
            null,
            "The recruitment target (",
            this.props.data.recruitment_target,
            ") has been passed."
          ),
          progressBarRec
        );
      }
      return progressBar;
    }
  }]);

  return ProgressBar;
}(React.Component);

var RecruitmentPanel = function (_React$Component3) {
  _inherits(RecruitmentPanel, _React$Component3);

  function RecruitmentPanel() {
    _classCallCheck(this, RecruitmentPanel);

    return _possibleConstructorReturn(this, (RecruitmentPanel.__proto__ || Object.getPrototypeOf(RecruitmentPanel)).apply(this, arguments));
  }

  _createClass(RecruitmentPanel, [{
    key: "render",
    value: function render() {
      if (!this.props.recruitment) {
        return null;
      }
      var recruitmentCharts = React.createElement(
        "p",
        null,
        "There have been no candidates registered yet."
      );
      if (this.props.recruitment.overall.total_recruitment > 0) {
        recruitmentCharts = React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "col-lg-4 col-md-4 col-sm-4" },
            React.createElement(
              "div",
              null,
              React.createElement(
                "h5",
                { className: "chart-title" },
                "Total recruitment per site"
              ),
              React.createElement("div", { id: "recruitmentPieChart" })
            )
          ),
          React.createElement(
            "div",
            { className: "col-lg-8 col-md-8 col-sm-8" },
            React.createElement(
              "div",
              null,
              React.createElement(
                "h5",
                { className: "chart-title" },
                "Gender breakdown by site"
              ),
              React.createElement("div", { id: "recruitmentBarChart" })
            )
          )
        );
      }

      var projectProgress = "";
      // TODO: get rid of overall project
      if (this.props.useProject == true) {
        projectProgress = this.props.recruitment.map(function (project) {
          return React.createElement(ProgressBar, { data: project });
        });
      }

      return React.createElement(
        "div",
        { className: "panel panel-default" },
        React.createElement(
          "div",
          { className: "panel-heading" },
          React.createElement(
            "h3",
            { className: "panel-title" },
            "Recruitment"
          ),
          React.createElement("span", { className: "pull-right clickable glyphicon glyphicon-chevron-up" }),
          React.createElement(
            "div",
            { className: "pull-right" },
            React.createElement(
              "div",
              { className: "btn-group views" },
              React.createElement(
                "button",
                { type: "button", className: "btn btn-default btn-xs dropdown-toggle", "data-toggle": "dropdown" },
                "Views",
                React.createElement("span", { className: "caret" })
              ),
              React.createElement(
                "ul",
                { className: "dropdown-menu pull-right", role: "menu" },
                React.createElement(
                  "li",
                  { className: "active" },
                  React.createElement(
                    "a",
                    { "data-target": "overall-recruitment" },
                    "View overall recruitment"
                  )
                ),
                React.createElement(
                  "li",
                  null,
                  React.createElement(
                    "a",
                    { "data-target": "recruitment-site-breakdown" },
                    "View site breakdown"
                  )
                ),
                this.props.useProject == true && React.createElement(
                  "li",
                  null,
                  React.createElement(
                    "a",
                    { "data-target": "recruitment-project-breakdown" },
                    "View project breakdown"
                  )
                )
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "panel-body" },
          React.createElement(
            "div",
            { className: "recruitment-panel", id: "overall-recruitment" },
            React.createElement(ProgressBar, { data: this.props.recruitment.overall })
          ),
          React.createElement(
            "div",
            { className: "recruitment-panel hidden", id: "recruitment-site-breakdown" },
            recruitmentCharts
          ),
          this.props.useProject == true && React.createElement(
            "div",
            { className: "recruitment-panel hidden", id: "recruitment-project-breakdown" },
            projectProgress
          )
        )
      );
    }
  }]);

  return RecruitmentPanel;
}(React.Component);

var StudyProgressionPanel = function (_React$Component4) {
  _inherits(StudyProgressionPanel, _React$Component4);

  function StudyProgressionPanel() {
    _classCallCheck(this, StudyProgressionPanel);

    return _possibleConstructorReturn(this, (StudyProgressionPanel.__proto__ || Object.getPrototypeOf(StudyProgressionPanel)).apply(this, arguments));
  }

  _createClass(StudyProgressionPanel, [{
    key: "render",
    value: function render() {
      if (!this.props.recruitment) {
        return null;
      }
      var scanChart = React.createElement(
        "p",
        null,
        "There have been no scans yet."
      );
      if (this.props.totalScans > 0) {
        scanChart = React.createElement("div", { id: "scanChart" });
      }

      var recruitmentChart = React.createElement(
        "p",
        null,
        "There have been no candidates registered yet."
      );
      if (this.props.recruitment.overall.total_recruitment > 0) {
        recruitmentChart = React.createElement("div", { id: "recruitmentChart" });
      }

      return React.createElement(
        "div",
        { className: "panel panel-default" },
        React.createElement(
          "div",
          { className: "panel-heading" },
          React.createElement(
            "h3",
            { className: "panel-title" },
            "Study Progression"
          ),
          React.createElement("span", { className: "pull-right clickable glyphicon glyphicon-chevron-up" }),
          React.createElement(
            "div",
            { className: "pull-right" },
            React.createElement(
              "div",
              { className: "btn-group views" },
              React.createElement(
                "button",
                { type: "button", className: "btn btn-default btn-xs dropdown-toggle", "data-toggle": "dropdown" },
                "Views",
                React.createElement("span", { className: "caret" })
              ),
              React.createElement(
                "ul",
                { className: "dropdown-menu pull-right", role: "menu" },
                React.createElement(
                  "li",
                  { className: "active" },
                  React.createElement(
                    "a",
                    { "data-target": "scans-line-chart-panel" },
                    "View scans per site"
                  )
                ),
                React.createElement(
                  "li",
                  null,
                  React.createElement(
                    "a",
                    { "data-target": "recruitment-line-chart-panel" },
                    "View recruitment per site"
                  )
                )
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "panel-body" },
          React.createElement(
            "div",
            { id: "scans-line-chart-panel" },
            React.createElement(
              "h5",
              { className: "chart-title" },
              "Scan sessions per site"
            ),
            scanChart
          ),
          React.createElement(
            "div",
            { id: "recruitment-line-chart-panel", className: "hidden" },
            React.createElement(
              "h5",
              { className: "chart-title" },
              "Recruitment per site"
            ),
            recruitmentChart
          )
        )
      );
    }
  }]);

  return StudyProgressionPanel;
}(React.Component);

var Task = function (_React$Component5) {
  _inherits(Task, _React$Component5);

  function Task() {
    _classCallCheck(this, Task);

    return _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).apply(this, arguments));
  }

  _createClass(Task, [{
    key: "render",
    value: function render() {
      var href = loris.baseURL + this.props.URL;
      return React.createElement(
        "a",
        { href: href, className: "list-group-item" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-xs-8 text-left" },
            React.createElement(
              "div",
              { className: "huge" },
              this.props.count
            ),
            this.props.label
          ),
          React.createElement(
            "div",
            { className: "col-xs-4 text-right alert-chevron" },
            React.createElement("span", { className: "glyphicon glyphicon-chevron-right medium" }),
            React.createElement(
              "p",
              { className: "small task-site" },
              this.props.site
            )
          )
        )
      );
    }
  }]);

  return Task;
}(React.Component);

var TasksPanel = function (_React$Component6) {
  _inherits(TasksPanel, _React$Component6);

  function TasksPanel() {
    _classCallCheck(this, TasksPanel);

    return _possibleConstructorReturn(this, (TasksPanel.__proto__ || Object.getPrototypeOf(TasksPanel)).apply(this, arguments));
  }

  _createClass(TasksPanel, [{
    key: "render",
    value: function render() {
      var tasks = this.props.tasks.map(function (task) {
        return React.createElement(Task, {
          URL: task.URL,
          count: task.count,
          label: task.label,
          site: task.site });
      });

      return React.createElement(
        "div",
        { className: "panel panel-default" },
        React.createElement(
          "div",
          { className: "panel-heading" },
          React.createElement(
            "h3",
            { className: "panel-title" },
            "My Tasks"
          ),
          React.createElement("span", { className: "pull-right clickable glyphicon glyphicon-chevron-up" })
        ),
        React.createElement(
          "div",
          { className: "panel-body" },
          React.createElement(
            "div",
            { className: "list-group tasks" },
            tasks
          )
        )
      );
    }
  }]);

  return TasksPanel;
}(React.Component);

var DocRepoItem = function (_React$Component7) {
  _inherits(DocRepoItem, _React$Component7);

  function DocRepoItem() {
    _classCallCheck(this, DocRepoItem);

    return _possibleConstructorReturn(this, (DocRepoItem.__proto__ || Object.getPrototypeOf(DocRepoItem)).apply(this, arguments));
  }

  _createClass(DocRepoItem, [{
    key: "render",
    value: function render() {
      var href = loris.baseURL + "AjaxHelper.php?Module=document_repository&script=GetFile.php&File=" + this.props.dataDir;
      return React.createElement(
        "a",
        { href: href, download: this.props.fileName, className: "list-group-item" },
        this.props.new === 1 && React.createElement(
          "span",
          { className: "pull-left new-flag" },
          "NEW"
        ),
        React.createElement(
          "span",
          { className: "pull-right text-muted small" },
          "Uploaded: ",
          this.props.dateUploaded
        ),
        React.createElement("br", null),
        this.props.fileName
      );
    }
  }]);

  return DocRepoItem;
}(React.Component);

var DocRepoPanel = function (_React$Component8) {
  _inherits(DocRepoPanel, _React$Component8);

  function DocRepoPanel() {
    _classCallCheck(this, DocRepoPanel);

    return _possibleConstructorReturn(this, (DocRepoPanel.__proto__ || Object.getPrototypeOf(DocRepoPanel)).apply(this, arguments));
  }

  _createClass(DocRepoPanel, [{
    key: "render",
    value: function render() {
      var DocRepoItems = this.props.notifications.map(function (notification) {
        return React.createElement(DocRepoItem, {
          dataDir: notification.dataDir,
          fileName: notification.fileName,
          "new": notification.new,
          dateUploaded: notification.dateUploaded });
      });

      var docRepoURL = loris.baseURL + '/document_repository/';
      return React.createElement(
        "div",
        { className: "panel panel-default" },
        React.createElement(
          "div",
          { className: "panel-heading" },
          React.createElement(
            "h3",
            { className: "panel-title" },
            "Document Repository Notifications"
          ),
          React.createElement("span", { className: "pull-right clickable glyphicon glyphicon-chevron-up" })
        ),
        React.createElement(
          "div",
          { className: "panel-body" },
          React.createElement(
            "div",
            { className: "list-group bvl-feedback-item" },
            DocRepoItems
          ),
          React.createElement(
            "a",
            { href: docRepoURL, className: "btn btn-default btn-block" },
            "Document Repository",
            React.createElement("span", { className: "glyphicon glyphicon-chevron-right" })
          )
        )
      );
    }
  }]);

  return DocRepoPanel;
}(React.Component);

var BVLFeedbackItem = function (_React$Component9) {
  _inherits(BVLFeedbackItem, _React$Component9);

  function BVLFeedbackItem() {
    _classCallCheck(this, BVLFeedbackItem);

    return _possibleConstructorReturn(this, (BVLFeedbackItem.__proto__ || Object.getPrototypeOf(BVLFeedbackItem)).apply(this, arguments));
  }

  _createClass(BVLFeedbackItem, [{
    key: "render",
    value: function render() {
      var href = loris.baseURL + this.props.URL;
      return React.createElement(
        "a",
        { href: href, className: "list-group-item" },
        this.props.new === 1 && React.createElement(
          "span",
          { className: "pull-left new-flag" },
          "NEW"
        ),
        React.createElement(
          "span",
          { className: "pull-right text-muted small" },
          "Updated: ",
          this.props.testDate
        ),
        React.createElement("br", null),
        this.props.name,
        ": ",
        this.props.comment
      );
    }
  }]);

  return BVLFeedbackItem;
}(React.Component);

var BVLFeedbackPanel = function (_React$Component10) {
  _inherits(BVLFeedbackPanel, _React$Component10);

  function BVLFeedbackPanel() {
    _classCallCheck(this, BVLFeedbackPanel);

    return _possibleConstructorReturn(this, (BVLFeedbackPanel.__proto__ || Object.getPrototypeOf(BVLFeedbackPanel)).apply(this, arguments));
  }

  _createClass(BVLFeedbackPanel, [{
    key: "render",
    value: function render() {
      var BVLFeedbackItems = this.props.notifications.map(function (notification) {
        return React.createElement(BVLFeedbackItem, {
          URL: notification.URL,
          "new": notification.new,
          testDate: notification.testDate,
          name: notification.name,
          comment: notification.comment });
      });
      return React.createElement(
        "div",
        { className: "panel panel-default" },
        React.createElement(
          "div",
          { className: "panel-heading" },
          React.createElement(
            "h3",
            { className: "panel-title" },
            "Behavioural Feedback Notifications"
          ),
          React.createElement("span", { className: "pull-right clickable glyphicon glyphicon-chevron-up" })
        ),
        React.createElement(
          "div",
          { className: "panel-body" },
          React.createElement(
            "div",
            { className: "list-group bvl-feedback-item" },
            BVLFeedbackItems
          )
        )
      );
    }
  }]);

  return BVLFeedbackPanel;
}(React.Component);

var Home = function (_React$Component11) {
  _inherits(Home, _React$Component11);

  function Home() {
    _classCallCheck(this, Home);

    var _this11 = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this));

    _this11.state = {
      username: "",
      lastlogin: "",
      description: null,
      links: null,
      recruitment: null,
      useProject: false,
      totalScans: 0,
      tasks: null,
      docRepoNotifications: null,
      bvlFeedbackNotifications: null
    };
    return _this11;
  }

  _createClass(Home, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $.get(loris.BaseURL + '/dashboard/ajax/getDashboardHomeData.php', function (data, status) {
        if (status === "success") {
          console.log(data);
          this.setState({
            username: data.username,
            lastlogin: data.lastlogin,
            description: data.description,
            links: data.links,
            recruitment: data.recruitment,
            useProject: data.useProject,
            totalScans: data.totalScans,
            tasks: data.tasks,
            docRepoNotifications: data.docRepoNotifications,
            bvlFeedbackNotifications: data.bvlFeedbackNotifications
          });
          dashboardHomeLoad();
        }
      }.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-lg-8" },
          React.createElement(WelcomePanel, {
            username: this.state.username,
            lastlogin: this.state.lastlogin,
            description: this.state.description,
            links: this.state.links }),
          React.createElement(RecruitmentPanel, {
            recruitment: this.state.recruitment,
            useProject: this.state.useProject }),
          React.createElement(StudyProgressionPanel, {
            totalScans: this.state.totalScans,
            recruitment: this.state.recruitment }),
          React.createElement(
            "small",
            null,
            React.createElement(
              "i",
              null,
              "Note that the Recruitment and Study Progression charts include data from ineligible, excluded, and consent withdrawn candidates."
            )
          )
        ),
        React.createElement(
          "div",
          { className: "col-lg-4" },
          this.state.tasks && React.createElement(
            "div",
            { className: "col-lg-12 col-md-6 col-sm-6 col-xs-12" },
            React.createElement(TasksPanel, { tasks: this.state.tasks })
          ),
          this.state.docRepoNotifications && React.createElement(
            "div",
            { className: "col-lg-12 col-md-6 col-sm-6 col-xs-12" },
            React.createElement(DocRepoPanel, { notifications: this.state.docRepoNotifications })
          ),
          this.state.bvlFeedbackNotifications && React.createElement(
            "div",
            { className: "col-lg-12 col-md-6 col-sm-6 col-xs-12" },
            React.createElement(BVLFeedbackPanel, { notifications: this.state.bvlFeedbackNotifications })
          )
        )
      );
    }
  }]);

  return Home;
}(React.Component);