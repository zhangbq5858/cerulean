import React from 'react';



const Filter = ({ changeFilterFunc, text }) => {
	const onClick = (event) => {
		if(event.target.className === "filter"){
			const filterComponents = document.querySelectorAll('.filter-pressed');
			for(let filterComponent of filterComponents){
				filterComponent.className = "filter";
			}
			event.target.className = "filter-pressed";

		}else{
			event.target.className = "filter";
		}
		console.log("filter!",event.target);
		changeFilterFunc(event);
	}

	return (
        <span>
		<button className= "filter" onClick={onClick}>{text}</button>
        </span>
	);
};
export default Filter;