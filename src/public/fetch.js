(() => {

    //TODO 更新本地数据的方法，以及考虑每次edit，delete，add请求后，server可以返回
    //一个Link object来和本地的Link的id进行比较更新


    let LinksMap = {};
    let LinksArr = [];
    let add = document.querySelector('.add');
    let edit = document.querySelector('.edit');
    let del = document.querySelector('.delete');
    let input = document.querySelector('.input');

    // 删除任务请求，测试只删除id为0的Link object
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
            if(error.toString().startWith('error-')){
                return Promise.reject(error);
            }
            return Promise.reject('error-response-josn-bad');
        }); 
    });
    const performDeletePostRequest = ( () => {
        callDeletePostRequest(LinksMap[0])
        .then(() => {
            deleteLoalData(Link);
        })
        .catch( error => {
         //   updateMessage(element, makeError(error));
        });
    });

    const callEditPostRequest = ( (Link) => {
        return fetch('/edit',{method: 'POST', body: JSON.stringify(Link)})
        .then(response => {
            if(!response.ok){
                return Promise.reject("error-response-not-okay");
            }
            return response.json();
        })
        .catch( (error) => {
            if(error.toString().startWith('error-')){
                return Promise.reject(error);
            }
            return Promise.reject('error-response-josn-bad');
        }); 
    });  

    // 发送edit请求
    const performEditPostRequest = ({Link}) => {
        callEditPostRequest(Link)
        .then(() => {
        //    editLoalData(Link);
        })
        .catch( error => {
         //   updateMessage(makeError(error));
        });
    };

    const callAddPostRequest = ( (Link) => {
        return fetch('/add',{method: 'POST', body: JSON.stringify(Link)})
        .then(response => {
            if(!response.ok){
                return Promise.reject("error-response-not-okay");
            }
            return response.json();
        })
        .catch( (error) => {
            if(error.toString().startWith('error-')){
                return Promise.reject(error);
            }
            return Promise.reject('error-response-josn-bad');
        }); 
    }); 

    //发送添加请求
    const performAddPostRequest = ({Link}) => {
        callAddPostRequest(Link)
        .then(() => {
       //     addLoalData(Link);
        })
        .catch( error => {
       //     updateMessage(makeError(error));
        });
    };


    const callGetDataRequest = (() => {
        return fetch('/data')
        .then(response => {
            if(!response.ok){
                return Promise.reject("error-response-not-okay");
            }
            return response.json();
        })
        .catch( (error) => {
            if(error.toString().startWith('error-')){
                return Promise.reject(error);
            }
            return Promise.reject('error-response-josn-bad');
        });
    });

    //初次加载页面，页面刷新发送请求
    const performGetDataRequest = (() => {

        callGetDataRequest()
        .then( fromJson => {
           // console.log(fromJson);
            LinksArr = [];
            LinksMap = fromJson;
            for(let key in LinksMap){
                LinksArr.push(LinksMap[key].url);
            }
            render();
        })
        .catch( error => {
            console.log(error);
           // updateMessage(element, makeError(error));
        });
    });


    function init(){
        performGetDataRequest();
        
        add.addEventListener('click', () => {
            performGetDataRequest();
        });
        del.addEventListener('click', () => {
            performDeletePostRequest();
        });
    }

    function render(){
        input.innerHTML = LinksArr;
    }

    function deleteLoalData(Link){
       // render();
    }

    init();






})();