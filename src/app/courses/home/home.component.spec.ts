import { CoursesService } from './../services/courses.service';
import { of } from 'rxjs';
import { Course } from './../model/course';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoursesModule } from '../courses.module';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';
import { click } from '../common/test-utils';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;

  let coursesService: any;

  const getCourses = (cat: string): Course[] => {
    return setupCourses().filter((course) => course.category === cat);
  };

  beforeEach(
    waitForAsync(() => {
      coursesService = jasmine.createSpyObj('CoursesService', [
        'findAllCourses',
      ]);

      TestBed.configureTestingModule({
        imports: [CoursesModule, NoopAnimationsModule, HttpClientTestingModule],
        providers: [{ provide: CoursesService, useValue: coursesService }],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(HomeComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;

          coursesService = TestBed.inject(CoursesService);
        });
    })
  );

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display only beginner courses', () => {
    coursesService.findAllCourses.and.returnValue(of(getCourses('BEGINNER')));
    fixture.detectChanges();

    // get amount of tabs displayed.
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    console.log('Amount of tabs: ' + tabs.length);

    expect(tabs.length).toBe(1, 'Unexpected amount of tabs on display.');

    const beginnersTab = tabs[0];
    const tabLabelContent = beginnersTab.query(By.css('.mat-tab-label-content'))
      .nativeElement as HTMLElement;

    expect(tabLabelContent.textContent).toContain('Beginners');
  });

  it('should display only advanced courses', () => {
    coursesService.findAllCourses.and.returnValue(of(getCourses('ADVANCED')));
    fixture.detectChanges();

    // get amount of tabs displayed.
    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toBe(1, 'Unexpected amount of tabs on display.');

    const beginnersTab = tabs[0];
    const tabLabelContent = beginnersTab.query(By.css('.mat-tab-label-content'))
      .nativeElement as HTMLElement;

    expect(tabLabelContent.textContent).toContain('Advanced');
  });

  it('should display both tabs', () => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(2, 'Tabs are supposed to be 2!');
  });

  it('should display advanced courses when tab clicked', () => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(2, 'Tabs are supposed to be 2!');

    click(tabs[1]);
    fixture.detectChanges();

    const cardTitles = el.queryAll(By.css('.mat-card-title'));
    expect(cardTitles.length).toBeGreaterThan(
      0,
      'Card titles are supposed to be available!'
    );
    expect((cardTitles[0].nativeElement as HTMLElement).textContent).toContain(
      'Angular Security Course'
    );
  });
});
