const Training = require("../models/TrainingModel");

exports.index = async (req, res) => {
    const trainings = await Training.searchTraining();
    res.render("training", { trainings });
};

exports.registerIndex = (req, res) => {
    res.render("add-training", { training: {} });
};

exports.register = async (req, res) => {
    try {
        const training = new Training(req.body);
        await training.create();

        if (training.errors.length > 0) {
            req.flash("errors", training.errors);
            req.session.save(() => res.redirect("/training/add"));
            return;
        };

        req.flash("success", "Treino criado com sucesso!");
        req.session.save(() => res.redirect(`/training`));
    } catch(e) {
            res.render("404");
            console.error(e);
    };
    return;
};

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render("404");

    const training = await Training.searchId(req.params.id);

    if (!training) return res.render("404");

    res.render("add-training", { training });
};

exports.edit = async (req, res) => {
    try {   
        if (!req.params.id) return res.render("404");

        const training = new Training(req.body);
        await training.edit(req.params.id);

        if (training.errors.length > 0) {
            req.flash("errors", training.errors);
            req.session.save(() => res.redirect(`/training/add/${req.params.id}`));
            return;
        };

        req.flash("success", "Treino criado com sucesso!");
        req.session.save(() => res.redirect(`/training`));
        return;
    } catch(e) {
        res.render("404");
        console.error(e);
   };
};

exports.delete = async (req, res) => {
    if (!req.params.id) return res.render("404");

    const training = await Training.delete(req.params.id);

    if (!training) return res.render("404");

    req.flash("success", "Treino excluido com sucesso!");
        req.session.save(function() {
            return res.redirect(`/training`);
        });
    return;
};