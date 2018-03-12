import React from 'react';

const SortBy = ({ changeSortFunc }) => {
	return (
		<span>
			<label>Sort By </label>
			<select onChange={changeSortFunc}>
			    <option value="" ></option>
				<option value="vote">Vote</option>
				<option value="title">Title</option>
			</select>
		</span>
	);
};
export default SortBy;