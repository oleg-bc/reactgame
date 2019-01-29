import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";

///creates a shuffle function to use later
var wasClicked = [];
var highScore=0;
var currScore=0;
function shuffleFunc(a) {  /////question >>> i was not able to declare it before using
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

/// 1 get just 2 to work
/// add a new prop and update it
class App extends Component {
  
  // Setting this.state.friends to the friends json array
  //same as friends : friends
  //when defining object properties with ES6, 
  //if the object's key and value have the same name, 
  //we can omit the colon — this is just an optional shorthand syntax.
  state = {
    friends,
    count: 0, /////key val pairs make sure to use : not = 
    // alreadyClicked: false ///PROBABLY DO NOT NEED THIS HERE
    // friendName: "No card clicked yet"
    hs:0,
    cs:0,
    message:'lets play'
  };

  ///In that case, you would set friends to twoArr, not justTwo
  ///Because you're mapping through this.state.friends

  removeFriend = id => {
    console.log("now id is     " + id);
    // Filter this.state.friends for friends with an id not equal to the id being removed
    //We include only friends with an id property not equal to the id being received into this method. 
    const friends = this.state.friends.filter(friend => friend.id !== id);
    // Set this.state.friends equal to the new friends array
    //when we update our component's state by removing one of the friend objects, our component re-renders itself.
    this.setState({ friends });
  };

  reverseArr = () => {
    const reversed = this.state.friends.reverse()///array of objects. were note manipulating state. instead we assign the new state to a const
    this.setState({
      friends: reversed  //////here we actually assign the new state into the original state object
    })
  }

  //function shuffle(a) {
  shuffleArr = (e) => {
    
    this.incrementCount();
    var clickedCard = e.target.alt;
    console.log(e.target.alt);
    var x = wasClicked.includes(clickedCard);
    var msg="";
    if (x){
      
      if (currScore > highScore){
        highScore=currScore;
        if (currScore<12){msg="Keep Going Try Again";}
      }
      wasClicked=[];
      currScore=0;
    }else{
      if (highScore<=currScore){
        highScore+=1;
        if (currScore===12){msg="YOU WON!!";}
      }
      currScore+=1;
      wasClicked.push(clickedCard);
      
    }

    ////  we console log extract unique identifier of thing being clicked

    console.log("all of E is **********");
    console.log(e.target);
    /////FIRST  we check the [ item that was clicked] whether its in the chosen arr
    ///if noT
    ////then we push it into the arr -- of chosen items
    ////then player gets plus more point if more than hi score incr the hi score
    /// if yes - flip the switch to game lost

    ///separately we track hi score

    const inputArr = this.state.friends
    const shuffled = shuffleFunc(inputArr)///array of objects. were note manipulating state. instead we assign the new state to a const
    this.setState({
      friends: shuffled,  //////here we actually assign the new state into the original state object
      name: e.target.alt,
      hs: highScore,
      cs: currScore,
      message:msg
    })
  }
  justTwo = () => {
    const twoArr = []
    twoArr.push(this.state.friends[0])
    twoArr.push(this.state.friends[1])
    this.setState({
      friends: twoArr
    })
  }

  incrementCount = () => {
    let newCount = this.state.count + 1;
    this.setState({
      count: newCount
    })
    console.log(this.state.count);
  }

  // Map over this.state.friends and render a FriendCard component for each friend object
  //whenever we map over a list of data and return JSX, 
  //React wants us to give each element a unique key prop. React uses this value internally to help it efficiently render 
  //and re-render components from arrays of data.

  //the key prop is unusual because it's used by React but 
  //isn't actually available for us to use inside of the component we pass it to. We pass the friend id in as a separate prop because we'll need it inside of the FriendCard component.
  render() {
    return (
      <Wrapper>
        <Title><br />Clicky Game Says: {this.state.message} <br />{this.state.name} <br /> Hi Score {this.state.hs}<br /> Current Score {this.state.cs}</Title>
        {this.state.friends.map((friend, i) => ( ////this map creates each single card
          <FriendCard
            // onClick={this.shuffleArr}
            shuffleArr={this.shuffleArr}///shuffleArr is arbitrary decided after this.<<<
            removeFriend={this.removeFriend}
            // alreadyClicked={friend.alreadyClicked}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
            message={this.state.message}
          />
        ))}
        {/* <button onClick={this.reverseArr}>reverse</button>
        <button onClick={this.justTwo}>just2</button>
        <button onClick={this.shuffleArr}>shuffle </button> */}
      </Wrapper>
    );
  }
}
export default App;
