/*******************Initiable Global Variabels*******************/

const submitButton = document.querySelector('.submit-button');
const resetButton = document.querySelector('.reset-button');

const allButton = document.querySelector('.all-Button');
const educationButton = document.querySelector('.education-Button');
const entertainmentButton = document.querySelector('.entertainment-Button');
const financeButton = document.querySelector('.finance-Button');
const politicsButton = document.querySelector('.politics-Button');
const sportsButton = document.querySelector('.sports-Button');
const sortByButton = document.querySelector('.sortBy');

const form = document.querySelector('.input-form');//it contains all the input

const titleInput = document.querySelector('.title-input');//all inputs should have names
const urlInput = document.querySelector('.url-input');
const summaryInput = document.querySelector('.summary-input');
const urlContent = document.querySelector('.url-content');
const showList = document.querySelector('.show-list');
const remindMessage = document.querySelector('.warn-message');

let LinksMap = {};
let LinksToDisplay = [];

let warnMessage;
const debug = false;

const str = '<button class="vote-button">vote</button>'+
			'<button class="edit-button">edit</button>'+
			'<button class="delete-button">delete</button>'+
			'<button class="save-button" style ="display:none;" >save</button>'+
			'<button class="cancel-button" style ="display:none;">cancel</button>';

/*******************Utilities Functions*******************/

function resetInput(){
	for( let i = 0; i < form.elements.length - 2; i++ ){ //-2 means minus two buttons
		form.elements[i].value = '';
	}
}

function transUrlToInput(obj){
	let str = '';
	let type = 'text';
	for(key in obj){
		if(key === "id"){
			 continue;
		//console.log(key);
		}else{
			str += `<input type=${type} name=${key} value=${obj[key]} disabled='disabled'>`;
		}
	}
	return str;
}

function transInputToObject(arr){
	let obj={};
	arr.forEach(element => {
		let value = element.value;
		obj[element.name] = value;
	});
	//console.log(obj);
	return obj;
}

function vote(){
//vote fungcion @Bin (from @jingyi)
}

/*******************Make List Functions*******************/
//make whole list

function render(){
	//console.log("begin render");
	addToList();
	addListener();
}


function addToList() {
	//console.log("addToList");
	let urlList = [];
	for(let i = 0; i < LinksToDisplay.length; i++){
		let element = LinksToDisplay[i];
		delete element.str;
		let str = transUrlToInput(element);
		element.str=str;
		urlList.push(element);
	}
	renderList(urlList);
   }

function generateList(urlList){
	//console.log(urlList[0].url+" urlList content");
	const list = urlList.map( element => `<li id=${element.id} >${element.str}${str}</li><h4 class='edit-reminder'></h4>` ).join('\n');
//console.log(list);
	return list;
}

function renderList(urlList){
	//console.log(generateList( urlList));
	//console.log("erase urlcontent");
	urlContent.innerHTML = "";
	urlContent.innerHTML = generateList(urlList);
}

/*******************Input Validation Function*******************/

function checkTitleInput(titleInput) {
	//console.log(titleInput.value);
	if( titleInput.value.length <= 0 ){
		warnMessage = 'Please input a title!';
		return false;
	}else{
		warnMessage = '';
		return true;
	}
}

function checkUrlInput(urlInput){
	if( urlInput.value.length <= 0 ){
		warnMessage = 'Please input a url!';
		return false;
	}else{
		warnMessage = '';
		return true;
	}
}

function checkSummaryInput(){
	if( summaryInput.value.length <= 0 ){
		warnMessage = 'Please input the summery!';
		return false;
	}else{
		warnMessage = '';
		return true;
	}
}

// function checkTagInput(){
// 	if( tagInput.value.length <= 0 ){
// 		warnMessage = 'Please choose a tag!';
// 		return false;
// 	}else{
// 		warnMessage = '';
// 		return true;
// 	}
// }

function resetWarn(){
	warnMessage = '';
	remindMessage.innerHTML = warnMessage;
}

function checkAllInput(){
	for( let i = 0; i < form.elements.length -2; i++ ){
		if( form.elements[i].value.length <= 0 ){
			warnMessage = 'Please fill out all the fields!';
			return false;
		}else{
			warnMessage = '';
			return true;
		}
	}
}

function checkValidInput(){
	if( !checkAllInput() ){
		return false;
	}
	if(
		!checkTitleInput(titleInput) ||
		!checkUrlInput(urlInput) ||
		!checkSummaryInput(summaryInput) //||
		//!checkTagInput(tagInput)
	){
		return false;
	}
	warnMessage = '';
	return true;
}

