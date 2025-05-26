import express from "express";

import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clientController.js";

const router = express.Router();

router.route("/").get(getClients).post(createClient);

router.route("/:id").get(getClientById).put(updateClient).delete(deleteClient);

export default router;
