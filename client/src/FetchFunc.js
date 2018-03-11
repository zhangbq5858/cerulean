/********************Delete Functions*************************/
const callDeletePostRequest = ( (linkId) => {
	//console.log("call Delete request" + Link.id);
	return fetch('/delete',{method: 'POST', body: JSON.stringify({
		linkId:linkId,
	}) })
	.then(response => {
		if(!response.ok){
			return Promise.reject("error-response-not-okay");
		}
		return response.json();
	})
	.catch( (error) => {
		console.log("server port error is that -> ", error);
		if(error.toString().startsWith('error-')){
			return Promise.reject(error);
		}
		return Promise.reject('error-response-josn-bad');
	});
});


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

// // send edit request
// const editPostRequest = (Link) => {
// 	callEditPostRequest(Link) //todo: bad name
// 	.then(fromJson => {
// 		//console.log("edit part from server" + fromJson.title);
// 		editLoalData(fromJson);
// 		render();
// 	})
// 	.catch( error => {
// 		console.log("edit part" + error);
// 	});
// };

const postVoteRequest = ((linkId, userId) => {
	return fetch('/vote', {method:'POST', body: JSON.stringify({
		linkId: linkId,
		userId: userId,
	})})
	.then(response => {
		if(!response.ok){
			return Promise.reject("error-response-not-okay");
		}
		return response.json();
	})
	.catch ((error) => {
		console.log("server port error is that -> ", error);
		if(error.toString().startsWith('error-')){
			return Promise.reject(error);
		}
		return Promise.reject('error-response-josn-bad');
	});
});

const postUnvoteRequest = ((linkId, userId) => {
	return fetch('/unvote', {method:'POST', body: JSON.stringify({
		linkId: linkId,
		userId: userId,
	})})
	.then(response => {
		if(!response.ok){
			return Promise.reject("error-response-not-okay");
		}
		return response.json();
	})
	.catch ((error) => {
		console.log("server port error is that -> ", error);
		if(error.toString().startsWith('error-')){
			return Promise.reject(error);
		}
		return Promise.reject('error-response-josn-bad');
	});
});

// function editLoalData(Link){
// 	LinksMap[Link.id] = Link;
// 	for(let i = 0; i < LinksToDisplay.length; i++){

// 		if(LinksToDisplay[i].id === Link.id){
// 			//console.log(LinksToDisplay[i].id, " vs ", Link.title);
// 			LinksToDisplay[i] = Link;
// 		}
// 	}
// }

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
// const addPostRequest = (titleValue, urlValue, tagValue, summaryValue) => {
// 	//console.log("call add" + titleValue + urlValue + tagValue + summaryValue);
// 	callAddPostRequest(titleValue, urlValue, tagValue, summaryValue)
// 	.then( fromJson => {
// 		addLoalData(fromJson);
// 		render();
// 	})
// 	.catch( error => {
// 		console.log("add error -> "+ error);
// 	});
// };

// function addLoalData(Link){
// 	LinksMap[Link.id] = Link;
// 	LinksToDisplay.push(Link);
// 	render();
// }

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

// const getDataRequest = () => {

// 	callGetDataRequest()
// 	.then( fromJson => {
// 		LinksMap = fromJson;
// 		for(let key in LinksMap){
// 		 	LinksToDisplay.push(LinksMap[key]);
// 		}
// 		render();
// 	})
// 	.catch( error => {
// 		console.log(error + "getdata part");
// 	});
// };



module.exports = {
    callDeletePostRequest,
    callEditPostRequest,
	callAddPostRequest,
	postVoteRequest,
	postUnvoteRequest,
	callGetDataRequest,
}