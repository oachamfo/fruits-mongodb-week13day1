const React = require("react");

const DefaultLayout = require("./layouts/Default.jsx");

class Edit extends React.Component {
  render() {
    return (
      <DefaultLayout title="Edit Page">
        <nav>
          <h1>
            <a href="/vegetables/">Vegetables Homepage</a>
          </h1>
        </nav>
        {/* DefaultLayout takes in a prop called title. Up above, "Edit Page" is passed to the title prop.*/}
        {/* down below is the form*/}
        <form
          action={`/vegetables/${this.props.vegetable._id}?_method=PUT`}
          method="POST"
        >
          Name:{" "}
          <input
            type="text"
            name="name"
            defaultValue={this.props.vegetable.name}
          />
          <br />
          Color:{" "}
          <input
            type="text"
            name="color"
            defaultValue={this.props.vegetable.color}
          />
          <br />
          Is Ready To Eat:
          {this.props.vegetable.readyToEat ? (
            <input type="checkbox" name="readyToEat" defaultChecked />
          ) : (
            <input type="checkbox" name="readyToEat" />
          )}
          <br />
          <input type="submit" value="Submit Changes" />
        </form>
      </DefaultLayout>
    );
  }
}
module.exports = Edit;
