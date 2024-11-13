// npx sequelize model:generate --name Wish --attributes name:string,description:string,category:string,price:integer,isCompleted:boolean,userId:integer

const router = require('express').Router();

// router.get('/', verifyRefreshToken, (req, res) => {
//   const { accessToken, refreshToken } = generateTokens({
//     user: res.locals.user,
//   });
//   res
//     .cookie('refreshToken', refreshToken, cookieConfig.refresh)
//     .json({ user: res.locals.user, accessToken });
// });

module.exports = router;
