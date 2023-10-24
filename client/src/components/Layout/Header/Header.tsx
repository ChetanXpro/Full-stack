import { useAtom } from "jotai";

import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { user } from "../../../atoms/atoms";

import { HamburgerIcon, Icon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import MenuItems from "./MenuItems";

import logo from "../../../assets/task.png";
import Avatar from "../../Avatar";
import AvtarDrop from "./AvtarDrop";
import UploadModal from "../../UploadModal";
import { useQuery } from "@tanstack/react-query";
import usePrivateApis from "../../../hook/usePrivateApis";

const Header = () => {
  const [active, setActive] = useState(false);
  const { getUser } = usePrivateApis();
  const [showModal, setShowModal] = useState(false);
  const [avtarDrop, setAvtarDrop] = useState(false);
  const [userData, setUser] = useAtom(user);
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const showMenu = () => {
    setActive(!active);
  };
  const showAvtarDrop = (e: any) => {
    setAvtarDrop(!avtarDrop);
  };

  const handleshowModals = () => {
    setShowModal(true);
  };

  return (
    <div
      className={` z-auto w-full   font-mono border border-b-gray-600   h-16  flex justify-between p-4 items-center`}
    >
      <div className="flex h-full items-center text-2xl font-bold gap-2">
        <h1>TaskMate</h1>
        <img src={logo} width={30} alt="logo" />
      </div>

      <nav>
        <div className="absolute flex items-center cursor-pointer right-6 md:hidden top-6 scale-150">
          <HamburgerIcon
            onClick={showMenu}
            className="scale-150 cursor-pointer"
          />
        </div>

        <ul className="hidden md:flex gap-8 items-center p-6 uppercase ">
          <Link to={"/"} className=" cursor-pointer">
            <p>Home</p>
          </Link>

          <Link to={"/task"} className=" cursor-pointer">
            <p>Tasks</p>
          </Link>

          <div onClick={handleshowModals} className=" cursor-pointer">
            <p>Upload Avatar</p>
          </div>

          <div
            onClick={showAvtarDrop}
            className="flex cursor-pointer gap-1 items-center"
          >
            <Avatar
              imageUrl={userData?.profilePicture}
              name={userData?.email}
              size="12"
            />
          </div>
        </ul>

        <UploadModal setShowModal={setShowModal} showModal={showModal} />

        {avtarDrop && (
          <AvtarDrop setAvtarDrop={setAvtarDrop} avtarDrop={avtarDrop} />
        )}

        <MenuItems showMenu={showMenu} active={active} />
      </nav>
    </div>
  );
};

export default Header;
