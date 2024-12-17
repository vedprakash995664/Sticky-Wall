
import { useState, useEffect } from "react";
import DashboardHome from "./DashboardHome";
import StickyWalls from "./StickyWalls";

const Dashboard = () => {
    const [tab, setTab] = useState("home");
    const [stickyWalls, setStickyWalls] = useState([]);
    const [newSticky, setNewSticky] = useState({ title: "", content: "", css: "" });

    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility

    // Load sticky walls from localStorage on component mount
    useEffect(() => {
        const savedWalls = JSON.parse(localStorage.getItem("stickyWalls")) || [];
        setStickyWalls(savedWalls);
    }, []);

    // Update localStorage whenever stickyWalls state changes
    useEffect(() => {
        localStorage.setItem("stickyWalls", JSON.stringify(stickyWalls));
    }, [stickyWalls]);

    const handleTabClick = (currentTab) => {
        setTab(currentTab);
    };

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div className="w-full flex flex-col md:flex-row">
            {/* Sidebar */}
            <div
                className={`${
                    isSidebarOpen ? "w-1/5" : "w-0"
                } md:w-1/5 bg-gray-100 p-3 flex flex-col justify-between h-screen transition-width duration-300 overflow-hidden`}
            >
                <div className="w-full py-3 px-4 flex flex-col gap-4 rounded-md shadow-md">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h1
                            className={`font-black cursor-pointer text-lg ${
                                isSidebarOpen ? "text-gray-800" : "text-transparent"
                            }`}
                            onClick={() => handleTabClick("home")}
                        >
                            Home
                        </h1>
                        <i
                            className="ri-menu-line text-xl font-black cursor-pointer"
                            onClick={toggleSidebar}
                        ></i>
                    </div>

                    {/* Search */}
                    {isSidebarOpen && (
                        <div className="flex items-center gap-3 border rounded py-2 px-3 bg-white">
                            <i className="ri-search-line text-gray-400 text-lg"></i>
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-transparent w-full outline-none text-sm font-medium"
                            />
                        </div>
                    )}

                    {/* TASKS */}
                    {isSidebarOpen && (
                        <div>
                            <p className="text-xs font-semibold mb-1 text-gray-600">TASKS</p>
                            {[
                                { label: "Upcoming", icon: "ri-arrow-right-double-fill", tab: "upcoming" },
                                { label: "Today", icon: "ri-list-check-3", tab: "today" },
                                { label: "Calendar", icon: "ri-calendar-2-line", tab: "calendar" },
                                { label: "Sticky Wall", icon: "ri-sticky-note-fill", tab: "stickywall" },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="text-gray-600 flex items-center justify-between cursor-pointer hover:bg-gray-200 px-2 py-1 rounded"
                                    onClick={() => handleTabClick(item.tab)}
                                >
                                    <div className="flex items-center gap-2">
                                        <i className={`${item.icon} text-lg`}></i>
                                        <p>{item.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* LISTS */}
                    {isSidebarOpen && (
                        <div className="flex flex-col gap-2">
                            <p className="text-xs font-semibold text-gray-600">LISTS</p>
                            {[
                                { name: "Personal", color: "bg-pink-400", count: 3 },
                                { name: "Work", color: "bg-sky-400", count: 5 },
                                { name: "List1", color: "bg-yellow-500", count: 4 },
                            ].map((list, idx) => (
                                <div
                                    key={idx}
                                    className="text-gray-600 flex items-center justify-between cursor-pointer hover:bg-gray-200 px-2 py-1 rounded"
                                    onClick={() => handleTabClick(list.name.toLowerCase())}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className={`${list.color} h-4 w-4 rounded`}></div>
                                        <p>{list.name}</p>
                                    </div>
                                    <span className="px-2 py-1 rounded bg-gray-200 text-xs">{list.count}</span>
                                </div>
                            ))}
                            <div className="text-gray-600 flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-2 py-1 rounded">
                                <i className="text-lg ri-add-fill"></i>
                                <p>Add New List</p>
                            </div>
                        </div>
                    )}

                    {/* TAGS */}
                    {isSidebarOpen && (
                        <div className="flex flex-col gap-2">
                            <p className="text-xs font-semibold text-gray-600">TAGS</p>
                            <div className="flex gap-2 flex-wrap">
                                {["Tag 1", "Tag 2"].map((tag, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-sky-200 py-1 px-2 rounded text-xs cursor-pointer hover:bg-sky-300"
                                        onClick={() => handleTabClick(tag.toLowerCase())}
                                    >
                                        {tag}
                                    </div>
                                ))}
                                <div className="text-gray-600 bg-gray-200 flex px-2 text-xs rounded items-center gap-2 cursor-pointer hover:bg-gray-300">
                                    <i className="text-lg ri-add-fill"></i>
                                    <p>Add Tag</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Section */}
                {isSidebarOpen && (
                    <div className="flex flex-col gap-2 mt-4">
                        <div
                            className="text-gray-600 flex items-center gap-2 cursor-pointer hover:bg-gray-200 rounded px-4 py-2"
                            onClick={() => handleTabClick("settings")}
                        >
                            <i className="text-lg ri-settings-2-line"></i>
                            <p>Settings</p>
                        </div>
                        <div
                            className="text-gray-600 flex items-center gap-2 cursor-pointer hover:bg-gray-200 rounded px-4 py-2"
                            onClick={() => handleTabClick("logout")}
                        >
                            <i className="text-lg ri-logout-circle-line"></i>
                            <p>Logout</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="right w-full md:w-4/5 p-4 bg-white">
                <div className="main-content-area py-4 px-2">
                    {tab === "home" && <DashboardHome />}
                    {tab === "upcoming" && <h1 className="text-xl font-semibold">Upcoming Tasks</h1>}
                    {tab === "today" && <h1 className="text-xl font-semibold">Today's Tasks</h1>}
                    {tab === "calendar" && <h1 className="text-xl font-semibold">Calendar View</h1>}
                    {tab === "stickywall" && (
                        <div>
                            <h1 className="text-xl font-semibold mb-4">Sticky Wall</h1>
                            <div className="grid grid-cols-3 gap-5 p-5 border m-5">
                                {stickyWalls.map((wall, index) => (
                                    <StickyWalls
                                        key={index}
                                        title={wall.title}
                                        content={wall.content}
                                        css={wall.css}
                                    />
                                ))}
                                <div
                                    className="add-btn bg-gray-200 flex items-center justify-center p-5 rounded-lg shadow-lg h-64 w-64 cursor-pointer"
                                    onClick={() => handleTabClick("add-sticky")}
                                >
                                    <i className="ri-add-line text-gray-500 text-9xl"></i>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Add New Sticky Form */}
                    {tab === "add-sticky" && (
                        <div className="p-5 border rounded-lg shadow-md bg-gray-100">
                            <h2 className="text-lg font-semibold mb-4">Add New Sticky Wall</h2>
                            <div className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    value={newSticky.title}
                                    onChange={(e) => setNewSticky({ ...newSticky, title: e.target.value })}
                                    className="p-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name="content"
                                    placeholder="Content"
                                    value={newSticky.content}
                                    onChange={(e) => setNewSticky({ ...newSticky, content: e.target.value })}
                                    className="p-2 border rounded"
                                />
                                {/* <input
                                    type="text"
                                    name="css"
                                    placeholder="CSS Class (optional)"
                                    value={newSticky.css}
                                    onChange={(e) => setNewSticky({ ...newSticky, css: e.target.value })}
                                    className="p-2 border rounded"
                                /> */}
                                <button
                                    className="bg-blue-500 text-white py-2 rounded-md"
                                    onClick={() => {
                                        setStickyWalls([
                                            ...stickyWalls,
                                            { ...newSticky, id: Date.now() },
                                        ]);
                                        setNewSticky({ title: "", content: "", css: "" });
                                    }}
                                >
                                    Add Sticky
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
