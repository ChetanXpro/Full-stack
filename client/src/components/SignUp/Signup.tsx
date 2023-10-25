import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login, signup } from "../../Api/authApi";

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

import { useEffect } from "react";
import Input from "../Input";
import Button from "../Button";
import logo from "../../assets/task.png";
import { ValidateEmail } from "../../utils/utils";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { isError, error, mutate } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      toast.success("Account created");

      setIsLoading(false);
      navigate("/signin");
    },
    onError: (e: any) => {
      console.log("error", e.response.data.message);
      toast.error(e.response.data.message, {
        id: "error",
      });
      setIsLoading(false);
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
      email: email,
      password,
    };
    setIsLoading(true);
    mutate(payload);
  };
  return (
    <section className="min-h-screen    w-full bg-red-200 dark:bg-neutral-700">
      <div className=" h-full w-full   p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 ">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg ">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
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
                        value={email}
                        type="email"
                        label="Email"
                        className="mb-4"
                      ></Input>

                      <Input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        label="Password"
                        className="mb-4"
                      ></Input>

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <Button
                          type={"submit"}
                          isLoading={isLoading}
                          className="w-full mb-3 inline-block  rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                        >
                          Sign up
                        </Button>
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Have an account?</p>

                        <Button
                          type={"button"}
                          onClick={() => {
                            navigate("/signin");
                          }}
                          className=" font-semibold "
                        >
                          Login
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

export default Signup;
