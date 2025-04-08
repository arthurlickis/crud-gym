const Register = require("../models/RegisterModel");

exports.index = (req, res) => {
    res.render("register");
};

exports.register = async (req, res) => {
    try {
        const register = new Register(req.body);
        await register.register();

        if (register.errors.length > 0) {
            req.flash("errors", register.errors);
            req.session.save(() => res.redirect("/register"));
            return;
        };

        req.flash("success", "Usuário cadastrado com sucesso!");
        req.session.save(() => res.redirect("/"));
        return;
    } catch (e) {
        console.error(e);
        // res.render("404");
    };
};