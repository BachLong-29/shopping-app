import { motion } from "framer-motion";

export default function LoadingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const circleVariants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -20, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <motion.div
        className="flex space-x-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="w-6 h-6 bg-white rounded-full"
            variants={circleVariants}
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </motion.div>
    </div>
  );
}
