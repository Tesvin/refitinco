import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  forgetFailure,
  forgetSuccess,
  forgetStart,
} from "../redux/user/userSlice";

export default function ForgetPassword() {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const [error, setError] = useState('');
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
    const url = import.meta.env.VITE_API_URL;
    try {
      dispatch(forgetStart());
      const res = await fetch(`${url}/api/auth/reset_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(forgetFailure(data.message));
        setError(data.message)
        return;
      }
      dispatch(forgetSuccess(data));
      navigate("/forget");
    } catch (error) {
      dispatch(forgetFailure(error.message));
      setError(error.message)
    }
  };

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-green-900 text-3xl text-center font-bold my-7">
        Forget Password
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative flex flex-col py-3">
          <label htmlFor="email" className="font-medium text-green-700 absolute bg-white left-3 top-0">Email</label>
          <input
            type="email"
            placeholder="e.g example@domainname.com"
            className="border p-3 rounded-lg placeholder:text-gray-500 placeholder:font-base"
            id="email"
            required
            onChange={handleChange}
          />
        </div>

        <button
          disabled={loading}
          className="bg-green-900 font-bold text-white p-3 rounded-lg uppercase hover:opacity-80"
        >
          {loading ? "loading..." : "Request Link"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="text-green-700">Back to </p>
        <Link to={"/sign-in"}>
          <span className="text-green-700">Login</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
