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
      currentItem: '',
      items: '',
      user: null 
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    helpers.postSaved(this.state.currentItem, this.state.items).then(function() {
      console.log ("recipe posted")
      this.setState({
        currentItem: '',
        items: ''
       });
    })
  }
  // componentDidMount() {
  //   const itemsRef = firebase.database().ref('items');
  //   itemsRef.on('value', (snapshot) => {
  //     let items = snapshot.val();
  //     let newState = [];
  //     for (let item in items) {
  //       newState.push({
  //         id: item,
  //         title: items[item].title,
  //         recipe: items[item].recipe,
  //         user: items[item].user
  //       });
  //     }
  //     this.setState({
  //       items: newState
  //     });
  //   });
  // }
  render() {
    return (
      <div className='app'>
        <div className='container'>
          <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" name="currentItem" placeholder="What is the name of your recipe?" onChange={this.handleChange} value={this.state.currentItem} />
                  <textarea type="text" rows="20" name="items" placeholder="Type or paste the recipe here." onChange={this.handleChange} value={this.state.items} />
                  <button>Add Recipe</button>
                </form>
          </section>
         {/* <section className='display-item'>
              <div className="wrapper">
                <ul>
                  {this.state.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>Submitted by: {item.user}
                          <button onClick={() => this.removeItem(item.id)}>Remove Recipe</button>
                        </p>
                        <h3>{item.recipe}</h3>
                      </li>
                    )
                  })}
                </ul>
              </div>
          </section>*/}
        </div>
      </div>
    );
  }
}
export default Recipe;
