const Register = require("../models/RegisterModel");

exports.index = (req, res) => {
    res.render("index");
};

exports.login = async (req, res) => {
    try {
        const login = new Register(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash("errors", login.errors);
            req.session.save(() => res.redirect("/"));
            return;
        };

        req.flash("success", "Usuário logado com sucesso");
        req.session.user = login.user;
        req.session.save(() => res.redirect("/training"));
        return;
    } catch(e) {
        console.error(e);
        //res.render("404")
    };
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
};