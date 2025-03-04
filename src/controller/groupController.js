import groupService from "../service/groupService";

const readFunc = async (req, res) => {
  try {
    let data = await groupService.getGroups();
    return res.status(200).json({
      EM: data.EM, //ror message
      EC: data.EC, //error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "error from server", //ror message
      EC: "1", //error code
      DT: "", //data
    });
  }
};

module.exports = {
  readFunc,
};
