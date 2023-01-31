import { Outlet, Link } from "react-router-dom";

const Header = () => {
    return ( 
        <div className="flex">
            <header className="flex flex-col h-[100vh] border-r-[1px]">
                <h1 className="mb-[20%] border-b-[1px] p-4 text-[#14ade0] text-2xl">NotePal</h1>
                <div className="link flex flex-col">
                    <Link to='/add' className="flex p-5 text-[#14ade0] hover:bg-[rgba(20,173,224,0.2)]">
                        <img src="plus.svg" alt="add" className="hidden md:block"/>
                        <p className=" ml-1">Add Notes</p>
                    </Link>
                    <Link to='/' className="flex p-5 text-[#14ade0] hover:bg-[rgba(20,173,224,0.2)]">
                        <img src="home.svg" alt="home" className="hidden md:block"/>
                        <p className="ml-1">Home</p>
                    </Link>
                </div>
            </header>
            <Outlet />
        </div>
     );
}
 
export default Header;