import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

function AnimatedSpan({ children, delay }: { 
  children: ReactNode 
  delay: number
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.3,
    margin: "-10%",
  });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(4px)", y: 15 }}
      transition={{ duration: 0.3, delay }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center"
    >
      <div>
        <motion.h1 
          className="
            text-3xl xs:text-4xl z-50 sm:text-5xl md:text-6xl lg:text-7xl
            leading-tight sm:leading-none 
            font-space text-surface-300
            sm:text-left
            sm:px-0
          "
        >
          <AnimatedSpan delay={0.1}>
            {t('hero.greeting')}{" "}
            <span className="liquid-text" data-text={t('hero.name')}>
              {t('hero.name')}
            </span>
            ,
          </AnimatedSpan>
          <br className="hidden sm:block" />
          <span className="block sm:hidden"> </span>
          
          <AnimatedSpan delay={0.3}>
            {t('hero.intro')}{" "}
            <span
              className="font-medium text-surface-50 break-words"
              data-text={t('hero.role')}
            >
              {t('hero.role')}
            </span>{" "}
            {t('hero.building')}
          </AnimatedSpan>
          <br className="hidden sm:block" />
          <span className="block sm:hidden"> </span>
          
          <AnimatedSpan delay={0.5}>
            <span 
              data-text={t('hero.description')}
              className="break-words"
            >
              {t('hero.description')}
            </span>
          </AnimatedSpan>
        </motion.h1>
       
      </div>
    </section>
  );
}