class SideNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.name);
  }

  render() {
    const glyphName = "glyphicon glyphicon-" + this.props.glyph;
    return (
      <div className="sidenav-item" alt={this.props.name} onClick={this.handleClick}>
        <span className={glyphName}></span>
      </div>
    );
  }
}

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(name) {
    const components = {
      "Study Tracker": StudyTracker,
      "Home": Home
    };

    const Content = components[name];
    ReactDOM.render(React.createElement(Content), document.getElementById("content"));
    // delete active on all other buttons, add active to current id
    // complete action
  }

  render() {
    const sideNavButtons = this.props.buttons.map((button) =>
      <SideNavItem
        key={button.name}
        name={button.name}
        glyph={button.glyph}
        component={button.component}
        handleClick={this.handleClick}
      />
    );
    return (
      <div className="sidenav">
        {sideNavButtons}
      </div>
    );
  }
}