import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import Flutterwave from "./flutterwavePayment";
//import Profile from "../pages/Profile";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Header() {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-[#0a192f] shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        
        <div>
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
            <span className="text-white">Refitinco</span>
          </h1>
        </Link>
        </div>

        <div>
        <ul className="hidden md:flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-white hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className=" sm:inline text-white hover:underline ">
              About
            </li>
          </Link>
          <Link to="/profile">
            {
              currentUser ? (
                <div className="">
                  <li className="sm:inline text-white hover:underline">
                    {currentUser.firstname}
                  </li>
                  <Link to="/flutterwave">
                    <li className="m-2 sm:inline text-white hover:underline">
                      Buy
                    </li>
                  </Link>
                  {/* <Link to="/profile">
                    <li className="m-2 sm:inline text-white hover:underline">
                      Profile
                    </li>
                  </Link> */}
                </div>
              ) : (
                <li className=" sm:inline text-white hover:underline">
                  Sign in
                </li>
              )
              // &&
              // <Flutterwave />
              // &&
              // <Profile />
            }
          </Link>
        </ul>
        </div>

              {/* Hamburger */}
      <div onClick={handleClick} className="md:hidden z-10 text-white cursor-pointer">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

        <ul 
          className={
            !nav
              ? "hidden"
              : "absolute top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center"
          }
        >
            <li className="py-6 text-4xl text-white">
          <Link onClick={handleClick} to="/">
              Home
          </Link>
            </li>
            <li className="py-6 text-4xl text-white">
          <Link onClick={handleClick} to="/about">
              About
          </Link>
            </li>
          <Link onClick={handleClick} to="/profile">
            {
              currentUser ? (
                <div className="">
                  <li className="py-6 text-4xl text-white">
                    {currentUser.firstname}
                  </li>
                  <Link to="/flutterwave">
                    <li className="py-6 text-4xl text-white">
                      Buy
                    </li>
                  </Link>
                  {/* <Link onClick={handleClick} to="/profile">
                    <li className="py-6 text-4xl">
                      Profile
                    </li>
                  </Link> */}
                </div>
              ) : (
                <li className=" sm:inline text-white hover:underline">
                  Sign in
                </li>
              )
              // &&
              // <Flutterwave />
              // &&
              // <Profile />
            }
          </Link>
        </ul>

      </div>
    </header>
  );
}
