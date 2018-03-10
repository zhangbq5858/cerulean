import React from 'react';

const ListDeleteButton = ({ onClick }) => {
	return (
		<button className="delete-button" onClick={onClick}>Delete</button>
	);
};

export default ListDeleteButton;