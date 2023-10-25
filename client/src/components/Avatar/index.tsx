import React from "react";

// generate random color
const getRandomColor = () => {
  const colors = ["bg-green-500"];

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
    avatarContent = (
      <div className="border rounded-full border-gray-500 overflow-hidden">
        <img src={imageUrl} className="h-12 w-12" alt={alt} />
      </div>
    );
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