/********************Edit Input Validation Functions*************************/

function checkEditInput(e){
	let key = e.getAttribute('name');
	if ( key === 'title' ){
		e.addEventListener( 'blur',renderEditTitleMessage );
	}else if ( key === 'url' ){
		e.addEventListener( 'blur',renderEditUrlMessage );
	}else if ( key === 'tag' ){
	//	e.addEventListener( 'blur',renderEditTageMessage );
	}else if ( key === 'summery' ){
		e.addEventListener( 'blur',renderSummeryMessage );
	}
}

/*******************Render Input Validation Message Function*******************/

function renderTitleMessage(){
	checkTitleInput(titleInput);
	remindMessage.innerHTML = warnMessage;
}

function renderUrlMessage(){
	checkUrlInput(urlInput);
	remindMessage.innerHTML = warnMessage;
}

// function renderTagMessage(){
// 	checkTagInput(tagInput);
// 	remindMessage.innerHTML = warnMessage;
// }

function renderSummaryMessage(){
	checkSummaryInput(summaryInput);
	remindMessage.innerHTML = warnMessage;
}

/********************Render Edit Input Validation Msg Functions*************************/

function renderEditTitleMessage(){
	checkTitleInput(this);
	this.parentNode.nextSibling.innerHTML = warnMessage;
}

function renderEditUrlMessage(){
	checkUrlInput(this);
	this.parentNode.nextSibling.innerHTML = warnMessage;
}

// function renderEditTageMessage(){
// 	checkTagInput(this);
// 	this.parentNode.nextSibling.innerHTML = warnMessage;
// }

function renderEditSummaryMessage(){
	checkSummaryInput(this);
	this.parentNode.nextSibling.innerHTML = warnMessage;
}

/********************Listener Functions*************************/
function clickSubmitFunc(event){
	event.preventDefault();
	if(checkValidInput()){
		console.log("peform Add", showList[showList.selectedIndex].text);
		performAddPostRequest(titleInput.value,urlInput.value,showList[showList.selectedIndex].text,summaryInput.value);
		resetInput();
	}else{
		remindMessage.innerHTML = warnMessage;
	}
}

function clickDeleteFunc(){
	//console.log("delete function "+ this.parentNode.attributes["id"].value);
	performDeletePostRequest(LinksMap[this.parentNode.attributes["id"].value]);
}

function clickCancelFunc(){
	const parent = this.parentNode;
	const grandParent = parent.parentNode;
	const child = parent.childNodes;
	for(let i = 0; i  < 4; i++){
		if(i ===2) continue;
		let e = child[i];
		e.setAttribute('disabled','disabled');
	}
	this.parentNode.nextSibling.innerHTML = '';
	toggleVisible(this, 1);
}

function clickSaveFunc(){
	const parent = this.parentNode;
    const child = parent.childNodes;
		for(let i = 0; i  < 4; i++){
			if(i ===2) continue;
			let e = child[i];
			e.setAttribute('disabled','disabled');
		}
		let Link = LinksMap[this.parentNode.attributes["id"].value];//todo: follow name convention
		Link.title = child[0].value;
		Link.tag = child[3].value;
		//console.log("saveFunction title and tag is" + child[0].value +" "+ child[3].value); //todo: better way to log
	performEditPostRequest(Link);
	toggleVisible(this, 0);
}

// vote router
function clickVoteFunc(){
	let Link = LinksMap[this.parentNode.attributes["id"].value];
	if(debug) console.log(Link);

	let isVoted = this.getAttribute('type') === 'unvote'; // name = [undifined, vote, unvote]
	if(isVoted) {
		Link.vote -= 1;
		this.setAttribute('type', 'vote');
		this.innerHTML = 'Vote';
		this.previousSibling.previousSibling.value = Link.vote;
		postUnvoteRequest(Link);
	} else {
		Link.vote += 1;
		this.setAttribute('type', 'unvote');
		this.innerHTML = 'Unvote';
		this.previousSibling.previousSibling.value = Link.vote;
		postVoteRequest(Link);
	}
}

function clickEditFunc(){
	const child = this.parentNode.childNodes;
	for(let i = 0; i  < 4; i++){
		if( i ===2) continue;
		let e = child[i];
		checkEditInput(e);
		e.removeAttribute('disabled');
	}
	child[1].focus();
	toggleVisible(this, -1);
}

