import "core-js/stable";
import "regenerator-runtime/runtime";

import formValidator from "./modules/formValidator.js";

const login = new formValidator(".form-login");
const register = new formValidator(".form-register");
const training = new formValidator(".form-training");
const exercise = new formValidator(".form-exercise");

login.init();
register.init();
training.init();
exercise.init();