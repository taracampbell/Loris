"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dashboard = function (_React$Component) {
  _inherits(Dashboard, _React$Component);

  function Dashboard(props) {
    _classCallCheck(this, Dashboard);

    var _this = _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call(this, props));

    var buttons = [{ name: "Home", glyph: "home", component: "home", active: true }, { name: "Study Tracker", glyph: "object-align-left", component: "studyTracker", active: false }];

    _this.state = {
      home: true,
      studyTracker: false,
      buttons: buttons
    };

    _this.changeScreen = _this.changeScreen.bind(_this);
    return _this;
  }

  _createClass(Dashboard, [{
    key: "changeScreen",
    value: function changeScreen(component) {
      var homeUpdate = this.state.home;
      var studyTrackerUpdate = this.state.studyTracker;

      if (component == 'home') {
        homeUpdate = true;
        studyTrackerUpdate = false;
      } else {
        homeUpdate = false;
        studyTrackerUpdate = true;
      }

      this.setState({
        home: homeUpdate,
        studyTracker: studyTrackerUpdate
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "dashboard" },
        React.createElement(SideNav, { buttons: this.state.buttons, changeScreen: this.changeScreen }),
        React.createElement(
          "div",
          { id: "content" },
          React.createElement(Home, { active: this.state.home }),
          React.createElement(StudyTracker, { active: this.state.studyTracker })
        )
      );
    }
  }]);

  return Dashboard;
}(React.Component);

window.onload = function () {
  ReactDOM.render(React.createElement(Dashboard, null), document.getElementById("page"));
};