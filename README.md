# merchant-services
Merchant Services is Mini Project of Backend Server Development from Dibimbing. The scenario is to be back end developer who works in an e-commerce company and single handedly responsible with a merchant service that handles the catalog of products owned by merchants

## General Information

This application use Javascript as programming langueage, Node js as run time enviroment, Express js as framework, and MySQL DB as a persistent storage. First, user can create or register merchant account with valid data. Furthermore user can login with correct combination of email and password to access its own product. The merchant can create, read, update, and delete its own product and there is no authority to CRUD product from another merchant.

## Simple Architecture Diagram
![image](https://user-images.githubusercontent.com/119112916/213167072-e0b8e110-7bde-4c0a-a753-3cbe2c73e150.png)

- **Merchant Service App:** to register and login as merchant
- **API Gateway:** to direct user to its authorization service
- **Merchant Service:** to create, read, update, and delete product/merchant 
- **Merchant Service Database:** to store merchant and product data

## Entity Relationship Diagram 
![image](https://user-images.githubusercontent.com/119112916/213167143-d57bfab8-9d89-4753-b6d4-57b4e4f92fe0.png)

Merchant Service has 2 entities that is named merchant and product. The attributes of merchant is id, name, email, password, address, and phone_number. In other hand, product attributes is id, merchant_id, name, quantity, and price. The relationship between merchant and product is  one to many relationship. It means one merchant is able to have many product but one product is belong to one merchant.
- **merchant** is person or company that sell products
- **product** is item which is sold by merchant

## RESTful API Endpoints
**API Endpoint**
Method | Endpoint | Description |
--- | --- | --- |
Post | /merchant | to register itself/create an account in the merchant service |
Delete | /merchant/:id | to remove its data/delete its account in the merchant service |
Post | /login | to register itself/create an account in the merchant service |
Post | /merchant/product | to add products in the merchant service |
Delete | /merchant/:merchant_id/product/:id | to delete a product in the merchant service |
Put | /merchant/:merchant_id/product/:id | to update a product in the merchant service |
Get | /merchant/:merchant_id/product/:id | to get the specific single list of its products from the merchant service |
Get | /merchant/:merchant_id/product/ | to get the all list of its products from the merchant service |

**Validation of Merchant Entity**
Field | Format |
--- | --- |
name | required, min:3, max:50 |
email | required, email, min:10 |
password | required, min:6 |
address | required |
phone_number | required, numeric |

**Validation of Product Entity**
Field | Format |
--- | --- |
name | required, min:3, max:50 |
quantity | required, min:3, max:50 |
price | required, min:10000, numeric
