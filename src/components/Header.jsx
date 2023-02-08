import { Outlet, Link } from "react-router-dom";

const Header = () => {
    return ( 
        <div className="">
            <header className="flex justify-between p-5 items-center">
                <h1 className="  text-[#14ade0] text-2xl">NotePal</h1>
                <div className="flex">                    
                    <Link to='/' className="pr-2 text-[#14ade0] hover:bg-[#14ade0] hover:text-[#fff] rounded-sm p-2 duration-300 ease-in-out">
                        <p className="ml-1">Home</p>
                    </Link>
                    <Link to='/add' className="pr-2 text-[#14ade0] hover:bg-[#14ade0] hover:text-[#fff] rounded-sm p-2 duration-300 ease-in-out">
                        <p className=" ml-1">Add Notes</p>
                    </Link>
                </div>
            </header>
            <Outlet />
        </div>
     );
}
 
export default Header;