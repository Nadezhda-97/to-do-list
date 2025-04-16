'use client'

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

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
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    Cookies.set('language', lng, { path: '/' }); // <-- сохраняем выбранный язык
    setIsOpen(false);

    // Заменяем locale в текущем пути
    const segments = pathname.split('/');
    segments[1] = lng; // заменяем старый locale на новый
    const newPath = segments.join('/');

    router.push(newPath); // редирект на новый путь
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