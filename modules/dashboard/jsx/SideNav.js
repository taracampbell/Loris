class SideNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.name);
  }

  render() {
    var glyphName = "glyphicon glyphicon-" + this.props.glyph;
    var buttonClass = "sidenav-item";
    if (this.props.active) {
      buttonClass= "sidenav-item active";
    }
    return (
      <div className={buttonClass} alt={this.props.name} onClick={this.handleClick}>
        <span className={glyphName}></span>
      </div>
    );
  }
}

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: props.buttons
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(name) {
    const components = {
      "Study Tracker": 'studyTracker',
      "Home": 'home'
    };

    // Update Active Class
    this.updateActive(name);

    // Change the visible screen
    this.props.changeScreen(components[name]);
  }

  updateActive(name) {
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

  render() {
    const sideNavButtons = this.state.buttons.map((button) =>
      <SideNavItem
        key={button.name}
        name={button.name}
        glyph={button.glyph}
        component={button.component}
        handleClick={this.handleClick}
        active={button.active}
      />
    );
    return (
      <div className="sidenav">
        {sideNavButtons}
      </div>
    );
  }
}