import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`/api/users/find/${video.userId}`);
        //console.log(res);
        setChannel(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Link to={`videos/${video.id}`} className="no-underline">
      <div className={`flex ${type === "sm" ? "gap-2 mb-2" : "flex-col w-72 mb-12"} cursor-pointer`}>
        <img
          src={video.imgUrl}
          alt={video.title}
          className={`w-full ${type === "sm" ? "h-32" : "h-52"} bg-gray-300`}
        />
        <div className={`flex ${type === "sm" ? "gap-3 mt-2" : "flex-col mt-4"} flex-1`}>
          <img
            src={channel.avatar}
            alt={channel.name}
            className={`w-9 h-9 rounded-full bg-gray-300 ${type === "sm" ? "hidden" : ""}`}
          />
          <div className="flex flex-col">
            <h1 className="text-lg font-medium text-[#f5f5f5]">{video.title}</h1>
            <h2 className="text-sm  mt-1 text-[#f5f5f5]">{channel.name}</h2>
            <div className="text-sm  mt-1 text-[#f5f5f5]">
              {video.views} views • {format(video.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;

