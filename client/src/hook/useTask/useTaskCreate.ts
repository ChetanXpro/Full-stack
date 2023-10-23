import React, { useState } from "react";
import toast from "react-hot-toast";

interface ITaskHook {
  isCreateTaskDrawerOpen?: boolean;
  setIsCreateTaskDrawerOpen: (isOpen: boolean) => void;
}
import { useMutation, useQueryClient } from "@tanstack/react-query";

import usePrivateApis from "../usePrivateApis";

const useTaskCreate = ({
  isCreateTaskDrawerOpen,
  setIsCreateTaskDrawerOpen,
}: ITaskHook) => {
  const { createTask } = usePrivateApis();
  const queryClient = useQueryClient();

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  // Mutations

  const { mutate, error } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created successfully");
      resetCreateTaskData();
      setIsCreateTaskDrawerOpen(!isCreateTaskDrawerOpen);
    },
  });

  // Create Task
  const [createTaskData, setCreateTaskData] = useState({
    taskname: "",
    description: "",
    status: "",
    priority: "",
  });

  const [createTaskErrors, setCreateTaskErrors] = useState<{
    taskname?: string;
    description?: string;
    status?: string;
    priority?: string;
  }>({
    taskname: "",
    description: "",
    status: "",
    priority: "",
  });

  const [isError, setIsError] = useState(false);

  // const { taskname, description, status, priority } = req.body

  const resetCreateTaskData = () => {
    setCreateTaskData({
      taskname: "",
      description: "",
      status: "",
      priority: "",
    });
    setCreateTaskErrors({
      taskname: "",
      description: "",
      status: "",
      priority: "",
    });
    setSelectedPriority("");
    setSelectedStatus("");
    setIsCreateTaskDrawerOpen(!isCreateTaskDrawerOpen);
  };

  const onCreateTask = () => {
    let isError = false;
    const fieldsRequired = ["taskname", "status"];
    const errors: Record<string, string> = {};
    for (const key in createTaskData) {
      const value = createTaskData[key as keyof typeof createTaskData];
      if (value === "" && fieldsRequired.includes(key)) {
        errors[key] = `${key} is required`;
        isError = true;
      }
    }
    setCreateTaskErrors(errors);

    console.log("isError", isError);
    if (isError) return;

    mutate({
      taskName: createTaskData.taskname,
      description: createTaskData.description,
      status: createTaskData.status,
      priority: createTaskData.priority,
    });
  };

  return {
    createTaskData,
    setCreateTaskData,
    resetCreateTaskData,
    onCreateTask,
    createTaskErrors,
    selectedPriority,
    setSelectedPriority,
    selectedStatus,
    setSelectedStatus,
    setCreateTaskErrors,
  };
};

export default useTaskCreate;
