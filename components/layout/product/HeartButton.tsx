"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useLanguage } from "@/core/context/LanguageContext";
import { useState } from "react";

const HeartButton = () => {
  const [liked, setLiked] = useState(false);
  const { t } = useLanguage();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }} // Hiệu ứng co lại khi click
      animate={{
        scale: liked ? 1.1 : 1,
        transition: { type: "spring", stiffness: 300 },
      }}
      className="p-1 rounded-full transition-all duration-300"
      onClick={() => {
        toast.success(t("product.message.update_wishlist"), {
          description: (
            <span className="text-gray-500 dark:text-white">
              {liked
                ? t("product.message.remove_from_wishlist")
                : t("product.message.add_to_wishlist")}
            </span>
          ),
          duration: 3000,
        });
        setLiked(!liked);
      }}
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
