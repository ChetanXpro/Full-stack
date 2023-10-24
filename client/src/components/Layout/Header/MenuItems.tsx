import { useAtom } from "jotai";

import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { user } from "../../../atoms/atoms";
import Discord from "../../../assets/discord.png";
import WhiteDiscord from "../../../assets/whitedis.png";
import logo from "../../assets/nobg.png";
import { CloseIcon, Icon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import Avatar from "../../Avatar";
import UploadModal from "../../UploadModal";
import usePrivateApis from "../../../hook/usePrivateApis";
import { Routes } from "../../../constants/consts";

const MenuItems = ({ showMenu, active }: any) => {
  const [userData, setUser] = useAtom(user);
  const { logout } = usePrivateApis();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleshowModals = () => {
    setShowModal(true);
  };
  const handleLogout = async () => {
    await logout();
    navigate(Routes.LOGIN);
  };

  return (
    <ul
      className={
        active
          ? "flex-col flex z-50 items-center fixed inset-0 left-1/4 uppercase bg-black/40 backdrop-blur-lg gap-8 justify-center p-8 md:hidden"
          : "hidden"
      }
    >
      <CloseIcon className="cursor-pointer" onClick={showMenu} />

      <Link
        className="hover:underline cursor-pointer"
        onClick={showMenu}
        to={"/"}
      >
        <p>Home</p>
      </Link>

      <Link
        className="hover:underline cursor-pointer"
        onClick={showMenu}
        to={"/task"}
      >
        <p>Tasks</p>
      </Link>
      <div
        className="hover:underline cursor-pointer"
        onClick={handleshowModals}
      >
        <p>Upload Avatar</p>
      </div>

      <div className="hover:underline cursor-pointer" onClick={handleLogout}>
        <p>Logout</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="ml-4 mr-2 ">
          <Avatar
            imageUrl={userData?.profilePicture}
            name={userData?.email}
            size={"12"}
          />
        </div>
      </div>
      <UploadModal setShowModal={setShowModal} showModal={showModal} />
    </ul>
  );
};

export default MenuItems;
