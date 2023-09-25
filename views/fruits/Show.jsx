const React = require("react");

class Show extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <h1>
            <a href="/fruits/">Fruits Homepage</a>
          </h1>
        </nav>
        <h1>Fruits show page</h1>
        The {this.props.fruit.name} is {this.props.fruit.color}{" "}
        {this.props.fruit.readyToEat
          ? `It is ready to eat`
          : `It is not ready to eat`}
      </div>
    );
  }
}
module.exports = Show;
