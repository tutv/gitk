# GitK [![Github All Releases](https://img.shields.io/github/downloads/tutv95/gitk/total.svg)]() [![GitHub forks](https://img.shields.io/github/forks/badges/shields.svg?style=social&label=Fork&style=plastic)]() [![GitHub stars](https://img.shields.io/github/stars/badges/shields.svg?style=social&label=Star&style=plastic)]()
Sync project from remote git server to local server

# Installation

```
git clone https://github.com/tutv95/gitk.git
```

- Config app: Copy file `.env.example` to '.env'
```
HOST_PORT=2369
```

- Install dependency packages and run app.
```
npm start
```

- Open browser: your-domain.com:HOST_PORT (e.g: http://gitk.com:2369)

- Add project to app.
![Add new project](./docs/images/new-project.png)

- Go to settings webhook of repository and add new webhook:
![Add webhook](./docs/images/add-webhook.png)