/*******************Initiable Global Variabels*******************/

const submitButton = document.querySelector('.submit-button');
const resetButton = document.querySelector('.reset-button');

const allButton = document.querySelector('.all-Button');
const educationButton = document.querySelector('.educaiton-Button');
const entertainmentButton = document.querySelector('.entertainment-Button');
const financeButton = document.querySelector('.finance-Button');
const politicsButton = document.querySelector('.politics-Button');
const sportsButton = document.querySelector('.sports-Button');
const sortByButton = document.querySelector('.sort-dropdown');//Not sure...

const form = document.querySelector('.input-form');//it contains all the input

const titleInput = document.querySelector('.title-input');//all inputs should have names
const urlInput = document.querySelector('.url-input');
const summaryInput = document.querySelector('.summary-input');
const tagInput = document.querySelector('.tag-dropdown');

const remindMessage = document.querySelector('.warn-message');

const urlContent = document.querySelector('.url-content');

//添加的部分 
let LinksMap = {};  
let LinksToDisplay = [];

let warnMessage;

const str = '<button class="vote-button">vote</button>'+
			'<button class="edit-button">edit</button>'+
			'<button class="delete-button">delete</button>'+
			'<button class="save-button">save</button>'+
			'<button class="cancel-button">cancel</button>';

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
		if(key === "id") continue;
		str += `<input type=${type} name=${key} value=${obj[key]} disabled='disabled'>`;
	}
	return str;
} 

function transInputToObject(arr){
	let obj={};
	arr.forEach(element => {
		let value = element.value;
		obj[element.name] = value;
	});
	console.log(obj);
	return obj;
}

function vote(){
//斌哥，这块加vote算法
}

/*******************Make List Functions*******************/
//make whole list 

function render(){
	addToList();
	addListener();
}


function addToList() {
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
	//console.log(urlList[0].url+" urlList内容");
	const list = urlList.map( element => `<li id=${element.id} >${element.str}${str}</li><h4 class='edit-reminder'></h4>` ).join('\n');
//console.log(list);
	return list;
}

function renderList(urlList){
	//console.log(generateList( urlList));
	console.log("erase urlcontent");
	urlContent.innerHTML = "";
	urlContent.innerHTML = generateList(urlList);
}

/*******************Input Validation Function*******************/

