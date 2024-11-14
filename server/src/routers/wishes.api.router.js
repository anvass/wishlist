const router = require('express').Router();
const { Wish } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

router.get('/', verifyAccessToken, async (req, res) => {
  try {
    console.log('res.locals.user.id', res.locals.user.id);
    const wishes = await Wish.findAll({
      where: { userId: res.locals.user.id },
    });
    res.json(wishes);
    // res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.post('/', verifyAccessToken, async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const createdWish = await Wish.create({
      name,
      description,
      price,
      isCompleted: false,
      userId: res.locals.user.id,
    });
    res.status(201).json(createdWish);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.put('/:id', verifyAccessToken, async (req, res) => {
  try {
    const wish = await Wish.findOne({
      where: {
        id: req.params.id,
        // userId: res.locals.user.id,
      },
    });

    const { name, description, price } = req.body;
    wish.name = name;
    wish.description = description;
    wish.price = price;

    await wish.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.delete('/:id', verifyAccessToken, async (req, res) => {
  try {
    const wish = await Wish.findByPk(req.params.id);

    if (wish.userId === res.locals.user.id) {
      wish.destroy();
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;