function clickEducation(){
	filter('Education');
	render();
}

function clickEntertainment(){
	filter('Entertainment');
	render();
}

function clickFinance(){
	filter('Finance');
	render();
}

function clickPolitics(){
	filter('Politics');
	render();
}

function clickSports(){
	filter('Sports');
	render();
}

function clickAll(){
	LinksToDisplay = [];
	for(let key in LinksMap){
		LinksToDisplay.push(LinksMap[key]);
	}
	render();
}

function clickSort(){
	console.log(sortByButton[sortByButton.selectedIndex].value);
	if(sortByButton[sortByButton.selectedIndex].value === 'vote'){
		sortByVote();
		render();
	}
	if(sortByButton[sortByButton.selectedIndex].value === 'title'){
		sortByTitle();
		render();
	}

}
function toggleVisible(node, cur) {
	node.parentNode.classList.remove('mark-list');
	node.style.display = 'none';

	if( cur === -1 ){
	 node.nextSibling.style.display = 'none';
	 node.nextSibling.nextSibling.style.display = 'inline';
	 node.nextSibling.nextSibling.nextSibling.style.display = 'inline';
	}else if ( cur === 0 ){
	 node.nextSibling.style.display = 'none';
	 node.previousSibling.style.display = 'inline'
	 node.previousSibling.previousSibling.style.display = 'inline';
 } else if( cur === 1 ){
	 node.previousSibling.style.display = 'none';
	 node.previousSibling.previousSibling.style.display = 'inline';
	 node.previousSibling.previousSibling.previousSibling.style.display = 'inline';
	}
  }

  function toggleComplete(event){
   if ( event.target.getAttribute('disabled') === 'disabled' ){
	event.target.parentNode.classList.toggle('mark-list');
   }
  }
/********************Add Listener Functions*************************/
function addClickListener(){
	submitButton.addEventListener('click',clickSubmitFunc);
	resetButton.addEventListener('click',resetWarn);
	educationButton.addEventListener('click',clickEducation);
	entertainmentButton.addEventListener('click',clickEntertainment);
	financeButton.addEventListener('click',clickFinance);
	politicsButton.addEventListener('click',clickPolitics);
	sportsButton.addEventListener('click',clickSports);
	allButton.addEventListener('click',clickAll);
	sortByButton.addEventListener( 'change',clickSort );
	Array.from(document.getElementsByClassName('url-content')).forEach(element =>
    element.addEventListener('click', toggleComplete)
  );
}

function addInputListener(){
	titleInput.addEventListener('blur',renderTitleMessage);
	urlInput.addEventListener('blur',renderUrlMessage);
	summaryInput.addEventListener('blur',renderSummaryMessage);
	//tagInput.addEventListener('blur',renderTagMessage);
}

function addSmallButtonListener(){
	//console.log("add small listener");
	Array.from(document.getElementsByClassName('delete-button')).forEach(
		element => element.addEventListener('click',clickDeleteFunc)
		);
	Array.from(document.getElementsByClassName('vote-button')).forEach(
		element => element.addEventListener('click',clickVoteFunc) //todo: a better name
		);
		Array.from(document.getElementsByClassName('save-button')).forEach(
		element => element.addEventListener('click',clickSaveFunc)
		);
		Array.from(document.getElementsByClassName('cancel-button')).forEach(
		element => element.addEventListener('click',clickCancelFunc)
		);
		Array.from(document.getElementsByClassName('edit-button')).forEach(
		element => element.addEventListener('click',clickEditFunc)
		);
}


/********************Refresh Functions*************************/
const callGetDataRequest = (() => {
	return fetch('/data')
	.then(response => {
		if(!response.ok){
			return Promise.reject("error-response-not-okay");
		}
		return response.json();
	})
	.catch( (error) => {
		if(error.toString().startsWith('error-')){
			return Promise.reject(error);
		}
		return Promise.reject('error-response-josn-bad');
	});
});

const performGetDataRequest = (() => {

	callGetDataRequest()
	.then( fromJson => {
		LinksMap = fromJson;
		for(let key in LinksMap){
		 	LinksToDisplay.push(LinksMap[key]);
		}
		render();
	})
	.catch( error => {
		console.log(error + "getdata part");
	    //remindMessage.innerHTML = error;
	});
});

