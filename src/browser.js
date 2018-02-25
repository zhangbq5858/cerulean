/*******************Initiable Global Variabels*******************/

const submitButton = document.querySelector('.submit-button');
const resetButton = document.querySelector('.reset-button');

const allButton = document.querySelector('.all-Button');
const educationButton = document.querySelector('.education-Button');
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

const showList = document.querySelector('.show-list');

//添加的部分 
let LinksMap = {};  
let LinksToDisplay = [];

let warnMessage;

const str = '<span><button class="vote-button"></button></span>'+
			'<span><font class="vote-count">99 </font></span>'+
			'<span ><button class="edit-button"></button></span>'+
			'<span ><button class="delete-button"></button></span>'+
			'<span ><button class="save-button"></button></span>'+
			'<span ><button class="cancel-button"></button></span>';

/*******************Utilities Functions*******************/

function resetInput(){
	for( let i = 0; i < form.elements.length - 2; i++ ){ //-2 means minus two buttons
		form.elements[i].value = '';
	}
}

function transUrlToInput(obj){
	let str = '';
	let type = 'text';
	Object.entries(obj).forEach(([key,value]) => {
		str += `<input type=${type} name=${key} value=${value} disabled='disabled'>`;
	});
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
}

function addToList() {
	let urlList = [];
	for( element in LinksToDisplay ){
		let str = transUrlToInput(element);
		let item = { obj: obj, str: str };
		urlList.push(item);
	}
	renderList(urlList);
}

function generateList(urlList){
	const list = urlList.map( element => `<li id=${element.obj.id} >${element.str}${str}</li><h4 class='edit-reminder'></h4>` ).join('\n');
	return list;
}

function renderList(urlList){
	showList.innerHTML = generateList(urlList);
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
		e.addEventListener( 'blur',renderEditTageMessage );
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

function renderSummeryMessage(){
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

function renderEditTageMessage(){
	checkTagInput(this);
	this.parentNode.nextSibling.innerHTML = warnMessage;
}

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
	performDeletePostRequest(LinksMap[parent.id]);
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
	performEditPostRequest(LinksMap[parent.id]);
	toggleVisible(this, 0);
}

function clickEditFunc(){
	const child = this.parentNode.childNodes;
	child.forEach( e => {
		checkEditInput(e);
		e.removeAttribute('disabled');
	} );
	child[0].focus();
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
  } else{
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
	allButton.addEventListener('click',clickSports);
	sortByButton.addEventListener( 'click',clickSort ); 
	Array.from(document.getElementsByClassName('show-list')).forEach(element =>
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
	Array.from(document.getElementsByClassName('delete-button')).forEach(
		element => element.addEventListener('click',clickDeleteFunc)
		);
	Array.from(document.getElementsByClassName('vote-button')).forEach(
		element => element.addEventListener('click',)////斌哥，这块加vote的算法)
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
		console.log(error);
	   // updateMessage(element, makeError(error));
	});
});

/********************Delete Functions*************************/
const callDeletePostRequest = ( (Link) => {
	console.log("delete request  "+Link);
	return fetch('/delete',{method: 'POST', body: JSON.stringify(Link) })
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

const performDeletePostRequest = ( (link) => {
	callDeletePostRequest(LinksMap[0])
	.then(() => {
		deleteLoalData(Link);
		render();
	})
	.catch( error => {
	 //   updateMessage(element, makeError(error));
	});
});

function deleteLoalData(Link){
	delete LinksMap[Link.id];
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
const performEditPostRequest = ({Link}) => {
	callEditPostRequest(Link)
	.then(() => {
		editLoalData(Link);
		render();
	})
	.catch( error => {
	 //   updateMessage(makeError(error));
	});
};

function editLoalData(Link){
	LinksMap[Link.id] = Link;
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
const performAddPostRequest = ({Link}) => {
	callAddPostRequest(Link)
	.then(() => {
		addLoalData(Link);
		render();
	})
	.catch( error => {
   //     updateMessage(makeError(error));
	});
};

function addLoalData(Link){
	LinksMap[Link.id] = Link;
}


/********************Filter function*************************/
function filter(field){
	LinksToDisplay = [];
	for(let key in LinksMap){
		if(LinksMap[key].tag.includes(field)){
			LinksToDisplay.push(LinksMap[key]);
		}
	}
	render();
}
/********************Sort funtion*************************/
//vote
function sortByVote(){
	LinksToDisplay.sort((a,b) => {
		return a.vote - b.vote;
	});
	render();
}

function sortByTitle(){
	LinksToDisplay.sort((a,b) => {
		return a.title - b.title;
	});
	render();
}

/********************Init funtion*************************/
function init(){
	performGetDataRequest();
	addListener();
}

function addListener(){
	addClickListener();
	addInputListener();
	addSmallButtonListener();
}


init();