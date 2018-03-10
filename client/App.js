import React, { Component } from 'react';
//import './styles/index.css';

import UrlList from './components/UrlList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
    	LinksToDisplay: [
    			{title: 'Google',
    			url: 'https://www.google.com/',
    			tag: 'Science',
    			summary: "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for.",
    			voteNum: 123
    		},
    			{title: 'Baidu',
    			url: 'https://www.baidu.com/',
    			tag: 'Science',
    			summary: "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for.",
    			voteNum: 124
    		}
    	]
    };

    this.clickEditFunc = this.clickEditFunc.bind(this);
  }

  clickEditFunc(){
  	this.setState({
  		btnLabel: " test"
  	});
}
 

  render() {
    return (
      <div>
        <UrlList 
        	LinksToDisplay={this.state.LinksToDisplay}
        	clickEditFunc={this.state.clickEditFunc}
        />
      </div>
    );
  }
}

export default App;
