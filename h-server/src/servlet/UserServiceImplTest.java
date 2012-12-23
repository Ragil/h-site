package servlet;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;

import java.security.MessageDigest;

import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;

import com.google.inject.Binder;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Module;

import db.dao.UserDAO;
import db.model.User;
import error.HAPIException;

public class UserServiceImplTest {

    private UserDAO         userDAO;
    private UserServiceImpl userServiceImpl;

    private final String    email    = "email@gmail.com";
    private final String    password = "password";
    private final String    name     = "name";
    private final String    nickName = "nickName";

    @Before
    public void setup() {
        Injector injector = Guice.createInjector(new Module() {
            @Override
            public void configure(Binder bind) {
                bind.bind(UserDAO.class).toInstance(mock(UserDAO.class));
            }
        });

        userDAO = injector.getInstance(UserDAO.class);
        userServiceImpl = injector.getInstance(UserServiceImpl.class);
    }

    thrift.User buildTUser() {
        thrift.User tUser = new thrift.User();
        tUser.setName(name);
        tUser.setNickname(nickName);
        return tUser;
    }

    @Test(expected = HAPIException.class)
    public void login_shouldThrowInvalidParamOnNullEmail() throws Exception {
        userServiceImpl.login(null, password);
    }

    @Test(expected = HAPIException.class)
    public void login_shouldThrowInvalidParamOnEmptyEmail() throws Exception {
        userServiceImpl.login("", password);
    }

    @Test(expected = HAPIException.class)
    public void login_shouldThrowInvalidParamOnNullPassword() throws Exception {
        userServiceImpl.login(email, null);
    }

    @Test(expected = HAPIException.class)
    public void login_shouldThrowInvalidParamOnEmptyPassword() throws Exception {
        userServiceImpl.login(email, "");
    }

    @Test(expected = HAPIException.class)
    public void login_shouldThrowInvalidRequestOnUnknownEmail()
            throws Exception {
        when(userDAO.get(email)).thenReturn(null);
        userServiceImpl.login(email, password);
    }

    @Test(expected = HAPIException.class)
    public void login_shouldThrowInvalidRequestOnWrongPassword()
            throws Exception {
        // create fake user
        User u = new User();
        u.setEmail(email);
        u.setPassword(password);
        when(userDAO.get(email)).thenReturn(u);

        // login with wrong password
        userServiceImpl.login(email, "badpassword");
    }

    @Test
    public void login_shouldReturnAThriftUserOnMatchingCredentials()
            throws Exception {
        // create fake user
        User u = new User();
        u.setEmail(email);
        u.setName(name);
        u.setNickName(nickName);
        u.setPassword(password);
        when(userDAO.get(email)).thenReturn(u);

        // login with wrong password
        thrift.User tUser = userServiceImpl.login(email, password);

        // verify return value
        assertEquals(email, tUser.getEmail());
        assertEquals(name, tUser.getName());
        assertEquals(nickName, tUser.getNickname());
    }

    @Test(expected = HAPIException.class)
    public void signup_shouldThrowInvalidParamOnNullEmail() throws Exception {
        userServiceImpl.signup(null, password, buildTUser());
    }

    @Test(expected = HAPIException.class)
    public void signup_shouldThrowInvalidParamOnEmptyEmail() throws Exception {
        userServiceImpl.signup("", password, buildTUser());
    }

    @Test(expected = HAPIException.class)
    public void signup_shouldThrowInvalidParamOnNullPassword() throws Exception {
        userServiceImpl.signup(email, null, buildTUser());
    }

    @Test(expected = HAPIException.class)
    public void signup_shouldThrowInvalidParamOnEmptyPassword()
            throws Exception {
        userServiceImpl.signup(email, "", buildTUser());
    }

    @Test(expected = HAPIException.class)
    public void signup_shouldThrowInvalidParamOnNullName() throws Exception {
        thrift.User tUser = buildTUser();
        tUser.setName(null);
        userServiceImpl.signup(email, password, tUser);
    }

    @Test(expected = HAPIException.class)
    public void signup_shouldThrowInvalidParamOnEmptyName() throws Exception {
        thrift.User tUser = buildTUser();
        tUser.setName("");
        userServiceImpl.signup(email, password, tUser);
    }

    @Test(expected = HAPIException.class)
    public void signup_shouldThrowInvalidParamOnNullNickName() throws Exception {
        thrift.User tUser = buildTUser();
        tUser.setNickname(null);
        userServiceImpl.signup(email, password, tUser);
    }

    @Test(expected = HAPIException.class)
    public void signup_shouldThrowInvalidParamOnEmptyNickName()
            throws Exception {
        thrift.User tUser = buildTUser();
        tUser.setNickname("");
        userServiceImpl.signup(email, password, tUser);
    }

    @Test(expected = HAPIException.class)
    public void signup_shouldThrowInvalidRequestWhenEmailTaken()
            throws Exception {
        when(userDAO.get(email)).thenReturn(new User());
        userServiceImpl.signup(email, password, buildTUser());
    }

    @Test
    public void signup_shouldCreateNewUserWhenEmailNotTaken() throws Exception {
        when(userDAO.get(email)).thenReturn(null);
        thrift.User tUser = userServiceImpl.signup(email, password,
                buildTUser());

        // create md5 hash of password
        MessageDigest m = MessageDigest.getInstance("MD5");
        String hashedPass = new String(m.digest(password.getBytes()));

        // verify that a new user is created
        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userDAO).create(captor.capture());
        User user = captor.getValue();
        assertEquals(email, user.getEmail());
        assertEquals(hashedPass, user.getPassword());
        assertEquals(name, user.getName());
        assertEquals(nickName, user.getNickName());

        // verify the thrift return value
        assertEquals(email, tUser.getEmail());
        assertEquals(name, tUser.getName());
        assertEquals(nickName, tUser.getNickname());
    }
}
