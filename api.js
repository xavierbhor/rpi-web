exports.setup = function(webServer, auth) {
    webServer.post('/api/login', function(req, res) {

        console.log('login: ', req.body.password )

        if (req.body.password == global.config.password) {
            console.log('setCookie', global.config.token);
            res.cookie('ses', global.config.token, { maxAge: 1000 * 60 * 60 * 24 * 365 });
            res.status(200).send('OK')
        } else {
            res.status(403).send('err login')
        }
    });
}