function checkTitleInput(titleInput) {
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

function checkTagInput(){
	if( tagInput.value.length <= 0 ){
		warnMessage = 'Please choose a tag!';
		return false;
	}else{
		warnMessage = '';
		return true;
	}
}

function resetWarn(){
	warnMessage = '';
	remindMessage.innerHTML = warnMessage;
}

function checkAllInput(){
	for( let i = 0; i < form.elements.length -2; i++ ){
		if( form.elements[i].value.length <= 0 ){
			warnMessage = 'Please fill all the input!';
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
		!checkSummaryInput(summaryInput) ||
		!checkTagInput(tagInput)
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

function renderTagMessage(){
	checkTagInput(tagInput);
	remindMessage.innerHTML = warnMessage;
}

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
		performAddPostRequest(titleinput.value,urlInput.value,tagInput.value,summaryInput.value);
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
	let i = 0;
	child.forEach(e => {
		e.setAttribute('disabled','disabled');
	});
	this.parentNode.nextSibling.innerHTML = '';
	toggleVisible(this, 1);
}

function clickSaveFunc(){
	const parent = this.parentNode;
    const ulParent = parent.parentNode;
    const child = parent.childNodes;
    child.forEach( e => {
    	e.getAttribute( 'disabled','disabled' );
    } )
	performEditPostRequest(LinksMap[this.parentNode.attributes["id"].value]);
	toggleVisible(this, 0);
}

function clickEditFunc(){
	const child = this.parentNode.childNodes;
	for(let i = 0; i  < 4; i++){
		if(i === 1) continue;
		let e = child[i];
		checkEditInput(e);
		e.removeAttribute('disabled');
	}
	child[1].focus();
	toggleVisible(this, -1);
}

function clickEducation(){
	filter(education);
	render();
}

function clickEntertainment(){
	filter(entertainment);
	render();
}

function clickFinance(){
	filter(finance);
	render();
}

function clickPolitics(){
	filter(politics);
	Render();
}

function clickSports(){
	filter(sports);
	Render();
}

function clickAll(){
	LinksToDisplay = [];
	for(let key in LinksMap){
		LinksToDisplay.push(LinksMap[key]);
	}
	render();
}

function clickSort(){
	if(sortByButton.value === vote){
		sortByVote();
		render();
	}
	if(sortByButton.value === title){
		sortByTitle();
		render();
	}
}
function toggleVisible(node, cur) {//实际需要根据效果更改
	node.parentNode.parentNode.classList.remove('mark-list');
	node.style.display = 'none';
	
	if( cur === -1 ){
	 node.nextSibling.style.display = 'none';
	 node.nextSibling.nextSibling.style.display = 'inline';
	 node.nextSibling.nextSibling.nextSibling.style.display = 'inline';
	}else if ( cur === 0 ){
	 node.parentNode.nextSibling.childNode.style.display = 'none';
	 node.parentNode.previousSibling.childNode.style.display = 'inline'
	 node.parentNode.previousSibling.previousSibling.childNode.style.display = 'inline';
	} else{
	 node.parentNode.previousSibling.childNode.style.display = 'none';
	 node.parentNode.previousSibling.previousSibling.childNode.style.display = 'inline';
	 node.parentNode.previousSibling.previousSibling.previousSibling.childNode.style.display = 'inline';
	}
  
  }
  
  function toggleComplete(event){
   if ( event.target.getAttribute('disabled') === 'disabled' ){
	event.target.parentNode.parentNode.classList.toggle('mark-list');
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
	//allButton.addEventListener('click',clickSports);
	sortByButton.addEventListener( 'click',clickSort ); 
	Array.from(document.getElementsByClassName('url-content')).forEach(element =>
    element.addEventListener('click', toggleComplete)
  );
}

function addInputListener(){
	titleInput.addEventListener('blur',renderTitleMessage);
	urlInput.addEventListener('blur',renderUrlMessage);
	summaryInput.addEventListener('blur',renderSummaryMessage);
	tagInput.addEventListener('blur',renderTagMessage);
}

function addSmallButtonListener(){
	console.log("add small listener");
	Array.from(document.getElementsByClassName('delete-button')).forEach(
		element => element.addEventListener('click',clickDeleteFunc)
		);
	Array.from(document.getElementsByClassName('vote-button')).forEach(
		element => element.addEventListener('click',clickDeleteFunc)////斌哥，这块加vote的算法)
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
	callDeletePostRequest(Link)
	.then(() => {
		deleteLoalData(Link);
		console.log('delete render');
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

// 发送edit请求
const performEditPostRequest = (Link) => {
	callEditPostRequest(Link)
	.then(() => {
		editLoalData(Link);
		render();
	})
	.catch( error => {
		remindMessage.innerHTML = error;
	});
};

function editLoalData(Link){
	LinksMap[Link.id] = Link;
	if(LinksToDisplay[i].id == Link.id){
		LinksToDisplay[i] = Link;
	}
}

/******************** Add Functions *************************/
const callAddPostRequest = ( ({titleValue, urlValue, tagValue, summaryValue}) => {
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
}); 

//发送添加请求
const performAddPostRequest = ({titleValue, urlValue, tagValue, summaryValue}) => {
	callAddPostRequest(titleValue, urlValue, tagValue, summaryValue)
	.then(() => {
		addLoalData(Link);
		render();
	})
	.catch( error => {
		remindMessage.innerHTML = error;
	});
};

function addLoalData(Link){
	LinksMap[Link.id] = Link;
	LinksToDisplay.push(Link);
}


/********************Filter function*************************/
function filter(field){
	LinksToDisplay = [];
	for(let key in LinksMap){
		if(LinksMap[key].tag.includes(field)){
			LinksMap.push(LinksMap[key]);
		}
	}
	render();
}
/********************Sort funtion*************************/
//vote
function Sort(){
	LinksToDisplay.sort((a,b) => {
		return a.vote - b.vote;
	});
	render();
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


init();