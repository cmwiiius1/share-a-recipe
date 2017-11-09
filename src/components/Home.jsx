import React from 'react'
import Recipe from './Recipeform.js';
import helpers from '../utils/helpers'
// TODO - add proptypes

const Home = props => {

	if (props.user) {
		return (
			<div className="Home">
				<Recipe userRecipies={props.userRecipies}/>
			</div>
		)
	} else {
		return (
			<div className="Home">
				Not Logged In
			</div>
		)
	}
}

export default Home
