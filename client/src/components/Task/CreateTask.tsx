import React, { useState } from "react";
import Drawer from "../Drawer";
import { CloseIcon } from "../Icons";
import toast from "react-hot-toast";

import Input from "../Input";

import CustomDropdown from "../Dropdown";
import { TaskPriorityList, TaskStatusList } from "../../constants/consts";
import Button from "../Button";

import ErrorMessage from "../ErrorMessage";
import useTaskCreate from "../../hook/useTask/useTaskCreate";

interface CreateTaskProps {
  isCreateTaskDrawerOpen: boolean;
  setIsCreateTaskDrawerOpen: (isOpen: boolean) => void;
}

const CreateTask = ({
  isCreateTaskDrawerOpen,
  setIsCreateTaskDrawerOpen,
}: CreateTaskProps) => {
  const {
    createTaskData,
    onCreateTask,
    resetCreateTaskData,
    setCreateTaskData,
    createTaskErrors,
    selectedPriority,
    selectedStatus,
    setSelectedPriority,
    setSelectedStatus,

    setCreateTaskErrors,
  } = useTaskCreate({
    isCreateTaskDrawerOpen,
    setIsCreateTaskDrawerOpen,
  });

  return (
    <Drawer
      className="px-3"
      setShowSidebar={setIsCreateTaskDrawerOpen}
      showSidebar={isCreateTaskDrawerOpen}
    >
      <div className="flex gap-10  flex-col pl-4  h-full mt-3">
        <div className="flex justify-between w-full  items-center mt-3">
          <h1 className="text-xl font-semibold ">Create a Task</h1>
          <div
            className=""
            onClick={() => {
              resetCreateTaskData();
            }}
          >
            <CloseIcon className="h-8 cursor-pointer" />
          </div>
        </div>

        <form
          className="flex flex-col gap-3 justify-between  h-full "
          onSubmit={(e) => {
            e.preventDefault();
            // handleSubmit(mutate);
          }}
        >
          <div className="flex flex-col gap-6">
            <Input
              isRequired={true}
              error={createTaskErrors.taskname}
              value={createTaskData.taskname}
              label="Task name"
              placeholder="task name"
              onChange={(e) =>
                setCreateTaskData({
                  ...createTaskData,
                  taskname: e.target.value,
                })
              }
            />

            <div>
              <label className="mb-2 font-semibold text-md">
                Task description
              </label>
              <textarea
                placeholder="task description"
                value={createTaskData.description}
                onChange={(e) =>
                  setCreateTaskData({
                    ...createTaskData,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 border-gray-400"
              />
              {createTaskErrors.description && (
                <ErrorMessage message={createTaskErrors.description} />
              )}
            </div>
            <div className=" grid grid-cols-2 gap-3">
              <CustomDropdown
                error={createTaskErrors.status}
                label="Status"
                selectedOption={selectedStatus}
                setSelectedOption={setSelectedStatus}
                isRequired={true}
                defaultOption="Select Status"
                options={TaskStatusList}
                onSelect={(e) => {
                  setCreateTaskData({ ...createTaskData, status: e.value });
                }}
              />

              <CustomDropdown
                error={createTaskErrors.priority}
                defaultOption="Select Priority"
                selectedOption={selectedPriority}
                setSelectedOption={setSelectedPriority}
                label="Priority"
                options={TaskPriorityList}
                onSelect={(e) =>
                  setCreateTaskData({ ...createTaskData, priority: e.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-3 mb-10">
            <Button onClick={onCreateTask}>Create Task</Button>
            <Button onClick={resetCreateTaskData}>Cancel</Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
};

export default CreateTask;
