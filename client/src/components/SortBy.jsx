import React from 'react';

const SortBy = ({ changeSortFunc }) => {
	return (
		<div className="sort-dropdown">
			<label>Sort By </label>
			<select onChange={changeSortFunc}>
			    <option value="" ></option>
				<option value="vote">Vote</option>
				<option value="title">Title</option>
			</select>
		</div>
	);
};
export default SortBy;