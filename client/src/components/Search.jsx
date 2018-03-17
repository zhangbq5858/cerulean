import React from 'react';

const Search = ({ changeSearch,clickSearch }) => {
	return (
		<div className="search">
			<input type="text" placeholder="Search" onChange={changeSearch}/>
			<button className="search-button" onClick={clickSearch}>Go!</button>
		</div>
	);
};
export default Search;