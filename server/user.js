//let userUUID = 1;

const createUser = (id) => {
    let User = {};
    User.id = id;
    User.name = "User"+id;
    User.votedUrls = [];
    return User;
}


const initUsers = () => {
    let Users = {};
    for(let i = 0; i < 3; i++){
       let User =  createUser(i);
       Users[User.id] = User;
    }
    return Users;
}

module.exports = {
    initUsers,
    createUser,
}