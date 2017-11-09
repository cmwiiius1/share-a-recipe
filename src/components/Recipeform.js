import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import helpers from '../utils/helpers.js';
// import firebase from './firebase.js';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      ingredients:'',
      items: [],
      user: null 
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // this.getUserRecipes = this.getUserRecipes.bind(this);
  }

  renderRecipies = ()=> {
    if (!this.props.userRecipies) return <div>Loading Recipes</div>;
    return (
        this.props.userRecipies.map(item => {
                    return (
                      <li key={item._id}>
                        <h3 className = "title">{item.title}</h3>
                        <p>
                          <button onClick={() => this.handleDelete(item._id)}>Remove Recipe</button>
                        </p>
                        <h3>{item.body}</h3>
                      </li>
                    )
                  })
      )
  }  
  
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    helpers.postSaved(this.state.recipeName, this.state.ingredients).then((res) => {
      // console.log ("recipe posted");
      // console.log(res);
      this.setState({
        recipeName: '',
        ingredients: '',
        items: res.data.recipes
       });
    })
  }
  handleDelete(id) {
    helpers.deleteSaved(id)
    .then(res => this.renderRecipies())
    .catch(err => console.log ("handle delete err", err));
  };
  render() {
    return (
      <div className='app'>
        <div className='container'>
          <section className='add-item' style={{width:1000}}>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" name="recipeName" placeholder="Recipe name" onChange={this.handleChange} value={this.state.recipeName} />
                  <textarea className='box' type="text" rows="20" name="ingredients" placeholder="Type/Paste recipe here" onChange={this.handleChange} value={this.state.ingredients} />
                  <button>Add Recipe</button>
                </form>

                
          </section>
         {/* } <AllRecipes /> */}
         <section className='display-recipes'>
              <div className="wrapper1">
                <ul>
                  {this.renderRecipies()}
                </ul>
              </div>
          </section>
        </div>
      </div>
    );
  }
}
export default Recipe;
