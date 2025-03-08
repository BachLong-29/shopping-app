"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const HeartButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }} // Hiệu ứng co lại khi click
      animate={{
        scale: liked ? 1.1 : 1,
        transition: { type: "spring", stiffness: 300 },
      }}
      className="p-1 rounded-full transition-all duration-300"
      onClick={() => setLiked(!liked)}
    >
      <Heart
        className="w-5 h-5 transition-all duration-300" // Giảm kích thước icon
        fill={liked ? "#ff4081" : "transparent"}
        color={liked ? "#ff4081" : "gray"}
        strokeWidth={liked ? 0 : 2}
      />
    </motion.button>
  );
};

export default HeartButton;
