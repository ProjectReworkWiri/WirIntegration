import express from "express";
import { coursesControllers } from "../controllers/courses.controllers.js";
import { isLoged } from "../middleware.js";

const courseRoutes = express.Router();

//Public routes for get data:

courseRoutes.get("/categories", coursesControllers.getCategories);

courseRoutes.get("/games", coursesControllers.getGames);

courseRoutes.get("/public", coursesControllers.getPublic);

//Private routes for specific actions:

courseRoutes.get("/", isLoged, coursesControllers.getCourses);

courseRoutes.post("/", isLoged, coursesControllers.postCourse);

<<<<<<< HEAD
=======
courseRoutes.get("/sessions", isLoged, coursesControllers.getSessions);


>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
courseRoutes.put("/:id", isLoged, coursesControllers.putCourse);

courseRoutes.delete("/:id", isLoged, coursesControllers.deleteCourse);

courseRoutes.post("/games", isLoged, coursesControllers.postSession);

courseRoutes.post("/join", isLoged, coursesControllers.postJoin);

export default courseRoutes;