import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
    <h1 className="text-yellow-300 text-3xl text-center font-semibold my-7">Sign Up</h1>
    <form className="flex flex-col gap-4">
      <input type='text' placeholder='fullname'
      className="border p-3 rounded-lg" id="fullname" />
      
      <input type='email' placeholder='email'
      className="border p-3 rounded-lg" id="email" />
      
      <input type='password' placeholder='password'
      className="border p-3 rounded-lg" id="password" />
      
      <button className="bg-yellow-300 font-bold text-green-900 p-3 rounded-lg uppercase hover:opacity-80">
        Sign Up
      </button>
      
    </form>
    <div className="flex gap-2 mt-5">
      <p className="text-yellow-300">Have an account?</p>
      <Link to={'/sign-in'}>
        <span className="text-green-300">Sign in</span>
      </Link>
    </div>
    <p className="text-red-500 mt-5"></p>
  </div>
  )
}
