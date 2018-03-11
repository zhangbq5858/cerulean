import React from 'react';

import UrlList from './UrlList'

const Content = ({linksToDisplay, buttonClickFunc, status, user}) => {
  //console.log("content part data check -> ", buttonClickFunc);
  const generateUrllist = () => {
    if(linksToDisplay === null) return []; 
    if(status !== "content") return [];
    let content = [];
    for(let Link of linksToDisplay){
      content.push( <UrlList
        Link={Link}
        buttonClickFunc={buttonClickFunc}
        userId={user.id}
        />);
    }
    return content;
  }

  return (
    <div className="Content">
      <ul>
        {generateUrllist()}
      </ul>
    </div>
  );
};

export default Content;
