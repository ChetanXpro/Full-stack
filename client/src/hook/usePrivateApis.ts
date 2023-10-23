import { AxiosError } from "axios";
import React, { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const usePrivateApis = () => {
  const apiPrivateInstance = useAxiosPrivate();

  const getTask = async () => {
    try {
      const request = await apiPrivateInstance.get("/task/all");
      return request.data;
    } catch (error) {
      const err = error as AxiosError;

      return Promise.reject(err.response);
    }
  };

  interface IPayoad {
    taskName: string;
    description?: string;
    status: string;
    priority?: string;
  }

  const createTask = async (payload: IPayoad) => {
    try {
      const request = await apiPrivateInstance.post("/task/create", {
        taskName: payload.taskName,
        description: payload.description,
        status: payload.status,
        priority: payload.priority,
      });

      return request.data;
    } catch (error) {
      const err = error as AxiosError;

      return Promise.reject(err.response);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const request = await apiPrivateInstance.delete(`/task/delete/${id}`);

      return request.data;
    } catch (error) {
      const err = error as AxiosError;

      return Promise.reject(err.response);
    }
  };

  interface IEditTaskPayoad {
    id: string;
    taskName: string;
    description?: string;
    status: string;
    priority?: string;
  }

  const editTask = async (payload: IEditTaskPayoad) => {
    try {
      const request = await apiPrivateInstance.put(`/task/edit`, {
        id: payload.id,
        taskName: payload.taskName,
        description: payload.description,
        status: payload.status,
        priority: payload.priority,
      });

      return request.data;
    } catch (error) {
      const err = error as AxiosError;

      return Promise.reject(err.response);
    }
  };

  const changeStatus = async (payload: { id: string; status: string }) => {
    try {
      const request = await apiPrivateInstance.put(`/task/changeStatus`, {
        id: payload.id,

        status: payload.status,
      });

      return request.data;
    } catch (error) {
      const err = error as AxiosError;

      return Promise.reject(err.response);
    }
  };
  return {
    getTask,
    createTask,
    deleteTask,
    changeStatus,
    editTask,
  };
};

export default usePrivateApis;
