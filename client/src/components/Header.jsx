import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-yellow-300 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to='/'>
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
                    <span className="text-green-700">Refitinco</span>
                </h1>
            </Link>
            <ul className="flex gap-4">
                <Link to='/'>
                    <li className="hidden sm:inline text-green-700 hover:underline">
                        Home
                    </li>
                </Link>
                <Link to='/about'>
                    <li className="hidden sm:inline text-green-700 hover:underline">
                        About
                    </li>
                </Link>
                <Link to='/sign-in'>
                <li className="hidden sm:inline text-green-700 hover:underline">
                        Sign in
                    </li>
                </Link>
            </ul>
        </div>
    </header>
  )
}
