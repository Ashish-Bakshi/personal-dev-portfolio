import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      title: "Insightly",
      description:
        "Insightly is a modern blog platform built for sharing diverse content — from articles and tutorials to personal insights. It features a clean, responsive UI with category-based filtering, markdown support, and a seamless reading experience. Currently in active development",
      image: "/insightly.png",
      technologies: [
        "React.js",
        "Typescript",
        "Express.js",
        "PostgreSQL",
        "Prisma",
        "Redux",
      ],
      github: "https://github.com/Ashish-Bakshi/Insightly",
      live: "#",
      featured: true,
    },
    {
      title: "CRM Website",
      description:
        "A collaborative Employee Management System developed for an organization to streamline employee tracking and administrative management. It features real-time updates with work time logs, role-based access control, significantly improving internal operational efficiency and workforce organization.",
      image: "/crm-website.png",
      technologies: ["React.js", "Express.js", "MongoDB", "Typescript"],  
      github: "https://github.com/Ashish-Bakshi/project0",
      live: "https://crm-sgk-fe.onrender.com/#/login",
      featured: true,
    },
  ];

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Featured Projects */}
        <div className="mb-20">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`grid lg:grid-cols-2 gap-12 items-center mb-20 ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover"
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      
                    </div> */}
                  </div>
                </motion.div>
              </div>

              <div
                className={
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                }
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur-xl" />
                  <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <a href={project.live} target="_blank">
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </Button>
                      </a>
                      <a href={project.github} target="_blank">
                        <Button
                          variant="outline"
                          className="border-gray-400 text-gray-300 hover:bg-gray-700"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Source Code
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-white">
            {/* Other Projects */}
          </h3>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30 group hover:border-blue-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="p-6">
                  <h4 className="font-bold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <a
                      href={project.live}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href={project.github}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
