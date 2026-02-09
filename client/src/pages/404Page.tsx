import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-400">You seem lost stranger.. Let's get you back home </h1>
            </div>
            <div>
                <Link to="/" className="ml-4 text-white p-2 px-4 font-semibold bg-rose-700 rounded 2xl hover:bg-rose-500 transition-colors text-lg ">
                    Go Home
                </Link>
            </div>


        </div>
    );
}
export default NotFoundPage;