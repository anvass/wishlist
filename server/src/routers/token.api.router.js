const router = require('express').Router();
const cookieConfig = require('../configs/cookie.config');
const { verifyRefreshToken } = require('../middlewares/verifyTokens');
const generateTokens = require('../utils/generateTokens');

router.get('/refresh', verifyRefreshToken, (req, res) => {
  const { accessToken, refreshToken } = generateTokens({
    user: res.locals.user,
  });
  res
    .cookie('refreshToken', refreshToken, cookieConfig.refresh)
    .json({ user: res.locals.user, accessToken });
});

module.exports = router;
