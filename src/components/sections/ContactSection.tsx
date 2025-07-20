import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import siteConfig from "../../config/app.config";

export default function ContactSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.3,
    margin: "-10%",
  });

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen py-12 sm:py-16 md:py-20 relative w-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
      aria-labelledby="work-together-heading"
    >
      <main className="font-space w-full max-w-7xl flex flex-col items-center text-center">
        <motion.span
          className="text-surface-400 w-max text-xs sm:text-sm font-medium p-2 px-3 border border-surface-800 rounded-full tracking-wider"
          aria-label={t("workTogether.sectionIndicator")}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {t("workTogether.badge")}
        </motion.span>

        <motion.hgroup
          className="mt-6 sm:mt-8"
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
          <h2
            id="work-together-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-surface-400"
          >
            {t("workTogether.title.ready") || "Pronto para"}
            <br />
            <motion.strong
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-surface-50 font-bold"
              style={{
                textShadow: "0 0 2rem rgba(255,255,255,.2)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: isInView ? 0.6 : 0 }}
            >
              {t("workTogether.title.collaborate")}
            </motion.strong>
          </h2>
        </motion.hgroup>

        <motion.p
          className="text-surface-300 text-base sm:text-lg md:text-xl max-w-2xl mt-6 sm:mt-8 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.4, delay: isInView ? 0.9 : 0 }}
        >
          {t("workTogether.description")}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.4, delay: isInView ? 1 : 0 }}
        >
          <motion.a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-surface-50 text-surface-900 text-sm sm:text-base font-semibold rounded-full hover:bg-surface-400 transition-all duration-300 shadow-lg hover:shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.3, delay: isInView ? 0.6 : 0 }}
          >
            {t("workTogether.buttons.email")}
          </motion.a>

          <motion.a
            href="#"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-surface-600 text-surface-200 text-sm sm:text-base font-semibold rounded-full hover:border-surface-400 hover:text-surface-50 hover:bg-surface-800/50 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.3, delay: isInView ? 0.4 : 0 }}
          >
            {t("workTogether.buttons.portfolio")}
          </motion.a>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: isInView ? 1.4 : 0 }}
        >
          <motion.div className="flex items-center gap-2">
            <motion.div
              className="w-3 h-3 bg-green-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-surface-400 text-sm sm:text-base">
              {t("workTogether.availability") ||
                "Disponível para novos projetos"}
            </span>
          </motion.div>

          <motion.hr
            className="w-16 sm:w-24 h-px bg-surface-800 border-none"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: isInView ? 2.1 : 0 }}
          />

          <span className="text-surface-500 text-sm sm:text-base">
            {t("workTogether.responseTime")}
          </span>
        </motion.div>
      </main>
    </section>
  );
}
