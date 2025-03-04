import db from "../models";
const getGroups = async () => {
  try {
    let data = await db.Groups.findAll({
      order: [["name", "ASC"]],
    });
    return {
      EM: "get group success",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    return { EM: "get group success", EC: 0, DT: data };
  }
};

module.exports = { getGroups };
