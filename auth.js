'use strict'

function isAuth (req, res, next) {
  
  var token = "";

  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies["ses"]) {
    token = req.cookies["ses"]
  }  
  
  if (!token) {
    return res.status(403).send('forbidden')
  }

  console.log(token);

  if (token == global.config.token) {
    req.user = 'ok';
    next()
  }

}

module.exports = isAuth
