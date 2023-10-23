import { useAtom } from "jotai";

import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { user } from "../../../atoms/atoms";
import Discord from "../../../assets/discord.png";
import WhiteDiscord from "../../../assets/whitedis.png";
import logo from "../../assets/nobg.png";
import { CloseIcon, Icon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import Avatar from "../../Avatar";

const MenuItems = ({ showMenu, active }: any) => {
  const [userData, setUser] = useAtom(user);
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("jwt");

    navigate("signin");
  };
  return (
    <ul
      className={
        active
          ? "flex-col flex z-50 items-center fixed inset-0 left-1/4 uppercase bg-black/40 backdrop-blur-lg gap-8 justify-center p-8 md:hidden"
          : "hidden"
      }
    >
      <CloseIcon onClick={showMenu} />

      <Link className="hover:underline" onClick={showMenu} to={"/"}>
        <p>Home</p>
      </Link>

      <Link className="hover:underline" onClick={showMenu} to={"/task"}>
        <p>Tasks</p>
      </Link>

      <div className="hover:underline" onClick={logout}>
        <p>Logout</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="ml-4 mr-2 ">
          <Avatar name={`${userData?.name}`} size={"12"} />
        </div>
      </div>
    </ul>
  );
};

export default MenuItems;
