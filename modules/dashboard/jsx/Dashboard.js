class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    let buttons = [
      {name: "Home", glyph: "home", component: "home", active: true},
      {name: "Study Tracker", glyph: "object-align-left", component: "studyTracker", active: false}
    ];

    this.state = {
      home: true,
      studyTracker: false,
      buttons: buttons
    };

    this.changeScreen = this.changeScreen.bind(this);
  }

  changeScreen(component) {
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

  render() {
    return (
      <div id="dashboard">
        <SideNav buttons={this.state.buttons} changeScreen={this.changeScreen} />
        <div id="content">
          <Home active={this.state.home} />
          <StudyTracker active={this.state.studyTracker} />
        </div>
      </div>
    );
  }
}

window.onload = function() {
  ReactDOM.render(<Dashboard />, document.getElementById("page"));
};