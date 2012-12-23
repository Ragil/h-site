/*
 * Error definitions
 * @author Ragil Prasetya - praser05@gmail.com
 */

namespace java main.java.thrift

enum ErrorType {
    INVALID_PARAM = 1
}

exception HException {
    // next number is 4

    1: optional ErrorType type;
    2: optional string message;
    3: optional list<string> values;
}
