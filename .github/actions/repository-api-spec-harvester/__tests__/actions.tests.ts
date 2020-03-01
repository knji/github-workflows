import { Greeter, doSomething } from '../index';

test('My Greeter', () => {
  expect(Greeter('Carl')).toBe('Hello Carl');
});

test('doSomething should do Something', () => {
    expect(doSomething()).toBe('done');
  });

