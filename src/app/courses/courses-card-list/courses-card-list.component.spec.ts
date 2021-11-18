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
    fixture.detectChanges();

    // check if the the cards are being displayed
    const cards = el.queryAll(By.css('.course-card'));

    expect(cards).toBeTruthy();

    // check the length of courses
    expect(cards.length).toBe(12, 'Unexpected amount of cards');
  });

  it('should display the first course', () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    const firstCourse = component.courses[0];

    // get all the cards currently displayed.
    const cards = el.queryAll(By.css('.course-card'));

    expect(cards).toBeTruthy();

    // get the first card
    const firstCard = cards[0];

    const firstCardTitle: HTMLElement =
      firstCard.nativeElement.querySelector('mat-card-title');
    const firstCardContent: HTMLElement =
      firstCard.nativeElement.querySelector('mat-card-content');

    expect(firstCard).toBeTruthy();
    expect(firstCardTitle.textContent).toBe(firstCourse.titles.description);
    expect(firstCardContent.textContent).toBe(
      firstCourse.titles.longDescription
    );

    console.log(firstCard.nativeElement.outerHTML);
  });
});
