import React from 'react';

const ListVoteButton = ({ onClick }) => {
	return (
		<button className="vote-button" onClick={onClick}>Vote</button>
	);
};

export default ListVoteButton;