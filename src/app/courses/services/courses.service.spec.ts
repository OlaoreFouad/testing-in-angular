import { COURSES, findLessonsForCourse } from './../../../../server/db-data';
import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Course } from '../model/course';
import { HttpErrorResponse } from '@angular/common/http';

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
    pending();
    // coursesService.findCourseById(12).subscribe((course) => {
    //   // ensure there is something inside course
    //   expect(course).toBeTruthy('Course is null.');

    //   // ensure id of course is 12
    //   expect(course.id).toBe(12);
    // });

    // const req = http.expectOne('http://localhost:9000/api/courses/12');

    // // ensure a get method was called
    // expect(req.request.method).toBe('GET');

    // req.flush(COURSES[12]);
  });

  it('should save a course', () => {
    const changes: Partial<Course> = {
      titles: { description: 'This is the new description' },
    };

    coursesService.saveCourse(12, changes).subscribe((course) => {
      expect(course.id).toBe(12);
      expect(course.titles.description).toEqual(changes.titles.description);
    });

    const request = http.expectOne('http://localhost:9000/api/courses/12');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body.titles.description).toBe(
      changes.titles.description
    );

    request.flush({
      ...COURSES[12],
      ...changes,
    });
  });

  it('should fail when it attempts to save a course', () => {
    const changes: Partial<Course> = {
      titles: { description: 'New Description' },
    };

    coursesService.saveCourse(12, changes).subscribe(
      () => fail('Error occured when trying to save course'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      }
    );

    const req = http.expectOne('http://localhost:9000/api/courses/12');
    expect(req.request.method).toBe('PUT');

    req.flush('Save course failed!', {
      status: 500,
      statusText: 'Error occured when trying to save course',
    });
  });

  it('should retrieve all lesssons for course', () => {
    coursesService.findLessons(12).subscribe((lessons) => {
      expect(lessons.length).toBe(3);
    });

    const req = http.expectOne(
      (req) => req.url == 'http://localhost:9000/api/lessons'
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('courseId')).toBe('12');
    expect(req.request.params.get('filter')).toBe('');
    expect(req.request.params.get('sortOrder')).toBe('asc');
    expect(req.request.params.get('pageNumber')).toBe('0');
    expect(req.request.params.get('pageSize')).toBe('3');

    req.flush(findLessonsForCourse(12).slice(0, 3));
  });

  afterEach(() => {
    http.verify();
  });
});
