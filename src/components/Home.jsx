import React from 'react'
import Recipe from './Recipeform.js'
// TODO - add proptypes

const Home = props => {
	if (props.user) {
		return (
			<div className="Home">
				<Recipe/>
			</div>
		)
	} else {
		return (
			<div className="Home">
			</div>
		)
	}
}

export default Home
