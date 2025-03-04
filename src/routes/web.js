import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";
const router = express.Router();

/**
 *
 * @param {*} app express app
 */
const initWebRoutes = (app) => {
  router.get("/", homeController.handleHelloWorld);
  router.get("/user", homeController.userHandle);
  router.post("/user/create-user", homeController.handleCreateNewUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.get("/update-user/:id", homeController.handleUpdateUser);
  router.post("/user/update-user", homeController.updateUser);

  router.get("/api/test-api", apiController.testApi);

  return app.use("/", router);
};

export default initWebRoutes;
