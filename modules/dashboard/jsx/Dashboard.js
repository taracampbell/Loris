class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const buttons = [
      {name: "Home", glyph: "home", component: "home"},
      {name: "Study Tracker", glyph: "object-align-left", component: "studyTracker"}
    ];

    return (
        <div id="dashboard">
          <SideNav buttons={buttons} />
          <div id="content">
            <Home />
          </div>
        </div>
    );
  }
}

window.onload = function() {
  ReactDOM.render(<Dashboard />, document.getElementById("page"));
};