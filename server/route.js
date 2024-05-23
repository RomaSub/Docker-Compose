import express from "express";
import cors from "cors";

const router = express.Router();

router.use(
  cors({
    origin: "*",
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    allowedHeaders: "X-Requested-With,content-type",
  }),
);

router.get("/", (req, res) => {
  res.send("Привет Мир");
});

export default router;
