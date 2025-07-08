import { motion } from "framer-motion";
import { useState } from "react";


// Expert	96–100%	- Deep mastery, years of real-world experience
// Advanced	90–95%	- Strong practical knowledge, confident in production
// Proficient	75–89%	- Comfortable, built multiple projects, still improving
// Intermediate	60–74%	- Learning actively, built small projects
// Beginner	40–59%	- Just started, basic understanding
// Novice	0–39%	- Exploring or very minimal usage


const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("frontend");

  const skillCategories = {
    frontend: {
      title: "Frontend",
      skills: [
        { name: "HTML", level: 95, label: "Advanced" },
        { name: "CSS", level: 90, label: "Advanced" },
        { name: "Javascript", level: 95, label: "Advanced" },
        { name: "React", level: 95, label: "Advanced" },
        { name: "TypeScript", level: 80, label: "Proficient" },
        { name: "Next.js", level: 50, label: "Beginner" },
        { name: "Tailwind CSS", level: 90, label: "Advanced" },
        { name: "Redux", level: 50, label: "Beginner"}
      ],
    },
    backend: {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 90, label: "Advanced"},
        { name: "Express.js", level: 85, label: "Proficient"},
        { name: "PostgreSQL", level: 88, label: "Proficient"},
        { name: "MongoDB", level: 80, label: "Proficient"},
        { name: "Python/FastAPI", level: 60, label: "Intermediate"},
        { name: "Redis", level: 60, label: "Intermediate"},
      ],
    },
    tools: {
      title: "Tools & Others",
      skills: [
        { name: "Git", level: 90, label: "Advanced" },
        { name: "Github", level: 90, label: "Advanced" },
        { name: "Docker", level: 80, label: "Proficient" },
        { name: "Postman", level: 100, label: "Expert"}
      ],
    },
  };

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-full p-2 border border-gray-700/50">
            {Object.entries(skillCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === key
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeCategory}
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {skillCategories[
            activeCategory as keyof typeof skillCategories
          ].skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-white">{skill.name}</h3>
                <span className="text-blue-400 font-medium">
                  {hoveredSkill === skill.name
                    ? skill.label
                    : `${skill.level}%`}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{
                    duration: 1,
                    delay: index * 0.1 + 0.5,
                    ease: "easeOut",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-gray-700/30">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Always Learning
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Technology evolves rapidly, and I'm committed to staying at the
              forefront. Currently exploring Next.js, AI/ML integration, Web3
              technologies, and advanced performance optimization techniques.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
