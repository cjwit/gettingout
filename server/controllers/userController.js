var mongoose = require('mongoose');
var User = require('../data/user');
var _ = require('underscore');

var router = require('express').Router();
router.route('/:id').post(editUser).delete(deleteUser); // .get(getUser)
router.route('/').get(getUsers) //.post(addUser);

// getUser and addUser are done through the authorization flow
/*
function getUser(req, res) {
	console.log("get user called")
}
*/

// getUsers is not likely to be necessary - delete it later
function getUsers(req, res) {
    User.find(function (err, users) {
        if (err) res.send(err);
        else res.json(users);
    });
}

/*
function addUser(req, res) {
    var user = new User(_.extend({}, req.body));
	console.log("addUser:", user);
	user.date = new Date(Date.now());
    user.save(function (err) {
        if (err) res.send(err);
        else res.json(user);
    });
}
*/

function editUser(req, res) {
    var id = req.params.id;
    var info = req.body;
    var query = { _id: id },
        update = { $set: {
            username: info.username,
			password: info.password
        }};
	console.log("editUser:", update);
    User.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    });
}

function deleteUser(req, res) {
    var id = req.params.id;
    User.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

module.exports = router;
