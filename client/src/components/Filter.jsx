import React from 'react';

const Filter = ({ changeFilterFunc, text }) => {
	return (
        <span>
			<button className= "filter" onClick={changeFilterFunc}>{text}</button>
        </span>
	);
};
export default Filter;