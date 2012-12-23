package error;

import java.util.Arrays;

import thrift.ErrorType;
import thrift.HException;

public class HAPIException extends HException {

    private static final long serialVersionUID = 8839094876267420826L;

    public HAPIException(ErrorType type) {
        this(type, null);
    }

    public HAPIException(ErrorType type, String message) {
        this(type, message, new String[0]);
    }

    public HAPIException(ErrorType type, String message, String... values) {
        this.setType(type);
        this.setMessage(message);
        this.setValues(Arrays.asList(values));
    }

}
