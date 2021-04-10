const validator = require("validator");

module.exports = {
  validateEmail: function (inputText) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (inputText.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  },

  registerValidate: (data) => {
    let errors = {};
    let { firstName, lastName, geekID, email, password, password2 } = data;

    if (validator.isEmpty(firstName)) {
      errors.firstName = "First name field is required";
    } else if (!validator.isLength(firstName, { min: 3 })) {
      errors.firstName = "First name must be longer than 3 characters";
    }

    //Last Name check
    if (validator.isEmpty(lastName)) {
      errors.lastName = "Last name field is required";
    } else if (!validator.isLength(lastName, { min: 3 })) {
      errors.lastName = "Last name must be longer than 3 characters";
    }

    //User Name check
    if (validator.isEmpty(geekID)) {
      errors.geekID = "GeekID field is required";
    } else if (!validator.isLength(geekID, { min: 3 })) {
      errors.geekID = "Username must be atleast 3 charcters";
    }

    //Email
    if (validator.isEmpty(email)) {
      errors.email = "Email field is required";
    } else if (!validator.isEmail(email)) {
      errors.email = "Email is invalid";
    }

    //Password
    if (validator.isEmpty(password)) {
      errors.password = "Password field is required";
    } else if (!validator.isLength(password, { min: 6 })) {
      errors.password = "Password must be greater than 6 characters";
    }

    //Confirm password
    if (validator.isEmpty(password2)) {
      errors.password2 = "Confirm Password field is required";
    } else if (!validator.equals(password, password2)) {
      errors.password2 = "Passwords must match";
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0 ? true : false,
    };
  },
  updateValidate: (data) => {
    let errors = {};
    let { firstName, lastName, geekID, email, password, password2 } = data;

    if (validator.isEmpty(firstName)) {
      errors.firstName = "First name field is required";
    } else if (!validator.isLength(firstName, { min: 3 })) {
      errors.firstName = "First name must be longer than 3 characters";
    }

    //Last Name check
    if (validator.isEmpty(lastName)) {
      errors.lastName = "Last name field is required";
    } else if (!validator.isLength(lastName, { min: 3 })) {
      errors.lastName = "Last name must be longer than 3 characters";
    }

    //User Name check
    if (validator.isEmpty(geekID)) {
      errors.geekID = "GeekID field is required";
    } else if (!validator.isLength(geekID, { min: 3 })) {
      errors.geekID = "Username must be atleast 3 charcters";
    }

    //Email
    if (validator.isEmpty(email)) {
      errors.email = "Email field is required";
    } else if (!validator.isEmail(email)) {
      errors.email = "Email is invalid";
    }
    return {
      errors,
      isValid: Object.keys(errors).length === 0 ? true : false,
    };
  },
};
