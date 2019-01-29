import React from "react";
import "./style.css";

function FriendCard(props) {
 
  return (
    <div className="card"

    >
      <div className="img-container"
       
      //  id={props.name} 
        ////giving the div an ID to pass the name via props
        onClick={(e) => props.shuffleArr(e)}/// whats goin on w/ e - event were passing?
      >

        <img alt={props.name} src={props.image} />
      </div>
      <div className="content">
        <ul>
    
          <li>
            <strong>Name:</strong> {props.name}
          </li>
          <li>
            <strong>Occupation:</strong> {props.occupation}
          </li>
          <li>
            <strong>Location:</strong> {props.location}
          </li>
        </ul>
      </div>
      {/* <span onClick={() => props.removeFriend(props.id)} className="remove">
        𝘅
      </span> */}
    </div>
  );
}
//since our event handlers need to be callbacks, we normally
//can't pass in arguments without invoking them right away. 
//But by wrapping the removeFriend method in an another function, 
//we can pass the id prop into the inner removeFriend method. 
//When the span is clicked, it calls the anonymous callback function, which then calls the removeFriend method with the friend's id as an argument.

export default FriendCard;
