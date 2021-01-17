import React from "react";
import VideoSet from "../video/VideoSet";
import Box from "@material-ui/core/Box";
//  import useSWR from "swr";
//  import Loading from '../loading'
import UploadButton from "./UploadButton";
//  import getPost from '../../controllers/postController'
import { postData } from "../../testData";
import { useTranslation } from "react-i18next";

const Feed = () => {
  //  const { data: fromDB, error } = useSWR("post", getPost);

  //  if (error) return <div>{error}</div>;
  //  if (!fromDB) return <Loading/>
  const { t } = useTranslation("landing");
  return (
    <Box pt={2}>
      {t("test")}
      {postData.map((data, index) => (
        <VideoSet key={index} data={data} />
      ))}
      <UploadButton />
    </Box>
  );
};

export default Feed;
