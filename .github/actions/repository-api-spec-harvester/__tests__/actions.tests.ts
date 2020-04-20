//import * as test from "ts-jest";

import { Greeter, doSomething, readFiles } from '../index';

test('My Greeter', () => {
  expect(Greeter('Carl')).toBe('Hello Carl');
});

test('doSomething should do Something', () => {
    expect(doSomething()).toBe('done');
  });

/*
  test('readFiles should do something too', () => {
    expect(readFiles()).toBe('done');
  });
*/
