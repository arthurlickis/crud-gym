export default class formValidator {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    };

    init() {
        this.events();
    };

    events() {
        if (!this.form) return;
        
        this.form.addEventListener("submit", e => {
            e.preventDefault();
            this.validate();
        });
    };

    validate() {
        const inputs = this.form.querySelectorAll(".form-control");
        
        let error = false;

        this.removeErrorMessage();
       
        inputs.forEach(input => {

            if (input.getAttribute("id") === "nameInput") {
                if (input.value.length < 3 || input.value.length > 40) {
                    input.insertAdjacentElement("afterend", this.errorMessage("O campo precisa de 3 a 40 caracteres!"))
                    error = true;
                };
            };

            if (input.getAttribute("id") === "passwordInput") {
                if (input.value.length < 6 || input.value.length > 30) {
                    input.insertAdjacentElement("afterend", this.errorMessage("O campo precisa de 6 a 30 caracteres!"));
                    error = true;
                };
            };

            if (input.getAttribute("id") === "setsInput") {
                if (input.value < 1 || input.value > 10) {
                    input.insertAdjacentElement("afterend", this.errorMessage("O campo precisa ser números entre 1 e 10!"));
                    error = true;
                };
            };

            
            if (input.getAttribute("id") === "repsInput") {
                if (input.value < 4 || input.value > 30) {
                    input.insertAdjacentElement("afterend", this.errorMessage("O campo precisa ser números entre 4 e 30!"));
                    error = true;
                };
            };
        });

        if (!error) this.form.submit();
    };

    errorMessage(msg) {
        const textError = document.createElement("p");
        textError.classList.add("text-danger");
        textError.textContent = msg;
        return textError;
    };

    removeErrorMessage() {
        const textErrors = document.querySelectorAll(".text-danger");
        if (textErrors) {
            textErrors.forEach(textError => textError.remove());
        };
    };
};