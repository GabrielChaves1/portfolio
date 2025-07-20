import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import type { ElementType } from "react";
import { useTranslation } from "react-i18next";
import siteConfig from "../../config/app.config";

interface SocialLink {
  href: string;
  labelKey: string;
  icon: ElementType;
}

export default function FooterSection() {
  const { t } = useTranslation();

  const socialLinks: SocialLink[] = [
    {
      href: "https://github.com/"+siteConfig.github,
      labelKey: "footer.socialLinks.github",
      icon: Github,
    },
    {
      href: "https://linkedin.com/in/"+siteConfig.linkedin,
      labelKey: "footer.socialLinks.linkedin",
      icon: Linkedin,
    },
    {
      href: `mailto:${siteConfig.email}`,
      labelKey: "footer.socialLinks.email",
      icon: Mail,
    },
  ];

  return (
    <footer className="bg-surface-950 border-t w-full border-surface-800 py-12 font-space">
      <div className="mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-surface-50">
              {t("footer.name")}
            </h2>
            <p className="text-surface-400">{t("footer.role")}</p>
          </div>

          <div className="flex space-x-4">
            {socialLinks.map(({ href, labelKey, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(labelKey)}
                className="border-2 border-surface-800 group hover:bg-surface-200 transition-all duration-200 p-2 rounded-full inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-surface-500 focus:ring-offset-1 focus:ring-offset-transparent"
              >
                <Icon className="size-6 group-hover:stroke-surface-950 pointer-events-none" />
              </a>
            ))}
          </div>

          <a
            href="#hero"
            className="border-2 border-surface-800 group hover:bg-surface-200 transition-all duration-200 p-2 px-4 rounded-full inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-surface-500 gap-1 hover:text-surface-950 cursor-pointer focus:ring-offset-1 focus:ring-offset-transparent"
            aria-label={t("footer.returnToTop.ariaLabel")}
          >
            <ArrowUp size={18} />
            {t("footer.returnToTop.text")}
          </a>
        </div>
      </div>
    </footer>
  );
}
