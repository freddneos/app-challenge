## [G|y|a|n|t] Challenge

To run this project locally , You just need to type 

```
docker-compose up
```

When the application starts will seed the database.

User to test : 

__name__: doctor@email.com

__password__: 123456


Client URL 
```
localhost:3333/web/login.html  -> localhost:3333/web/index.html
```

### On top of Nodejs and Express  with MongoDB.

Backend with typescrypt

- SOLID principles.

- Repository pattern

Frontend with vanilla JS

- ES6 features 

- Bootstrap theme.



#### Endpoint to create an User : 



__URL:__
POST -> http://localhost:3333/auth/signup

__BODY__:

```js
{
	"firstName":"fredd",
	"email" : "fredd@email.com",
	"password": "123456"
}
```


#### Endpoint to seed Database : 
__URL:__
GET -> http://localhost:3333/seed



[My blog](https://frederico.eu)
[Linkedin](https://linkedin.com/in/fredericobezerra)
