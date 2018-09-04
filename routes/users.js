var express = require('express');
var router = express.Router();

var users = [];
  users.push({
    id: 1,
    name: "User 1"
  });
  users.push({
    id: 2,
    name: "User 2"
  });
  users.push({
    id: 3,
    name: "User 3"
  });

/* GET users listing. */
router.get('/:id', function (req, res, next) {
  
  var get_users = [];
  var utemp;
  for (var i = 0; i < users.length; i++) {
    utemp = users[i];
    var n1 = Number(req.params.id);
    var n2 = Number(utemp.id);
    if (n1 == n2) {
      get_users.push(utemp);
      console.log("User id=" + utemp.id);
    }
  }

  if (get_users.length > 0) {
    res.status(200).send(get_users);
    console.log("Code 200");
  } else {
    res.sendStatus(404);
  }

});

module.exports = router;