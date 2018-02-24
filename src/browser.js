/*******************Initiable Global Variabels*******************/

const submitButton = document.querySelector('.submit-button');
const resetButton = document.querySelector('.reset-button');

//tag buttons: more than one
const all-Button = document.querySelector('.all-Button');
const tag1-Button = document.querySelector('.tag1-Button');
const tag2-Button = document.querySelector('.tag1-Button');
const sortByButton = document.querySelector('.sort-dropdown');//Not sure...

const form = document.querySelector('.input-form');//it contains all the input

const titleInput = document.querySelector('.title-input');//all inputs should have names
const urlInput = document.querySelector('.url-input');
const authorInput = document.querySelector('.author-input');
const summeryInput = document.querySelector('.summery-input');
const tagInput = document.querySelector('.tag-dropdown');//Not sure...

const remindMessage = document.querySelector('.warn-message');

const showList = document.querySelector('.show-list');

const urlList = [];
const tag1List = [];
const tag2List = [];

const hashList = [];//used to record formObjects' id;

let warnMessage;

const str = '<span class="show-vote"><button class="vote-button"></button></span>'+
			'<span><font class="vote-count">99 </font></span>'+
			'<span class="show-edit"><button class="edit-button"></button></span>'+
			'<span class="show-delete"><button class="delete-button"></button></span>'+
			'<span class="hide-check"><button class="check-button"></button></span>'+
			'<span class="hide-cancel"><button class="cancel-button"></button></span>';

/*******************Utilities Functions*******************/

function resetInput(){
	for( let i = 0; i < form.elements.length - 2; i++ ){ //-2 means minus two buttons
		form.elements[i].value = '';
	}
}

function hash(){
	return ( Math.random() * Math.random() * Math.random() ).toString();
}

function transFormToObject(){ 
	let formObject = {};
	for ( let i = 0; i < form.elements.length - 2; i++ ){
	formObject[form.elements[i].name] = form.elements[i].value;		
	}
	let key = hase();
	while ( hashList.includes(key) ){
		key = hash();
	}
	hashList.push(key);
	formObject.id = key;
	return formObject;
}

function getObjectId(obj){
	let id = '';
    Object.entries(obj).forEach(([key, value]) => {
    	if ( key === 'id' ) id = value;
    });
    return id;
}

function sortByAuthor(list){

}

