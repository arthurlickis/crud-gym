const mongoose = require("mongoose");

const TrainingSchema = mongoose.Schema({
    name: {type: String, required: true},
    createdIn: {type: Date, default: Date.now}
});

const TrainingModel = mongoose.model("Training", TrainingSchema);

class Training {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.training = null;
    };

    async create() {
       try {
            this.valid();

            if (this.errors.length > 0) return;

            this.training = await TrainingModel.create(this.body); 
       } catch(e) {
            console.error(e);
       };
    };

    async edit(id) {
        if (typeof id !== "string") return;
        this.valid();

        if (this.errors.length > 0) return;

        this.training = await TrainingModel.findByIdAndUpdate(id, this.body, { new: true });
    };

    static async delete(id) {
        if (typeof id !== "string") return;
        const training = await TrainingModel.findOneAndDelete({_id: id});
        return training;
    };

    static async searchId(id) {
        if (typeof id !== "string") return;
        
        const training = await TrainingModel.findById(id);
        return training;
    };    

    static async searchTraining() {
        const trainings = await TrainingModel.find()
        .sort({ createdIn: -1 });
        return trainings;
    };

    valid() {
        this.cleanUp();

        if (this.body.name.length < 3 || this.body.name.length > 40) this.errors.push("O campo nome do treino precisa estar entre 5 a 40 caracteres.")
    };

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== "string") {
                this.body[key] = "";
            };
        };

        this.body = {
            name: this.body.name,
            date: this.body.date
        };
    };
};

module.exports = Training;