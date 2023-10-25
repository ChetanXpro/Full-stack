import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuthentication from "../../hook/useAuthentication";
import usePrivateApis from "../../hook/usePrivateApis";

import { TaskEnum } from "../../constants/consts";

import logo from "../../assets/task.png";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

import { user } from "../../atoms/atoms";
import { useAtom } from "jotai";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const { getUser } = usePrivateApis();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const [userData, setUser] = useAtom(user);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <div className=" font-mono h-[calc(100vh-4rem)]">
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col justify-center p-2 items-center gap-3">
          <div className="flex mb-8 items-center text-4xl font-bold gap-2">
            <h1>TaskMate</h1>
            <img src={logo} width={50} alt="logo" />
          </div>

          <h1 className="text-xl font-semibold">Create and Customize Tasks</h1>
          <p className="text-md ">
            Easily create tasks, add detailed descriptions, and assign statuses
            to stay organized.
          </p>

          <Button
            type={"button"}
            onClick={() => navigate("/task")}
            className="bg-blue-500 px-4 py-2 rounded-lg mt-4 text-white"
          >
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
