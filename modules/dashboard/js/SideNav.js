"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideNavItem = function (_React$Component) {
  _inherits(SideNavItem, _React$Component);

  function SideNavItem(props) {
    _classCallCheck(this, SideNavItem);

    var _this = _possibleConstructorReturn(this, (SideNavItem.__proto__ || Object.getPrototypeOf(SideNavItem)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(SideNavItem, [{
    key: "handleClick",
    value: function handleClick() {
      this.props.handleClick(this.props.name);
    }
  }, {
    key: "render",
    value: function render() {
      var glyphName = "glyphicon glyphicon-" + this.props.glyph;
      var buttonClass = "sidenav-item";
      if (this.props.active) {
        buttonClass = "sidenav-item active";
      }
      return React.createElement(
        "div",
        { className: buttonClass, alt: this.props.name, onClick: this.handleClick },
        React.createElement("span", { className: glyphName })
      );
    }
  }]);

  return SideNavItem;
}(React.Component);

var SideNav = function (_React$Component2) {
  _inherits(SideNav, _React$Component2);

  function SideNav(props) {
    _classCallCheck(this, SideNav);

    var _this2 = _possibleConstructorReturn(this, (SideNav.__proto__ || Object.getPrototypeOf(SideNav)).call(this, props));

    _this2.state = {
      buttons: props.buttons
    };
    _this2.handleClick = _this2.handleClick.bind(_this2);
    return _this2;
  }

  _createClass(SideNav, [{
    key: "handleClick",
    value: function handleClick(name) {
      var components = {
        "Study Tracker": 'studyTracker',
        "Home": 'home'
      };

      // Update Active Class
      this.updateActive(name);

      // Change the visible screen
      this.props.changeScreen(components[name]);
    }
  }, {
    key: "updateActive",
    value: function updateActive(name) {
      var buttonUpdate = this.state.buttons;

      for (var i = 0; i < buttonUpdate.length; i++) {
        if (buttonUpdate[i].name == name) {
          buttonUpdate[i].active = true;
        } else {
          buttonUpdate[i].active = false;
        }
      }

      this.setState({
        buttons: buttonUpdate
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var sideNavButtons = this.state.buttons.map(function (button) {
        return React.createElement(SideNavItem, {
          key: button.name,
          name: button.name,
          glyph: button.glyph,
          component: button.component,
          handleClick: _this3.handleClick,
          active: button.active
        });
      });
      return React.createElement(
        "div",
        { className: "sidenav" },
        sideNavButtons
      );
    }
  }]);

  return SideNav;
}(React.Component);