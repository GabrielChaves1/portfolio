import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "../../hooks/useNavigation";

interface Experience {
  id: number;
  titleKey: string;
  companyKey: string;
  periodKey: string;
  type: "work" | "education" | "award";
}

export default function AboutSection() {
  const { t } = useTranslation();
  const { navigateToSection } = useNavigation();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.3,
    margin: "-10%",
  });

  const experiences: Experience[] = [
    {
      id: 1,
      titleKey: "about.experience.items.frontendDev.title",
      companyKey: "about.experience.items.frontendDev.company",
      periodKey: "about.experience.items.frontendDev.period",
      type: "work",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen py-12 sm:py-16 lg:py-20 relative w-full flex items-center"
      aria-labelledby="about-heading"
    >
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-12">
        <main className="font-space flex flex-col flex-1 max-w-4xl">
          <header className="flex space-x-2 items-center" role="banner">
            <motion.span
              className="text-surface-400 text-xs sm:text-sm font-medium p-2 px-3 border border-surface-800 rounded-full tracking-wider"
              aria-label={t("about.sectionIndicator")}
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {t("about.badge")}
            </motion.span>
          </header>

          <motion.hgroup
            className="mt-4 sm:mt-5"
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
            <h2 id="about-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-surface-400 leading-tight">
              {t("about.title.behind")}
              <br />
              <motion.strong
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-surface-50 font-bold block"
                style={{
                  textShadow: "0 0 2rem rgba(255,255,255,.2)",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.3, delay: isInView ? 0.6 : 0 }}
              >
                {t("about.title.code")}
              </motion.strong>
            </h2>
          </motion.hgroup>

          <article className="w-full max-w-2xl mt-6 sm:mt-8">
            <motion.div
              className="flex flex-col space-y-4 sm:space-y-5 text-surface-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.3, delay: isInView ? 0.4 : 0 }}
            >
              <motion.p
                className="text-base sm:text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 20, filter: "blur(4px)" }
                }
                transition={{ duration: 0.3, delay: isInView ? 0.6 : 0 }}
              >
                {t("about.description.intro")}
              </motion.p>

              <motion.p
                className="text-base sm:text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 20, filter: "blur(4px)" }
                }
                transition={{ duration: 0.3, delay: isInView ? 0.8 : 0 }}
                dangerouslySetInnerHTML={{
                  __html: t("about.description.technologies"),
                }}
              />

              <motion.p
                className="text-base sm:text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 20, filter: "blur(4px)" }
                }
                transition={{ duration: 0.3, delay: isInView ? 1.0 : 0 }}
              >
                {t("about.description.values")}
              </motion.p>
            </motion.div>
          </article>

          <motion.aside
            className="mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.3,
              delay: isInView ? 1.2 : 0,
              ease: "backOut",
            }}
          >
            <button
              onClick={() => navigateToSection('contact')}
              className="border-2 border-surface-800 group hover:bg-surface-200 transition-all duration-200 p-2 px-4 sm:p-3 sm:px-6 rounded-full inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-surface-500 space-x-1.5 focus:ring-offset-1 hover:text-surface-950 focus:ring-offset-transparent text-sm sm:text-base"
              aria-label={t("about.cta.ariaLabel")}
            >
              <span>{t("about.cta.text")}</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </motion.aside>
        </main>

        <aside
          className="flex flex-col font-space lg:min-w-[280px] lg:max-w-[320px]"
          aria-labelledby="experience-list"
        >
          <motion.h3
            id="experience-list"
            initial={{ opacity: 0, filter: "blur(4px)", x: 15 }}
            animate={
              isInView
                ? { opacity: 1, filter: "blur(0px)", x: 0 }
                : { opacity: 0, filter: "blur(4px)", x: 15 }
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-surface-600 text-2xl sm:text-3xl font-bold mb-3 sm:mb-4"
          >
            {t("about.experience.title")}
          </motion.h3>

          <ul className="space-y-3 sm:space-y-4" role="list">
            {experiences.map((experience, i) => (
              <motion.li
                key={experience.id}
                className="flex flex-col p-4 sm:p-5 bg-surface-900/20 border border-surface-800/50 rounded-lg backdrop-blur-sm hover:bg-surface-800/30 transition-all duration-300"
                initial={{ opacity: 0, filter: "blur(4px)", x: 15 }}
                animate={
                  isInView
                    ? { opacity: 1, filter: "blur(0px)", x: 0 }
                    : { opacity: 0, filter: "blur(4px)", x: 15 }
                }
                transition={{
                  duration: 0.3,
                  delay: isInView ? 0.3 + i * 0.1 : 0,
                  ease: "easeOut",
                }}
              >
                <h4 className="text-surface-100 font-medium text-base sm:text-lg mb-1">
                  {t(experience.titleKey)}
                </h4>
                <p className="text-surface-300 font-medium text-sm sm:text-base mb-2">
                  {t(experience.companyKey)}
                </p>
                <time
                  className="text-surface-600 text-xs sm:text-sm"
                  dateTime={t(experience.periodKey)}
                >
                  {t(experience.periodKey)}
                </time>
              </motion.li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}