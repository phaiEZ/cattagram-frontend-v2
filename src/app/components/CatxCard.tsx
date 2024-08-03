import React from "react";
import { Button } from "antd";

interface CatxCard {
  profilePic: string;
  catName: string;
  breeds: string;
  ownerName: string;
  created: string;
  description: string;
}

interface CatxCardProps {
  CatxCard: CatxCard;
}

const CatxCard: React.FC<CatxCardProps> = ({ CatxCard }) => {
  return (
    <div className="bg-white shadow-md px-4 p-4 rounded-xl flex flex-col gap-4 w-full">
      <div className="flex flex-row items-center gap-4">
        <img
          className="h-16 w-16 object-cover rounded-full"
          src={CatxCard.profilePic}
          alt="Cat Profile"
        />
        <div>
          <div className="font-bold flex items-center gap-1">
            <div className="text-xl">{CatxCard.catName}</div>
            <div className="text-md">({CatxCard.breeds})</div>
          </div>
          <div className="text-md text-gray-600">{CatxCard.ownerName}</div>
          <div className="text-gray-400">{CatxCard.created}</div>
        </div>
      </div>
      <div className="text-black text-xl p-2">{CatxCard.description}</div>
      <div className="grid grid-cols-4">
        <Button>
          <div className="text-gray-600 font-bold">comment</div>
        </Button>
      </div>
    </div>
  );
};

export default CatxCard;
