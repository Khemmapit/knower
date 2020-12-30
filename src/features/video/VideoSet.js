import React from 'react';
import Post from '../post/Post';
import "./VideoSet.css";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Tooltip from '@material-ui/core/Tooltip';

const VideoSet = ({hashtag}) => {

    const navigateNext = () => {
        //click to go to the next right post
        alert("swipe right")
    }
    const navigateBefore = () => {
        //click to go to the next left post
        alert("swipe left")
    }

    return (
        <div className="videoset">
            <div className="hashtag__set">
                {hashtag.map(hash => (
                    <p className="hashtag">
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
                        username="Khemmapich"
                        photoURL="https://scontent.futh1-1.fna.fbcdn.net/v/t1.0-9/107044636_1638967362928278_2561545998429876853_n.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEivxmqTL3Aawp9_tefTBVOl4mMl0TjzxSXiYyXROPPFAotIhZDt3l0WxeW0jCEcfJPTLL2adOVPU9C3roURNBr&_nc_ohc=EktXiFDW6wQAX-lOiL1&_nc_ht=scontent.futh1-1.fna&oh=cbb6d547b21eb0858fa8efa4a79d60b5&oe=600E54EA"
                    />
                    <Tooltip title="swipe right" >  
                        <NavigateNextIcon  
                            className="next__icon" fontSize="large" 
                            onClick={navigateNext}
                        />    
                    </Tooltip>
                </div>
                <div className="subpost__set">
                    <Tooltip title="swipe left">  
                        <NavigateBeforeIcon 
                            fontSize="large" className="before__icon"
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
                            className="next__icon" fontSize="large" 
                            onClick={navigateNext}
                        />    
                    </Tooltip>
                </div>
                
                <div className="subpost__set">
                    <Tooltip title="swipe left">
                        <NavigateBeforeIcon 
                            fontSize="large" className="before__icon"
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
                            className="next__icon" fontSize="large" 
                            onClick={navigateNext}
                        />
                    </Tooltip>
                </div>

                <div className="subpost__set">
                    <Tooltip title="swipe left">  
                        <NavigateBeforeIcon 
                            fontSize="large" className="before__icon"
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
                            className="next__icon" fontSize="large" 
                            onClick={navigateNext}
                        />
                    </Tooltip>
                </div>

                <div className="subpost__set">
                    <Tooltip title="swipe left">
                        <NavigateBeforeIcon 
                            fontSize="large" className="before__icon"
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
                            className="next__icon" fontSize="large" 
                            onClick={navigateNext}
                        />
                    </Tooltip>
                    
                </div>
            </div>
        </div> 
    )
};

export default VideoSet
