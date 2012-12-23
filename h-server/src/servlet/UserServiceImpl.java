package servlet;

import org.apache.thrift.TException;

import thrift.ErrorType;
import thrift.HException;
import thrift.User;

import com.google.common.base.Strings;
import com.google.inject.Inject;

import db.dao.UserDAO;
import error.HAPIException;

public class UserServiceImpl implements thrift.UserService.Iface {

    private final UserDAO userDAO;

    @Inject
    public UserServiceImpl(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @Override
    public User login(String email, String password) throws HException,
            TException {
        if (Strings.isNullOrEmpty(email) || Strings.isNullOrEmpty(password)) {
            throw new HAPIException(ErrorType.INVALID_PARAM);
        }

        db.model.User user = userDAO.get(email);
        if (user == null) {
            // email does not match any users
            throw new HAPIException(ErrorType.INVALID_REQUEST);
        }

        // wrap email/pass in object for easy comparison
        db.model.User credentials = new db.model.User();
        credentials.setEmail(email);
        credentials.setPassword(password);

        // validate email/pass
        if (!credentials.equals(user)) {
            throw new HAPIException(ErrorType.INVALID_REQUEST);
        }

        return toThrift(user);
    }

    @Override
    public User signup(String email, String password, User user)
            throws HException, TException {
        if (Strings.isNullOrEmpty(email) || Strings.isNullOrEmpty(password)
                || user == null || Strings.isNullOrEmpty(user.getName())
                || Strings.isNullOrEmpty(user.getNickname())) {
            throw new HAPIException(ErrorType.INVALID_PARAM);
        }

        db.model.User u = userDAO.get(email);
        if (u != null) {
            // email already taken
            throw new HAPIException(ErrorType.INVALID_REQUEST);
        }

        // create a new user object
        u = new db.model.User();
        u.setEmail(email);
        u.setPassword(password);
        u.setName(user.getName());
        u.setNickName(user.getNickname());

        // persist
        userDAO.create(u);

        return toThrift(u);
    }

    private User toThrift(db.model.User user) {
        User tUser = new User();
        tUser.setEmail(user.getEmail());
        tUser.setName(user.getName());
        tUser.setNickname(user.getNickName());
        return tUser;
    }

}
