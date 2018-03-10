import React from 'react';

const ListEditButton = ({ onClick , btnLabel }) => {
	return (
		<button className="edit-button" onClick={onClick} >Edit{btnLabel}</button>
	);
};

export default ListEditButton;