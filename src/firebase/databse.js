import {database} from './firebase';

//Sign Up
export const doCreateUser = (id, username, email, admin) =>
    database.ref(`users/${id}`).set({
        username,
        email,
        admin: admin
    });


export const onceGetUsers = function(id){
    let userRef = database.ref('users').child(`${id}`);

    return userRef.once('value').then(function(snapshot) {
        return snapshot.val();
    });
};

export const getUsers = function () {
    let userRef = database.ref('users');
    return userRef.once('value').then(function(snapshot) {
        return snapshot;
    });
};


