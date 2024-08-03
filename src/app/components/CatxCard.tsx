import React from "react";
import { Button } from "antd";
import { CatxPost } from "../type/catx";

interface CatxCardProps {
  catxPost: CatxPost;
}

const CatxCard: React.FC<CatxCardProps> = ({ catxPost }) => {
  return (
    <div className="bg-white shadow-md px-4 p-4 rounded-xl flex flex-col gap-4 w-full">
      <div className="flex flex-row items-center gap-4">
        <img
          className="h-16 w-16 object-cover rounded-full"
          src={catxPost.user.profilePic}
          alt="Cat Profile"
        />
        <div>
          <div className="font-bold flex items-center gap-1">
            <div className="text-xl">{catxPost.user.username}</div>
          </div>
          <div className="text-md text-gray-600">
            {new Date(catxPost.created).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="text-black text-xl p-2">{catxPost.description}</div>
      <div className="grid grid-cols-4">
        <Button>
          <div className="text-gray-600 font-bold">comment</div>
        </Button>
      </div>
    </div>
  );
};

export default CatxCard;
