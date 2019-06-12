# react-ecomm-site

An e-commerce site SPA implemented with React.

[Live][mobx-preview]

[Component Library](https://react-ecomm-docs.netlify.com/)

## State Management Library

There are two implementations of this site:

1. MobX - [`master` branch][master-branch] ([Preview][mobx-preview])
1. Redux - [`redux` branch][redux-branch] ([Preview][redux-preview])

You can cross-reference them and see the difference between them. I will put my best effort to ensure they are functionally the same.

MobX branch may be slightly ahead, as I usually work on it and then cherry-pick into redux branch.

## Backend API

The backend API that supports this site uses a json file and its DB and auto-generated images. Its code is in [this repo][backend-api-repo].

The database will refresh everytime Heroku rebuild it, so usually you can get a clean state to test this site.

## Other Details

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

[master-branch]: https://github.com/malcolm-kee/react-ecomm-site/tree/master
[redux-branch]: https://github.com/malcolm-kee/react-ecomm-site/tree/redux
[backend-api-repo]: https://github.com/malcolm-kee/ecomm-db
[mobx-preview]: https://shopit.space/
[redux-preview]: https://redux.shopit.space/
