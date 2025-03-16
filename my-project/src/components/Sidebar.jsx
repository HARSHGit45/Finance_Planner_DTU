import { useState, useEffect } from 'react';
import { RiDashboardLine, RiWalletLine, RiPieChartLine, RiToolsLine, RiCustomerService2Line, RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    // Get the current path
    const getCurrentPath = () => {
        const path = location.pathname.slice(1); // Remove leading slash
        return path || 'dashboard'; // Default to dashboard if path is empty
    };

    const menuItems = [
        { id: 'dashboard', icon: RiDashboardLine, label: 'Dashboard', path: '/' },
        { id: 'transactions', icon: RiWalletLine, label: 'Transactions', path: '/transactions' },
        { id: 'insights', icon: RiPieChartLine, label: 'Insights', path: '/insights' },
        { id: 'tools', icon: RiToolsLine, label: 'Tools', path: '/tools' },
    ];

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            {/* Overlay for mobile */}
            {!isCollapsed && isMobile && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed left-0 top-0 h-screen bg-white shadow-lg z-40 transition-all duration-300 ease-in-out
                    ${isCollapsed ? 'w-[4.5rem]' : 'w-[16rem] lg:w-[20rem]'}
                    ${isMobile && isCollapsed ? '-translate-x-full' : 'translate-x-0'}`}
            >
                {/* Toggle Button */}
                <button 
                    onClick={toggleSidebar}
                    className={`absolute -right-3 top-8 bg-blue-600 text-white p-1 rounded-full shadow-lg 
                        hover:bg-blue-700 transition-colors duration-200
                        ${isMobile && isCollapsed ? 'translate-x-full' : ''}`}
                >
                    {isCollapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
                </button>

                {/* Logo Section */}
                <div className={`flex items-center gap-3 px-6 py-5 border-b border-gray-100
                    ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
                    <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-2 rounded-xl flex-shrink-0">
                        <RiWalletLine className="text-white text-2xl" />
                    </div>
                    <span className={`font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-400 text-transparent 
                        bg-clip-text whitespace-nowrap transition-all duration-300
                        ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                        FinancePro
                    </span>
                </div>

                {/* Navigation Items */}
                <nav className="px-3 py-6">
                    <div className="space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                onClick={() => {
                                    if (isMobile) setIsCollapsed(true);
                                }}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                                    ${isCollapsed ? 'justify-center' : 'justify-start'}
                                    ${getCurrentPath() === item.id 
                                        ? 'bg-blue-50 text-blue-600' 
                                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
                            >
                                <item.icon className={`text-xl flex-shrink-0 ${isCollapsed ? 'mx-auto' : ''}`} />
                                <span className={`whitespace-nowrap transition-all duration-300
                                    ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 inline'}`}>
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Chatbot Section */}
                <div className={`absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100`}>
                    <button 
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl 
                            bg-gradient-to-r from-blue-600 to-blue-400 text-white 
                            hover:shadow-lg transition-all duration-200
                            ${isCollapsed ? 'justify-center' : 'justify-start'}`}
                    >
                        <RiCustomerService2Line className="text-xl flex-shrink-0" />
                        <span className={`whitespace-nowrap font-medium transition-all duration-300
                            ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 inline'}`}>
                            Chat Assistant
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main Content Margin */}
            <div className={`transition-all duration-300
                ${isCollapsed ? 'ml-[4.5rem]' : 'ml-[16rem] lg:ml-[20rem]'}
                ${isMobile && isCollapsed ? 'ml-0' : ''}`}>
                {/* Your main content goes here */}
            </div>
        </>
    );
};

export default Sidebar;