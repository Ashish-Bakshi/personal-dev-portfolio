
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <motion.div
        className="text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="relative mb-8"
          variants={itemVariants}
        >
          <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 shadow-2xl">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
              <span className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AB
              </span>
            </div>
          </div>
          <motion.div
            className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight"
          variants={itemVariants}
        >
          Ashish Bakshi
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl text-blue-300 mb-4 font-light"
          variants={itemVariants}
        >
          Full Stack Developer
        </motion.h2>

        <motion.p
          className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Crafting exceptional digital experiences with modern technologies. 
          Passionate about clean code, innovative solutions, and bringing ideas to life.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          variants={itemVariants}
        > 
        <a href="/AshishResume.pdf" download>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </a>
        </motion.div>

        <motion.div
          className="flex justify-center space-x-6"
          variants={itemVariants}
        >
          {[
            { icon: Github, href: "https://github.com/Ashish-Bakshi", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/ashishbakshi2004/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:ashishbakshi2004@gmail.com", label: "Email" }
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              className="w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600/50 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

    </div>
  );
};

export default Hero;
