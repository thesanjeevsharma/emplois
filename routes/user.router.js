const router = require('express').Router();
const jwt = require('../config/jwt.config');
const UserController = require('../controllers/user.controller');

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/profile", jwt.authenticate, UserController.createProfile);
router.get("/profile/seeker/:username", jwt.profileAuthenticate, UserController.getSeekerProfile);
router.get("/profile/provider/:username", jwt.profileAuthenticate, UserController.getProviderProfile);

module.exports = router;