import { By } from '@angular/platform-browser';
import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from './../courses.module';
import {
  TestBed,
  ComponentFixture,
  async,
  waitForAsync,
} from '@angular/core/testing';
import { setupCourses } from '../common/setup-test-data';
import { DebugElement } from '@angular/core';

describe('CoursesCardListComponent', () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CoursesModule],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(CoursesCardListComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
        });
    })
  );

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the course list', () => {
    component.courses = setupCourses();

    // check if the the cards are being displayed
    const cards = el.queryAll(By.css('.course-card'));

    expect(cards).toBeTruthy();

    // check the length of courses
    expect(cards.length).toBe(12, 'Unexpected amount of cards');
  });

  it('should display the first course', () => {
    pending();
  });
});
