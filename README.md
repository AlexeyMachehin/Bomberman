<div align='center'>

# Bomberman

![node](https://img.shields.io/badge/node-15-green)
![lerna](https://img.shields.io/badge/lerna-5.4.3-green)
![vite](https://img.shields.io/badge/vite-3.0.7-green)
![typescript](https://img.shields.io/badge/typescript-4.8.2-blue)
![react](https://img.shields.io/badge/react-18.2.0-blueviolet)
![redux](https://img.shields.io/badge/redux-8.0.5-blueviolet)

</div>

***

## Описание:
Bomberman — компьютерная игра. Жанр - аркадный лабиринт. Игрок управляет персонажем, находящимся в лабиринте, состоящем из разрушаемых и неразрушаемых стен. Он может оставлять бомбу, взрывающуюся через некоторое фиксированное время и разрушающую стены рядом с ней. На уровне присутствуют противники. Целью игры является нахождение скрытой за одной из разрушаемых стен двери, ведущей в следующий уровень с предварительным уничтожением врагов.

![image](https://user-images.githubusercontent.com/99137228/226882759-7e981fe5-0fbf-4893-9784-2fcc972df58e.png)


***
## Стек технологий: 
- React
- React Router
- Redux
- Redux Thunk
- Typescript
- Canvas API
- NodeJS
- Axios
- Vite
- Jest
- Server Side Rendering
- OAuth
- Nginx
- Yandex Cloud
- Service Workers
- Docker-Compose

***

### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server

## Production окружение в докере
Перед первым запуском выполните `node init.js`
`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

***

### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`








