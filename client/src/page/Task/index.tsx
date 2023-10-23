import React, { useState, Suspense, useEffect } from "react";

import usePrivateApis from "../../hook/usePrivateApis";
import { useQuery } from "@tanstack/react-query";

import { TaskPriorityList, TaskStatusList } from "../../constants/consts";
import TaskCard from "../../components/TaskCard";
import Button from "../../components/Button";

import CreateTask from "../../components/Task/CreateTask";
import useEditTask from "../../hook/useTask/useEditTask";
import EditTask from "../../components/Task/EditTask";
import { useAtom } from "jotai";
import { allTasksAtom } from "../../atoms/atoms";
import useTask from "../../hook/useTask/useTask";
import Loader from "../../components/Loader/Loader";
import { CloseIcon } from "../../components/Icons";
import NoData from "../../components/NoData/NoData";

const Task = () => {
  const { getTask } = usePrivateApis();
  const [tasksData, setTasksData] = useState<any>([]);

  const [allTask, setAllTask] = useAtom(allTasksAtom);
  const {
    applyPriorityFilter,
    isCreateTaskDrawerOpen,
    setIsCreateTaskDrawerOpen,
    isEditTaskDrawerOpen,
    setIsEditTaskDrawerOpen,
    applyStatusFilter,
    sortByDate,
    allTasks,

    filterButton,
    priorityFilterButton,
    setFilterButton,
    setPriorityFilterButton,
    setStatusFilterButton,
    statusFilterButton,
  } = useTask();

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const { taskToEdit, setTaskToEdit } = useEditTask({
    isEditTaskDrawerOpen,
    setIsEditTaskDrawerOpen,
  });

  const { data, status, isLoading, isSuccess } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTask,
  });

  // console.log("data", data);

  useEffect(() => {
    if (isSuccess) {
      setAllTask(data.data);
      setTasksData(data.data);
    }
  }, [status, data]);

  const handleClickOutside = (e: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setFilterButton(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-10 pt-4">
      <div className="flex border w-full  h-24">
        <div className="h-full mx-10 flex items-center justify-center">
          <Button
            id="create-task"
            type={"button"}
            onClick={() => setIsCreateTaskDrawerOpen(!isCreateTaskDrawerOpen)}
            className="h-10 create-task"
          >
            Create Task
          </Button>
        </div>

        <div className=" w-full flex items-center flex-1 ">
          <div className="relative">
            <div ref={dropdownRef} className="flex h-10 relative">
              <button
                onClick={() => setFilterButton(!filterButton)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center "
                type="button"
              >
                Filter by
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {filterButton && (
                <div
                  id="dropdown"
                  className="absolute z-50 top-11 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                >
                  <ul
                    className="py-2 text-sm text-gray-700"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <div
                        onClick={() => {
                          setTasksData(allTask);
                          setStatusFilterButton(false);
                          setFilterButton(false);
                        }}
                        className="  flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        <p className="flex-1 w-full">Clear Filters</p>

                        <div className={`  flex   `}>
                          <CloseIcon className=" w-4 h-4" />
                        </div>
                      </div>
                    </li>
                    <li>
                      <div
                        onMouseEnter={() => setStatusFilterButton(true)}
                        onMouseLeave={() => setStatusFilterButton(false)}
                        className="  flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        Status
                        <div className={` flex  `}>
                          <svg
                            className="w-2.5 h-2.5 ml-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        </div>
                      </div>
                      {statusFilterButton && (
                        <div
                          onMouseEnter={() => setStatusFilterButton(true)}
                          onMouseLeave={() => setStatusFilterButton(false)}
                          className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 left-full top-0"
                        >
                          {/* Second level dropdown */}
                          <ul className="py-2 text-sm text-gray-700">
                            {TaskStatusList.map((item) => (
                              <li key={item.value}>
                                <div
                                  onClick={() => {
                                    console.log("item.value", item.value);

                                    const filteredData = applyStatusFilter(
                                      item.value,
                                      tasksData
                                    );
                                    setTasksData(filteredData);
                                    setStatusFilterButton(false);
                                    setFilterButton(false);
                                  }}
                                  className="block py-2  pl-2 cursor-pointer  hover:bg-gray-100"
                                >
                                  {item.label}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                    <li>
                      <div
                        onMouseEnter={() => setPriorityFilterButton(true)}
                        onMouseLeave={() => setPriorityFilterButton(false)}
                        className="  flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        Priority
                        <div className={` flex  `}>
                          <svg
                            className="w-2.5 h-2.5 ml-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        </div>
                      </div>
                      {priorityFilterButton && (
                        <div
                          onMouseEnter={() => setPriorityFilterButton(true)}
                          onMouseLeave={() => setPriorityFilterButton(false)}
                          className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 left-full top-0"
                        >
                          {/* Second level dropdown */}
                          <ul className="py-2 text-sm text-gray-700">
                            {TaskPriorityList.map((item) => (
                              <li key={item.value}>
                                <div
                                  onClick={() => {
                                    const filteredData = applyPriorityFilter(
                                      item.value,
                                      tasksData
                                    );
                                    setTasksData(filteredData);
                                    setStatusFilterButton(false);
                                    setFilterButton(false);
                                  }}
                                  className="block py-2  pl-2 cursor-pointer  hover:bg-gray-100"
                                >
                                  {item.label}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap  gap-3 items-center justify-center">
        {tasksData && tasksData.length === 0 ? (
          <NoData display="No Tasks" />
        ) : (
          tasksData.map((item: any) => {
            return (
              <TaskCard
                key={item._id}
                task={item}
                setIsEditTaskDrawerOpen={setIsEditTaskDrawerOpen}
                isEditTaskDrawerOpen={isEditTaskDrawerOpen}
                setTaskToEdit={setTaskToEdit}
                taskToEdit={taskToEdit}
              />
            );
          })
        )}
      </div>
      <CreateTask
        isCreateTaskDrawerOpen={isCreateTaskDrawerOpen}
        setIsCreateTaskDrawerOpen={setIsCreateTaskDrawerOpen}
      />
      <EditTask
        taskToEdit={taskToEdit}
        setIsEditTaskDrawerOpen={setIsEditTaskDrawerOpen}
        isEditTaskDrawerOpen={isEditTaskDrawerOpen}
      />
    </div>
  );
};

export default Task;
