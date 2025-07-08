import { motion } from "framer-motion";
import { Code, Palette, Zap, Users } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Code,
      title: "Clean Code",
      description:
        "Writing maintainable, scalable, and efficient code following best practices.",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Creating beautiful, intuitive interfaces that users love to interact with.",
    },
    {
      icon: Zap,
      title: "Performance",
      description:
        "Optimizing applications for speed, accessibility, and user experience.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Working effectively in teams and communicating complex ideas clearly.",
    },
  ];

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
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h3 className="text-2xl font-bold mb-4 text-blue-300">
                  My Journey
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  As a passionate <b>Full-Stack Developer</b>, I love building
                  modern, performant, and scalable web applications. Through
                  hands-on projects, I've gained experience with technologies
                  like <b>React</b>,<b> TypeScript</b>, <b> Node.js</b>,{" "}
                  <b> Prisma</b>, and <b> PostgreSQL</b>. Currently, I'm
                  deepening my skills in full-stack development and actively
                  exploring advanced frameworks like <b>Next.js</b> to build
                  production-ready apps. I'm also excited to expand into
                  <b> Mobile Application Development </b> using tools like{" "}
                  <b> React Native</b> and <b> Expo</b> to create cross-platform
                  experiences and exploring <b> Web3</b>. I'm committed to continuous learning, open-source
                  contribution, and clean, efficient code. When I'm not coding,
                  I'm mentoring peers, refining UI designs, or exploring the
                  latest in tech and development tools.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  I believe in continuous learning and staying up-to-date with
                  the latest technologies. When I'm not coding, I spend time
                  building personal projects, improving my skills, or exploring
                  new frameworks and tools.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <feature.icon className="w-8 h-8 text-blue-400 mb-3 group-hover:text-purple-400 transition-colors duration-300" />
                <h4 className="font-semibold mb-2 text-white">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-gray-700/30">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              I'm always excited to take on new challenges and collaborate on
              innovative projects. Whether you're a startup looking to build
              your first product or an established company seeking to modernize
              your tech stack, I'm here to help bring your vision to life.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
