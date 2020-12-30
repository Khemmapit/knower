import React,{useState} from 'react';
import Video from '../video/Video';
import "./Content.css" ;
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';

const Content = ({url,description,hashtag}) => {
    const [getIt,setGetIt] = useState(false);
    

    const handelGetIt = () => {
        if (getIt) {
            setGetIt(false);
        }else {
            setGetIt(true);
        }
    }
    

    return (
        <div className="subcontent" >
            <div className="subcontent__hashtag">
                {hashtag.map(hash => (
                    <p>#{hash}</p>
                ))}
            </div>
            <div className="subcontent__video">
                <Video url={url} className="subcontent__video" />
            </div>
            <div className="action">
                <div className={`action__button ${getIt && "getIt__button__click"} `}
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
            <div className="subcontent__description">
                <BookmarkBorderIcon />
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Content
