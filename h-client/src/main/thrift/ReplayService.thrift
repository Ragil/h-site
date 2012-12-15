/*
 * Services to retrieve replay data.
 * @author Ragil Prasetya - praser05@gmail.com
 */

include "UserService.thrift"

enum GameType {
    ONE_V_ONE = 1
}

struct Replay {
    // next number 7

    1: optional string id;
    2: optional i64 created_ts;
    3: optional string title;
    4: optional string description;
    5: optional UserService.User uploader;
    6: optional GameType gameType;
}

struct ReplayQuery {
    // next number is 

    1: optional string name; // can take a simple regex
}

service ReplayService {

    /*
     * Returns a list of replays that match the given query.
     */
    list<Replay> getReplays(1: ReplayQuery query);

    Replay getReplay(1: string id);

}