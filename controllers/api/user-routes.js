const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require('../../models');

//create new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//===========Login and logout=============

//login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // error message if login is incorrect
    if (!dbUserData) {
      res.status(404).json({ message: "Login failed. Please try again!" });
      return;
    }

    //this section of code should be in a hook in the models folder. delete this portion afterwards?
    const checkPassword = await bcrypt.compare(
      req.body.password,
      dbUserData.password
    );

    if (!checkPassword) {
      res.status(400).json({ message: "Login failed. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      console.log(req.session.cookie);

      res.status(200).json({ message: "You are now logged in!" });
    })
  } catch {
    console.log(err);
    res.status(500).json(err);
  }
});

// logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    req.status(404).end();
  }
});

module.exports = router;