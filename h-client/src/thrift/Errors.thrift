/*
 * Error definitions
 * @author Ragil Prasetya - praser05@gmail.com
 */

namespace java thrift

enum ErrorType {
    INVALID_PARAM = 1,
    INVALID_REQUEST = 2,
    UNKNOWN_ERROR = 3
}

exception HException {
    // next number is 4

    1: optional ErrorType type;
    2: optional string message;
    3: optional list<string> values;
}
