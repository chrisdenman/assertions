import Primitives from "primitives";

export default class Assertions {

    constructor() {
        throw Error("This class can not be instantiated");
    }

    /**
     *
     *
     * @param {*} subject - the value to assert as being a positive number
     * @param {string|function} [errorFnOrMessage] - either, a function that returns a custom error, or a message
     * for a standard Error
     *
     * @return {number} 'subject'
     *
     * @throws {Error|*} if 'errorFnOrMessage' is a function, the result of that function is thrown else, if
     * 'errorFnOrMessage' is a string an <code>Error</code> object with that string as a message, else an
     * <code>Error</code> object with no message.
     */

    /**
     * Throws an error if 'subject' is not a <code>string</code>.
     *
     * @param {*} subject - the value to assert as being a <code>string</code>
     * @param {string|function} [errorFnOrMessage] - either, a function that returns a custom error, or a message
     * for a standard Error
     *
     * @return {number} 'subject'
     *
     * @throws {Error|*} if 'errorFnOrMessage' is a function, the result of that function is thrown else, if
     * 'errorFnOrMessage' is a string an <code>Error</code> object with that string as a message, else an
     * <code>Error</code> object with no message.
     */
    static isString(subject, errorFnOrMessage) {
        return Assertions.#isPrimitiveTypeOf(subject, Primitives.TYPE_IDENTIFIER__STRING, errorFnOrMessage);
    }

    /**
     * Throws an error if 'subject' is not a non-negative (>=0) number.
     *
     * @param {*} subject - the value to assert as being a non-negative number
     * @param {string|function} [errorFnOrMessage] - either, a function that returns a custom error, or a message
     * for a standard <code>Error</code> object
     *
     * @return {number} 'subject'
     *
     * @throws {Error|*} if 'errorFnOrMessage' is a function, the result of that function is thrown else, if
     * 'errorFnOrMessage' is a string an <code>Error</code> object with that string as a message, else an
     * <code>Error</code> object with no message.
     */
    static isNonNegativeNumber(subject, errorFnOrMessage) {
        Assertions.isNumber(subject, errorFnOrMessage);
        Assertions.withGuard(() => subject >= 0, errorFnOrMessage);

        return subject;
    }

    /**
     * Throws an error if 'subject' is not a positive number.
     *
     * @param {*} subject - the value to assert as being a positive number
     * @param {string|function} [errorFnOrMessage] - either, a function that returns a custom error, or a message
     * for a standard Error
     *
     * @return {number} 'subject'
     *
     * @throws {Error|*} if 'errorFnOrMessage' is a function, the result of that function is thrown else, if
     * 'errorFnOrMessage' is a string an <code>Error</code> object with that string as a message, else an
     * <code>Error</code> object with no message.
     */
    static isPositiveNumber(subject, errorFnOrMessage) {
        Assertions.isNumber(subject, errorFnOrMessage);
        Assertions.withGuard(() => subject > 0, errorFnOrMessage);

        return subject;
    }

    /**
     * Throws an error if 'subject' is not a number type with an integer value.
     *
     * @param {*} subject - the value to assert as being an integer
     * @param {string|function} [errorFnOrMessage] - either, a function that returns a custom error, or a message
     * for a standard <code>Error</code> object
     *
     * @return {number} 'subject'
     *
     * @throws {Error|*} if 'errorFnOrMessage' is a function, the result of that function is thrown else, if
     * 'errorFnOrMessage' is a string an <code>Error</code> object with that string as a message, else an
     * <code>Error</code> object with no message.
     */
    static isIntegerNumber(subject, errorFnOrMessage) {
        Assertions.withGuard(() => Number.isInteger(subject), errorFnOrMessage);

        return subject;
    }

    /**
     * Throws an error if 'subject' is not an instance of 'constructor'.
     *
     * @param {*} subject - the value to assert
     * @param {*} constructor - the constructor value to test for
     * @param {string|function} [errorFnOrMessage] - either, a function that returns a custom error, or a message
     * for a standard <code>Error</code>
     *
     * @return {*} 'subject' - the value to test
     *
     * @throws {Error|*} if 'errorFnOrMessage' is a function, the result of that function is thrown else, if
     * 'errorFnOrMessage' is a string an <code>Error</code> object with that string as a message, else an
     * <code>Error</code> object with no message.
     * */
    static isInstanceOf(subject, constructor, errorFnOrMessage) {
        Assertions.withGuard(() => subject instanceof constructor, errorFnOrMessage);

        return subject;
    }

    /**
     * Throws an error if 'subject' is the primitive type designated by 'type'.
     *
     * @param {*} subject - the value to assert the type of
     * @param {String} type - the primitive datatype to check for
     * @param {string|function} [errorFnOrMessage] - either, a function that returns a custom error, or a message
     * for a standard <code>Error</code>
     *
     * @return {*} 'subject' - the value to test
     *
     * @throws {Error|*} if 'errorFnOrMessage' is a function, the result of that function is thrown else, if
     * 'errorFnOrMessage' is a string an <code>Error</code> object with that string as a message, else an
     * <code>Error</code> object with no message.
     */
    static #isPrimitiveTypeOf(subject, type, errorFnOrMessage) {
        Assertions.withGuard(() => Primitives.isTypeOf(subject, type), errorFnOrMessage);

        return subject;
    }

    /**
     * Throws an error if 'subject' is a number.
     *
     * @param {*} subject - the value to assert as being a number
     * @param {string|function} [errorFnOrMessage] - either, a function that returns a custom error, or a message
     * for a standard <code>Error</code>
     *
     * @return {number} 'subject'
     *
     * @throws {Error|*} if 'errorFnOrMessage' is a function, the result of that function is thrown else, if
     * 'errorFnOrMessage' is a string an <code>Error</code> object with that string as a message, else an
     * <code>Error</code> object with no message.
     */
    static isNumber(subject, errorFnOrMessage) {
        return Assertions.#isPrimitiveTypeOf(subject, Primitives.TYPE_IDENTIFIER__NUMBER, errorFnOrMessage);
    }

    /**
     * Throws an error if 'guard' does not return <code>true</code>.
     *
     * @param {function} guard - a function that is expected to return <code>true</code>
     * @param {string|function} [errorFnOrMessage] - either, a function that returns a custom error, or a message
     * for a standard <code>Error</code>
     *
     * @throws {Error|*} if 'errorFnOrMessage' is a function, the result of that function is thrown else, if
     * 'errorFnOrMessage' is a string an <code>Error</code> object with that string as a message, else an
     * <code>Error</code> object with no message.
     */
    static withGuard(guard, errorFnOrMessage) {
        Assertions.isTrue(guard(), errorFnOrMessage)
    }

    /**
     * Throws an error if 'subject' is not strictly <code>true</code>.
     *
     * @param {boolean} subject - the value to test
     * @param {string|function} [errorFnOrMessage] - either, a function that returns a custom error, or a message
     * for a standard <code>Error</code>
     *
     * @throws {Error|*} if 'errorFnOrMessage' is a function, the result of that function is thrown else, if
     * 'errorFnOrMessage' is a string an <code>Error</code> object with that string as a message, else an
     * <code>Error</code> object with no message.
     */
    static isTrue(subject, errorFnOrMessage) {
        if (subject !== true) {
            throw (errorFnOrMessage instanceof Function) ?
                errorFnOrMessage() :
                Primitives.isString(errorFnOrMessage) ?
                    new Error(errorFnOrMessage) :
                    new Error();
        }
    }
}
