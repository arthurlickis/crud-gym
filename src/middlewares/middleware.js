exports.checkCsrf = (err, req, res, next) => {
    if (err) return res.render("404");
    next();
};

exports.csrfMiddleare = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.messagesAndSession = (req, res, next) => {
    res.locals.errors = req.flash("errors");
    res.locals.success = req.flash("success");
    res.locals.user = req.session.user;
    next();
};

exports.loginRequired = (req, res, next) => {
    if (!res.locals.user) {
        req.flash("errors", "Precisa fazer o login para acessar está página.");
        req.session.save(() => res.redirect("/"));
        return;
    };
    next();
};