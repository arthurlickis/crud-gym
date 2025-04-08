const mongoose = require("mongoose");

const ExerciseSchema = mongoose.Schema({
    exercise: { type: String, required: true },
    muscleGroup: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },

    training: { type: mongoose.Schema.Types.ObjectId, ref: "Training", required: true }
});

const ExerciseModel = mongoose.model("Exercise", ExerciseSchema);

class Exercise {
    constructor (body, trainingId) {
        this.body = body;
        this.training = trainingId;
        this.errors = [];
        this.exercise = null;
    };

    async create() {
        try {
            this.valid();

            if (this.errors.length > 0) return;

            this.body.training = this.training;

            this.exercise = await ExerciseModel.create(this.body);
        } catch (e) {
            console.error(e);
        };
    };

    async edit(id) {
        if (typeof id !== "string") return;
        this.valid();

        if (this.errors.length > 0) return;

        this.exercise = await ExerciseModel.findByIdAndUpdate(id, this.body, { new: true });
    };

    static async delete(id) {
        if (typeof id !== "string") return;
        const exercise = await ExerciseModel.findOneAndDelete({_id: id});
        return exercise;
    };

    static async searchTraingWithExercise(trainingId) {
        if (typeof trainingId !== "string") return;

        const exercise = await ExerciseModel.find({ training: trainingId });
        return exercise;
    };

    static async searchById(idExercise) {
        if (typeof idExercise !== "string") return;
    
        const exercise = await ExerciseModel.findById(idExercise);
        return exercise;
    };
    
    valid() {
        this.cleanUp();

        if (this.body.exercise.length < 3 || this.body.exercise.length > 40) this.errors.push("O campo exercício precisa ter entre 6 a 40.")

        if (this.body.sets < 1 || this.body.sets > 10 ) this.errors.push("O campo séries precisa ser números entre 1 e 10.");
        if (this.body.reps < 4 || this.body.reps > 30 ) this.errors.push("O campo repetições precisa ser números entre 4 e 30.");
    };

    cleanUp() {
        for (const key in this.body) {
            console.log(this.body[key])
            if (typeof this.body[key] !== "string" && typeof this.body[key] !== "number") {
                this.body[key] = "";
            };
        };

        this.body = {
            exercise: this.body.exercise,
            muscleGroup: this.body.muscleGroup,
            sets: this.body.sets,
            reps: this.body.reps,
        };
    };
};

module.exports = Exercise;