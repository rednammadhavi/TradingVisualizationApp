import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
            <h1 className="text-9xl font-extrabold text-indigo-500 tracking-widest">
                404
            </h1>
            <div className="bg-indigo-500 px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>
            <p className="mt-5 text-gray-400 text-lg">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
                Go Back Home
            </Link>
        </div>
    );
}
