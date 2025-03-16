import { useState, useEffect } from "react"
// import logo from "../assets/logo.png"
import { RiCloseFill, RiMenu3Line, RiWalletLine, RiSettings4Line, RiUserLine, RiLogoutBoxLine, RiArrowDownSLine, RiNotification3Line } from "react-icons/ri";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen)
    }

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
            <div className={`text-neutral-500 bg-white/70 backdrop-blur-lg max-w-7xl mx-auto px-6 py-2 flex justify-between items-center rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
                {/* Left: logo and name */}
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-2 rounded-xl">
                        <RiWalletLine className="text-white text-2xl" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">FinancePro</span>
                </div>

               
                <div className="hidden md:flex space-x-1">
                    <a href="#dashboard" className="flex items-center space-x-1 px-4 py-2 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                        
                        <span>Dashboard</span>
                    </a>
                    <a href="#transactions" className="flex items-center space-x-1 px-4 py-2 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                        
                        <span>Transactions</span>
                    </a>
                    <a href="#analytics" className="flex items-center space-x-1 px-4 py-2 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                        
                        <span>Analytics</span>
                    </a>
                </div>

                
                <div className="hidden md:flex items-center space-x-2">
                    <button className="p-2 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 relative">
                        <RiNotification3Line className="text-xl" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <button className="p-2 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                        <RiSettings4Line className="text-xl" />
                    </button>
                    
                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={toggleProfile}
                            className="flex items-center space-x-2 p-2 rounded-xl hover:bg-blue-50 transition-all duration-200 focus:outline-none"
                        >
                            <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white flex items-center justify-center font-medium">
                                JP
                            </div>
                            <span className="text-gray-700 font-medium">John Doe</span>
                            <RiArrowDownSLine className={`text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg py-2 z-50 border border-gray-100 transform transition-all duration-200">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="text-sm text-gray-500">Signed in as</p>
                                    <p className="text-sm font-medium text-gray-900">john.doe@example.com</p>
                                </div>
                                <a href="#profile" className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-all duration-200">
                                    <RiUserLine className="text-gray-500" />
                                    <span>My Profile</span>
                                </a>
                                <a href="#settings" className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-all duration-200">
                                    <RiSettings4Line className="text-gray-500" />
                                    <span>Settings</span>
                                </a>
                                <div className="border-t border-gray-100"></div>
                                <a href="#logout" className="flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-200">
                                    <RiLogoutBoxLine />
                                    <span>Logout</span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Hamburger Icon for Mobile */}
                <div className="md:hidden">
                    <button 
                        onClick={toggleMenu} 
                        className="p-2 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 focus:outline-none"
                        aria-label={isOpen ? "Close Menu" : "Open Menu"}
                    >
                        {isOpen ? <RiCloseFill className="text-2xl" /> : <RiMenu3Line className="text-2xl" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl mt-2 mx-2 p-4 transform transition-all duration-200">
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white flex items-center justify-center font-medium">
                                JP
                            </div>
                            <div>
                                <span className="text-gray-900 font-medium block">John Doe</span>
                                <span className="text-gray-500 text-sm">john.doe@example.com</span>
                            </div>
                        </div>
                        <a href="#dashboard" className="flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                            <RiDashboardLine className="text-lg" />
                            <span>Dashboard</span>
                        </a>
                        <a href="#transactions" className="flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                            <RiWalletLine className="text-lg" />
                            <span>Transactions</span>
                        </a>
                        <a href="#analytics" className="flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                            <RiPieChartLine className="text-lg" />
                            <span>Analytics</span>
                        </a>
                        <div className="border-t border-gray-100 pt-2">
                            <a href="#profile" className="flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                                <RiUserLine className="text-lg" />
                                <span>My Profile</span>
                            </a>
                            <a href="#settings" className="flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                                <RiSettings4Line className="text-lg" />
                                <span>Settings</span>
                            </a>
                            <a href="#logout" className="flex items-center space-x-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200">
                                <RiLogoutBoxLine className="text-lg" />
                                <span>Logout</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar