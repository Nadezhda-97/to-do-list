'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

type Language = {
  code: string;
  label: string;
}

const languages: Language[] = [
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
];

const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='language-switcher' ref={ref}>
      <button className="language-button" onClick={() => setIsOpen(prev => !prev)}>
        🌍
      </button>
      {isOpen && (
        <ul className='language-menu'>
          {languages.map(({ code, label}) => (
            <li key={code}>
              <button
                onClick={() => handleLanguageChange(code)}
                disabled={i18n.language === code}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;