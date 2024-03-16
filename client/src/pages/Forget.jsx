import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
 forgetStart,
 forgetSuccess,
 forgetFailure,
} from "../redux/user/userSlice";

export default function Forget() {
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(currentUser)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      email: currentUser.email,
      reset_token: currentUser.reset_token,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(forgetStart());
      const res = await fetch("/api/auth/reset_password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(forgetFailure(data.message));
        return;
      }
      dispatch(forgetSuccess(data));
      navigate("/login");
    } catch (error) {
      dispatch(forgetFailure(error.message));
    }
  };

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-green-900 text-3xl text-center font-bold my-7">
        Forget Password
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative flex flex-col py-3">
          <label htmlFor="password" className="font-semibold text-green-700 absolute bg-white left-3 top-0">Password</label>
          <input
            type="password"
            placeholder="Your answer"
            className="border p-3 rounded-lg placeholder:text-gray-500 placeholder:font-semibold"
            id="password"
            onChange={handleChange}
          />
        </div>
        
        <div className="relative flex flex-col pt-3">
          <label htmlFor="confirm" className="font-semibold text-green-700 absolute bg-white left-3 top-0">Confirm Password</label>
          <input
            type="password"
            placeholder="Your answer"
            className="border p-3 rounded-lg placeholder:text-gray-500 placeholder:font-semibold"
            id="confirm"
            onChange={handleChange}
          />
        </div>
        

        <button
          disabled={loading}
          className="bg-green-900 font-bold text-white p-3 rounded-lg uppercase hover:opacity-80"
        >
          {loading ? "loading..." : "Submit"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="text-black">Back to </p>
        <Link to={"/sign-in"}>
          <span className="text-[#0a192f] font-bold">Login</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
