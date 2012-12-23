/**
 * Autogenerated by Thrift Compiler (0.9.0)
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 *  @generated
 */
package thrift;

import org.apache.thrift.scheme.IScheme;
import org.apache.thrift.scheme.SchemeFactory;
import org.apache.thrift.scheme.StandardScheme;

import org.apache.thrift.scheme.TupleScheme;
import org.apache.thrift.protocol.TTupleProtocol;
import org.apache.thrift.protocol.TProtocolException;
import org.apache.thrift.EncodingUtils;
import org.apache.thrift.TException;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.EnumMap;
import java.util.Set;
import java.util.HashSet;
import java.util.EnumSet;
import java.util.Collections;
import java.util.BitSet;
import java.nio.ByteBuffer;
import java.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class YoutubeVideo implements org.apache.thrift.TBase<YoutubeVideo, YoutubeVideo._Fields>, java.io.Serializable, Cloneable {
  private static final org.apache.thrift.protocol.TStruct STRUCT_DESC = new org.apache.thrift.protocol.TStruct("YoutubeVideo");

  private static final org.apache.thrift.protocol.TField ID_FIELD_DESC = new org.apache.thrift.protocol.TField("id", org.apache.thrift.protocol.TType.STRING, (short)1);
  private static final org.apache.thrift.protocol.TField CREATED_TS_FIELD_DESC = new org.apache.thrift.protocol.TField("created_ts", org.apache.thrift.protocol.TType.I64, (short)2);

  private static final Map<Class<? extends IScheme>, SchemeFactory> schemes = new HashMap<Class<? extends IScheme>, SchemeFactory>();
  static {
    schemes.put(StandardScheme.class, new YoutubeVideoStandardSchemeFactory());
    schemes.put(TupleScheme.class, new YoutubeVideoTupleSchemeFactory());
  }

  public String id; // optional
  public long created_ts; // optional

  /** The set of fields this struct contains, along with convenience methods for finding and manipulating them. */
  public enum _Fields implements org.apache.thrift.TFieldIdEnum {
    ID((short)1, "id"),
    CREATED_TS((short)2, "created_ts");

    private static final Map<String, _Fields> byName = new HashMap<String, _Fields>();

    static {
      for (_Fields field : EnumSet.allOf(_Fields.class)) {
        byName.put(field.getFieldName(), field);
      }
    }

    /**
     * Find the _Fields constant that matches fieldId, or null if its not found.
     */
    public static _Fields findByThriftId(int fieldId) {
      switch(fieldId) {
        case 1: // ID
          return ID;
        case 2: // CREATED_TS
          return CREATED_TS;
        default:
          return null;
      }
    }

    /**
     * Find the _Fields constant that matches fieldId, throwing an exception
     * if it is not found.
     */
    public static _Fields findByThriftIdOrThrow(int fieldId) {
      _Fields fields = findByThriftId(fieldId);
      if (fields == null) throw new IllegalArgumentException("Field " + fieldId + " doesn't exist!");
      return fields;
    }

    /**
     * Find the _Fields constant that matches name, or null if its not found.
     */
    public static _Fields findByName(String name) {
      return byName.get(name);
    }

    private final short _thriftId;
    private final String _fieldName;

    _Fields(short thriftId, String fieldName) {
      _thriftId = thriftId;
      _fieldName = fieldName;
    }

    public short getThriftFieldId() {
      return _thriftId;
    }

    public String getFieldName() {
      return _fieldName;
    }
  }

  // isset id assignments
  private static final int __CREATED_TS_ISSET_ID = 0;
  private byte __isset_bitfield = 0;
  private _Fields optionals[] = {_Fields.ID,_Fields.CREATED_TS};
  public static final Map<_Fields, org.apache.thrift.meta_data.FieldMetaData> metaDataMap;
  static {
    Map<_Fields, org.apache.thrift.meta_data.FieldMetaData> tmpMap = new EnumMap<_Fields, org.apache.thrift.meta_data.FieldMetaData>(_Fields.class);
    tmpMap.put(_Fields.ID, new org.apache.thrift.meta_data.FieldMetaData("id", org.apache.thrift.TFieldRequirementType.OPTIONAL, 
        new org.apache.thrift.meta_data.FieldValueMetaData(org.apache.thrift.protocol.TType.STRING)));
    tmpMap.put(_Fields.CREATED_TS, new org.apache.thrift.meta_data.FieldMetaData("created_ts", org.apache.thrift.TFieldRequirementType.OPTIONAL, 
        new org.apache.thrift.meta_data.FieldValueMetaData(org.apache.thrift.protocol.TType.I64)));
    metaDataMap = Collections.unmodifiableMap(tmpMap);
    org.apache.thrift.meta_data.FieldMetaData.addStructMetaDataMap(YoutubeVideo.class, metaDataMap);
  }

  public YoutubeVideo() {
  }

  /**
   * Performs a deep copy on <i>other</i>.
   */
  public YoutubeVideo(YoutubeVideo other) {
    __isset_bitfield = other.__isset_bitfield;
    if (other.isSetId()) {
      this.id = other.id;
    }
    this.created_ts = other.created_ts;
  }

  public YoutubeVideo deepCopy() {
    return new YoutubeVideo(this);
  }

  @Override
  public void clear() {
    this.id = null;
    setCreated_tsIsSet(false);
    this.created_ts = 0;
  }

  public String getId() {
    return this.id;
  }

  public YoutubeVideo setId(String id) {
    this.id = id;
    return this;
  }

  public void unsetId() {
    this.id = null;
  }

  /** Returns true if field id is set (has been assigned a value) and false otherwise */
  public boolean isSetId() {
    return this.id != null;
  }

  public void setIdIsSet(boolean value) {
    if (!value) {
      this.id = null;
    }
  }

  public long getCreated_ts() {
    return this.created_ts;
  }

  public YoutubeVideo setCreated_ts(long created_ts) {
    this.created_ts = created_ts;
    setCreated_tsIsSet(true);
    return this;
  }

  public void unsetCreated_ts() {
    __isset_bitfield = EncodingUtils.clearBit(__isset_bitfield, __CREATED_TS_ISSET_ID);
  }

  /** Returns true if field created_ts is set (has been assigned a value) and false otherwise */
  public boolean isSetCreated_ts() {
    return EncodingUtils.testBit(__isset_bitfield, __CREATED_TS_ISSET_ID);
  }

  public void setCreated_tsIsSet(boolean value) {
    __isset_bitfield = EncodingUtils.setBit(__isset_bitfield, __CREATED_TS_ISSET_ID, value);
  }

  public void setFieldValue(_Fields field, Object value) {
    switch (field) {
    case ID:
      if (value == null) {
        unsetId();
      } else {
        setId((String)value);
      }
      break;

    case CREATED_TS:
      if (value == null) {
        unsetCreated_ts();
      } else {
        setCreated_ts((Long)value);
      }
      break;

    }
  }

  public Object getFieldValue(_Fields field) {
    switch (field) {
    case ID:
      return getId();

    case CREATED_TS:
      return Long.valueOf(getCreated_ts());

    }
    throw new IllegalStateException();
  }

  /** Returns true if field corresponding to fieldID is set (has been assigned a value) and false otherwise */
  public boolean isSet(_Fields field) {
    if (field == null) {
      throw new IllegalArgumentException();
    }

    switch (field) {
    case ID:
      return isSetId();
    case CREATED_TS:
      return isSetCreated_ts();
    }
    throw new IllegalStateException();
  }

  @Override
  public boolean equals(Object that) {
    if (that == null)
      return false;
    if (that instanceof YoutubeVideo)
      return this.equals((YoutubeVideo)that);
    return false;
  }

  public boolean equals(YoutubeVideo that) {
    if (that == null)
      return false;

    boolean this_present_id = true && this.isSetId();
    boolean that_present_id = true && that.isSetId();
    if (this_present_id || that_present_id) {
      if (!(this_present_id && that_present_id))
        return false;
      if (!this.id.equals(that.id))
        return false;
    }

    boolean this_present_created_ts = true && this.isSetCreated_ts();
    boolean that_present_created_ts = true && that.isSetCreated_ts();
    if (this_present_created_ts || that_present_created_ts) {
      if (!(this_present_created_ts && that_present_created_ts))
        return false;
      if (this.created_ts != that.created_ts)
        return false;
    }

    return true;
  }

  @Override
  public int hashCode() {
    return 0;
  }

  public int compareTo(YoutubeVideo other) {
    if (!getClass().equals(other.getClass())) {
      return getClass().getName().compareTo(other.getClass().getName());
    }

    int lastComparison = 0;
    YoutubeVideo typedOther = (YoutubeVideo)other;

    lastComparison = Boolean.valueOf(isSetId()).compareTo(typedOther.isSetId());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetId()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.id, typedOther.id);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    lastComparison = Boolean.valueOf(isSetCreated_ts()).compareTo(typedOther.isSetCreated_ts());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetCreated_ts()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.created_ts, typedOther.created_ts);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    return 0;
  }

  public _Fields fieldForId(int fieldId) {
    return _Fields.findByThriftId(fieldId);
  }

  public void read(org.apache.thrift.protocol.TProtocol iprot) throws org.apache.thrift.TException {
    schemes.get(iprot.getScheme()).getScheme().read(iprot, this);
  }

  public void write(org.apache.thrift.protocol.TProtocol oprot) throws org.apache.thrift.TException {
    schemes.get(oprot.getScheme()).getScheme().write(oprot, this);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder("YoutubeVideo(");
    boolean first = true;

    if (isSetId()) {
      sb.append("id:");
      if (this.id == null) {
        sb.append("null");
      } else {
        sb.append(this.id);
      }
      first = false;
    }
    if (isSetCreated_ts()) {
      if (!first) sb.append(", ");
      sb.append("created_ts:");
      sb.append(this.created_ts);
      first = false;
    }
    sb.append(")");
    return sb.toString();
  }

  public void validate() throws org.apache.thrift.TException {
    // check for required fields
    // check for sub-struct validity
  }

  private void writeObject(java.io.ObjectOutputStream out) throws java.io.IOException {
    try {
      write(new org.apache.thrift.protocol.TCompactProtocol(new org.apache.thrift.transport.TIOStreamTransport(out)));
    } catch (org.apache.thrift.TException te) {
      throw new java.io.IOException(te);
    }
  }

  private void readObject(java.io.ObjectInputStream in) throws java.io.IOException, ClassNotFoundException {
    try {
      // it doesn't seem like you should have to do this, but java serialization is wacky, and doesn't call the default constructor.
      __isset_bitfield = 0;
      read(new org.apache.thrift.protocol.TCompactProtocol(new org.apache.thrift.transport.TIOStreamTransport(in)));
    } catch (org.apache.thrift.TException te) {
      throw new java.io.IOException(te);
    }
  }

  private static class YoutubeVideoStandardSchemeFactory implements SchemeFactory {
    public YoutubeVideoStandardScheme getScheme() {
      return new YoutubeVideoStandardScheme();
    }
  }

  private static class YoutubeVideoStandardScheme extends StandardScheme<YoutubeVideo> {

    public void read(org.apache.thrift.protocol.TProtocol iprot, YoutubeVideo struct) throws org.apache.thrift.TException {
      org.apache.thrift.protocol.TField schemeField;
      iprot.readStructBegin();
      while (true)
      {
        schemeField = iprot.readFieldBegin();
        if (schemeField.type == org.apache.thrift.protocol.TType.STOP) { 
          break;
        }
        switch (schemeField.id) {
          case 1: // ID
            if (schemeField.type == org.apache.thrift.protocol.TType.STRING) {
              struct.id = iprot.readString();
              struct.setIdIsSet(true);
            } else { 
              org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
            }
            break;
          case 2: // CREATED_TS
            if (schemeField.type == org.apache.thrift.protocol.TType.I64) {
              struct.created_ts = iprot.readI64();
              struct.setCreated_tsIsSet(true);
            } else { 
              org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
            }
            break;
          default:
            org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
        }
        iprot.readFieldEnd();
      }
      iprot.readStructEnd();

      // check for required fields of primitive type, which can't be checked in the validate method
      struct.validate();
    }

    public void write(org.apache.thrift.protocol.TProtocol oprot, YoutubeVideo struct) throws org.apache.thrift.TException {
      struct.validate();

      oprot.writeStructBegin(STRUCT_DESC);
      if (struct.id != null) {
        if (struct.isSetId()) {
          oprot.writeFieldBegin(ID_FIELD_DESC);
          oprot.writeString(struct.id);
          oprot.writeFieldEnd();
        }
      }
      if (struct.isSetCreated_ts()) {
        oprot.writeFieldBegin(CREATED_TS_FIELD_DESC);
        oprot.writeI64(struct.created_ts);
        oprot.writeFieldEnd();
      }
      oprot.writeFieldStop();
      oprot.writeStructEnd();
    }

  }

  private static class YoutubeVideoTupleSchemeFactory implements SchemeFactory {
    public YoutubeVideoTupleScheme getScheme() {
      return new YoutubeVideoTupleScheme();
    }
  }

  private static class YoutubeVideoTupleScheme extends TupleScheme<YoutubeVideo> {

    @Override
    public void write(org.apache.thrift.protocol.TProtocol prot, YoutubeVideo struct) throws org.apache.thrift.TException {
      TTupleProtocol oprot = (TTupleProtocol) prot;
      BitSet optionals = new BitSet();
      if (struct.isSetId()) {
        optionals.set(0);
      }
      if (struct.isSetCreated_ts()) {
        optionals.set(1);
      }
      oprot.writeBitSet(optionals, 2);
      if (struct.isSetId()) {
        oprot.writeString(struct.id);
      }
      if (struct.isSetCreated_ts()) {
        oprot.writeI64(struct.created_ts);
      }
    }

    @Override
    public void read(org.apache.thrift.protocol.TProtocol prot, YoutubeVideo struct) throws org.apache.thrift.TException {
      TTupleProtocol iprot = (TTupleProtocol) prot;
      BitSet incoming = iprot.readBitSet(2);
      if (incoming.get(0)) {
        struct.id = iprot.readString();
        struct.setIdIsSet(true);
      }
      if (incoming.get(1)) {
        struct.created_ts = iprot.readI64();
        struct.setCreated_tsIsSet(true);
      }
    }
  }

}

