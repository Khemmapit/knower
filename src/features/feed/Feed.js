import React, { useEffect } from "react";
import VideoSet from "../video/VideoSet";
//  import "./Feed.css";
import AddIcon from "@material-ui/icons/Add";
import { Box, Tooltip } from "@material-ui/core";
import useSWR from "swr";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import indexStyles from "./indexStyle";
import fetcher from "../../controllers/fetcher";

const postData = [
  [
    {
      username: "test1",
      profilePhoto: "logo512.png",
      mediaURL: "test.mp4",
      type: "video",
      description: "test",
      email: "test",
      hashtag: ["test", "test", "test"],
    },
    {
      username: "test2",
      profilePhoto: "logo512.png",
      mediaURL: "test.mp4",
      type: "video",
      description: "test",
      email: "test",
      hashtag: ["test", "test", "test"],
    },
    {
      username: "test3",
      profilePhoto: "logo512.png",
      mediaURL: "test.mp4",
      type: "video",
      description: "test",
      email: "test",
      hashtag: ["test", "test", "test"],
    },
  ],
  [
    {
      username: "test4",
      profilePhoto: "test",
      mediaURL: "test.mp4",
      type: "video",
      description: "test",
      email: "test",
      hashtag: ["test", "test", "test"],
    },
    {
      username: "test5",
      profilePhoto: "logo512.png",
      mediaURL: "test.mp4",
      type: "video",
      description: "test",
      email: "test",
      hashtag: ["test", "test", "test"],
    },
    {
      username: "test6",
      profilePhoto: "logo512.png",
      mediaURL: "test.mp4",
      type: "video",
      description: "test",
      email: "test",
      hashtag: ["test", "test", "test"],
    },
  ],
  [
    {
      username: "test7",
      profilePhoto: "logo512.png",
      mediaURL: "test.mp4",
      type: "video",
      description: "test",
      email: "test",
      hashtag: ["test", "test", "test"],
    },
    {
      username: "test8",
      profilePhoto: "logo512.png",
      mediaURL: "test.mp4",
      type: "video",
      description: "test",
      email: "test",
      hashtag: ["test", "test", "test"],
    },
    {
      username: "test9",
      profilePhoto: "logo512.png",
      mediaURL: "test.mp4",
      type: "video",
      description: "test",
      email: "test",
      hashtag: ["test", "test", "test"],
    },
  ],
];

const Feed = () => {
  const styles = indexStyles();
  const { data: fromDB, error } = useSWR("post", fetcher);

  if (error) return <div>{error}</div>;
  if (!fromDB) return <div>loading...</div>;
  console.log(fromDB);
  return (
    <Box pt={2}>
      {postData.map((data, index) => (
        <VideoSet key={index} data={data} />
      ))}
    </Box>
  );
};

export default Feed;
