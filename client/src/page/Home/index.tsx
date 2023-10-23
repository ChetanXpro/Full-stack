import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import useAuthentication from "../../hook/useAuthentication";
import usePrivateApis from "../../hook/usePrivateApis";

import { TaskEnum } from "../../constants/consts";

import logo from "../../assets/task.png";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { getDocs, cloneDocs } = usePrivateApis();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);

  const dummyData = [
    {
      id: 1,
      taskName: "Task 1",
      description: "Description for Task 1",
      status: TaskEnum.PENDING,
      imageUrl:
        "https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg",
    },
    {
      id: 2,
      taskName: "Task 2",
      description: "Description for Task 2",
      status: TaskEnum.COMPLETED,
    },
    {
      id: 3,
      taskName: "Task 3",
      description: "",
      status: TaskEnum.INPROGRESS,
    },

    {
      id: 3,
      taskName: "Task 3",
      description:
        "Description dddddsdsdsmsmsmsmsmsmsmmsmssm lorem ererrererere for Task 3",
      status: "Done",
    },
  ];
  return (
    <div className=" font-mono h-[calc(100vh-4rem)]">
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex mb-8 items-center text-4xl font-bold gap-2">
            <h1>TaskMate</h1>
            <img src={logo} width={50} alt="logo" />
          </div>

          <h1 className="text-xl font-semibold">Create and Customize Tasks</h1>
          <p className="text-md">
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
