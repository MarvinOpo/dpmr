
var iHomisAPI = require('../API/iHomisAPI');

exports.index = function (req, res) {
    req.session.ERROR_DISPLAY = `none`;
    res.redirect('/login');
}

exports.login = function (req, res) {
    if (req.session.HAS_LOGGED_IN) {
        res.redirect("/dashboard");
    } else {
        res.render('login', {
            ERROR_DISPLAY: req.session.ERROR_DISPLAY
        });
    }
}

exports.post_login = function (req, res) {
    var user = req.body.username;
    var pass = req.body.pass;

    if (user == "admin" && pass == "dohro7dpmr") {
        req.session.HAS_LOGGED_IN = true;
        res.redirect("/dashboard");
    } else {
        req.session.ERROR_DISPLAY = 'inline-block';
        res.redirect("/login");
    }
}

exports.logout = function (req, res) {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                res.redirect("/");
            }
        });
    }
}

exports.dashboard = function (req, res) {
    if (req.session.HAS_LOGGED_IN) {
        iHomisAPI.get_encounters('').then(function (encounters) {
            iHomisAPI.get_hospitals.then(function (hospitals){
                encounters['hospitals'] = hospitals;
                res.render('dashboard', encounters)
            })
        }).catch(function(){
            console.log("Encounter promise error")
        })
    } else {
        req.session.ERROR_DISPLAY = `none`;
        res.redirect('/login');
    }
}
