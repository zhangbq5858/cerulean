import React, { Component } from 'react';

import UrlList from './UrlList'
import PageController from './PageController';

const debug = false;
const listNumberPerPage = 5; 

class Content extends Component{
  constructor(props){
    super(props); //linksToDisplay, buttonClickFunc, user
    this.state = {
      currentPage: 1,
			totalPage: 1,      
    }
    this.prePage = this.prePage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.setPage = this.setPage.bind(this);
    this.generateUrllist = this.generateUrllist.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(debug)console.log("componentWillReceiveProps", this.props.linksToDisplay, nextProps.linksToDisplay);
    this.setState({
       totalPage: Math.ceil(nextProps.linksToDisplay.length / listNumberPerPage),    
      });
  }

  
  generateUrllist = () => {
    if(this.props.linksToDisplay === null) return []; 
    let content = [];
    if(debug) console.log("generateUrllist",this.props.linksToDisplay, this.state.totalPage);
    const linksToDisplay = this.props.linksToDisplay.slice((this.state.currentPage - 1) * listNumberPerPage, this.state.currentPage * listNumberPerPage);
    for(let Link of linksToDisplay){
      content.push( <UrlList key={Link.id}
        Link={Link}
        buttonClickFunc={this.props.buttonClickFunc}
        user={this.props.user}
        />);
    }
    return content;
  }

	prePage = () => {
    if(debug) console.log("prePage",this.state.currentPage);
		if(this.state.currentPage === 1) return;
		this.setState({
			currentPage: this.state.currentPage - 1,
		});
	}

	nextPage = () => {
    if(debug) console.log("nextPage",this.state.currentPage, this.state.totalPage);
		if(this.state.currentPage >= this.state.totalPage) return;
		this.setState({
			currentPage: this.state.currentPage + 1,
		});
	}

	setPage = (page) => {
    if(debug) console.log("setPage",page, this.state.totalPage);
		if(page < 1 || page > this.state.totalPage) return;
		this.setState({
			currentPage: page,
		});
	}

  render(){
    
    return (
      <div className="Content">
        <ol>
          {this.generateUrllist()}
        </ol>
        <PageController
					currentPage={this.state.currentPage}
					totalPage={this.state.totalPage}
					prePage={this.prePage}
					nextPage={this.nextPage}
					setPage={this.setPage}
				/>
      </div>    
    );
  }

}

export default Content;
