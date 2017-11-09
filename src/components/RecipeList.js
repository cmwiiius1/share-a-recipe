import React, {Component} from 'react';

class RecipeList extends Component {

	constructor (props) {
		super (props);

		// initialize state with isShown property as false
		// so that reciepies will not be displayed when component is mounted
		this.state = {isShown: false};

		// this.showRecipe = this.showRecipe.bind(this);
	}

	// create function to show reciepies when button is clicked
	showRecipe = () => {
		alert("I work. Why u looking at me?");
		// this.setState({isShown: true})
	};

	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	render () {
		// destructure props object
		console.log("props: ", this.props)
		const { _id, title, body } = this.props.recipe;
		return (
				<div key={_id}>
          <li className="list-group-item">
            <h3>
              <span>
                <strong>{title}</strong>
              </span>
              <span className="btn-group pull-right">
                {<button 
                		className="btn btn-default" 
                		onClick={()=>this.state.isShown? this.setState({isShown: false}) : this.setState({isShown: true})}
                		>
                		{this.state.isShown? "Hide Recipe" : "Show Recipe"}
                </button>}
              </span>
            </h3>
                {this.state.isShown? <div>{body}</div> : null}
          </li>
        </div>
			)
	}
}

export default RecipeList;