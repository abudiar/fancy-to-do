
const { Admin, Group, User } = require('./models');


// Group.findOne({ include: [{ model: Admin }] })
//     .then(data => {
//         if (data == null)
//             throw new WebError({
//                 name: 'ItemNotFound',
//                 status: 404,
//                 message: 'Group with id ' + id + ' not found.'
//             });
//         for (let i in data.Admins)
//             console.log(data.Admins[i].dataValues.id)
//         // else
//         // throw new WebError({
//         //     name: 'AuthorizationError',
//         //     status: 401,
//         //     message: 'You do not have the required permissions!'
//         // });
//     })
//     .catch(err => { console.log(err) });



// Group.findAll({
//     order: [
//         ['updatedAt', 'desc']
//     ],
//     include: [{ model: User, where: { id: 1 } }]
// })
//     .then(data => {
//         console.log(data.User);
//     })

const groupid = null, UserId = 1
const where = {};
if (groupid !== null)
    where['GroupId'] = groupid;
else
    where['UserId'] = UserId;

console.log(where)

function addGroup(cb) {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/groups',
        headers: {
            accessToken: localStorage.getItem('accessToken')
        }
    })
        .done(function (response) {
            cb(response);
        })
        .fail(function (response) {
            checkJWT(response);
        })
}

function getGroups(cb) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/groups',
        headers: {
            accessToken: localStorage.getItem('accessToken')
        }
    })
        .done(function (response) {
            cb(response);
        })
        .fail(function (response) {
            checkJWT(response);
        })
}

function deleteGroup(id, cb) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/groups/${id}`,
        headers: {
            accessToken: localStorage.getItem('accessToken')
        }
    })
        .done(function (response) {
            cb(response);
        })
        .fail(function (response) {
            checkJWT(response);
        })
}

function removeGroupMember(id, memberId, cb) {
    let url = `http://localhost:3000/groups/${id}/removeMember`
    if (memberId)
        url += `/${memberId}`;
    $.ajax({
        method: 'DELETE',
        url,
        headers: {
            accessToken: localStorage.getItem('accessToken')
        }
    })
        .done(function (response) {
            cb(response);
        })
        .fail(function (response) {
            checkJWT(response);
        })
}

function getInvites(cb) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/invites',
        headers: {
            accessToken: localStorage.getItem('accessToken')
        }
    })
        .done(function (response) {
            cb(response);
        })
        .fail(function (response) {
            checkJWT(response);
        })
}

function getGroupInvites(cb) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/invites/group',
        headers: {
            accessToken: localStorage.getItem('accessToken'),
            GroupId: localStorage.getItem('GroupId')
        }
    })
        .done(function (response) {
            cb(response);
        })
        .fail(function (response) {
            checkJWT(response);
        })
}

function addInvite(cb) {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/invites',
        headers: {
            accessToken: localStorage.getItem('accessToken'),
            GroupId: localStorage.getItem('GroupId')
        }
    })
        .done(function (response) {
            cb(response);
        })
        .fail(function (response) {
            checkJWT(response);
        })
}

function deleteInvite(id, cb) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/invites/${id}`,
        headers: {
            accessToken: localStorage.getItem('accessToken'),
            GroupId: localStorage.getItem('GroupId')
        }
    })
        .done(function (response) {
            cb(response);
        })
        .fail(function (response) {
            checkJWT(response);
        })
}

function getTodos(cb) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            accessToken: localStorage.getItem('accessToken'),
            GroupId: localStorage.getItem('GroupId'),
        }
    })
        .done(function (response) {
            cb(response);
        })
        .fail(function (response) {
            checkJWT(response);
        })
}

function addTodo(data, cb) {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todos',
        headers: {
            accessToken: localStorage.getItem('accessToken'),
            GroupId: localStorage.getItem('GroupId'),
        },
        data
    })
        .done(function (response) {
            cb(response);
        })
        .fail(function (response) {

            checkJWT(response);
        })
}