"use strict";
exports.__esModule = true;
exports.getCourseById = exports.getAllCourses = void 0;
var db_data_1 = require("./db-data");
function getAllCourses(req, res) {
    res.status(200).json({ payload: Object.values(db_data_1.COURSES) });
}
exports.getAllCourses = getAllCourses;
function getCourseById(req, res) {
    var courseId = req.params["id"];
    var courses = Object.values(db_data_1.COURSES);
    var course = courses.find(function (course) { return course.id == courseId; });
    res.status(200).json(course);
}
exports.getCourseById = getCourseById;
