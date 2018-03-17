import React from 'react';

const PageController = ({  currentPage, totalPage, prePage, nextPage, setPage}) => {
  // console.log("button part data check -> ", text);
  const onChangeFunc = (event) => {
   setPage(event.target.value);
  }

  return (
      <div>
        <button onClick={prePage}>Prev</button><input placeholder={currentPage} /> / {totalPage}<button onClick={nextPage}>Next</button>
      </div>
  );
};
export default PageController;
