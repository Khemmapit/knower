import React, { useState } from "react";
import "./PostFooter.css";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import LibraryAddOutlinedIcon from "@material-ui/icons/LibraryAddOutlined";
import { Avatar } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../login/userSlice";

const PostFooter = ({ description, get, recommend, collect }) => {
  const [input, setInput] = useState("");
  const [getIt, setGetIt] = useState(false);
  const user = useSelector(selectUser);
  const [comments, setComments] = useState([
    {
      username: "Gognumb",
      comment: "Congratulation guys !",
      photoURL:
        "https://scontent.futh1-1.fna.fbcdn.net/v/t1.0-9/61539283_1262413647250320_6631888671387680768_n.jpg?_nc_cat=102&ccb=2&_nc_sid=174925&_nc_eui2=AeHlVYTJVb9nYsoSsU2eMutf5Ybe3CgDYbPlht7cKANhswvS4rNbFUmnW6pVECXtApesAAqvh91chQZYtCmqu9aJ&_nc_ohc=bRxP618AhYQAX-K_Itt&_nc_ht=scontent.futh1-1.fna&oh=a29db2461e837a0db4f6ae93c2d737c5&oe=600F46B9",
    },
  ]);
  const dispatch = useDispatch();

  const sendComment = (event) => {
    event.preventDefault();
    setComments([
      ...comments,
      {
        username: user.displayName.split(" ")[0],
        comment: input,
        photoURL: user.photoURL,
      },
    ]);
    // send user's input to our databases in collection of that post
    setInput("");
  };

  const handelGetIt = () => {
    if (getIt) {
      setGetIt(false);
    } else {
      setGetIt(true);
    }
  };
  return (
    <div className="postFooter">
      <div className="action">
        <div
          className={`action__button ${getIt && "getIt__button__click"} `}
          onClick={handelGetIt}
        >
          <CheckCircleOutlineIcon />
          <p>get it !</p>
        </div>
        <div className="action__button recommend__button">
          <CommentOutlinedIcon />
          <p>recommend</p>
        </div>
        <div className="action__button collect__button">
          <LibraryAddOutlinedIcon />
          <p>collect</p>
        </div>
      </div>
      <div className="description">
        <BookmarkBorderIcon />
        <p>{description}</p>
      </div>

      <div className="recommend">
        {comments.map((comment, index) => (
          <div className="recommend__box" key={index}>
            <Avatar src={comment.photoURL} />
            <div className="details">
              <h4>{comment.username}</h4>
              <p>{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="recommend__sender">
        <Avatar src={user.photoURL} />
        <form>
          <input
            type="text"
            placeholder="แสดงความคิดเห็น"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit" onClick={sendComment}>
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostFooter;