function transUrlToInput(obj){
	let str = '';
	let type = 'text';
	Object.entries(obj).forEach(([key,value]) => {
		str += `<input type=${type} name=${key} value='${value}'>`;
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



/*******************Make List Functions*******************/
//make whole list
function addToList(obj) {
	const id = getObjectId(obj);
	let str = makeListStr(obj);
	let item = { obj: obj, id: id, str: str };
	urlList.push(item);
	renderList();
}

function generateList(){
	const list = urlList.map( element => `<li>${element.str}${str}</li><h4 class='edit-reminder'></h4>` ).join('\n');
	return list;
}

function makeListStr(obj){
	let str = '';
	Object.entries(obj).forEach(([key.value]) => {
		if( key === 'dontknowyet' ){
			str += value;
		}
	});
	return str;
}

function renderList(){
	showList.innerHTML = generateList();
}

function removeFromList(arr, obj){
	for( let i = 0; i < arr.length; i++ ){
		if( arr[i].id === obj.id ) arr.splice(i, 1);
	}
}

function addToHashList(obj){
	Object.entries(obj).forEach(([ key,value ]) => {
		if( key === 'id' ) hashList.push(value);
	});
}

//make different tag lists

function addToTag1List(obj) {
	const id = getObjectId(obj);
	let str = makeListStr(obj);
	let item = { id: id, str: str };
	if(obj.tag === 'tag1'){
		tag1List.push(item);
	}
}

function addToTag2List(obj) {
	const id = getObjectId(obj);
	let str = makeListStr(obj);
	let item = { id: id, str: str };
	if(obj.tag === 'tag2'){
		tag2List.push(item);
	}
}

function addToSublist(obj){
	addToTag1List(obj);
	addToTag2List(obj);
}

function generateTag1List(){
	const list = tag1List.map( element => `<li>${element.str}${str}</li><h4 class='edit-field'></h4>` ).join('\n');
	return list;
}

function generateTag2List(){
	const list = tag2List.map( element => `<li>${element.str}${str}</li><h4 class='edit-field'></h4>` ).join('\n');
	return list;
}

function renderTag1List(){
	showList.innerHTML = generateTag1List();
}

function renderTag2List(){
	showList.innerHTML = generateTag2List();
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

function checkAuthorInput(authorInput){
	if( authorInput.value.length <= 0 ){
		warnMessage = 'Please input the author!';
		return false;
	}else{
		warnMessage = '';
		return true;
	}
}

function checkSummeryInput(){
	if( summeryInput.value.length <= 0 ){
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
		!checkSummeryInput(summeryInput)
		!checkTagInput(tagInput)||
		!checkAuthorInput(authorInput)
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
	}else if ( key === 'author' ){
		e.addEventListener( 'blur',renderEditAuthorMessage) ;
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

function renderAuthorMessage(){
	checkAuthorInput(authorInput);
	remindMessage.innerHTML = warnMessage;
}

function renderTagMessage(){
	checkTagInput(tagInput);
	remindMessage.innerHTML = warnMessage;
}

function renderSummeryMessage(){
	checkSummeryInput(summeryInput);
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

function renderEditAuthorMessage(){
	checkAuthorInput(this);
	this.parentNode.nextSibling.innerHTML = warnMessage;
}

function renderEditTageMessage(){
	checkTagInput(this);
	this.parentNode.nextSibling.innerHTML = warnMessage;
}

function renderEditSummeryMessage(){
	checkSummeryInput(this);
	this.parentNode.nextSibling.innerHTML = warnMessage;
}

/********************Fetch Functions*************************/
function createUrlListItem(obj){
	fetch('/add',{
		method: 'POST',
		body: JSON.stringify({
			obj
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(function(req)){
			if(!req.ok){
				throw Error(req.status);
			}
			addToList(obj);
			addToSublist(obj);
			resetInput();
		})
		.catch(function(err){
			console.log(err + 'this is error');
		});
}

function updateWorkListItem(obj){
	fetch('/edit',{
		method: 'PUT',
		body: JSON.stringity({
			obj
		}),
		headers:{
			'Content-Type': 'application/json'
		}
	})
		.then(function(req){
			if(!req.ok){
				throw Error(req.status);
			}
			addToList(obj);
		})
		.catch(function(err) {
      		console.log(err + 'this is error');
    	});
}

function deleteWorkListItem(obj){

}

function getWorkList(){

}

/********************Listener Functions*************************/
function clickCreateFunc(event){
	event.preventDefault();
	if(checkValidInput()){
		const obj = transFormToObject();
		createUrlListItem();
	}else{
		remindMessage.innerHTML = warnMessage;
	}
}

function clickDeleteFunc(){

}

function clickCancelFunc(){

}

function clickCheckFunc(){

}

function clickEditFunc(){

}

/********************Add Listener Functions*************************/
function addClickListener(){
	submitButton.addEventListener('click',clickCreateFunc);
	resetButton.addEventListener('click',resetWarn);
}

function addInputListener(){
	titleInput.addEventListener('blur',renderTitleMessage);
	urlInput.addEventListener('blur',renderUrlMessage);
	authorInput.addEventListener('blur',renderAuthorMessage);
	summeryInput.addEventListener('blur',renderSummeryMessage);
	tagInput.addEventListener('blur',renderTagMessage);
}

function addSmallButtonListener(){
	Array.from(document.getElementsByClassName('delete-button')).forEach(
		element => element.addEventListener('click',clickDeleteFunc)
		);
}
/********************Refresh Functions*************************/