package main.java.listener;

import main.java.servlet.ActivityServlet;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;
import com.google.inject.servlet.ServletModule;

public class Listener extends GuiceServletContextListener {

    class HModule extends ServletModule {
        @Override
        protected void configureServlets() {
            serve("/*").with(ActivityServlet.class);
        }
    }

    @Override
    protected Injector getInjector() {
        return Guice.createInjector(new HModule());
    }

}
