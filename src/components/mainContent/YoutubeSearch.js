import "./Search.scss";
import axios from "axios";
import { useState } from "react";
import moment from "moment";
import { HiSearch } from "react-icons/hi";

const YoutubeSearch = () => {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");
  const handleSearchYoutube = async () => {
    let res = await axios({
      method: "GET",
      url: "https://www.googleapis.com/youtube/v3/search",
      params: {
        part: "snippet",
        maxResults: "10",
        key: "AIzaSyAe2PDAJ9EjbFtXfFPMsml1CQpN49MGFaw",
        // key: "AIzaSyD2IG6fe2ecZgJivqYiExFU988Ve6H4Chg",
        type: "video",
        q: query,
      },
    });
    console.log(">> check res", res);
    if (res && res.data && res.data.items) {
      let raw = res.data.items;
      let result = [];
      if (raw && raw.length > 0) {
        raw.map((item) => {
          let object = {};
          object.id = item.id.videoId;
          object.title = item.snippet.title;
          object.createdAt = item.snippet.publishedAt;
          object.author = item.snippet.channelTitle;
          object.description = item.snippet.description;

          result.push(object);
        });
      }
      console.log(">>> check result", result);
      setVideos(result);
    }
  };
  return (
    <div className="youtube-search-container">
      <div className="yt-search">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="button" onClick={handleSearchYoutube}>
          <HiSearch className="icon" />
        </button>
      </div>

      {videos &&
        videos.length > 0 &&
        videos.map((item) => {
          return (
            <div className="yt-result" key={item.id}>
              <div className="left">
                <iframe
                  className="iframe-yt"
                  src={`https://www.youtube.com/embed/${item.id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="right">
                <div className="title">{item.title}</div>
                <div className="created-at">
                  Created At:{" "}
                  {moment(item.createdAt).format("DD-MM-YYYY HH:mm:ss A")}
                </div>
                <div className="author">Author: {item.author}</div>
                <div className="description">{item.description}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default YoutubeSearch;
