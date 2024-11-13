const router = require('express').Router();
const { User } = require('../../db/models');

const bcrypt = require('bcrypt');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookie.config');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('username, email, password', username, email, password);
  if (!(username && email && password)) {
    res.status(400).json({ message: 'Required fields missing' });
  }
  try {
    const [user, isCreated] = await User.findOrCreate({
      where: { email },
      defaults: { username, email, password: await bcrypt.hash(password, 10) },
    });
    console.log('user', user);
    console.log('isCreated', isCreated);
    if (!isCreated) {
      return res.status(400).json('This user already exists');
    }
    const plainUser = user.get();
    delete plainUser.password;
    const { accessToken, refreshToken } = generateTokens({ user: plainUser });
    res
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({ user: plainUser, accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Register error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).json({ message: 'Required fields missing' });
  }
  try {
    const user = await User.findOne({ where: { email } });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword || !user) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    const plainUser = user.get();
    delete plainUser.password;
    const { accessToken, refreshToken } = generateTokens({ user: plainUser });
    res
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({ user: plainUser, accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login error' });
  }
  // res.end();
});

router.get('/logout', async (req, res) => {
  try {
    res.clearCookie('refreshToken').sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;
