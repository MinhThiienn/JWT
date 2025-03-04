import userService from "../service/userService";
const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const userHandle = async (req, res) => {
  let userList = await userService.getUserList();
  //    await userService.delettUser(5)
  return res.render("user.ejs", { userList });
};

const handleCreateNewUser = (req, res) => {
  let emailName = req.body.emailName;
  let passwordN = req.body.passwordN;
  let userName = req.body.userName;

  userService.createNewUser(emailName, passwordN, userName);

  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  console.log("check id", req.params.id);
  await userService.delettUser(req.params.id);
  return res.redirect("/user");
};

const handleUpdateUser = async (req, res) => {
  let id = req.params.id;
  let user = await userService.getUserByid(id);
  let dataUser = {};
  dataUser = user;
  return res.render("UpdateUser.ejs", { dataUser });
};
const updateUser = async (req, res) => {
  let email = req.body.emailName;
  let username = req.body.userName;
  let id = req.body.id;
  await userService.updateUserInfor(email, username, id);
  return res.redirect("/user");
};

module.exports = {
  handleHelloWorld,
  userHandle,
  handleCreateNewUser,
  handleDeleteUser,
  handleUpdateUser,
  updateUser,
};
