/**
 * Proxies for thrift service.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    require('Thrift');
    require('thrift/UserService_types');
    require('thrift/UserService');

    var createFakeUser = function(options) {
        options = options || {};
        options.email = options.email || 'user@email.com';
        options.name = options.name || 'Husky';

        return new User({
            email : options.email,
            name : options.name
        });
    };

    var login = function(email, pass, success, error) {
        success(createFakeUser());
    };

    var signup = function(email, pass, user, success, error) {
        success(user);
    };

    return {
        login : login,
        signup : signup
    };
});