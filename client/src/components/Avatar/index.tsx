import React from "react";

const getRandomColor = () => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-cyan-500",
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

interface AvatarProps {
  name?: string;
  imageUrl?: string;
  alt?: string;
  size?: string;
  borderColor?: string;
  borderWidth?: string;
}
const Avatar = ({
  name,
  imageUrl,
  alt,
  size,
  borderColor,
  borderWidth,
}: AvatarProps) => {
  let avatarContent;

  if (imageUrl) {
    avatarContent = <img src={imageUrl} alt={alt} />;
  } else if (name) {
    const randomBackgroundColor = getRandomColor();
    const firstLetter = name.charAt(0).toUpperCase();
    avatarContent = (
      <div
        className={`w-${size} h-${size} rounded-full border-${borderWidth} border-${borderColor} ${randomBackgroundColor} text-white font-semibold flex items-center justify-center`}
      >
        {firstLetter}
      </div>
    );
  } else {
    avatarContent = (
      <div
        className={`w-${size} h-${size} rounded-full border-${borderWidth} border-${borderColor}`}
      >
        <span className="text-gray-400">?</span>
      </div>
    );
  }

  return avatarContent;
};

export default Avatar;
