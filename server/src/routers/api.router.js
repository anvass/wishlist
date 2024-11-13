const router = require('express').Router();

const authRouter = require('./auth.api.router');
const tokenRouter = require('./token.api.router');
const wishesRouter = require('./wishes.api.router');

router.use('/auth', authRouter);
router.use('/token', tokenRouter);
router.use('/wishes', wishesRouter);

module.exports = router;
