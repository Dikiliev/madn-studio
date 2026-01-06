# MADN Studio

Современный веб-сайт студии цифрового креатива с улучшенной архитектурой и организацией кода.

## 🏗️ Структура проекта

```
madn-studio/
├── src/                          # Исходный код приложения
│   ├── app/                      # Точка входа приложения
│   │   ├── App.tsx              # Главный компонент приложения
│   │   └── main.tsx             # Точка входа React
│   │
│   ├── pages/                    # Страницы приложения
│   │   ├── TeamPage.tsx         # Страница команды
│   │   ├── WorkPage.tsx         # Портфолио работ
│   │   ├── ProjectDetailsPage.tsx
│   │   ├── CareersPage.tsx      # Вакансии
│   │   ├── ContactPage.tsx      # Контакты
│   │   └── LegalPage.tsx        # Юридические страницы
│   │
│   ├── components/               # Компоненты
│   │   ├── layout/              # Компоненты макета
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   └── ui/                  # UI компоненты
│   │       ├── Button.tsx
│   │       ├── ChatWidget.tsx
│   │       ├── DecryptedText.tsx
│   │       └── SpidermanBackground.tsx
│   │
│   ├── config/                   # Конфигурация и константы
│   │   ├── index.ts             # Экспорт всех конфигов
│   │   ├── navigation.ts        # Навигация
│   │   ├── projects.ts          # Данные проектов
│   │   ├── services.ts          # Услуги
│   │   └── team.ts              # Данные команды
│   │
│   ├── types/                    # TypeScript типы
│   │   └── index.ts
│   │
│   ├── services/                 # Внешние сервисы
│   │   └── gemini.ts            # AI чат-бот
│   │
│   └── assets/                   # Статические ресурсы
│
├── index.html                    # HTML шаблон
├── vite.config.ts               # Конфигурация Vite
├── tsconfig.json                # Конфигурация TypeScript
└── package.json                 # Зависимости

```

## 🎯 Алиасы путей

Проект использует алиасы для упрощения импортов:

- `@/*` → `src/*`
- `@app/*` → `src/app/*`
- `@pages/*` → `src/pages/*`
- `@components/*` → `src/components/*`
- `@ui/*` → `src/components/ui/*`
- `@layout/*` → `src/components/layout/*`
- `@config/*` → `src/config/*`
- `@types/*` → `src/types/*`
- `@services/*` → `src/services/*`
- `@assets/*` → `src/assets/*`

### Примеры использования:

```typescript
// ❌ Старый способ
import Button from './components/Button';
import { PROJECTS } from '../constants';

// ✅ Новый способ
import Button from '@ui/Button';
import { PROJECTS } from '@config';
```

## 🚀 Команды

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр продакшн сборки
npm run preview
```

## 🛠️ Технологии

- **React 19** - UI библиотека
- **TypeScript** - Типизация
- **Vite** - Сборщик и dev сервер
- **Tailwind CSS** - Стилизация (via CDN)
- **Lucide React** - Иконки
- **Google Gemini AI** - AI чат-бот

## 📝 Особенности

- 🎨 Темная/светлая тема
- 🤖 AI ассистент на базе Gemini
- 🕷️ Интерактивный фоновый персонаж
- ⚡ Плавные анимации и эффекты
- 📱 Полностью адаптивный дизайн
- 🎯 Современная архитектура кода

## 🔧 Конфигурация

### Vite (vite.config.ts)

- Настроены алиасы путей
- Сервер на порту 3000
- Переменные окружения для Gemini API

### TypeScript (tsconfig.json)

- ES2022 таргет
- Строгая типизация
- Алиасы путей синхронизированы с Vite

## 🌟 Структура данных

Все данные (проекты, команда, услуги) вынесены в `src/config/` для удобства обновления.

### Обновление данных:

- **Проекты**: `src/config/projects.ts`
- **Команда**: `src/config/team.ts`
- **Услуги**: `src/config/services.ts`
- **Навигация**: `src/config/navigation.ts`

## 📄 Лицензия

© 2026 MadN Studio. All rights reserved.