/********************Delete Functions*************************/
const callDeletePostRequest = ( (Link) => {
	//console.log("call Delete request" + Link.id);
	return fetch('/delete',{method: 'POST', body: JSON.stringify(Link) })
	.then(response => {
		if(!response.ok){
			return Promise.reject("error-response-not-okay");
		}
		return response.json();
	})
	.catch( (error) => {
		console.log(error);
		if(error.toString().startsWith('error-')){
			return Promise.reject(error);
		}
		return Promise.reject('error-response-josn-bad');
	});
});

const performDeletePostRequest = ( (Link) => {
	//console.log("perform delete");
	callDeletePostRequest(Link)
	.then(fromJson => {
		deleteLoalData(fromJson);
		//console.log('delete render');
		render();
	})
	.catch( error => {
		console.log(error + " delete part");
		//remindMessage.innerHTML = error;
	});
});

function deleteLoalData(Link){
	delete LinksMap[Link.id];
	for(let i = 0; i < LinksToDisplay.length; i++){
		if(LinksToDisplay[i].id == Link.id){
			LinksToDisplay.splice(i,1);
		}
	}
}

/********************Edit Functions*************************/
const callEditPostRequest = ( (Link) => {
	return fetch('/edit',{method: 'POST', body: JSON.stringify(Link)})
	.then(response => {
		if(!response.ok){
			return Promise.reject("error-response-not-okay");
		}
		return response.json();
	})
	.catch( (error) => {
		if(error.toString().startsWith('error-')){
			return Promise.reject(error);
		}
		return Promise.reject('error-response-josn-bad');
	});
});

// send edit request
const performEditPostRequest = (Link) => {
	callEditPostRequest(Link) //todo: bad name
	.then(fromJson => {
		//console.log("edit part from server" + fromJson.title);
		editLoalData(fromJson);
		render();
	})
	.catch( error => {
		console.log("edit part" + error);
		remindMessage.innerHTML = error;
	});
};

const postVoteRequest = (Link) => {
	fetch('/vote', {method:'POST', body: JSON.stringify(Link)})
	.catch ((error) => {
		if(debug) console.log('postVoteRequest() failed; ' + Link);
	});
}

const postUnvoteRequest = (Link) => {
	fetch('/unvote', {method:'POST', body: JSON.stringify(Link)})
	.catch ((error) => {
		if(debug) console.log('postVoteRequest() failed; ' + Link);
	});
}

function editLoalData(Link){
	LinksMap[Link.id] = Link;
	for(let i = 0; i < LinksToDisplay.length; i++){

		if(LinksToDisplay[i].id === Link.id){
			//console.log(LinksToDisplay[i].id, " vs ", Link.title);
			LinksToDisplay[i] = Link;
		}
	}
}

/******************** Add Functions *************************/
const callAddPostRequest = (titleValue, urlValue, tagValue, summaryValue) => {
	return fetch('/add',{method: 'POST', body: JSON.stringify({
		title : titleValue,
		url : urlValue,
		tag : tagValue,
		summary : summaryValue
	})})
	.then(response => {
		if(!response.ok){
			return Promise.reject("error-response-not-okay");
		}
		return response.json();
	})
	.catch( (error) => {
		if(error.toString().startsWith('error-')){
			return Promise.reject(error);
		}
		return Promise.reject('error-response-josn-bad');
	});
};

//send add request
const performAddPostRequest = (titleValue, urlValue, tagValue, summaryValue) => {
	//console.log("call add" + titleValue + urlValue + tagValue + summaryValue);
	callAddPostRequest(titleValue, urlValue, tagValue, summaryValue)
	.then( fromJson => {
		addLoalData(fromJson);
		render();
	})
	.catch( error => {
		console.log("add error -> "+ error);
		remindMessage.innerHTML = error;
	});
};

function addLoalData(Link){
	LinksMap[Link.id] = Link;
	LinksToDisplay.push(Link);
	render();
}


/********************Filter function*************************/
function filter(field){
	LinksToDisplay = [];
	for(let key in LinksMap){
		//console.log(LinksMap[key].tag);
		if(LinksMap[key].tag.includes(field)){
			LinksToDisplay.push(LinksMap[key]);
		}
	}
}
/********************Sort funtion*************************/

function sortByVote(){
	LinksToDisplay.sort((a,b) => {
	 return a.vote - b.vote;
	});
   }

   function sortByTitle(){
	LinksToDisplay.sort((a,b) => {
	 return a.vote - b.vote;
	});
   }


/********************Init funtion*************************/
function init(){
	console.log("already init");
	performGetDataRequest();
}

function addListener(){
	addClickListener();
	addInputListener();
	addSmallButtonListener();
}

render();
init();
