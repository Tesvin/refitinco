import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function Forget() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-green-900 text-3xl text-center font-bold my-7">
       Reset Password
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Confirm password"
          className="border p-3 rounded-lg"
          id="confirm"
          required
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-green-900 font-bold text-white p-3 rounded-lg uppercase hover:opacity-80"
        >
          {loading ? "loading..." : "Submit"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <Link to={"/sign-in"}>
          <span className="text-[#0a192f] font-bold">Back to Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}