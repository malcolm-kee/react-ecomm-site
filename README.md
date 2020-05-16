# react-ecomm-site

[![Coverage Status](https://coveralls.io/repos/github/malcolm-kee/react-ecomm-site/badge.svg?branch=master)](https://coveralls.io/github/malcolm-kee/react-ecomm-site?branch=master)

An e-commerce site SPA implemented with React.

[Live](https://shopit.space/)

[Component Library](https://react-ecomm-docs.netlify.com/)

## State Management Library

There are 4 implementations of this site:

1. Redux with TypeScript - [`master` branch][master-branch] ([Preview][master-preview])
1. Redux - [`redux` branch][redux-branch] ([Preview][redux-preview])
1. Mobx - [`mobx` branch][mobx-branch] ([Preview][mobx-preview])
1. NextJS - [`nextjs` branch][nextjs-branch] ([Preview][nextjs-preview])

You can cross-reference them and see the difference between them. I will put my best effort to ensure they are functionally similar.

`master` branch may be slightly ahead, as I usually work on it and then cherry-pick into other branches.

## Backend API

The backend API that supports this site uses a json file and its DB and auto-generated images. Its code is in [this repo][backend-api-repo].

The database will refresh everytime Heroku rebuild it, so usually you can get a clean state to test this site.

## Other Details

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

[master-branch]: https://github.com/malcolm-kee/react-ecomm-site/tree/master
[redux-branch]: https://github.com/malcolm-kee/react-ecomm-site/tree/redux
[mobx-branch]: https://github.com/malcolm-kee/react-ecomm-site/tree/mobx
[nextjs-branch]: https://github.com/malcolm-kee/react-ecomm-site/tree/nextjs
[backend-api-repo]: https://github.com/malcolm-kee/ecomm-db
[master-preview]: https://shopit.space/
[redux-preview]: https://redux.shopit.space/
[mobx-preview]: https://mobx.shopit.space/
[nextjs-preview]: https://react-ecomm-site.now.sh/
