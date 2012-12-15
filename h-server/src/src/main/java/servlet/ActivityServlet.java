package src.main.java.servlet;

import org.apache.thrift.TProcessor;
import org.apache.thrift.protocol.TProtocolFactory;
import org.apache.thrift.server.TServlet;

public class ActivityServlet extends TServlet {

    private static final long serialVersionUID = 4851522315467599348L;

    public ActivityServlet(TProcessor processor,
            TProtocolFactory protocolFactory) {
        super(processor, protocolFactory);
    }

}
