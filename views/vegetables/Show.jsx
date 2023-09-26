const React = require("react");

class Show extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <h1>
            <a href="/vegetables/">Vegetables Homepage</a>
          </h1>
        </nav>
        <h1>Vegetables show page</h1>
        The {this.props.vegetable.name} is {this.props.vegetable.color}{" "}
        {this.props.vegetable.readyToEat
          ? `It is ready to eat`
          : `It is not ready to eat`}
      </div>
    );
  }
}
module.exports = Show;
