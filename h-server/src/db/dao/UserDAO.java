package db.dao;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.ObjectifyService;

import db.model.User;

public class UserDAO {

    public User get(String email) {
        return ObjectifyService.ofy().load().type(User.class).id(email).get();
    }

    public Key<User> create(User u) {
        return ObjectifyService.ofy().save().entity(u).now();
    }

}
