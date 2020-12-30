import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./Profile.css";
import db from "../../firebase";
import { selectProfile } from './profileSlice';
import EditIcon from '@material-ui/icons/Edit';
import Content from './Content';
import Collection from './Collection';
import SearchIcon from '@material-ui/icons/Search';
const Profile = () => {
    const [userData,setUserData] = useState({});
    const profile = useSelector(selectProfile);
    const [bottomBody,setBottomBody] = useState("content");
    
    useEffect(() => {
        db.collection("user").doc(profile.email).get()
        .then( doc => {
            setUserData(doc.data());
        });
        db.collection("user").get().then(doc => console.log(doc.docs))
    }, []);
    
    console.log(userData);
    return (
        <div className="profile">
            <div className="profile__top">
                <div className="profile__topLeft">
                    <Avatar 
                        src={userData.photoURL}
                    />
                </div>
                <div className="profile__topRight">
                    <h1>{userData.displayName}
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                    </h1>
                    <p>{userData.email}</p>
                    <div className="user__network">
                        <p>{userData.follower} Follower</p>
                        <p>{userData.following} Following</p>
                        <p>{userData.content} Contents</p>
                    </div>
                    <p className="description">
                        {userData.description}
                    </p>
                </div>
            </div>

            <div className="profile__bottom">
                    <div className="bottom__header">
                        <h2 className={`header__content`} onClick={() => setBottomBody("content")} >
                            Content
                            {bottomBody==="content" && <hr />}
                        </h2>
                        <h2 className={`header__collection`} onClick={() => setBottomBody("collection")}>
                            Collection
                            {bottomBody==="collection" && <hr />}
                        </h2>
                    </div>
                    <div className="bottom__body">
                        {bottomBody === "content" ? (
                            <div className="content">
                                <div className="content__topic">
                                    <h3>#climatechange</h3>
                                    <div className="video__contentList">
                                        <Content url="" 
                                            description="the world nedd us for help !"
                                            hashtag={["environment","climatechange","greenhousegases"]}
                                        />
                                        <Content url="" 
                                            description="the world nedd us for help !"
                                            hashtag={["environment","climatechange","greenhousegases"]}
                                        />
                                        <Content url="" 
                                            description="the world nedd us for help !"
                                            hashtag={["environment","climatechange","greenhousegases"]}
                                        />
                                        <Content url="" 
                                            description="the world nedd us for help !"
                                            hashtag={["environment","climatechange","greenhousegases"]}
                                        />
                                        <Content url="" 
                                            description="the world nedd us for help !"
                                            hashtag={["environment","climatechange","greenhousegases"]}
                                        />
                                    </div>
                                </div>
                                <div className="content__topic">
                                    <h3>#startup</h3>
                                    <div className="video__contentList">
                                        <Content url="" 
                                            description="the world need startup for help other people's life better !"
                                            hashtag={["business","startup","technology"]}
                                        />
                                        <Content url="" 
                                            description="the world need startup for help other people's life better !"
                                            hashtag={["business","startup","technology"]}
                                        />
                                        <Content url="" 
                                            description="the world need startup for help other people's life better !"
                                            hashtag={["business","startup","technology"]}
                                        />
                                        <Content url="" 
                                            description="the world need startup for help other people's life better !"
                                            hashtag={["business","startup","technology"]}
                                        />
                                        <Content url="" 
                                            description="the world need startup for help other people's life better !"
                                            hashtag={["business","startup","technology"]}
                                        />
                                        <Content url="" 
                                            description="the world need startup for help other people's life better !"
                                            hashtag={["business","startup","technology"]}
                                        />
                                    </div>
                                </div>
                            </div>   
                            ) : (
                            <div className="collection">
                                <center>
                                    <div className="collection__search">
                                        <SearchIcon />
                                        <input type="text" placeholder="search on your collection" />
                                        <button type="submit">search !</button>
                                    </div>
                                </center>
                                <Collection name="fighting for unicorn" />
                                <Collection name="road to billionaire" />
                                <Collection name="react developer" />
                                <Collection name="javascript developer" />
                            </div>
                        )} 
                </div>
            </div>
        </div>
    )
}

export default Profile
