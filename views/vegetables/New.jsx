const React = require("react");

class New extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <h1>
            <a href="/vegetables/">Vegetables Homepage</a>
          </h1>
        </nav>
        <h1>New vegetable page</h1>
        <form action="/vegetables" method="POST">
          Name: <input type="text" name="name" />
          <br />
          Color: <input type="text" name="color" />
          <br />
          Is Ready To Eat: <input type="checkbox" name="readyToEat" />
          <br />
          <input type="submit" name="" value="Create Vegetable" />
        </form>
      </div>
    );
  }
}

module.exports = New;
