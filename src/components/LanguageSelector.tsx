import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface LanguageSelectorProps {
  className?: string;
}

const languages: Language[] = [
  {
    code: "pt-BR",
    name: "Portuguese",
    nativeName: "Português",
    flag: "https://flagcdn.com/br.svg"
  },
  {
    code: "en-US", 
    name: "English",
    nativeName: "English",
    flag: "https://flagcdn.com/us.svg"
  },
  {
    code: "es-ES",
    name: "Spanish",
    nativeName: "Español", 
    flag: "https://flagcdn.com/es.svg"
  },
  {
    code: "fr-FR",
    name: "French",
    nativeName: "Français",
    flag: "https://flagcdn.com/fr.svg"
  },
  {
    code: "de-DE",
    name: "German",
    nativeName: "Deutsch",
    flag: "https://flagcdn.com/de.svg"
  },
  {
    code: "it-IT",
    name: "Italian",
    nativeName: "Italiano",
    flag: "https://flagcdn.com/it.svg"
  },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className = ""
}) => {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getCurrentLanguage = () => {
    let current = languages.find(lang => lang.code === i18n.language);
    
    if (!current) {
      const baseCode = i18n.language.split('-')[0];
      current = languages.find(lang => lang.code.startsWith(baseCode));
    }
    
    return current || languages[0];
  };

  const currentLanguage = getCurrentLanguage();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isDropdownOpen]);

  const handleLanguageSelect = async (language: Language) => {
    try {
      setIsChanging(true);
      
      await i18n.changeLanguage(language.code);
      
      setIsDropdownOpen(false);
      
      window.dispatchEvent(new Event('languageChanged'));
      
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setIsChanging(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button 
          onClick={toggleDropdown}
          disabled={isChanging}
          className="border-2 border-surface-800 hover:bg-surface-800 cursor-pointer h-9 rounded-full p-1 flex items-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-surface-500 focus:ring-offset-1 focus:ring-offset-transparent group disabled:opacity-50"
          aria-label={`Current language: ${currentLanguage.nativeName}. Click to change language`}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          title={`Current language: ${currentLanguage.nativeName}`}
        >
          <img 
            src={currentLanguage.flag} 
            alt={`${currentLanguage.nativeName} flag`}
            className="size-7 object-cover rounded-full"
            loading="lazy"
          />
          <ChevronDown 
            size={20} 
            className={`stroke-surface-200 transition-transform duration-200 group-hover:stroke-surface-100 ${
              isDropdownOpen ? 'rotate-180' : ''
            } ${isChanging ? 'animate-spin' : ''}`}
          />
        </button>

        {isDropdownOpen && (
          <>
            <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsDropdownOpen(false)} />
            
            <div className="absolute top-full mt-2 right-0 bg-surface-900/95 backdrop-blur-md border border-surface-700 rounded-lg shadow-xl z-50 min-w-[200px] py-2  overflow-y-auto">
              <div className="px-3 py-2 text-xs text-surface-400 uppercase tracking-wider font-medium border-b border-surface-800 mb-1">
                Select Language
              </div>
              
              {languages.map((language) => {
                const isSelected = currentLanguage.code === language.code;
                
                return (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language)}
                    disabled={isSelected || isChanging}
                    className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors duration-150 focus:outline-none focus:bg-surface-700 disabled:cursor-default ${
                      isSelected
                        ? 'bg-surface-800 text-surface-100' 
                        : 'text-surface-300 hover:bg-surface-800 hover:text-surface-100'
                    }`}
                    role="menuitem"
                    aria-label={`Select ${language.nativeName}`}
                  >
                    <img
                      src={language.flag}
                      alt={`${language.nativeName} flag`}
                      className="size-6 object-cover rounded-sm flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {language.nativeName}
                      </div>
                      <div className="text-xs text-surface-500 truncate">
                        {language.name}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LanguageSelector;