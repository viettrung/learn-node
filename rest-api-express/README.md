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

## APIs
- GET http://localhost:8080/api/books
- GET http://localhost:8080/api/books/5f38b948265c46a8622a8211
- DELETE http://localhost:8080/api/books/5f38b948265c46a8622a8211
- POST http://localhost:8080/api/books
```
{
	"read": false,
	"_id": "5f38b948265c46a8622a8211",
	"title": "War and Peace",
	"genre": "Historical Fiction",
	"author": "Lev Tolstoy"
}
```
- PUT http://localhost:8080/api/books
```
{
	"read": true,
	"title": "War and Peace",
	"genre": "Historical Fiction",
	"author": "Lev Tolstoy"
}
```
- PATCH http://localhost:8080/api/books/
```
{
	"read": true
}
```
