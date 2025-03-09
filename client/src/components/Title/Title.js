import React from "react";
import { motion } from "framer-motion";

const LiveConnectTitle = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-[#0a0a0a] ">
      <motion.h1
        className="text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-teal-300 to-lime-400 
                   text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(0,255,150,0.8)] neon-text"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        ...Live<span className="text-lime-300">Connect</span> 💬
      </motion.h1>
    </div>
  );
};

export default LiveConnectTitle;
