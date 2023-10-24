import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { Routes } from "../constants/consts";
import { apiInstance } from "../Api/api";

const usePrivateApis = () => {
  const apiPrivateInstance = useAxiosPrivate();

  const getTask = async () => {
    try {
      const request = await apiPrivateInstance.get("/task/all");
      return request.data;
    } catch (error) {
      const err = error as AxiosError;

      return Promise.reject(err);
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

      return Promise.reject(err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const request = await apiPrivateInstance.delete(`/task/delete/${id}`);

      return request.data;
    } catch (error) {
      const err = error as AxiosError;

      return Promise.reject(err);
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

      return Promise.reject(err);
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

      return Promise.reject(err);
    }
  };

  interface IGetImgUploadUrl {
    fileName: string;
    fileType: string;
    fileSize: number;
  }
  const getImgUploadUrl = async ({
    fileName,
    fileType,
    fileSize,
  }: IGetImgUploadUrl) => {
    try {
      const request = await apiPrivateInstance.post(`/user/geturl`, {
        fileName: fileName,
        fileType: fileType,
        fileSize: fileSize,
      });

      return request.data;
    } catch (error) {
      const err = error as AxiosError;

      return Promise.reject(err);
    }
  };

  const uploadAndSaveUrl = async ({
    url,
    s3ObjectKey,
    file,
  }: {
    url: string;
    file: File;
    s3ObjectKey: string;
  }) => {
    try {
      const res = await axios.put(url, file);

      console.log(res);

      if (res) {
        const BUCKET = import.meta.env.VITE_S3_BUCKET;
        const REGION = import.meta.env.VITE_S3_REGION;
        const s3url = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${s3ObjectKey}`;
        const request = await apiPrivateInstance.post(`/user/upload`, {
          url: s3url,
        });
        return request.data;
      }
    } catch (error) {
      const err = error as AxiosError;

      return Promise.reject(err);
    }
  };

  const logout = async () => {
    try {
      const response = await apiInstance.get("/user/logout", {
        withCredentials: true,
      });

      sessionStorage.removeItem("access_token");

      return response.data.accessToken;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getUser = async () => {
    try {
      const request = await apiPrivateInstance.get("/user");
      return request?.data;
    } catch (err: any) {
      return Promise.reject(err);
    }
  };

  return {
    getTask,
    createTask,
    deleteTask,
    changeStatus,
    getImgUploadUrl,
    logout,
    editTask,
    uploadAndSaveUrl,
    getUser,
  };
};

export default usePrivateApis;
