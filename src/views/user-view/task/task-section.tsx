import React from "react";
import TaskBoard from "./drageable";

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Task Management</h1>
      <TaskBoard />
    </div>
  );
};

export default App;
