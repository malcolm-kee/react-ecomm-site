# react-ecomm-site

[![Coverage Status](https://coveralls.io/repos/github/malcolm-kee/react-ecomm-site/badge.svg?branch=mobx)](https://coveralls.io/github/malcolm-kee/react-ecomm-site?branch=mobx)

An e-commerce site SPA implemented with React.

[MobX Live](https://mobx.shopit.space/)

## Implementations

There are 4 implementations of this site:

1. Redux with TypeScript - [`master` branch][master-branch] ([Preview][master-preview])
1. Redux - [`redux` branch][redux-branch] ([Preview][redux-preview])
1. Mobx - [`mobx` branch][mobx-branch] ([Preview][mobx-preview])
1. NextJS - [`nextjs` branch][nextjs-branch] ([Preview][nextjs-preview])

You can cross-reference them and see the difference between them. I will put my best effort to ensure they are functionally the same.

`master` branch may be slightly ahead, as I usually work on it and then cherry-pick into other branches.

## Backend API

The backend API that supports this site is a NestJS application. Its API is available [here][backend-api] and its repo [here][backend-api-repo].

Its database will refresh everytime Heroku restart it, so usually you can get a clean state to test this site.

## Built With

- [React](https://reactjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Create React App](https://github.com/facebook/create-react-app)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Cypress](https://www.cypress.io/)

[master-branch]: https://github.com/malcolm-kee/react-ecomm-site/tree/master
[redux-branch]: https://github.com/malcolm-kee/react-ecomm-site/tree/redux
[redux-ts-branch]: https://github.com/malcolm-kee/react-ecomm-site/tree/redux-ts
[mobx-branch]: https://github.com/malcolm-kee/react-ecomm-site/tree/mobx
[nextjs-branch]: https://github.com/malcolm-kee/react-ecomm-site/tree/nextjs
[backend-api]: https://ecomm-service.herokuapp.com/api/
[backend-api-repo]: https://github.com/malcolm-kee/ecomm-service
[master-preview]: https://shopit.space/
[redux-preview]: https://redux.shopit.space/
[mobx-preview]: https://mobx.shopit.space/
[nextjs-preview]: https://react-ecomm-site.now.sh/
