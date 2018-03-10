import React, { Component } from 'react';
//import './styles/index.css';

import Content from './components/Content';

const fetchFunc = require('./FetchFunc');

class App extends Component { // 三部分 一部分 submit，一部分 过滤 一部分 content
  constructor(props){
    super(props);
    this.state = {
			linksMap: null,
			linksToDisplay: [],//content数据
			tagPool:[], //tag filter
			user: null, //用户数据
			status: "content", // "content"， and "submit" 用来控制展示哪一部分
			filter: null,
    };

		this.buttonClickFunc = this.buttonClickFunc.bind(this);
		this.convertMapToArray = this.convertMapToArray.bind(this);
	}
	
	buttonClickFunc = (value, linkId, userId) => {

		if(value === "add"){
			//fetchFunc.addPostRequest();
		}else if(value === "edit"){
			//fetchFunc.editPostRequest();
		}else if(value === "delete"){
			console.log("delete key clicked");
			fetchFunc.callDeletePostRequest(linkId)
			.then( fromJson => {
				this.setState({
					linksMap: this.state.linksMap.filter((elem, id) => id !== fromJson.linkId),
				})
			})
			.catch(error => {
				console.log("delete part's error is -> ", error);
			});
		}else if (value === "save"){

		}else if(value === "vote"){

		}else if(value === "unvote"){

		}
		else{ // value === "cancel"

		}

	}

	convertMapToArray = (linksMap) => {
		let res = [];
		console.log("convert map to array part, checkout data -> ", this.state.filter);
		for(let key in linksMap){
			if(this.state.filter === null || linksMap[key].tag.includes(this.state.filter))
				res.push(linksMap[key]);
		}
		return res;
	}

	componentDidMount() {
		fetchFunc.callGetDataRequest()
		.then(fromJson => {
			console.log("getdata part's data is -> ", fromJson.user, this.state.status);
			this.setState({
				linksMap: fromJson.linksMap,
				linksToDisplay: this.convertMapToArray(fromJson.linksMap),
				tagPool:fromJson.tagPool,
				user: fromJson.user,
			});
		})
		// .then( () => {
		// 	console.log("check data part -> ",this.state.user);
		// })
		.catch(error => {
			console.log("getdata part's error is -> ", error);
		});
	}

  render() {
		console.log("check data part -> ",this.state.user);
    return (
      <div>
        <Content 
        	linksToDisplay={this.state.linksToDisplay}
					buttonClickFunc={this.buttonClickFunc}
					status={this.state.status}
					user={this.state.user}
        />
      </div>
    );
  }
}

export default App;
