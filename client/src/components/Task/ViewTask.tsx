import React, { useEffect, useState } from "react";
import Drawer from "../Drawer";
import { CloseIcon } from "../Icons";
import toast from "react-hot-toast";

import Input from "../Input";

import CustomDropdown from "../Dropdown";
import {
  TaskPriorityList,
  TaskPriorityMap,
  TaskStatusList,
  TaskStatusMap,
} from "../../constants/consts";
import Button from "../Button";

import ErrorMessage from "../ErrorMessage";

import useEditTask from "../../hook/useTask/useEditTask";
import useTask from "../../hook/useTask/useTask";
import { useAtom } from "jotai";
import { taskToViewAtom } from "../../atoms/atoms";

interface ViewTaskProps {
  isViewTaskDrawerOpen: boolean;

  setIsViewTaskDrawerOpen: (open: boolean) => void;
}

const ViewTask = ({
  isViewTaskDrawerOpen,

  setIsViewTaskDrawerOpen,
}: ViewTaskProps) => {
  const [taskToView, setTaskToView] = useAtom(taskToViewAtom);
  const resetViewTaskData = () => {
    setTaskToView(null);
    setIsViewTaskDrawerOpen(false);
  };
  return (
    <Drawer
      className="px-3"
      setShowSidebar={setIsViewTaskDrawerOpen}
      showSidebar={isViewTaskDrawerOpen}
    >
      <div className="flex gap-10  flex-col pl-4  h-full mt-3">
        <div className="flex justify-between w-full  items-center mt-3">
          <h1 className="text-xl font-semibold ">View Task</h1>
          <div className="" onClick={resetViewTaskData}>
            <CloseIcon className="h-8 cursor-pointer" />
          </div>
        </div>

        <form
          className="flex flex-col gap-3 justify-between  h-full "
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-base font-semibold">Task Name</p>
              <p className="text-blue-600 underline pl-1">
                {taskToView?.taskName}
              </p>
            </div>

            <div>
              <p className="mb-2 font-semibold text-md">Task description</p>
              <p className="text-blue-600  pl-1">
                {taskToView?.description
                  ? taskToView?.description
                  : "No Description"}
              </p>
            </div>
            <div className=" grid grid-cols-2 gap-3">
              <div>
                <p>Status</p>
                <p className="text-blue-600 underline ">
                  {TaskStatusMap[taskToView?.status]}
                </p>
              </div>

              <div>
                <p>Priority</p>
                <p className="text-blue-600 underline ">
                  {TaskPriorityMap[taskToView?.priority]}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mb-10">
            <Button onClick={resetViewTaskData}>Close</Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
};

export default ViewTask;
