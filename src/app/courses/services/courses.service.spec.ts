import { COURSES } from './../../../../server/db-data';
import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('CoursesService', () => {
  let coursesService: CoursesService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    coursesService = TestBed.inject(CoursesService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all courses', () => {
    // make call to get all courses and subscribe
    coursesService.findAllCourses().subscribe((courses) => {
      // ensure there is something inside 'courses'
      expect(courses).toBeTruthy('No courses returned.');

      // ensure the length of the courses is 12
      expect(courses.length).toBe(12, 'Incorrect number of courses');

      // ensure a course can be found
      const course = courses.find((course) => course.id == 12);
      expect(course.titles.description).toBe('Angular Testing Course');
    });

    // ensure the http request is made (once)
    const req = http.expectOne('http://localhost:9000/api/courses');

    // ensure the request method is a GET
    expect(req.request.method).toBe('GET');

    req.flush({ payload: Object.values(COURSES) });
  });

  it('should find a course with ID 12', () => {
    coursesService.findCourseById(12).subscribe((course) => {
      // ensure there is something inside course
      expect(course).toBeTruthy('Course is null.');

      // ensure id of course is 12
      expect(course.id).toBe(12);
    });

    const req = http.expectOne('http://localhost:9000/api/courses/12');

    // ensure a get method was called
    expect(req.request.method).toBe('GET');

    req.flush(COURSES[12]);
  });

  afterEach(() => {
    http.verify();
  });
});
