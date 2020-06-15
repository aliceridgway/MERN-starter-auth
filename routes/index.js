const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);

router.post('/register',
  userController.validateUser,
  userController.register,
  userController.login,
  userController.generateJWT);

router.post('/login', userController.login, userController.generateJWT);

router.get('/user', userController.verifyToken);


// const posts = [
//   {
//     username: 'Kyle',
//     title: 'Post 1',
//   },
//   {
//     username: 'Jim',
//     title: 'Post 2',
//   },
// ];

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token === null) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

// function generateAccessToken(user) {
//   return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '45s' });
// }

// router.get('/posts', authenticateToken, (req, res) => {
//   res.json(posts.filter((post) => post.username === req.user.name));
// });

// router.post('/login', (req, res) => {
//   // Authenticate User
//   const user = { name: req.body.username };
//   const accessToken = generateAccessToken(user);
//   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
//   res.json({ accessToken, refreshToken });
// });


// router.post('/login', userController.login);


// router.post('/register', [
//   check('email').isEmail(),
//   check('password').isLength({ min: 5 }),
// ], (req, res) => {
//   // Finds the validation errors in this request and wraps them in an object with handy functions
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     console.log(errors);
//     return res.status(422).json({ errors: errors.array() });
//   }
// });

// router.get('/', entryController.displayEntries);

// router.post('/add', entryController.addEntry);
// router.post('/add/:id', entryController.updateEntry);

// router.get('/edit/:id', entryController.editEntry);
// router.post('/entry/:id/delete', entryController.deleteEntry);

// router.post('/entry/:id/complete', entryController.toggleTaskStatus);

module.exports = router;
