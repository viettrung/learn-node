# Simple rest api using express

## Create docker container 
```
docker-compose run --rm --service-ports nod_dev_env
```

## Init node project
```
yarn init -y
yarn add express
yarn add -D nodemon
```

## Config nodemon
```
"scripts": {
	"start": "nodemon server.js"
}
```