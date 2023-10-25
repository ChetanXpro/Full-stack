import React, { useState } from "react";
import toast from "react-hot-toast";

interface ITaskHook {
  isEditTaskDrawerOpen?: boolean;
  setIsEditTaskDrawerOpen: (isOpen: boolean) => void;
}
import { useMutation, useQueryClient } from "@tanstack/react-query";

import usePrivateApis from "../usePrivateApis";
import { useAtom } from "jotai";
import { taskToEditAtom } from "../../atoms/atoms";

const useEditTask = ({
  isEditTaskDrawerOpen,
  setIsEditTaskDrawerOpen,
}: ITaskHook) => {
  const { editTask } = usePrivateApis();
  const queryClient = useQueryClient();
  const [taskToEdit, setTaskToEdit] = useAtom(taskToEditAtom);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  // Mutations

  const { mutate, error } = useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task edited successfully");
      resetCreateTaskData();
      setIsEditTaskDrawerOpen(!isEditTaskDrawerOpen);
    },
    onError: (e: any) => {
      console.log("error", e.response.data.message);
      toast.error(e.response.data.message, {
        id: "error",
      });
    },
  });

  // Create Task

  interface EditTaskData {
    taskName: string;
    description: string;
    status: string;
    priority: string;
  }

  const [editTaskData, setEditTaskData] = useState<EditTaskData>({
    taskName: taskToEdit.taskName || "",
    description: taskToEdit.description || "",
    status: taskToEdit.status || "",
    priority: taskToEdit.priority || "",
  });

  const [editTaskErrors, setEditTaskErrors] = useState<{
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
    setEditTaskData({
      taskName: "",
      description: "",
      status: "",
      priority: "",
    });
    setEditTaskErrors({
      taskname: "",
      description: "",
      status: "",
      priority: "",
    });
    setSelectedPriority("");
    setSelectedStatus("");
    setIsEditTaskDrawerOpen(!isEditTaskDrawerOpen);
  };

  const onEditTask = () => {
    let isError = false;
    const fieldsRequired = ["taskname", "status"];
    const errors: Record<string, string> = {};
    for (const key in editTaskData) {
      const value = editTaskData[key as keyof typeof editTaskData];
      if (value === "" && fieldsRequired.includes(key)) {
        errors[key] = `${key} is required`;
        isError = true;
      }
    }
    setEditTaskErrors(errors);

    if (isError) return;

    mutate({
      id: taskToEdit._id,
      taskName: editTaskData.taskName,
      description: editTaskData.description,
      status: editTaskData.status,
      priority: editTaskData.priority,
    });

    if (error) {
      toast.error(error.message);
    }
  };

  return {
    editTaskData,
    setEditTaskData,
    resetCreateTaskData,
    onEditTask,
    editTaskErrors,
    selectedPriority,
    setSelectedPriority,
    setTaskToEdit,
    taskToEdit,
    selectedStatus,
    setSelectedStatus,
    setEditTaskErrors,
  };
};

export default useEditTask;
