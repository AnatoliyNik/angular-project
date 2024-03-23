import { DurationPipe } from './duration.pipe';
import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('DurationPipe', () => {
  let pipe: DurationPipe;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [DurationPipe]
    });

    pipe = TestBed.inject(DurationPipe);
    translateService = TestBed.inject(TranslateService);

    spyOn(translateService, 'instant');
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should properly build the datetime: "Xh YYmin"', () => {
    const minutes = 100;
    pipe.transform(minutes);

    expect(translateService.instant).toHaveBeenCalledWith('COURSE.DURATION.SHORT_TIME', {hours: 1, minutes: 40});
  });

  it('should display only minutes if time less than 1 hour', () => {
    const minutes = 50;
    pipe.transform(minutes);

    expect(translateService.instant).toHaveBeenCalledWith('COURSE.DURATION.FULL_TIME', {minutes: 50});
  });

  it('should transform to 0 if it receive negative number', () => {
    const minutes = -32;
    pipe.transform(minutes);

    expect(translateService.instant).toHaveBeenCalledWith('COURSE.DURATION.FULL_TIME', {minutes: 0});
  });
});
