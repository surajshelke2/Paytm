const z = require("zod");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const Account = require("../model/account");
const { JWT_SECRET } = process.env;

const signupSchema = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

const signinSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

const updateSchema = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const register = async (req, res) => {
  try {
    const { success, data } = signupSchema.safeParse(req.body);
    if (!success) {
      throw new Error("Invalid input data");
    }

    const existingUser = await User.findOne({ username: data.username });
    if (existingUser) {
      throw new Error("Email already taken");
    }

    const user = await User.create({
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    });

     
    const userId = user._id;

    await Account.create({
      userId,
      balance:1+Math.random()*10000
    })


    const token = jwt.sign({ userId}, process.env.JWT_SECRET);

    res.json({
      message: "User created successfully",
      token :token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { success, data } = signinSchema.safeParse(req.body);
    if (!success) {
      throw new Error("Invalid input data");
    }

    const user = await User.findOne({
      username: data.username,
      password: data.password,
    });

    if (user) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);

      res.json({
        token,
      });
    } else {
      throw new Error("Error while logging in");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { success, data } = updateSchema.safeParse(req.body);
    if (!success) {
      throw new Error("Invalid input data");
    }

    await User.updateOne({ _id: req.userId }, { $set: data });

    res.json({
      message: "Updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const users = await User.find({
      $or: [
        { firstName: { "$regex": filter } },
        { lastName: { "$regex": filter } },
      ],
    });

    res.json({
      users: users.map(user => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login, updateUser, getUsers };
