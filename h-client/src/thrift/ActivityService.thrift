/*
 * Services to retrieve activity data.
 * @author Ragil Prasetya - praser05@gmail.com
 */

namespace java main.java.thrift

enum ActivityType {
    // next number 5

    NEW_VIDEO = 1,
    NEW_USER = 2,
    NEW_REPLAY = 3,
    NEW_POST = 4
}

struct Activity {
    // next number 5

    1: optional string id;
    2: optional i64 created_ts;
    3: optional ActivityType type;
    4: optional string description; 
}

service ActivityService {

    /*
     * Returns a list of activities ordered by the most recent first.
     */
    list<Activity> getLatestActivities(); 

}