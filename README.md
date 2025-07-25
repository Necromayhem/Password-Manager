# Менеджер паролей

SPA-приложение для управления паролями с возможностью хранения, редактирования и поиска учетных записей.

## Используемый стек

- **Фреймворк**: Vue.js 3 + Composition API
- **Язык**: TypeScript
- **Стейт-менеджер**: Pinia
- **UI-библиотека**: PrimeVue
- **Хранилище**: localStorage через VueUse
- **Утилиты**: VueUse, debounce-функции
- **Бандлер**: Vite

## Уровни реализации по модулям

### 1. Хранение данных
- Реализовано хранение в localStorage через обертку `useStorage` из VueUse
- Синхронизация состояния между компонентами через Pinia store
- Сохранение данных формы в sessionStorage для восстановления при перезагрузке

### 2. Компонентная архитектура
- **UI-компоненты**: Кастомные компоненты на базе PrimeVue (Form, DataTable, Dialog)
- **Контейнеры**: 
  - `Main.vue` - основной контейнер приложения
  - `PasswordFormModal.vue` - модальное окно формы
- **Разделение логики**:
  - Логика работы с паролями вынесена в composables (`usePasswordManager`)
  - Логика формы - `usePasswordForm`
  - Логика поиска - `useSearch`

### 3. Функциональность ядра
- Просмотр списка паролей с пагинацией
- Добавление/редактирование/удаление записей
- Поиск по всем полям (с debounce)
- Фильтрация по тегам
- Копирование пароля в буфер обмена
- Переключение видимости пароля
- Генерация случайных паролей
- Валидация обязательных полей формы

### 4. Безопасность
- Подтверждение удаления через диалоговое окно
- Маскировка паролей (отображение как ••••••)
- Очистка буфера обмена после копирования

### 5. Уведомления
- Интеграция с Toast-уведомлениями PrimeVue
- Уведомления о успешных операциях и ошибках

### 6. Дополнительные функции
- Сохранение состояния формы при перезагрузке
- Генератор случайных паролей
- Адаптивный дизайн с поддержкой мобильных устройств
- Темная/светлая тема через PrimeVue Aura

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
