import React, { Component } from 'react';
import Start from './components/Start';
import Game from './components/Game';
import _ from 'lodash';

const COLORS = ['#004445','#004445','#C9A66B','#C9A66B','#693D3D','#693D3D',
               '#20948B', '#20948B', '#003B46','#003B46', '#0F1B07','#0F1B07',
               '#46211A','#46211A','#505166','#505166','#34675C','#34675C'];

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 'start',
      format: ['2x4', '2x5','3x4', '3x6'],
      id: null,
      colors: COLORS,
      clickedIndexPicture: [],
      solvedCards: [],
		}

	}
  
  setId(id){
    this.setState({
       id:id
    },() => {
      this.setState((prevState) => {
       if(id === 0) {
         return {colors: _.shuffle(prevState.colors.slice(0,8)),
                 status: 'twoTimesFour',
                 }
       } else if(id === 1) {
         return {colors: _.shuffle(prevState.colors.slice(0,10)),
                status: 'twoTimesFive'}
       } else if(id === 2) {
         return {colors: _.shuffle(prevState.colors.slice(0,12)),
                status: 'threeTimesFour'}
       } else if(id === 3) {
         return {colors: _.shuffle(prevState.colors),
                status: 'threeTimesSix'}
       }
    });
  })
  }

  handleClick = (index, current) => {
      this.setState((prevState) => {
         let temp = [...prevState.clickedIndexPicture, index];
         let tempCard = [...prevState.solvedCards, current];
         return{clickedIndexPicture: temp,
               solvedCards: tempCard}}, () => {
              if(this.state.clickedIndexPicture.length % 2 === 0)
               {
                 if(this.state.solvedCards[this.state.solvedCards.length - 2] !== current)
                 {
                  this.state.clickedIndexPicture
                  .splice(this.state.clickedIndexPicture.length - 2);
                  this.state.solvedCards.splice(this.state.solvedCards.length - 2);
                 }
               }
               if(this.state.solvedCards.length === this.state.colors.length)
               { 

                 setTimeout(() => {
                   this.setState({
                     id: null,
                     status: 'start',
                     colors: COLORS,
                     clickedIndexPicture: [],
                     solvedCards: [],
                 });
                 },1000)
                
               }
        })  
      }
    
  isClicked = (index) => this.state.clickedIndexPicture.indexOf(index) === -1
  

  render() {
  	return (
      <div className="content">
      	<div className="header">
      		<h1>Color Memory</h1>
      	</div>
        <div className="main">
           {
              this.state.id === null ?
              (
                this.state.format.map((current,index) =>
              <Start
              status={this.state.status}
              current={current}
              key={index}
              setId={this.setId.bind(this,index)}
              />)
              ) :
              (
            
                this.state.colors.map((current,index) => 
                <Game
                key={index}
                index={index}
                current={current}
                status={this.state.status}
                handleClick={this.handleClick}
                bool={this.isClicked(index)} 

                />)
            
              )
            }
        </div>
      </div>
  		)
  }
}

export default  App;
