import React from 'react';
import VideoSet from "../video/VideoSet";
import "./Feed.css";
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

const Feed = () => {
    return (
        <div className="feed">
            <Tooltip title="Add Content">
                    <AddIcon 
                        className="addContent__icon" 
                        fontSize="large" aria-label="add content" 
                    />
            </Tooltip>
            
            <VideoSet 
                hashtag={["programming","react","component"]}
            />
            <VideoSet 
                hashtag={["calculus","limit","function"]}
            />
            <VideoSet 
                hashtag={["physics","motionintwodimensions","newton'slaw"]}
            />
            <VideoSet 
                hashtag={["language","mandarin","chineese"]}
            />
        </div>
    )
}

export default Feed
