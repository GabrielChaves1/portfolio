import { File, Github, Linkedin, Menu, X } from "lucide-react";
import type { ElementType } from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import siteConfig from "../config/app.config";

interface SocialLink {
  href: string;
  labelKey?: string;
  icon: ElementType;
}

interface NavigationItem {
  href: string;
  labelKey: string;
}

export default function Header() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const socialLinks: SocialLink[] = [
    {
      href: "#",
      labelKey: "header.resume",
      icon: File,
    },
    {
      href: "https://github.com/"+siteConfig.github,
      icon: Github,
    },
    {
      href: "https://linkedin.com/in/"+siteConfig.linkedin,
      icon: Linkedin,
    },
  ];

  const navigationItems: NavigationItem[] = [
    {
      href: "#about",
      labelKey: "navigation.aboutMe",
    },
    {
      href: "#skills",
      labelKey: "navigation.skills",
    },
    {
      href: "#contact",
      labelKey: "navigation.contact",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-2 left-0 right-0 z-[60] px-2 sm:px-4">
        <div className="container mx-auto flex items-center border-2 border-surface-800 backdrop-blur-md justify-between text-gray-300 py-2 px-2 sm:px-4 rounded-full">
          
          <nav
            aria-label={t("navigation.mainNavigation")}
            className="ml-2 sm:ml-4 hidden lg:block"
          >
            <ul className="flex items-center gap-3 xl:gap-4 font-space">
              {navigationItems.map(({ href, labelKey }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-surface-100 hover:text-surface-500 transition-colors duration-200 focus:outline-none focus:text-surface-50 text-sm xl:text-base"
                  >
                    {t(labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden border-2 border-surface-800 group hover:bg-surface-200 transition-all duration-200 p-2 rounded-full inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-surface-500"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="stroke-surface-500 group-hover:stroke-surface-900 transition-colors duration-200 size-4 sm:size-5" />
            ) : (
              <Menu className="stroke-surface-500 group-hover:stroke-surface-900 transition-colors duration-200 size-4 sm:size-5" />
            )}
          </button>

          <div className="flex items-center gap-1 sm:gap-2">
            <nav aria-label={t("navigation.socialLinks")} className="hidden sm:block">
              <ul className="flex items-center gap-1 sm:gap-2" role="list">
                {socialLinks.map(({ href, labelKey, icon: Icon }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={labelKey ? t(labelKey) : undefined}
                      className="border-2 border-surface-800 group hover:bg-surface-200 transition-all duration-200 p-1.5 sm:p-2 rounded-full inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-surface-500 focus:ring-offset-1 focus:ring-offset-transparent"
                    >
                      <Icon
                        className="stroke-surface-500 group-hover:stroke-surface-900 transition-colors duration-200 size-4 sm:size-5"
                        aria-hidden="true"
                      />
                      {labelKey && (
                        <p className="hidden xl:block text-sm group-hover:text-surface-900 transition-colors font-space text-surface-400 font-medium ml-1.5">
                          {t(labelKey)}
                        </p>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <LanguageSelector className="scale-90 sm:scale-100" />
              <ThemeToggle className="scale-90 sm:scale-100" />
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-3 z-[55] lg:hidden">
          <div 
            className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          
          <div className="absolute top-16 left-2 right-2 bg-surface-900/95 backdrop-blur-md border border-surface-700 rounded-2xl p-4 shadow-xl">
            <nav className="mb-4">
              <ul className="space-y-3">
                {navigationItems.map(({ href, labelKey }) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={closeMobileMenu}
                      className="block text-surface-100 hover:text-surface-50 transition-colors duration-200 focus:outline-none focus:text-surface-50 text-lg font-medium py-2 px-3 rounded-lg hover:bg-surface-800/50"
                    >
                      {t(labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-surface-700 pt-4">
              <nav>
                <ul className="flex justify-center gap-4" role="list">
                  {socialLinks.map(({ href, labelKey, icon: Icon }) => (
                    <li key={href}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={labelKey ? t(labelKey) : undefined}
                        className="border-2 border-surface-800 group hover:bg-surface-200 transition-all duration-200 p-3 rounded-full inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-surface-500"
                      >
                        <Icon
                          className="stroke-surface-500 group-hover:stroke-surface-900 transition-colors duration-200 size-5"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}