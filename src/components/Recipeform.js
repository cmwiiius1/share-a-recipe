import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import helpers from '../utils/helpers.js';
// import firebase from './firebase.js';

class Recipe extends Component {
  constructor() {
    super();
    this.state = {
      recipeName: '',
      ingredients:'',
      items: [],
      user: null 
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUserRecipes = this.getUserRecipes.bind(this);
  }

  getUserRecipes() {
    console.log("got to getUserRecipes")
    console.log('state: ',this.state.items)
    if(this.state.items.length > 0) return;
    console.log('below return');
      helpers.postSaved(this.state.recipeName, this.state.ingredients).then((res) => {
        console.log ("recipe posted");
        console.log(res);
        this.setState({items: res.data.recipes});
    })
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    helpers.postSaved(this.state.recipeName, this.state.ingredients).then((res) => {
      console.log ("recipe posted");
      console.log(res);
      this.setState({
        recipeName: '',
        ingredients: '',
        items: res.data.recipes
       });
    })
  }
  render() {
    return (
      <div className='app'>
        <div className='container'>
          <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" name="recipeName" placeholder="What is the name of your recipe?" onChange={this.handleChange} value={this.state.recipeName} />
                  <textarea type="text" rows="20" name="ingredients" placeholder="Type or paste the recipe here." onChange={this.handleChange} value={this.state.ingredients} />
                  <button>Add Recipe</button>
                </form>
          </section>
         {/* } <AllRecipes /> */}
         <section className='display-recipes'>
              <div className="wrapper">
                <ul>
                  {/*this.state.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>Submitted by: {item.user}
                          <button onClick={() => this.removeItem(item.id)}>Remove Recipe</button>
                        </p>
                        <h3>{item.recipe}</h3>
                      </li>
                    )
                  })*/
                  this.getUserRecipes()
                }
                </ul>
              </div>
          </section>
        </div>
      </div>
    );
  }
}
export default Recipe;
