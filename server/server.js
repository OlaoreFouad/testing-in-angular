"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");

var get_courses_route_1 = require("./get-courses.route");
var search_lessons_route_1 = require("./search-lessons.route");
var save_course_route_1 = require("./save-course.route");
var bodyParser = require("body-parser");
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.route("/api/courses").get(get_courses_route_1.getAllCourses);
app.route("/api/courses/:id").get(get_courses_route_1.getCourseById);
app.route("/api/lessons").get(search_lessons_route_1.searchLessons);
app.route("/api/courses/:id").put(save_course_route_1.saveCourse);
var httpServer = app.listen(9000, function () {
  console.log(
    "HTTP REST API Server running at http://localhost:" +
      httpServer.address().port
  );
});
