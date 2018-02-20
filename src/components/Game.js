import React, { PureComponent } from 'react';

class Game extends PureComponent {

	clickHandle = () => {
		if(this.props.bool){
			this.props.handleClick(this.props.index,this.props.current);
		} 
	}


	render() {
		return(
		  <div className={this.props.status}
		  style={{ backgroundColor: this.props.bool  ? 
		  'black' : this.props.current }}
		  onClick={this.clickHandle}>
		  </div>
			);
	}
}


export default Game;
