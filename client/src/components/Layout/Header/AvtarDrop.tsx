import { useAtom } from "jotai";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { user } from "../../../atoms/atoms";

const AvtarDrop = ({ setAvtarDrop }: any) => {
  const [userData, setUser] = useAtom(user);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("jwt");
    navigate("signin");
  };

  return (
    <ul
      className={
        "flex-col flex absolute rounded-xl  z-50 items-center top-14 right-1 bottom-0 h-[6rem]   uppercase bg-black/40 backdrop-blur-lg gap-8 justify-center p-8 "
      }
    >
      <Link className="hover:underline w-full h-full" to={"/"}>
        <p>Settings</p>
      </Link>

      <p className="hover:underline cursor-pointer" onClick={logout}>
        Logout
      </p>
    </ul>
  );
};

export default AvtarDrop;
