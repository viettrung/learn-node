# Simple rest api using express

## Create docker container 
```
docker-compose run --rm --service-ports api
```

## Init node project
```
yarn init -y
yarn add express
yarn add -D nodemon
yarn add -D eslint
```

## Config nodemon
```
"scripts": {
	"start": "nodemon server.js"
}
```