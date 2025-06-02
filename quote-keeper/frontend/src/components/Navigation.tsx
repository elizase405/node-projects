import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="w-full px-2 h-20 bg-[#5185AE] text-white flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold hover:text-[#223849]">Quote Keeper</Link>
        <ul>
            <li><Link to="/dashboard" className="hover:underline hover:text-[#223849]">Dashboard</Link></li>
        </ul>
        <div className="text-center">
            <button className="border rounded-3xl px-4 py-1 hover:border-[#223849] hover:bg-[#223849] cursor-pointer">Get started</button>
            <button className="border rounded-3xl px-4 py-1 ml-2 hover:border-[#223849] hover:bg-[#223849] cursor-pointer">Login</button>
        </div>
    </nav>
  )
}

export default Navigation