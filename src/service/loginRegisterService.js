import db from "../models";
import bcrypt, { hash } from "bcryptjs";
import { Op } from "sequelize";
const salt = bcrypt.genSaltSync(10);
const hashUserPassWord = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });

  if (user) {
    return true;
  }
  return false;
};

const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });

  if (user) {
    return true;
  }
  return false;
};
const registerNewUser = async (rawuserData) => {
  try {
    // check email/ phoneNumber are exist
    let isEmailExist = await checkEmailExist(rawuserData.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exist",
        EC: "1",
      };
    }

    let isPhoneExist = await checkPhoneExist(rawuserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phoneNumber is already exist",
        EC: "1",
      };
    }
    // hash userPassword
    let hashPassWord = hashUserPassWord(rawuserData.password);

    //create new user
    await db.User.create({
      email: rawuserData.email,
      username: rawuserData.username,
      password: hashPassWord,
      phone: rawuserData.phone,
    });
    return {
      EM: "A user is created successfully",
      EC: 0,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs",
      EC: 1,
    };
  }
};

const checkPassword = (inputPassword, hashPassWord) => {
  return bcrypt.compareSync(inputPassword, hashPassWord); //true or false
};
const handleUserLogin = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });
    // console.log("check user:", user.get({ plain: true }));\

    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword === true) {
        return {
          EM: "ok!",
          EC: "0",
          DT: "",
        };
      }
    }

    return {
      EM: "Your email/phoneNumber is incorrect",
      EC: "1",
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs",
      EC: 1,
    };
  }
};

module.exports = {
  registerNewUser,
  handleUserLogin,
  checkEmailExist,
  checkPhoneExist,
  hashUserPassWord,
};
