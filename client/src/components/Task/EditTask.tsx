import React, { useEffect, useState } from "react";
import Drawer from "../Drawer";
import { CloseIcon } from "../Icons";
import toast from "react-hot-toast";

import Input from "../Input";

import CustomDropdown from "../Dropdown";
import { TaskPriorityList, TaskStatusList } from "../../constants/consts";
import Button from "../Button";

import ErrorMessage from "../ErrorMessage";

import useEditTask from "../../hook/useTask/useEditTask";

interface CreateTaskProps {
  isEditTaskDrawerOpen: boolean;
  taskToEdit: any;
  setIsEditTaskDrawerOpen: (isOpen: boolean) => void;
}

const EditTask = ({
  isEditTaskDrawerOpen,
  taskToEdit,
  setIsEditTaskDrawerOpen,
}: CreateTaskProps) => {
  const {
    editTaskData,
    editTaskErrors,
    onEditTask,
    resetCreateTaskData,
    selectedPriority,
    selectedStatus,
    setEditTaskData,
    setEditTaskErrors,
    setSelectedPriority,
    setSelectedStatus,
  } = useEditTask({
    isEditTaskDrawerOpen,
    setIsEditTaskDrawerOpen,
  });

  useEffect(() => {
    setEditTaskData({
      taskName: taskToEdit.taskName,
      description: taskToEdit.description,
      status: taskToEdit.status,
      priority: taskToEdit.priority,
    });

    setSelectedStatus(taskToEdit.status);
    setSelectedPriority(taskToEdit.priority);
  }, [taskToEdit]);

  return (
    <Drawer
      className="px-3"
      setShowSidebar={setIsEditTaskDrawerOpen}
      showSidebar={isEditTaskDrawerOpen}
    >
      <div className="flex gap-10  flex-col pl-4  h-full mt-3">
        <div className="flex justify-between w-full  items-center mt-3">
          <h1 className="text-xl font-semibold ">Edit Task</h1>
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
          }}
        >
          <div className="flex flex-col gap-6">
            <Input
              isRequired={true}
              error={editTaskErrors.taskname}
              value={editTaskData.taskName}
              label="Task name"
              placeholder="task name"
              onChange={(e) =>
                setEditTaskData({
                  ...editTaskData,
                  taskName: e.target.value,
                })
              }
            />

            <div>
              <label className="mb-2 font-semibold text-md">
                Task description
              </label>
              <textarea
                placeholder="task description"
                value={editTaskData.description}
                onChange={(e) =>
                  setEditTaskData({
                    ...editTaskData,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 border-gray-400"
              />
              {editTaskErrors.description && (
                <ErrorMessage message={editTaskErrors.description} />
              )}
            </div>
            <div className=" grid grid-cols-2 gap-3">
              <CustomDropdown
                error={editTaskErrors.status}
                label="Status"
                selectedOption={selectedStatus}
                setSelectedOption={setSelectedStatus}
                isRequired={true}
                defaultOption="Select Status"
                options={TaskStatusList}
                onSelect={(e) => {
                  setEditTaskData({ ...editTaskData, status: e.value });
                }}
              />

              <CustomDropdown
                error={editTaskErrors.priority}
                defaultOption="Select Priority"
                selectedOption={selectedPriority}
                setSelectedOption={setSelectedPriority}
                label="Priority"
                options={TaskPriorityList}
                onSelect={(e) =>
                  setEditTaskData({ ...editTaskData, priority: e.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-3 mb-10">
            <Button onClick={onEditTask}>Edit Task</Button>
            <Button onClick={resetCreateTaskData}>Cancel</Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
};

export default EditTask;
