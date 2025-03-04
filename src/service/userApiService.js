import { where } from "sequelize/lib/sequelize";
import db from "../models/index";
import {
  checkEmailExist,
  checkPhoneExist,
  hashUserPassWord,
} from "../service/loginRegisterService";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: {
        model: db.Groups,
        as: "Group",
        attributes: ["name", "description"],
      },
    });
    if (users) {
      //   let data = users.get({ plain: true });
      return {
        EM: "get data success!",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "get data success!",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrong",
      EC: 1,
      DT: [],
    };
  }
};

const createNewUser = async (data) => {
  try {
    let isEmailExist = await checkEmailExist(data.email);
    if (isEmailExist === true) {
      return {
        EM: "Email is already exist",
        EC: 1,
        DT: "email",
      };
    }
    let isPhoneExist = await checkPhoneExist(data.phone);
    if (isPhoneExist === true) {
      return {
        EM: "Phone is already exist",
        EC: 1,
        DT: "phone",
      };
    }

    let hashPassWord = hashUserPassWord(data.password);
    await db.User.create({ ...data, password: hashPassWord });

    return {
      EM: "Create ok",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (data) => {
  try {
    if (!data.groupId) {
      return {
        EM: "Error with empty GroupId",
        EC: 1,
        DT: "group",
      };
    }
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      //Update
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.groupId,
      });
      return {
        EM: "Update user success",
        EC: 0,
        DT: "",
      };
      user.save({});
    } else {
      //not found
      return {
        EM: "User not found",
        EC: 2,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Somethings wrongs with servies",
      EC: 1,
      DT: [],
    };
  }
};

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });
    if (user) {
      await user.destroy();
      return {
        EM: "Delete user success",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "User not exist",
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "error from service",
      EC: 1,
      DT: [],
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: [
        {
          model: db.Groups,
          as: "Group",
          attributes: ["name", "description", "id"],
        },
      ],
      order: [["id", "DESC"]],
    });
    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };
    return {
      EM: "fetch ok",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "somethings wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
