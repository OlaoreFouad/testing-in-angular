import { TestBed } from '@angular/core/testing';
import { any } from 'cypress/types/bluebird';
import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';
describe('CalculatorService', () => {
  let loggerSpy: any;
  let calc: CalculatorService;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: loggerSpy,
        },
      ],
    });

    calc = TestBed.inject(CalculatorService);
  });

  it('should add two numbers', () => {
    const result = calc.add(2, 5);

    expect(result).toBe(
      7,
      `Unexpected result: ${result} for addition of 2 and 5`
    );
    expect(loggerSpy.log).toHaveBeenCalledTimes(2);
  });

  it('should subtract two numbers', () => {
    const result = calc.subtract(5, 2);

    expect(result).toBe(
      3,
      `Unexpected result: ${result} for subtraction of 2 from 5`
    );
  });
});
