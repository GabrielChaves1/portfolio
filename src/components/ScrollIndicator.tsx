import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ScrollIndicator() {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsVisible(latest < 0.05);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      className={`fixed bottom-8 left-1/2 pointer-events-none transform -translate-x-1/2 z-40 transition-all duration-500`}
    >
      <div className="flex flex-col items-center gap-4 text-gray-400">
        <span className="font-space text-surface-200 text-sm font-medium">
          {t("ui.scrollToExplore")}
        </span>
        <div className="w-5 h-8 border-2 border-surface-300 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-surface-300 rounded-full mt-1 animate-bounce" />
        </div>
      </div>
    </motion.div>
  );
}
