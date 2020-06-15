const validator = require('validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.validateUser = (req, res, next) => {
  const validationErrors = [];

  if (!validator.isEmail(req.body.email)) {
    validationErrors.push('Please enter a valid email address');
  } else {
    req.body.email = validator.normalizeEmail(req.body.email,
      {
        gmail_remove_dots: false,
        all_lowercase: true,
        gmail_remove_subaddress: true,
        gmail_convert_googlemaildotcom: true,
      });
    req.body.email = validator.trim(req.body.email);
  }

  if (!validator.isLength(req.body.password, { min: 8 })) {
    validationErrors.push('Password must have at least 8 characters');
  }

  if (validationErrors.length > 0) {
    res.status(400).json({
      errors: validationErrors,
    });
    return validationErrors;
  }

  next();
};

exports.register = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  User.register(user, req.body.password, ((err) => {
    if (err) {
      console.log('error while user register!', err);
      res.sendStatus(409);
      return next(err);
    }
    console.log('registration complete');
    return next();
  }));
};


exports.login = (req, res, next) => {
  passport.authenticate('local')(req, res, () => next());
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '50000s' });
}

exports.generateJWT = (req, res) => {
  const user = { email: req.body.email };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  res.json({ accessToken, refreshToken });
};


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    const errorKeys = Object.keys(err.errors);
    errorKeys.forEach((key) => req.flash('error', err.errors[key].message));
  }
};

exports.verifyToken = (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(user.email);
    return res.sendStatus(200);
  });
};
