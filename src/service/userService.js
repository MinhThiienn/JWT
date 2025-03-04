import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird"; // get the promise implementation, we will use bluebird
import db from "../models/index";
import user from "../models/user";
import { where } from "sequelize/lib/sequelize";
import { raw } from "body-parser";

const salt = bcrypt.genSaltSync(10);
const hashPassWord = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashPassWord(password);
  try {
    db.User.create({
      username: username,
      password: hashPass,
      email: email,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserList = async () => {
  // test relationship
  let newUser = await db.User.findOne({
    where: { id: 1 },
    attributes: ["id", "username", "email"],
    include: {
      model: db.Groups,
      as: "Group",
      attributes: ["name", "description"],
    },
    raw: true,
    nest: true,
  });
  console.log("Check new User:", newUser);

  let users = [];
  users = await db.User.findAll();
  return users;

  // const connection = await mysql.createConnection({
  //     host: 'localhost',
  //     user: 'root',
  //     database: 'jwt',
  //     Promise: bluebird,
  //   });

  // try {
  //     const [rows, fields] = await connection.execute(
  //         'SELECT * FROM `users` '
  //       );
  //       return rows;
  // } catch (error) {
  //     console.log("check err:", error);
  // }
};

const delettUser = async (userid) => {
  await db.User.destroy({
    where: { id: userid },
  });
  // const connection = await mysql.createConnection({
  //     host: 'localhost',
  //     user: 'root',
  //     database: 'jwt',
  //     Promise: bluebird,
  //   });
  //   try {
  //     const [rows, fields] = await connection.execute(
  //         'DELETE FROM `users` WHERE id=?',[id]
  //       );
  //       return rows;
  // } catch (error) {
  //     console.log("check err:", error);
  // }
};
const getUserByid = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: { id: id },
  });
  return user;
  // const connection = await mysql.createConnection({
  //     host: 'localhost',
  //     user: 'root',
  //     database: 'jwt',
  //     Promise: bluebird,
  //   });
  //   try {
  //     const [rows, fields] = await connection.execute(
  //         'SELECT * FROM `users` WHERE id=?',[id]
  //       );
  //       console.log(rows)
  //       return rows;

  // } catch (error) {
  //     console.log("check err:", error);
  // }
};
const updateUserInfor = async (email, username, id) => {
  await db.User.update(
    { email: email, username: username, id: id },
    {
      where: {
        id: id,
      },
    }
  );
  // const connection = await mysql.createConnection({
  //     host: 'localhost',
  //     user: 'root',
  //     database: 'jwt',
  //     Promise: bluebird,
  //   });
  //   try {
  //     const [rows, fields] = await connection.execute(
  //         'update `users` set email=?, username=? where id=?',[email, username, id]
  //       );
  //       console.log(rows)
  //       return rows;

  // } catch (error) {
  //     console.log("check err:", error);
  // }
};

module.exports = {
  createNewUser,
  getUserList,
  delettUser,
  getUserByid,
  updateUserInfor,
};
