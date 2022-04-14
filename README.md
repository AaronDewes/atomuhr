# atomuhr.vercel.app

We used a website to syn our podcast recordings. After the website was open for arround a minute it was already several seconds off. So syncing don't make sense. This website solves this be calculating the difference to the server time (thanks to this article https://www.nodeguy.com/serverdate/). Therefore the clocks should be in sync on multiple devices. This also imlies that we don't use a atomic clock or a NTP server. The goal was to have clocks in sync and not to have the perfect time and this should be achieved :D

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
