/*
 * Services to retrieve user data.
 * @author Ragil Prasetya - praser05@gmail.com
 */

namespace java main.java.thrift

include "Errors.thrift"

struct User {
    // next number 3

    1: optional string id;
    2: optional string name;
    3: optional string nickname;
}

service UserService {

    /**
     * Attempts to validate login information
     */
    User login(1: string email, 2: string password) throws (1: Errors.HException e),

    /**
     * Attempts create a new user
     */
    User signup(1: string email, 2: string password, 3: User user) throws (1: Errors.HException e)

}