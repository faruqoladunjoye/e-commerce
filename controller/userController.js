const User = require('./../models/userModel');
const AppError = require('./../utils/appError');

exports.createUser = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      const newUser = await User.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          user: newUser,
        },
      });
    } else {
      return next(new AppError('User already exists!', 404));
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
