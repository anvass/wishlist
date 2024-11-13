//
const jwt = require('jsonwebtoken');
require('dotenv').config();

// jwt.verify()
// Если callback не указан, функция работает синхронно. 
// Возвращает декодированные полезные данные (payload), если подпись действительна и необязательные expiration/audience/issuer действительны. 
// Если нет, то выдаст ошибку.

const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1]; // Bearer <token>
    const token = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.locals.user = token.user;

    return next();
  } catch (error) {
    console.error('Invalid access token', error);
    return res.status(403).json({ message: 'Accsess token error' });
  }
};

const verifyRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const token = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.user = token.user;

    return next();
  } catch (error) {
    console.error('Invalid refresh token', error);
    // res.status(400).json({ message: 'refresh token error' });
    return res.clearCookie('refreshToken').sendStatus(401);
  }
};

module.exports = { verifyAccessToken, verifyRefreshToken };
