import React from "react";
import "../App.css"
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-700 to-fuchsia-500 text-white">
      <img
        src="https://www.arsela.co/wp-content/uploads/2020/09/arsela-techmologies.png"
        alt="Logo"
        className="object-contain h-16 w-full rounded-md object-left-top"
      />
     
      <div className="flex items-center justify-start p-4">
        <div className="flex flex-col">
          <p className="transform rotate-90 origin-bottom-left text-lg whitespace-nowrap">
            TECHNICAL TEST FOR FRONTEND DEVELOPER
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col ml-4">
            {" "}
            {/* Added a margin to separate the text */}
            <h1 className="text-4xl font-bold mb-4">All your services,</h1>
            <h1 className="text-4xl font-bold mb-16">No-code.</h1>
            <p className="mb-16">
              Build your business apps and automate your tasks without coding.
            </p>
            <Link to="/edit-pdf">
            <button className="bg-white text-purple-700 py-2 px-4 rounded-full text-sm font-normal w-48">
              Edit a PDF
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
