// Include React as a dependency
import React, { Component } from 'react'

// Include the Helper (for the saved recall)
import helpers from "./utils/helpers";

import RecipeList from './components/RecipeList';

// Create the Main component
class Saved extends Component {
  state = {
    savedRecipes: []
  }

  // When this component mounts, get all saved articles from our db
  componentDidMount() {
    helpers.getSaved()
    .then((recipeData) => {
      this.setState({ savedRecipes: recipeData.data });
      console.log("saved results", recipeData.data);
    });
  }

  // This code handles the deleting saved articles from our database
  handleClick = (item) => {
    // Delete the list!
    helpers.deleteSaved(item.title, item.date, item.url)
    .then(() => {

      // Get the revised list!
      helpers.getSaved()
      .then((recipeData) => {
        this.setState({ savedRecipes: recipeData.data });
        console.log("saved results", recipeData.data);
      });

    });
  }
  // A helper method for rendering the HTML when we have no saved articles
  renderEmpty = () => {
    return (
      <li className="list-group-item">
        <h3>
          <span>
            <em>XXXXXX...</em>
          </span>
        </h3>
      </li>
    );
  }

  // A helper method for mapping through our articles and outputting some HTML
  renderRecipe = () => {
    return this.state.savedRecipes.map((recipe, index) => {

      return (
        <RecipeList recipe={recipe} key={index} />
      );
    });
  }

  // A helper method for rendering a container and all of our artiles inside
  renderContainer = () => {
    return (
      <div className="main-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    <i className="fa fa-download" aria-hidden="true"></i> All Recipes</strong>
                </h1>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {this.renderRecipe()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Our render method. Utilizing a few helper methods to keep this logic clean
  render() {
    // If we have no articles, we will return this.renderEmpty() which in turn returns some HTML
    if (!this.state.savedRecipes) {
      return this.renderEmpty();
    }
    // If we have articles, return this.renderContainer() which in turn returns all saves articles
    return this.renderContainer();
  }
};

// Export the module back to the route
export default Saved;
