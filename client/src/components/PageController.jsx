import React from 'react';

const debug = false;

const PageController = ({  currentPage, totalPage, prePage, nextPage, setPage}) => {
   if(debug) console.log("PageController data check -> ", totalPage);

   const page = document.querySelector('.page')

  const checkForSubmit = (event) => {
    if(event.key === "Enter") {
      if(debug) console.log("jump", event.target.value);
      setPage(event.target.value);
      event.target.value = "";
    }
  }

  const onClickPrePage = (event) => {
    page.value = "";
    prePage(event);
  }

  const onClickNextPage = (event) => {
    page.value = "";
    nextPage(event);
  }

  return (
      <div className="page-button">
        <button onClick={onClickPrePage}>Prev</button><input className="page" placeholder={currentPage} onKeyPress={checkForSubmit}/> / {totalPage}<button onClick={onClickNextPage}>Next</button>
      </div>
  );
};
export default PageController;
