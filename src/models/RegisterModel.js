const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const RegisterSchema = mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true }
});

const RegisterModel = mongoose.model("Register", RegisterSchema);

class Register {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    };

    async register() {
       try {
            this.valid();

            if (this.errors.length > 0) return;

            await this.userExists();

            if (this.errors.length > 0) return;

            const salt = bcryptjs.genSaltSync();
            this.body.password = bcryptjs.hashSync(this.body.password, salt);

            this.user = await RegisterModel.create(this.body);
       } catch(e) {
            console.error(e);
       };
    };

    async login() {
        this.valid();

        if (this.errors.length > 0) return;

        this.user = await RegisterModel.findOne({ name: this.body.name });

        if (!this.user) {
            this.errors.push("E-mail e/ou senha inválida!");
            return;
        };

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push("E-mail e/ou senha inválida!");
            this.user = null;
        };
    };

    async userExists() {
        this.user = await RegisterModel.findOne({ name: this.body.name });
        if (this.user) this.errors.push("Já existe um usuário com esse e-mail.");
    };

    valid() {
        this.cleanUp();
        
        if (this.body.name.length < 3 || this.body.name.length > 40) this.errors.push("O campo nome precisa ter entre 3 a 40 caracteres.");  

        if (this.body.password.length < 6 || this.body.password.length > 30) this.errors.push("O campo senha precisa ter entre 6 a 30 caracteres.");
    };

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== "string") {
                this.body[key] = "";
            };

        };

        this.body = {
            name: this.body.name,
            password: this.body.password
        };
    };
};

module.exports = Register;