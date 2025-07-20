import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

interface Skill {
  id: number;
  nameKey: string;
  image: string;
  alt: string;
}

interface SkillCategory {
  id: number;
  titleKey: string;
  skills: Skill[];
}

export default function SkillSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.2,
    margin: "0%",
  });

  const skillCategories: SkillCategory[] = [
    {
      id: 1,
      titleKey: "skills.categories.frontEnd",
      skills: [
        { id: 1, nameKey: "React.js", image: "/react.png", alt: "React logo" },
        { id: 2, nameKey: "Next.js", image: "/next.png", alt: "Next.js logo" },
        { id: 3, nameKey: "Vue.js", image: "/vue.png", alt: "Vue.js logo" },
        { id: 4, nameKey: "Tailwindcss", image: "/tailwind.png", alt: "Tailwind CSS logo" },
      ],
    },
    {
      id: 2,
      titleKey: "skills.categories.backEnd",
      skills: [
        { id: 1, nameKey: "Golang", image: "/golang.png", alt: "Golang logo" },
        { id: 2, nameKey: "Node.js", image: "/nodejs.png", alt: "Node.js logo" },
        { id: 2, nameKey: "PostgreSQL", image: "/postgres.png", alt: "PostgreSQL logo" },
      ],
    },
    {
      id: 3,
      titleKey: "skills.categories.devOps",
      skills: [
        { id: 1, nameKey: "Docker", image: "/docker.png", alt: "Docker logo" },
        { id: 2, nameKey: "AWS", image: "/aws.png", alt: "AWS Logo" },
        { id: 2, nameKey: "Terraform", image: "/terraform.png", alt: "Terraform Logo" },
        { id: 2, nameKey: "Kubernetes", image: "/kubernetes.png", alt: "Kubernetes Logo" },
      ],
    },
    {
      id: 4,
      titleKey: "skills.categories.tools",
      skills: [
        { id: 1, nameKey: "Git", image: "/git.png", alt: "Git logo"},
      ]
    }
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="min-h-screen py-12 sm:py-16 md:py-20 relative w-full flex items-center justify-center"
      aria-labelledby="skills-heading"
    >
      <main className="font-space w-full max-w-7xl flex flex-col">
        <header className="flex flex-col" role="banner">
          <motion.span
            className="text-surface-400 w-max text-xs sm:text-sm font-medium p-2 px-3 border border-surface-800 rounded-full tracking-wider"
            aria-label={t('skills.sectionIndicator')}
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {t('skills.badge')}
          </motion.span>

          <motion.hgroup
            className="mt-5"
            initial={{ opacity: 0, y: 50, rotateX: 15 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, rotateX: 0 }
                : { opacity: 0, y: 50, rotateX: 15 }
            }
            transition={{
              duration: 0.3,
              delay: isInView ? 0.3 : 0,
              ease: "easeOut",
            }}
          >
            <h2 id="skills-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-surface-400">
              {t('skills.title.technical')}
              <br />
              <motion.strong
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-surface-50 font-bold"
                style={{
                  textShadow: "0 0 2rem rgba(255,255,255,.2)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.3, delay: isInView ? 0.6 : 0 }}
              >
                {t('skills.title.skills')}
              </motion.strong>
            </h2>
          </motion.hgroup>
        </header>

        <motion.div
          className="flex flex-col gap-6 sm:gap-8 mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.4, delay: isInView ? 0.4 : 0 }}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.article
              key={category.id}
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.4,
                delay: isInView ? 0.6 + categoryIndex * 0.2 : 0,
              }}
            >
              <header className="flex items-center gap-2 mb-3 sm:mb-4">
                <motion.h3
                  className="text-sm sm:text-md text-surface-200 font-medium whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: isInView ? 0.7 + categoryIndex * 0.2 : 0,
                  }}
                >
                  {t(category.titleKey)}
                </motion.h3>

                <motion.hr
                  className="flex-1 h-1 bg-surface-800 rounded-full border-none min-w-0"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: isInView ? 0.8 + categoryIndex * 0.2 : 0,
                  }}
                  style={{ transformOrigin: "left" }}
                />

                <motion.span
                  className="text-sm sm:text-md text-surface-200 font-medium whitespace-nowrap"
                  initial={{ opacity: 0, x: 20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                  }
                  transition={{
                    duration: 0.3,
                    delay: isInView ? 1.2 + categoryIndex * 0.2 : 0,
                  }}
                  aria-label={t('skills.skillsCount', { 
                    count: category.skills.length, 
                    category: t(category.titleKey) 
                  })}
                >
                  {t('skills.skillsCount', { count: category.skills.length })}
                </motion.span>
              </header>

              <ul
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
                role="list"
                aria-label={t('skills.categoryList', { category: t(category.titleKey) })}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill.id}
                    className="border-2 border-surface-800 w-full aspect-square flex flex-col gap-1 sm:gap-2 items-center justify-center rounded-2xl bg-surface-900/30 backdrop-blur-xs hover:border-surface-600 hover:bg-surface-800/50 transition-all duration-300 group min-h-[69px] sm:min-h-[68px]"
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            y: 0,
                          }
                        : {
                            opacity: 0,
                            y: 20,
                          }
                    }
                    transition={{
                      duration: 0.3,
                      delay: isInView ? 1.0 + categoryIndex * 0.2 + skillIndex * 0.1 : 0,
                    }}
                  >
                    <img
                      src={skill.image}
                      alt={skill.alt}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain duration-200 dark:filter-none light:brightness-0 light:contrast-100"
                    />
                    <p className="text-surface-300 text-xs sm:text-sm font-medium group-hover:text-surface-50 transition-colors duration-200 text-center px-1">
                      {t(skill.nameKey)}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </main>
    </section>
  );
}