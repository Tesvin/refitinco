import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const url = import.meta.env.VITE_API_URL
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${url}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-green-900 text-3xl text-center font-bold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative flex flex-col pt-3">
          <label htmlFor="firstname" className="label_style">First Name</label>
          <input
            type="text"
            placeholder="Your answer"
            className="input_style"
            id="firstname"
            required
            onChange={handleChange}
          />
        </div>
        
        <div className="relative flex flex-col pt-3">
          <label htmlFor="lastname" className="label_style">Last Name</label>
          <input
            type="text"
            placeholder="Your answer"
            className="input_style"
            id="lastname"
            required
            onChange={handleChange}
          />
        </div>
        

        <div className="flex flex-col relative pt-3">
          <label htmlFor="email" className="label_style">Email</label>
          <input
            type="email"
            placeholder="Your answer"
            className="input_style"
            id="email"
            required
            onChange={handleChange}
          />
        </div>
        
        <div className="relative flex flex-col pt-3">
          <label htmlFor="password" className="label_style">Password</label>
            <input
            type="password"
            placeholder="password"
            className="input_style "
            id="password"
            required
            onChange={handleChange}
          />
        </div>

        <div className="relative flex flex-col pt-3">
          <label htmlFor="confirm" className="label_style">Confirm password</label>
            <input
            type="password"
            placeholder="confirm password"
            className="input_style "
            id="confirm"
            required
            onChange={handleChange}
          />
          { formData.password !== formData.confirm && <p className="text-red-500 text-xs">Password does not match</p>}
        </div>

        <div className="relative flex flex-col pt-3">
          <label htmlFor="refer" className="label_style">Referral</label>
          <input
            name="refer"
            type="text"
            placeholder="Optional"
            className="input_style"
            id="refer"
            onChange={handleChange}
          />
        </div>
      
        
        <button
          disabled={loading}
          className="bg-green-900 font-bold text-white p-3 rounded-lg uppercase hover:opacity-80"
        >
          {loading ? "loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="text-[#0a192f]">Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-[#0a192f] font-bold">Sign in</span>
        </Link>
        {/* <Link to={"/sign-in"}>
          <span className="p-6 text-red-300">forgotten password?</span>
        </Link> */}
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
