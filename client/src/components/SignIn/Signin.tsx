import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "../../Api/api";
import { useAtom } from "jotai";
import logo from "../../assets/task.png";

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import { Backdrop, Modal } from "@mui/material";
import jwtDecode from "jwt-decode";

import { authAtom, user } from "../../atoms/atoms";
import Button from "../Button";
import Input from "../Input";
import { Routes } from "../../constants/consts";
import { ValidateEmail } from "../../utils/utils";
const Signin = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  // const { setAuth, setUser } = useAuth();
  const [auth, setAuth] = useAtom(authAtom);
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");

  const [userData, setUserData] = useAtom(user);

  const { isError, error, mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data: any) => {
      const token = data?.accessToken;

      sessionStorage.setItem("access_token", token);

      setSuccess(true);

      navigate(Routes.HOME, { replace: true });
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Fill all details");
    }

    if (!ValidateEmail(email)) {
      return toast.error("Invalid email");
    }
    const payload = {
      email,
      password,
    };
    console.log(payload);

    mutate(payload);
  };

  console.log("auth", email);

  return (
    <section className="min-h-screen   w-full bg-red-200 dark:bg-neutral-700">
      <div className=" h-full w-full   p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img
                        className="mx-auto w-20 mb-4"
                        src={logo}
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        Welcome to TaskMate!
                      </h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p className="mb-4">Please login to your account</p>

                      <Input
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        // value={email}
                        type="text"
                        label="Email"
                        className="mb-4"
                      ></Input>

                      <Input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        // value={password}
                        label="Password"
                        className="mb-4"
                      ></Input>

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <Button
                          type={"submit"}
                          className="w-full mb-3 inline-block  rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                        >
                          Log in
                        </Button>
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>

                        <Button
                          type={"button"}
                          onClick={() => {
                            console.log("clicked");

                            navigate(Routes.REGISTER);
                          }}
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                          Register
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>

                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      Managing Tasks Made Easy - Access TaskMate Now.
                    </h4>
                    <p className="text-sm">
                      TaskMate is more than just a task manager; it's a powerful
                      tool that simplifies your life and boosts your
                      productivity. With us, you can prioritize your tasks, set
                      goals, and achieve them one step at a time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
