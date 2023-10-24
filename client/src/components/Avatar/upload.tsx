import React from "react";

const Upload = () => {
  return (
    <div className="mx-auto w-14 text-center ">
      <div className="relative w-14">
        <img
          className="w-14 h-14 rounded-full absolute"
          src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt=""
        />
        <div className="w-14 h-14 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
          <img
            className="hidden group-hover:block w-12"
            src="https://www.svgrepo.com/show/33565/upload.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Upload;
