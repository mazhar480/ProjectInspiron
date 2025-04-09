import React from "react";
import { Motion } from "framer-motion";

const Loader: React.FC = () => (
  <div className="flex justify-center items-center h-full">
    <Motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1 }}
      className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full"
    />
  </div>
);

export default Loader;
