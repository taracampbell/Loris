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
        <SideNav buttons={buttons} />
    );
  }
}

window.onload = function() {

  // Create a wrapper div in which react component will be loaded
  const dashboardDOM = document.createElement('div');
  dashboardDOM.id = 'dashboard-area';

  // Append wrapper div to page content
  const rootDOM = document.getElementById("page");
  rootDOM.appendChild(dashboardDOM);

  ReactDOM.render(<Dashboard />, document.getElementById("dashboard-area"));
};