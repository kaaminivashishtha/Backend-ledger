const express= require("express");
const authController = require("../controllers/auth.controller")



const router = express.Router();

/* POST /api/auth/register - user registration route */
/* POST /api/auth/login - user login route */

router.post("/register" , authController.userRegisterController);
router.post("/login" , authController.userLoginController);

/**
 * POST /api/auth/logout
 */

router.post("/logout", authController.userLogoutController)

module.exports = router; 