/**
 * Autogenerated by Thrift Compiler (0.9.0)
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 *  @generated
 */
package thrift;


import java.util.Map;
import java.util.HashMap;
import org.apache.thrift.TEnum;

public enum ErrorType implements org.apache.thrift.TEnum {
  INVALID_PARAM(1),
  INVALID_REQUEST(2),
  UNKNOWN_ERROR(3);

  private final int value;

  private ErrorType(int value) {
    this.value = value;
  }

  /**
   * Get the integer value of this enum value, as defined in the Thrift IDL.
   */
  public int getValue() {
    return value;
  }

  /**
   * Find a the enum type by its integer value, as defined in the Thrift IDL.
   * @return null if the value is not found.
   */
  public static ErrorType findByValue(int value) { 
    switch (value) {
      case 1:
        return INVALID_PARAM;
      case 2:
        return INVALID_REQUEST;
      case 3:
        return UNKNOWN_ERROR;
      default:
        return null;
    }
  }
}
