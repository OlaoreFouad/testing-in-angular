"use strict";
exports.__esModule = true;
exports.saveCourse = void 0;
var db_data_1 = require("./db-data");
function saveCourse(req, res) {
    var id = req.params["id"], changes = req.body;
    console.log("Saving course", id, JSON.stringify(changes));
    var course = (0, db_data_1.findCourseById)(id);
    course.titles = changes.titles;
    res.status(200).json(course);
}
exports.saveCourse = saveCourse;
