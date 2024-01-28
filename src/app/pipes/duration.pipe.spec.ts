import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should properly build the datetime: "Xh YYmin"', () => {
    const minutes = 100;

    expect(pipe.transform(minutes)).toBe('1h 40min');
  });

  it('should display only minutes if time less than 1 hour', () => {
    const minutes = 50;

    expect(pipe.transform(minutes)).toBe('50 minutes');
  });

  it('should display "0 minutes" if it receive negative number', () => {
    const minutes = -32;

    expect(pipe.transform(minutes)).toBe('0 minutes');
  });

  it('should display "1 minute" if receive number 1', () => {
    const minutes = 1;

    expect(pipe.transform(minutes)).toBe('1 minute');
  });
});
