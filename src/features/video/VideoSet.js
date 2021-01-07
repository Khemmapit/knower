import React from "react";
import Post from "../post/Post";
import "./VideoSet.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Tooltip from "@material-ui/core/Tooltip";
import { useDispatch } from "react-redux";
import { user_search } from "../searchResult/searchSlice";
import { useHistory } from "react-router-dom";

const VideoSet = ({ hashtag }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const navigateNext = () => {
    //click to go to the next right post
    alert("swipe right");
  };
  const navigateBefore = () => {
    //click to go to the next left post
    alert("swipe left");
  };
  const goToSearch = (hash) => {
    dispatch(
      user_search({
        hashtag: hash,
      })
    );
    history.replace(`/search:${hash}`);
  };

  return (
    <div className="videoset">
      <div className="hashtag__set">
        {hashtag.map((hash, index) => (
          <p className="hashtag" key={index} onClick={() => goToSearch(hash)}>
            #{hash}
          </p>
        ))}
      </div>
      <div className="post__set">
        <div className="subpost__set">
          <Post
            hashtag={hashtag}
            email="gognumb2000@gmail.com"
            description="This video is work !"
            username="Khemmapit Panyana"
            uid="ZUHNHxf85whcwKY5FnSzlYWYOqp1"
            photoURL="https://scontent.futh1-1.fna.fbcdn.net/v/t1.0-9/107044636_1638967362928278_2561545998429876853_n.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEivxmqTL3Aawp9_tefTBVOl4mMl0TjzxSXiYyXROPPFAotIhZDt3l0WxeW0jCEcfJPTLL2adOVPU9C3roURNBr&_nc_ohc=EktXiFDW6wQAX-lOiL1&_nc_ht=scontent.futh1-1.fna&oh=cbb6d547b21eb0858fa8efa4a79d60b5&oe=600E54EA"
          />
          <Tooltip title="swipe right">
            <NavigateNextIcon
              className="next__icon"
              fontSize="large"
              onClick={navigateNext}
            />
          </Tooltip>
        </div>
        <div className="subpost__set">
          <Tooltip title="swipe left">
            <NavigateBeforeIcon
              fontSize="large"
              className="before__icon"
              onClick={navigateBefore}
            />
          </Tooltip>
          <Post
            hashtag={hashtag}
            email="khemmapich.p@gmail.com"
            description="This video is work !"
            username="Khemmapich Panyana"
            uid="JswzgrIdELVie8bUxTqvxeK3fNc2"
            photoURL="https://scontent.futh1-1.fna.fbcdn.net/v/t1.0-9/107870049_1638894026268945_1911018207674481617_n.jpg?_nc_cat=100&ccb=2&_nc_sid=8bfeb9&_nc_eui2=AeFNXJUfo7k8AImrW9xlMXin2VE-LpulTQ7ZUT4um6VNDrjcFSSRXxRh8tls7JSug6C7Cua_IZUCIAedVvS3hYOg&_nc_ohc=RCglEXsT_qwAX-ebmCE&_nc_ht=scontent.futh1-1.fna&oh=16411c584d7a11f1a7a2831a1a6cb6b8&oe=6018325C"
          />
          <Tooltip title="swipe right">
            <NavigateNextIcon
              className="next__icon"
              fontSize="large"
              onClick={navigateNext}
            />
          </Tooltip>
        </div>

        <div className="subpost__set">
          <Tooltip title="swipe left">
            <NavigateBeforeIcon
              fontSize="large"
              className="before__icon"
              onClick={navigateBefore}
            />
          </Tooltip>

          <Post
            hashtag={hashtag}
            email="gognumbmern@gmail.com"
            description="This video is great !"
            username="Gognumb Mern"
            photoURL="https://lh4.googleusercontent.com/-JPCC4VOpeeI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckOlbK5Jv6VhAezaOw8ldvUH7QF-g/s96-c/photo.jpg"
            uid="7IR0n6gAC5VPjVWGKhtmwGZmlDA2"
          />
          <Tooltip title="swipe right">
            <NavigateNextIcon
              className="next__icon"
              fontSize="large"
              onClick={navigateNext}
            />
          </Tooltip>
        </div>

        <div className="subpost__set">
          <Tooltip title="swipe left">
            <NavigateBeforeIcon
              fontSize="large"
              className="before__icon"
              onClick={navigateBefore}
            />
          </Tooltip>
          <Post
            hashtag={hashtag}
            email="gognumbreactnative@gmail.com"
            description="I'm Knower's Supporter"
            username="Gognumb Supporter"
            photoURL="https://scontent.futh1-1.fna.fbcdn.net/v/t1.0-9/33992975_990880957736925_6778265524817100800_n.jpg?_nc_cat=111&ccb=2&_nc_sid=174925&_nc_eui2=AeGlAxgfPtXLzzueHbQ07QkBOGXnxF-B6Ng4ZefEX4Ho2AKUMpAe1aUkD42_Sn2nM8wzzt-eVRQLMNr4AvWo3yJV&_nc_ohc=oQ7RSSqkwn0AX9AGBCv&_nc_ht=scontent.futh1-1.fna&oh=eade8a6c1ad04ac8a5fbf22a8989af89&oe=601A8769"
            uid="xROUo9zAYXNr0fqqpOSBYMymhim2"
          />
          <Tooltip title="swipe right">
            <NavigateNextIcon
              className="next__icon"
              fontSize="large"
              onClick={navigateNext}
            />
          </Tooltip>
        </div>

        <div className="subpost__set">
          <Tooltip title="swipe left">
            <NavigateBeforeIcon
              fontSize="large"
              className="before__icon"
              onClick={navigateBefore}
            />
          </Tooltip>

          <Post
            hashtag={hashtag}
            email="gognumb2000@gmail.com"
            description="This video is work !"
            username="Khemmapich"
            photoURL="https://scontent.futh1-1.fna.fbcdn.net/v/t1.0-9/107044636_1638967362928278_2561545998429876853_n.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEivxmqTL3Aawp9_tefTBVOl4mMl0TjzxSXiYyXROPPFAotIhZDt3l0WxeW0jCEcfJPTLL2adOVPU9C3roURNBr&_nc_ohc=EktXiFDW6wQAX-lOiL1&_nc_ht=scontent.futh1-1.fna&oh=cbb6d547b21eb0858fa8efa4a79d60b5&oe=600E54EA"
          />
          <Tooltip title="swipe right">
            <NavigateNextIcon
              className="next__icon"
              fontSize="large"
              onClick={navigateNext}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default VideoSet;
