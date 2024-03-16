import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const { loading } = useSelector((state) => state.user);
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
        setError(error.message)
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/dashboard");
    } catch (error) {
      dispatch(signInFailure(error.message));
      setError(error.message)
    }
    console.log(error)
  };

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-green-900 text-3xl text-center font-bold my-7">
        Sign In
      </h1>
      <p className="text-sm text-gray-500 mx-auto">Welcome back! Please log in using the details you entered during registration.</p>
      <form onSubmit={() => handleSubmit} className="flex flex-col gap-4 mt-2">
        <div className="relative flex flex-col pt-3">
          <label htmlFor="email" className="font-medium text-green-700 absolute bg-white left-3 top-0">Email</label>
          <input
            type="email"
            placeholder="e.g example@domainname.com"
            className="border p-3 rounded-lg placeholder:text-gray-400 placeholder:font-base"
            id="email"
            required
            onChange={handleChange}
          />
        </div>
        
        <div className="relative flex flex-col pt-3">
          <label htmlFor="password" className="font-medium text-green-700 absolute bg-white left-3 top-0">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="border p-3 rounded-lg placeholder:text-gray-400 placeholder:font-base"
            id="password"
            required
            onChange={handleChange}
          />
          <small className="text-right font-semibold text-green-700"><Link to={'/forget-password'}>Forget password?</Link> </small>
        </div>
        

        <button
          disabled={loading}
          className="bg-green-900 font-bold text-white p-3 rounded-lg uppercase hover:opacity-80"
        >
          {loading ? "loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="text-black">Have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-[#0a192f] font-bold">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
