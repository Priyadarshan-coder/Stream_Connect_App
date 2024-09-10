/*import React, { useEffect, useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from '../redux/user';
import Recommendation from "../components/Recommendation";
import HlsVideoPlayer from "../components/VideoPlayer"

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/api/videos/find/${path}`);
        console.log(path);
        const channelRes = await axios.get(`/api/users/find/${videoRes.data.userId}`);
        console.log(videoRes);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`/api/users/like/${currentVideo.id}`);
    dispatch(like(currentUser.id));
  };
  const handleDislike = async () => {
    await axios.put(`/api/users/dislike/${currentVideo.id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel.id)
      ? await axios.put(`/api/users/unsub/${channel.id}`)
      : await axios.put(`/api/users/sub/${channel.id}`);
    dispatch(subscription(channel.id));
  };

  return (
    <div className="flex gap-10">
    <div className="flex-5">
      <div>
        <HlsVideoPlayer className="max-h-[720px] w-full object-cover" />
      </div>
      <h1 className="text-lg font-normal mt-5 mb-2 text-[#f5f5f5]">{currentVideo.title}</h1>
      <div className="flex items-center justify-between">
        <span className="text-[#f5f5f5]">
          {currentVideo.views} views • {format(currentVideo.createdAt)}
        </span>
        <div className="flex gap-5 text-[#f5f5f5]">
          <div className="flex items-center gap-1 cursor-pointer" onClick={handleLike}>
            {currentVideo.likes?.includes(currentUser?.id) ? (
              <ThumbUpIcon style={{ fontSize: 24, color: '#f5f5f5' }} />
            ) : (
              <ThumbUpOutlinedIcon style={{ fontSize: 24, color: '#f5f5f5' }} />
            )}
            {currentVideo.likes?.length}
          </div>
          <div className="flex items-center gap-1 cursor-pointer" onClick={handleDislike}>
            {currentVideo.dislikes?.includes(currentUser?.id) ? (
              <ThumbDownIcon style={{ fontSize: 24, color: '#f5f5f5' }} />
            ) : (
              <ThumbDownOffAltOutlinedIcon style={{ fontSize: 24, color: '#f5f5f5' }} />
            )}
            Dislike
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <ReplyOutlinedIcon style={{ fontSize: 24, color: '#f5f5f5' }} />
            Share
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <AddTaskOutlinedIcon style={{ fontSize: 24, color: '#f5f5f5' }} />
            Save
          </div>
        </div>
      </div>
      <hr className="my-4 border-[#e0e0e0]" />
      <div className="flex justify-between">
        <div className="flex gap-5">
          <img className="w-12 h-12 rounded-full" src={channel.avatar} alt="channel" />
          <div className="flex flex-col text-[#f5f5f5]">
            <span className="font-medium">{channel.name}</span>
            <span className="mt-1 mb-5 text-[#bdbdbd] text-sm">{channel.subscribers} subscribers</span>
            <p className="text-sm">{currentVideo.desc}</p>
          </div>
        </div>
        <button
          className="bg-red-600 text-white font-medium py-2 px-4 rounded cursor-pointer"
          onClick={handleSub}
        >
          {currentUser.subscribedUsers?.includes(channel.id)
            ? "SUBSCRIBED"
            : "SUBSCRIBE"}
        </button>
      </div>
      <hr className="my-4 border-[#e0e0e0]" />
      <Comments videoId={currentVideo.id} />
    </div>
    <Recommendation tags={currentVideo.tags} />
  </div>
  );
};

export default Video;
*/
import React, { useEffect, useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from '../redux/user';
import Recommendation from "../components/Recommendation";
import HlsVideoPlayer from "../components/VideoPlayer"

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/api/videos/find/${path}`);
        
        const channelRes = await axios.get(`/api/users/find/${videoRes.data.userId}`);
        console.log(channelRes.data);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`/api/users/like/${currentVideo.id}`);
    dispatch(like(currentUser.id));
  };
  const handleDislike = async () => {
    await axios.put(`/api/users/dislike/${currentVideo.id}`);
    dispatch(dislike(currentUser.id));
  };

  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel.id)
      ? await axios.put(`/api/users/unsub/${channel.id}`)
      : await axios.put(`/api/users/sub/${channel.id}`);
    dispatch(subscription(channel.id));
  };

  return (
    <div className="flex gap-10">
      <div className="flex-5">
        <div>
          <HlsVideoPlayer className="max-h-[720px] w-full object-cover" />
        </div>
        <h1 className="text-lg font-normal mt-5 mb-2 text-[#f5f5f5]">{currentVideo.title}</h1>
        <div className="flex items-center justify-between">
          <span className="text-[#f5f5f5]">
            {currentVideo.views} views • {format(currentVideo.createdAt)}
          </span>
          <div className="flex gap-5 text-[#f5f5f5]">
            <div className="flex items-center gap-1 cursor-pointer" onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser?.id) ? (
                <ThumbUpIcon style={{ fontSize: 24, color: '#f5f5f5' }} />
              ) : (
                <ThumbUpOutlinedIcon style={{ fontSize: 24, color: '#f5f5f5' }} />
              )}
              {currentVideo.likes?.length}
            </div>
            <div className="flex items-center gap-1 cursor-pointer" onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser?.id) ? (
                <ThumbDownIcon style={{ fontSize: 24, color: '#f5f5f5' }} />
              ) : (
                <ThumbDownOffAltOutlinedIcon style={{ fontSize: 24, color: '#f5f5f5' }} />
              )}
              Dislike
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <ReplyOutlinedIcon style={{ fontSize: 24, color: '#f5f5f5' }} />
              Share
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <AddTaskOutlinedIcon style={{ fontSize: 24, color: '#f5f5f5' }} />
              Save
            </div>
          </div>
        </div>
        <hr className="my-4 border-[#e0e0e0]" />
        <div className="flex justify-between">
          <div className="flex gap-5">
            <img className="w-12 h-12 rounded-full" src={channel.avatar} alt="channel" />
            <div className="flex flex-col text-[#f5f5f5]">
              <span className="font-medium">{channel.name}</span>
              <span className="mt-1 mb-5 text-[#bdbdbd] text-sm">{channel.subscribers} subscribers</span>
              <p className="text-sm">{currentVideo.desc}</p>
            </div>
          </div>
          <button
            className={`font-medium py-2 px-4 rounded cursor-pointer ${
              currentUser.subscribedUsers?.includes(channel.id) ? 
              'bg-gray-500 text-white' : 'bg-red-600 text-white'
            }`}
            onClick={handleSub}
          >
            {currentUser.subscribedUsers?.includes(channel.id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </button>
        </div>
        <hr className="my-4 border-[#e0e0e0]" />
        <Comments videoId={currentVideo.id} />
      </div>
      <Recommendation tags={currentVideo.tags} />
    </div>
  );
};

export default Video;
