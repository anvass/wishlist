// npx sequelize model:generate --name Wish --attributes name:string,description:string,category:string,price:integer,isCompleted:boolean,userId:integer

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

router.delete('/:id', verifyAccessToken, async (req, res) => {
  try {
    // await Wish.destroy({ where: { id: req.params.id } });
    // return res.sendStatus(204);

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
