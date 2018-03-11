import React from 'react';

const Button = ({  clickFunc, text}) => {
  // console.log("button part data check -> ", text);
  const onClickFunc = (event) => {
    console.log("button clicked", event.target.innerHTML);
     clickFunc(event.target.innerHTML);
     if(event.target.innerHTML === "vote"){
      event.target.innerHTML = "unvote";
     }else if(event.target.innerHTML === "unvote"){
      event.target.innerHTML = "vote";
     }
  }

  return (
    <button onClick={onClickFunc}>{text}</button>
  );
};
export default Button;
