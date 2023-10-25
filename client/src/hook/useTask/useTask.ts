import React, { useState } from "react";
import toast from "react-hot-toast";

interface ITaskHook {
  isCreateTaskDrawerOpen?: boolean;
  setIsCreateTaskDrawerOpen: (isOpen: boolean) => void;
}
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import usePrivateApis from "../usePrivateApis";
import { allTasksAtom } from "../../atoms/atoms";
import { useAtom } from "jotai";

const useTask = () => {
  const { deleteTask, getTask, changeStatus } = usePrivateApis();
  const [isCreateTaskDrawerOpen, setIsCreateTaskDrawerOpen] = useState(false);
  const [isEditTaskDrawerOpen, setIsEditTaskDrawerOpen] = useState(false);
  const [isViewTaskDrawerOpen, setIsViewTaskDrawerOpen] = useState(false);
  const [allTask, setAllTask] = useAtom(allTasksAtom);
  const queryClient = useQueryClient();
  // const [allTaskData, setAllTask] = useAtom(allTasksAtom);

  const [filterButton, setFilterButton] = useState(false);
  const [statusFilterButton, setStatusFilterButton] = useState(false);
  const [priorityFilterButton, setPriorityFilterButton] = useState(false);
  const [taskToView, setTaskToView] = useState({} as any);

  const [sortButton, setSortButton] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { mutate: deleteTaskFunc, error: deleteTaskError } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted successfully");
    },
  });
  const { mutate: changeTaskStatus, error: changeTaskStatusError } =
    useMutation({
      mutationFn: changeStatus,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        toast.success("Task status changed successfully");
      },
      onError: (e: any) => {
        console.log("error", e.response.data.message);
        toast.error(e.response.data.message, {
          id: "error",
        });
      },
    });

  const [allTasks, setAllTasks] = useAtom(allTasksAtom);

  const applyStatusFilter = (status: string, data: any) => {
    console.log("data inside task", data);
    const filteredTasks = data?.filter((task: any) => task.status === status);

    return filteredTasks;
  };

  const applyPriorityFilter = (priority: string, data: any) => {
    const filteredTasks = data?.filter(
      (task: any) => task.priority === priority
    );
    return filteredTasks;
  };

  const sortByDate = (data: any) => {
    const sortedData = data?.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return sortedData;
  };

  return {
    deleteTaskFunc,
    deleteTaskError,

    applyStatusFilter,
    applyPriorityFilter,
    sortByDate,
    isCreateTaskDrawerOpen,

    setIsCreateTaskDrawerOpen,
    isEditTaskDrawerOpen,
    setIsEditTaskDrawerOpen,
    allTasks,
    // allTaskData,
    filterButton,
    changeTaskStatus,
    setFilterButton,
    statusFilterButton,
    setStatusFilterButton,
    priorityFilterButton,
    sortButton,
    setSortButton,
    searchQuery,
    setSearchQuery,
    taskToView,
    setTaskToView,
    setIsViewTaskDrawerOpen,
    isViewTaskDrawerOpen,

    setPriorityFilterButton,
  };
};

export default useTask;
