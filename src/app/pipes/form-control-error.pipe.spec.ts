import { FormControlErrorPipe } from './form-control-error.pipe';
import { TestBed } from '@angular/core/testing';
import { ErrorMessage } from '@tokens/error-message.token';

describe('FormControlErrorPipe', () => {
  it('create an instance', () => {
    const {pipe} = setup();

    expect(pipe).toBeTruthy();
  });

  it('should return error message from errorMessageMap', () => {
    const {pipe, key, value} = setup();

    expect(pipe.transform(key, {})).toBe(value);
  });

  it('should call console.warn if no message for validator', () => {
    const {pipe} = setup();
    const warnSpy = spyOn(console, 'warn');
    const key = 'do not exist';

    pipe.transform(key, {});

    expect(warnSpy).toHaveBeenCalled();
  });
});

function setup() {
  const key = 'test';
  const value = 'test value';

  TestBed.configureTestingModule({
    providers: [
      FormControlErrorPipe,
      {
        provide: ErrorMessage,
        useValue: {[key]: (): string => value}
      }
    ]
  });

  const pipe: FormControlErrorPipe = TestBed.inject(FormControlErrorPipe);

  return {
    pipe,
    key,
    value
  };
}
