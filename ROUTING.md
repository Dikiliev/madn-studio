# 🧭 Роутинг в MADN Studio

## Обзор

Проект использует **React Router DOM** для навигации между страницами. Все роуты настроены в `src/app/routes.tsx`.

## 📋 Структура роутов

### Основные страницы

| Путь | Компонент | Описание |
|------|-----------|----------|
| `/` | `HomePage` | Главная страница с hero секцией, услугами, кейсами и командой |
| `/team` | `TeamPage` | Страница команды |
| `/work` | `WorkPage` | Портфолио всех проектов с фильтрами |
| `/work/:projectId` | `ProjectDetailsPage` | Детальная страница проекта |
| `/careers` | `CareersPage` | Вакансии |
| `/contact` | `ContactPage` | Форма обратной связи |

### Юридические страницы

| Путь | Компонент | Описание |
|------|-----------|----------|
| `/privacy` | `LegalPage` (type: privacy) | Политика конфиденциальности |
| `/terms` | `LegalPage` (type: terms) | Условия использования |
| `/cookies` | `LegalPage` (type: cookies) | Cookie Policy |

## 🔧 Использование

### Навигация в компонентах

```typescript
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/work'); // Переход на страницу проектов
  };
  
  return <button onClick={handleClick}>Проекты</button>;
};
```

### Ссылки в JSX

```typescript
import { Link } from 'react-router-dom';

<Link to="/team">Команда</Link>
<Link to="/work/1">Проект #1</Link>
```

### Параметры роута

```typescript
import { useParams } from 'react-router-dom';

const ProjectDetailsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  // Используем projectId для загрузки данных проекта
};
```

### Определение текущего роута

```typescript
import { useLocation } from 'react-router-dom';

const MyComponent = () => {
  const location = useLocation();
  
  if (location.pathname === '/work') {
    // Логика для страницы проектов
  }
};
```

## 🎯 Особенности

### Якорные ссылки на главной странице

Для секций на главной странице используется специальная логика:

```typescript
// В Header/Footer
const handleNavClick = (sectionId: string) => {
  if (location.pathname !== '/') {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  } else {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
};
```

### Динамические роуты для проектов

Проекты доступны по пути `/work/:projectId`:

```typescript
// Переход к проекту
navigate(`/work/${project.id}`);

// В ProjectDetailsPage
const { projectId } = useParams();
const project = PROJECTS.find(p => p.id === projectId);
```

## 📁 Файлы роутинга

- `src/app/routes.tsx` - Определение всех роутов
- `src/app/App.tsx` - BrowserRouter и обертка приложения
- `src/pages/HomePage.tsx` - Главная страница

## 🔄 Миграция со старой системы

### Было (state-based):

```typescript
const [activePage, setActivePage] = useState('home');
const navigateTo = (page: string) => {
  setActivePage(page);
};
```

### Стало (router-based):

```typescript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/team'); // Вместо navigateTo('team')
```

## ✅ Преимущества

1. **URL в адресной строке** - можно делиться ссылками на конкретные страницы
2. **История браузера** - работают кнопки "Назад" и "Вперед"
3. **SEO** - поисковые системы могут индексировать отдельные страницы
4. **Закладки** - пользователи могут сохранять конкретные страницы
5. **Прямые ссылки** - можно открыть любую страницу напрямую

## 🚀 Добавление нового роута

1. Создайте компонент страницы в `src/pages/`
2. Добавьте роут в `src/app/routes.tsx`:

```typescript
import { NewPage } from '@pages';

<Route path="/new-page" element={<NewPage />} />
```

3. Используйте навигацию:

```typescript
navigate('/new-page');
// или
<Link to="/new-page">Новая страница</Link>
```

---

**Дата обновления:** 6 января 2026  
**Версия:** 1.0.0


