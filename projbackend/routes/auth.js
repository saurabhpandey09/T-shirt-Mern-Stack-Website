var express = require('express');
var router = express.Router()
const {
    check,
    validationResult
} = require('express-validator');

const {
    signout,
    signup,
    signin,
    isSignedIn
} = require("../controllers/auth")


//For signup
router.post("/signup", ([
    check("name", "name should be at least 3 char").isLength({
        min: 3
    }),
    check("email", "email is requires").isEmail(),
    check("password", "password should be at least 3 char").isLength({
        min: 3
    }),
]), signup);

//For Signin
router.post("/signin", ([
    check("email", "email is requires").isEmail(),
    check("password", "password field in required").isLength({
        min: 3
    }),
]), signin);


router.get("/signout", signout)


module.exports = router;