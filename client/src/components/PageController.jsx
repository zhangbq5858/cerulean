import React from 'react';

const debug = false;

const PageController = ({  currentPage, totalPage, prePage, nextPage, setPage}) => {
   if(debug) console.log("PageController data check -> ", totalPage);
  const checkForSubmit = (event) => {
    if(event.key === "Enter") {
      if(debug) console.log("jump", event.target.value);
      setPage(event.target.value);
      event.target.value = "";
    }
  }

  return (
      <div>
        <button onClick={prePage}>Prev</button><input placeholder={currentPage} onKeyPress={checkForSubmit}/> / {totalPage}<button onClick={nextPage}>Next</button>
      </div>
  );
};
export default PageController;
