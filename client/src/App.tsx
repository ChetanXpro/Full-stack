import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Dashboard from "./components/Layout/Dashboard/Dashboard";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { ErrorBoundary } from "react-error-boundary";
import Signin from "./components/SignIn/Signin";
import Signup from "./components/SignUp/Signup";
import Home from "./page/Home";
import Task from "./page/Task";
import ErrorFallback from "./components/ErrorBoundaryWrapper/ErrorFallBack";
import ErrorBoundaryWrapper from "./components/ErrorBoundaryWrapper";

function App() {
  return (
    <Routes>
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <ErrorBoundaryWrapper>
            <RequireAuth />
          </ErrorBoundaryWrapper>
        }
      >
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />

          <Route
            path="task"
            element={
              <ErrorBoundaryWrapper>
                <Task />
              </ErrorBoundaryWrapper>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
