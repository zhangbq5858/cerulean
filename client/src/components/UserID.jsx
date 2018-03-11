import React from 'react';

const UserID = ({ user }) => {
 // console.log("user part data check -> ", user);
  return (
    <p className="userid-show">Welcome { user === null ? "" : user.name}!</p>
  );
};

export default UserID;