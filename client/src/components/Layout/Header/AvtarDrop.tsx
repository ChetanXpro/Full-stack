import { useAtom } from "jotai";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { user } from "../../../atoms/atoms";
import usePrivateApis from "../../../hook/usePrivateApis";
import { Routes } from "../../../constants/consts";
import { apiInstance } from "../../../Api/api";
import { useState } from "react";
import UploadModal from "../../UploadModal";

const AvtarDrop = ({ setAvtarDrop }: any) => {
  const [userData, setUser] = useAtom(user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout, getImgUploadUrl } = usePrivateApis();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(Routes.LOGIN);
  };

  const handleUpload = async (e: any) => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <ul
      className={
        "flex-col flex absolute rounded-xl  z-50 items-center top-14 right-1 bottom-0 h-[6rem]   uppercase bg-black/40 backdrop-blur-lg gap-8 justify-center p-8 "
      }
    >
      <p className="hover:underline cursor-pointer" onClick={handleLogout}>
        Logout
      </p>
    </ul>
  );
};

export default AvtarDrop;
