const React = require("react");
const DefaultLayout = require("./layouts/Default.jsx");

class Index extends React.Component {
  render() {
    const fruits = this.props.fruits;
    return (
      <DefaultLayout title={"Fruits Index Page"}>
        <nav>
          <a href="/fruits/new">Create a New Fruit</a>
        </nav>
        <ul>
          {this.props.fruits.map((fruit, i) => {
            return (
              <li key={i}>
                <a href={`/fruits/${fruit.id}`}>{fruit.name} </a>
                is {fruit.color}
                {fruit.readyToEat ? (
                  <span> It is ready to eat</span>
                ) : (
                  <span> It is not ready to eat </span>
                )}
                {/* Delete form down below*/}
                <form
                  action={`/fruits/${fruit._id}?_method=DELETE`}
                  method="POST"
                >
                  <input type="submit" value="DELETE" />
                </form>
                <a href={`/fruits/${fruit._id}/edit`}>Edit This Fruit</a>
              </li>
            );
          })}
        </ul>
      </DefaultLayout>
    );
  }
}

module.exports = Index;
