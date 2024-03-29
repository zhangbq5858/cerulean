import React, { Component } from 'react';
//import './styles/index.css'
import './App.css';
import Content from './components/Content';
import UserID from './components/UserID';
import Editor from './components/Editor';
import FilterAndSortBy from './components/FilterAndSortBy';
import Search from './components/Search';

const fetchFunc = require('./FetchFunc');
const debug = false;

class App extends Component { // 三部分 一部分 submit，一部分 过滤 一部分 content
  constructor(props){
    super(props);
    this.state = {
			linksMap: null,
			tagPool:[], //tag filter
			user: null, //用户数据
			filter: null,
      currentLink: {},
			sort: null,
			searchInput: '',
			search: '',
			editorVisible: false,
			currentPage: 0,
			totalPage: 0,
    };
		this.buttonClickFunc = this.buttonClickFunc.bind(this);
		this.convertMapToArray = this.convertMapToArray.bind(this);
    	this.toggleEditorDisplay = this.toggleEditorDisplay.bind(this);
    	this.save = this.save.bind(this);
			this.changeSortFunc = this.changeSortFunc.bind(this);
			this.changeFilterFunc = this.changeFilterFunc.bind(this);
			this.changeSearchFunc = this.changeSearchFunc.bind(this);
			this.clickSearchFunc = this.clickSearchFunc.bind(this);
	}

	changeFilterFunc(e){
		this.setState({
			filter: e.target.innerHTML === "All" ? null : e.target.innerHTML,
			currentPage:0,
		});
	}

	changeSortFunc(e){
		this.setState({
			sort: e.target.value,
			currentPage:0,
		 });
	}

	changeSearchFunc(e){
		this.setState({ searchInput: e.target.value });
		if( e.target.value === ''){
			this.setState({ search: '' });
		}
	}

	clickSearchFunc(e){
		this.setState({ search: this.state.searchInput });
	}

	search(res){
		let tmp = [];
		let search = this.state.search;
		for (  let link of res ){
			if((link.title.toLowerCase().indexOf(search)!==-1)||
				(link.summary.toLowerCase().indexOf(search)!==-1)){
					tmp.push(link);
			}
		}
		return tmp;
	}

	sortByVote (res){
		res.sort((a,b) => {
			return a.vote - b.vote
		});
	}

	sortByTitle(res){
		res.sort(function(a,b){
			let titleA = a.title.toUpperCase();
			let titleB = b.title.toUpperCase();
			if(titleA < titleB){
				return -1;
			}
			if(titleA > titleB){
				return 1;
			}
			return 0;
		});
	}

	buttonClickFunc = (value, linkId, userId) => {

		if(value === "edit"){
      this.setState({
        currentLink:this.state.linksMap[linkId]
        , editorVisible: true
      });
      if(debug) console.log(this.state.linksMap[linkId]);
		}else if(value === "delete"){
			//console.log("delete key clicked");
			fetchFunc.callDeletePostRequest(linkId)
			.then( fromJson => {
				const linksMap = Object.assign({},this.state.linksMap);
				delete linksMap[fromJson.linkId];
				this.setState({
					linksMap,
				})
			})
			.catch(error => {
				console.log("delete part's error is -> ", error);
			});
		}else if(value === "vote"){
			fetchFunc.postVoteRequest(linkId,userId)
			.then(fromJson =>{
				const linksMap = Object.assign({},this.state.linksMap);
				const usersMap = Object.assign({},this.state.usersMap);
				linksMap[fromJson.Link.id] = fromJson.Link;
				usersMap[fromJson.User.id] = fromJson.User;
				this.setState({
					linksMap,
					usersMap,
				})
			})
			.catch(error => {
				console.log("vote part's error is -> ", error);
			});
		}else if(value === "unvote"){
			fetchFunc.postUnvoteRequest(linkId, userId)
			.then(fromJson =>{
				const linksMap = Object.assign({},this.state.linksMap);
				const usersMap = Object.assign({},this.state.usersMap);
				linksMap[fromJson.Link.id] = fromJson.Link;
				usersMap[fromJson.User.id] = fromJson.User;
				this.setState({
					linksMap,
					usersMap,
				})
			})
			.catch(error => {
				console.log("unvote part's error is -> ", error);
			});
		}
		else{ // value === "cancel"

		}

	}


	convertMapToArray = () => {
		let res = [];
		//console.log("convert map to array part, checkout data -> ", this.state.filter);
		for(let key in this.state.linksMap){
			//if(this.state.filter !== null) console.log(this.state.linksMap[key].tags,"?????",this.state.filter);
			if(this.state.filter === null || this.state.linksMap[key].tags.includes(this.state.filter))
				res.push(this.state.linksMap[key]);
		}
		if(this.state.search !== ''){
			res = this.search(res);
		}
		if(this.state.sort === "vote"){
			this.sortByVote(res);
		}
		if(this.state.sort === "title"){
			this.sortByTitle(res);
		}
		return res;
	}

	componentDidMount() {
		fetchFunc.callGetDataRequest()
		.then(fromJson => {
		//	console.log("getdata part's data is -> ", fromJson.user, this.state.status);
			this.setState({
				linksMap: fromJson.linksMap,
				tagPool:fromJson.tagPool,
				user: fromJson.user,
			});
		})
		.catch(error => {
			//console.log("getdata part's error is -> ", error);
		});
	}

  // Editor by Bin
  save(url) {
    //id, title, url, tag, summary
    if(debug) console.log("add part",url);

    if(!url) {
      this.setState({editorVisible: !this.state.editorVisible, currentLink:{}});
      return ;
    }

    if (url.id) { // update
      fetchFunc.callEditPostRequest(url)
      .then(link => {
        if(debug) console.log(link);
        const linksMap = Object.assign({}, this.state.linksMap);
        linksMap[url.id] = link;
        this.setState({linksMap, editorVisible: !this.state.editorVisible,currentLink:{}});
        if(debug) console.log(this.setState.linksMap.id);
      })
      .catch(error => console.log('Failed to update:', url));
    } else { // create
      fetchFunc.callAddPostRequest(url['title'], url['url'], url['tags'], url['summary'])
      .then(link => {
        if(debug) console.log(link);
        let temp = this.state.linksMap;
        temp[link.id] = link;
        this.setState({linksMap: temp,editorVisible: !this.state.editorVisible,currentLink:{}});
      })
      .catch(error => console.log('Failed to save ', url));
    }
  }

  toggleEditorDisplay() {
    this.setState({
      editorVisible: !this.state.editorVisible
    }); //setState
  } //toggleAddDisplay

  render() {
	//	console.log("check data part -> ",this.state.user);
    return (
      <div>
        <header className="page-title">SurfVibes</header>
        <UserID user={this.state.user}/>
        <button name="add" onClick={ this.toggleEditorDisplay } > {this.state.editorVisible? 'Save Later': 'Submit'} </button>
				<Search
					changeSearch={this.changeSearchFunc}
					clickSearch={this.clickSearchFunc}
				/>
				<Editor
          visible = {this.state.editorVisible}
          current = {this.state.currentLink}
          handleSubmit = { this.save }
					tagPool = {this.state.tagPool}
        />
        
        <FilterAndSortBy
					changeSortFunc={this.changeSortFunc}
					changeFilterFunc={this.changeFilterFunc}
					tagPool={this.state.tagPool}
				/>
        <Content
        	linksToDisplay={this.convertMapToArray()}
					buttonClickFunc={this.buttonClickFunc}
					user={this.state.user}
        />
      </div>
    );
  }
}

export default App;
