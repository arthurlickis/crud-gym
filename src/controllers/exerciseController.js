const Training = require("../models/TrainingModel");
const Exercise = require("../models/ExerciseModel");

exports.exerciseIndex = async (req, res) => {
    try {
        const trainingId = req.params.id;

        if (!trainingId) return res.render("404");

        const training = await Training.searchId(trainingId); 
        const exercises = await Exercise.searchTraingWithExercise(trainingId);

        res.render("exercise", { training, exercises }); 
    } catch (e) {
        console.error(e);
        res.render("404");
    };
};

exports.addExerciseIndex = async (req, res) => {
    const training = await Training.searchId(req.params.id);
    res.render("add-exercise", { training, exercise: {}});
};

exports.add = async (req, res) => {
    try {
        if (!req.params.id) return res.render("404");

        const exercise = new Exercise(req.body, req.params.id);
        await exercise.create();

        if (exercise.errors.length > 0) {
            req.flash("errors", exercise.errors);
            req.session.save(() => res.redirect(`/training/${req.params.id}/exercise/add`));
            return
        };

        req.flash("success", "Exercício criado com sucesso! Para adicionar mais preenche o formulário novamente.")
        req.session.save(() => res.redirect(`/training/${req.params.id}/exercise/add`));
        return;
    } catch (e) {
        console.error(e);
        res.render("404");
    };
};

exports.editIndex = async (req, res) => {
        if (!req.params.id || !req.params.idExercise) return res.render("404");

        const training = await Training.searchId(req.params.id);
        const exercise = await Exercise.searchById(req.params.idExercise)   

        if (!training || !exercise) return res.render("404");

  
        res.render("add-exercise", { training, exercise }); 
};

exports.edit = async (req, res) => {
    try {   
        if (!req.params.idExercise) return res.render("404");

        const exercise = new Exercise(req.body);
        await exercise.edit(req.params.idExercise);

        if (exercise.errors.length > 0) {
            req.flash("errors", exercise.errors);
            req.session.save(() => res.redirect(`/training/${req.params.id}/add/${req.params.idExercise}`));
            return;
        };

        req.flash("success", "Exercício editado com sucesso!");
        req.session.save(() => res.redirect(`/training/${req.params.id}/exercise`));
        return;
    } catch(e) {
        console.error(e);
        res.render("404");
    }
};

exports.delete = async (req, res) => {
    if (!req.params.idExercise) return res.render("404");

    const exercise = await Exercise.delete(req.params.idExercise);

    if (!exercise) return res.render("404");

    req.flash("success", "Exercício excluido com sucesso!");
        req.session.save(function() {
            return res.redirect(`/training/${req.params.id}/exercise`);
        });
    return;
};