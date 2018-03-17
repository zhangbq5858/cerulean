import React from 'react';


import SortBy from './SortBy';
import Filter from './Filter';
const FilterAndSortBy = ({ changeSortFunc , changeFilterFunc, tagPool}) => {


    const generateFilters = () => {
        if(tagPool === null) return []; 
        let content = [];
        for(let tag of tagPool){
          content.push( <Filter key={tag}
            changeFilterFunc={changeFilterFunc}
            text={tag}
            />);
        }
        content.push( <Filter key="All"
            changeFilterFunc={changeFilterFunc}
            text={"All"}
            />)
        return content;
      }

	return (
		<div className="filter-sortBy">
			<SortBy changeSortFunc={changeSortFunc} />
            {generateFilters()}
		</div>
	);
};
export default FilterAndSortBy;