# Beauty Store e-commerce demo API
The API should be able to 'mimic' a real e-commerce store.</br> It should be able to create, list, update and delete users and </br>
products and for sales it should be able to create and list them.

## Table of contents

- [Installation](#installation)
- [Routes](#routes)
- [Technologies](#technologies)
- [Usage](#usage)

## Installation

```bash
# Clone the repository

$ git clone https://github.com/thiago-b-coelho/ecommerce-DNC

# Move to the project directory:

$ cd ecommerce-DNC

# Create a MySQL database

# Create the '.env' file and add environment variables for the database connection

# Install dependencies

$ npm install

# Run the project

$ npm run dev
```

## Routes

### Customers

| Method      | Route              | Description          |
|-------------|--------------------|----------------------|
| Get         |/costumers          | List all costumers   |
| Get         |/costumers/:id      | List customer by id  |
| Post        |/costumers/         | Add a customer       |
| Put         |/costumers/:id      | Update customer info |
| Delete      |/costumers/:id      | Delete Customer      |

Creating example customer
```json
{
	"name": "Rihanna",
	"email": "r@gmail.com",
	"address": "Bervely Hills, California",
	"phone_number": "(91)98899-2539"
}
```
Updating example customer (only add update information)
```json
{
	"email": "rihanna@gmail.com"
}
```


### Products

| Method      | Route               | Description               |
|-------------|---------------------|---------------------------|
| Get         | /products           | List all Products         |
| Get         | /products/:id       | List product by id        |
| Post        | /products/          | Add a product to database |
| Put         | /products/:id       | Update product info       |
| Delete      | /products/:id       | Delete product            |

Creating example product

```json
{
    "name": "Lipstick",
    "description": "Velvet liquid, Fenty Beauty",
    "price": 600,
    "quantity": 20
}
```
Updating example product (only add update information)
```json
{
	"price": 800
}
```

### Sales

| Method      |Route               | Description            |
|-------------|--------------------|------------------------|
| Get         | /sales             | List all sales         |
| Get         | /sales/:name       | List sales by customer |
| Post        | /sales/            | Create sale            |

Creating example sale

```json
{
	"name": "RZA",
	"product": {
		"babylipstick": 1,
        "babypowder": 2 
	}
}
```

## Technologies

- [JavaScript](https://devdocs.io/javascript/)
- [NodeJs](https://nodejs.org)
- [ExpressJs](https://expressjs.com)
- [MySQL](https://www.mysql.com/)

## Data Modeling

![Data Modeling](/public/assets/dataModeling.png)

## Usage

### On Insomnia software </br>
![img](/public/assets/customers.gif)
