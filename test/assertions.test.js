import {describe, expect, it} from '@jest/globals';
import Primitives from "@ceilingcat/primitives";
import Assertions from "../src/assertions.js";

const expectACustomError = function (invoker, expectedError) {
    let thrownError
    try {
        invoker()
    } catch (error) {
        thrownError = error
    }

    expect(thrownError).toStrictEqual(expectedError);
}

describe("Assertions Tests", () => {

    describe(
        "That the instantiation of the class throws an Error with the expected properties",
        () => {
            expectACustomError(() => new Assertions(), Error("This class can not be instantiated"));
        }
    );

    const customErrorMessage = "message";
    const customError = {};

    it.each`
      subject           | errorFnOrMessage      | expectStandardError   | expectStandardErrorWithMessage    | expectCustomError
      ${1}              | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${0}              | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${10}             | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${0.1}            | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${0.000000000001} | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${-1}             | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}      
      ${""}             | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}      
      ${BigInt(1)}| ${undefined}          | ${true}               | ${undefined}                      | ${undefined}                        
      ${false}          | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}
      ${false}          | ${customErrorMessage} | ${undefined}          | ${true}                           | ${undefined}
      ${false}          | ${() => customError}  | ${undefined}          | ${undefined}                      | ${true}
    `(`isNonNegativeNumber`,
        ({
             subject,
             errorFnOrMessage,
             expectStandardError,
             expectStandardErrorWithMessage,
             expectCustomError
         }) => {
            checkErrorConditions(
                () => Assertions.isNonNegativeNumber(subject, errorFnOrMessage),
                errorFnOrMessage,
                expectStandardError,
                expectStandardErrorWithMessage,
                expectCustomError
            );
        });

    it.each`
      subject           | errorFnOrMessage      | expectStandardError   | expectStandardErrorWithMessage    | expectCustomError
      ${""}             | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${" "}            | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${'astring'}      | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${-0}             | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}      
      ${1}              | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}      
      ${BigInt(1)}| ${undefined}          | ${true}               | ${undefined}                      | ${undefined}                        
      ${false}          | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}
      ${false}          | ${customErrorMessage} | ${undefined}          | ${true}                           | ${undefined}
      ${false}          | ${() => customError}  | ${undefined}          | ${undefined}                      | ${true}
    `(`isString`,
        ({
             subject,
             errorFnOrMessage,
             expectStandardError,
             expectStandardErrorWithMessage,
             expectCustomError
         }) => {
            checkErrorConditions(
                () => Assertions.isString(subject, errorFnOrMessage),
                errorFnOrMessage,
                expectStandardError,
                expectStandardErrorWithMessage,
                expectCustomError
            );
        });

    it(
        'That isString returns the subject argument when it is a string',
        () => {
            const subject = "subject";
            expect(Assertions.isString(subject)).toBe(subject)
        }
    );

    it.each`
      subject           | errorFnOrMessage      | expectStandardError   | expectStandardErrorWithMessage    | expectCustomError
      ${1}              | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${10}             | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${100000000}      | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${0}              | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}      
      ${-0}             | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}      
      ${""}             | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}      
      ${BigInt(1)}| ${undefined}          | ${true}               | ${undefined}                      | ${undefined}                        
      ${false}          | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}
      ${false}          | ${customErrorMessage} | ${undefined}          | ${true}                           | ${undefined}
      ${false}          | ${() => customError}  | ${undefined}          | ${undefined}                      | ${true}
    `(`isPositiveNumber`,
        ({
             subject,
             errorFnOrMessage,
             expectStandardError,
             expectStandardErrorWithMessage,
             expectCustomError
         }) => {
            checkErrorConditions(
                () => Assertions.isPositiveNumber(subject, errorFnOrMessage),
                errorFnOrMessage,
                expectStandardError,
                expectStandardErrorWithMessage,
                expectCustomError
            );
        });

    it(
        'That isPositiveNumber returns the subject argument when it is a non-negative number',
        () => {
            const subject = 2;
            expect(Assertions.isPositiveNumber(subject)).toBe(subject)
        }
    );

    it(
        'That isNonNegativeNumber returns the subject argument when it is a non-negative number',
        () => {
            const subject = 2;
            expect(Assertions.isNonNegativeNumber(subject)).toBe(subject)
        }
    );

    it.each`
      subject           | errorFnOrMessage      | expectStandardError   | expectStandardErrorWithMessage    | expectCustomError
      ${1}              | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${0}              | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${-0}             | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${-1}             | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${0.0}            | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${-0.0}           | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${""}             | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}      
      ${BigInt(1)}| ${undefined}          | ${true}               | ${undefined}                      | ${undefined}                        
      ${false}          | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}
      ${false}          | ${customErrorMessage} | ${undefined}          | ${true}                           | ${undefined}
      ${false}          | ${() => customError}  | ${undefined}          | ${undefined}                      | ${true}
    `(`isIntegerNumber`,
        ({
             subject,
             errorFnOrMessage,
             expectStandardError,
             expectStandardErrorWithMessage,
             expectCustomError
         }) => {
            checkErrorConditions(
                () => Assertions.isIntegerNumber(subject, errorFnOrMessage),
                errorFnOrMessage,
                expectStandardError,
                expectStandardErrorWithMessage,
                expectCustomError
            );
        });

    it(
        'That isPositiveNumber returns the subject argument when it is an integer',
        () => {
            const subject = 2;
            expect(Assertions.isIntegerNumber(subject)).toBe(subject)
        }
    );

    it(
        'That isIntegerNumber returns the subject argument when it is an integer',
        () => {
            const subject = 2;
            expect(Assertions.isIntegerNumber(subject)).toBe(subject)
        }
    );

    it.each`
      subject               | constructor | errorFnOrMessage        | expectStandardError   | expectStandardErrorWithMessage    | expectCustomError
      ${{}}                 | ${Object}     | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${new Primitives()}   | ${Primitives} | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${new Primitives()}   | ${Object}     | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}      
      ${0}                  | ${Object}     | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}      
      ${""}                 | ${Primitives} | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}
      ${false}              | ${Primitives} | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}
      ${false}              | ${Primitives} | ${customErrorMessage} | ${undefined}          | ${true}                           | ${undefined}
      ${false}              | ${Primitives} | ${() => customError}  | ${undefined}          | ${undefined}                      | ${true}
    `(`isInstanceOf`,
        ({
             subject,
             constructor,
             errorFnOrMessage,
             expectStandardError,
             expectStandardErrorWithMessage,
             expectCustomError
         }) => {
            const subjectInvoker = () => Assertions.isInstanceOf(subject, constructor, errorFnOrMessage);
            checkErrorConditions(subjectInvoker, errorFnOrMessage, expectStandardError, expectStandardErrorWithMessage, expectCustomError);
        });

    it.each`
      subject           | errorFnOrMessage      | expectStandardError   | expectStandardErrorWithMessage    | expectCustomError
      ${1}              | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${0}              | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${-0}             | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${-1}             | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${0.0}            | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${-0.0}           | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${Infinity}       | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${-Infinity}      | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
                        
      ${""}             | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}      
      ${false}          | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}
      ${false}          | ${customErrorMessage} | ${undefined}          | ${true}                           | ${undefined}
      ${BigInt(1)}| ${customErrorMessage} | ${undefined}          | ${true}                           | ${undefined}
      ${false}          | ${() => customError}  | ${undefined}          | ${undefined}                      | ${true}
    `(`isNumber`,
        ({
             subject,
             errorFnOrMessage,
             expectStandardError,
             expectStandardErrorWithMessage,
             expectCustomError
         }) => {
            const subjectInvoker = () => Assertions.isNumber(subject, errorFnOrMessage);
            checkErrorConditions(subjectInvoker, errorFnOrMessage, expectStandardError, expectStandardErrorWithMessage, expectCustomError);
        });

    it(
        'That isNumber returns the subject argument when it is a number',
        () => {
            const subject = 2;
            expect(Assertions.isNumber(subject)).toBe(subject)
        }
    );

    it.each`
      guardResult   | errorFnOrMessage      | expectStandardError   | expectStandardErrorWithMessage    | expectCustomError
      ${true}       | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${0}          | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}
      ${""}         | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}
      ${false}      | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}
      ${false}      | ${customErrorMessage} | ${undefined}          | ${true}                           | ${undefined}
      ${false}      | ${() => customError}  | ${undefined}          | ${undefined}                      | ${true}
    `(`With Guard`,
        ({
             guardResult,
             errorFnOrMessage,
             expectStandardError,
             expectStandardErrorWithMessage,
             expectCustomError
         }) => {
            const subjectInvoker = () => Assertions.withGuard(() => guardResult, errorFnOrMessage);
            checkErrorConditions(subjectInvoker, errorFnOrMessage, expectStandardError, expectStandardErrorWithMessage, expectCustomError);
        });

    it.each`
      guardResult   | errorFnOrMessage      | expectStandardError   | expectStandardErrorWithMessage    | expectCustomError
      ${true}       | ${undefined}          | ${undefined}          | ${undefined}                      | ${undefined}
      ${0}          | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}
      ${""}         | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}
      ${false}      | ${undefined}          | ${true}               | ${undefined}                      | ${undefined}
      ${false}      | ${customErrorMessage} | ${undefined}          | ${true}                           | ${undefined}
      ${false}      | ${() => customError}  | ${undefined}          | ${undefined}                      | ${true}
    `(`isTrue`,
        ({
             guardResult,
             errorFnOrMessage,
             expectStandardError,
             expectStandardErrorWithMessage,
             expectCustomError
         }) => {
            const subjectInvoker = () => Assertions.isTrue(guardResult, errorFnOrMessage);
            checkErrorConditions(
                subjectInvoker,
                errorFnOrMessage,
                expectStandardError,
                expectStandardErrorWithMessage,
                expectCustomError
            );
        });

    const checkErrorConditions = function (
        subjectInvoker,
        errorFnOrMessage,
        expectStandardError,
        expectStandardErrorWithMessage,
        expectCustomError,
        expectReturnOf
    ) {
        if (expectStandardError === true) {
            expect(subjectInvoker).toThrowError()
        } else if (expectStandardErrorWithMessage === true) {
            expect(subjectInvoker).toThrowError(errorFnOrMessage)
        } else if (expectCustomError === true) {
            expectACustomError(subjectInvoker, errorFnOrMessage())
        } else if (expectReturnOf === true) {
            expect(subjectInvoker).toReturnWith(expectReturnOf)
        } else {
            expect(subjectInvoker).not.toThrowError()
        }
    }
});