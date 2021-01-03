import React from "react";
import Post from "../post/Post";
import "./Collection.css";
import Content from "./Content";

const Collection = ({ name }) => {
  return (
    <div className="profile__collection">
      <h3>{name}</h3>
      <div className="collection__contentList">
        <div className="subcollection__post">
          <Post
            hashtag={["business", "startup", "techonology"]}
            email="gognumb2000@gmail.com"
            description="This video is work !"
            username="Khemmapich"
            photoURL="https://scontent.futh1-1.fna.fbcdn.net/v/t1.0-9/107044636_1638967362928278_2561545998429876853_n.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEivxmqTL3Aawp9_tefTBVOl4mMl0TjzxSXiYyXROPPFAotIhZDt3l0WxeW0jCEcfJPTLL2adOVPU9C3roURNBr&_nc_ohc=EktXiFDW6wQAX-lOiL1&_nc_ht=scontent.futh1-1.fna&oh=cbb6d547b21eb0858fa8efa4a79d60b5&oe=600E54EA"
          />
        </div>

        <div className="subcollection__post">
          <Post
            hashtag={["business", "startup", "techonology"]}
            email="gognumb2000@gmail.com"
            description="This video is work !"
            username="Khemmapich"
            photoURL="https://scontent.futh1-1.fna.fbcdn.net/v/t1.0-9/107044636_1638967362928278_2561545998429876853_n.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEivxmqTL3Aawp9_tefTBVOl4mMl0TjzxSXiYyXROPPFAotIhZDt3l0WxeW0jCEcfJPTLL2adOVPU9C3roURNBr&_nc_ohc=EktXiFDW6wQAX-lOiL1&_nc_ht=scontent.futh1-1.fna&oh=cbb6d547b21eb0858fa8efa4a79d60b5&oe=600E54EA"
          />
        </div>

        <div className="subcollection__post">
          <Post
            hashtag={["business", "startup", "techonology"]}
            email="gognumb2000@gmail.com"
            description="This video is work !"
            username="Khemmapich"
            photoURL="https://scontent.futh1-1.fna.fbcdn.net/v/t1.0-9/107044636_1638967362928278_2561545998429876853_n.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEivxmqTL3Aawp9_tefTBVOl4mMl0TjzxSXiYyXROPPFAotIhZDt3l0WxeW0jCEcfJPTLL2adOVPU9C3roURNBr&_nc_ohc=EktXiFDW6wQAX-lOiL1&_nc_ht=scontent.futh1-1.fna&oh=cbb6d547b21eb0858fa8efa4a79d60b5&oe=600E54EA"
          />
        </div>

        <div className="subcollection__post">
          <Post
            hashtag={["business", "startup", "techonology"]}
            email="gognumb2000@gmail.com"
            description="This video is work !"
            username="Khemmapich"
            photoURL="https://scontent.futh1-1.fna.fbcdn.net/v/t1.0-9/107044636_1638967362928278_2561545998429876853_n.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEivxmqTL3Aawp9_tefTBVOl4mMl0TjzxSXiYyXROPPFAotIhZDt3l0WxeW0jCEcfJPTLL2adOVPU9C3roURNBr&_nc_ohc=EktXiFDW6wQAX-lOiL1&_nc_ht=scontent.futh1-1.fna&oh=cbb6d547b21eb0858fa8efa4a79d60b5&oe=600E54EA"
          />
        </div>
      </div>

      {/* a set of post in each collection */}
    </div>
  );
};

export default Collection;
