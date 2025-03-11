const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Announcements</h1>
            <span className="text-xs text-gray-400">View All</span>
        </div>
        <div className="flex flex-col gap-4 mt-4">
            <div className="bg-[rgba(133,125,227,0.3)] rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium">New Feature Release: Dark Mode</h2>
                    <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1 whitespace-nowrap">2025-01-01</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">We've added dark mode to enhance your browsing experience. Try it now in settings!</p>
            </div>
            <div className="bg-[rgba(250,210,44,0.3)] rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium">Bug Fixes & Performance Updates</h2>
                    <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1 whitespace-nowrap">2025-01-01</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">We've fixed minor bugs and improved performance for a smoother experience.</p>
            </div>
            <div className="bg-[rgba(133,125,227,0.3)] rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium">Welcome to Our New Members!</h2>
                    <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1 whitespace-nowrap">2025-01-01</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">We are excited to welcome new users to our platform. Stay tuned for upcoming features!</p>
            </div>
        </div>
    </div>
  )
}

export default Announcements