/*
 * Services to retrieve video data.
 * @author Ragil Prasetya - praser05@gmail.com
 */

namespace java main.java.thrift

struct YoutubeVideo  {
    // next number 3

    1: optional string id; // the youtube video id
    2: optional i64 created_ts;
}

service VideoService {

    /*
     * Returns a list of uploaded youtube videos ordered by the most recent first.
     */
    list<YoutubeVideo> getLatestVidoes();

}