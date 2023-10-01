# shop-mern

this is repo for frontend and backend of SHOP using MERN stack


The deployed Site can be found at 

- http://shop.vayuteja.co.in

## Steps to deploy server on local windows instance

1. Install docker and git on the instance
2. Checkout the shop-mern repository on the system
3. Add the .env files for frontend and backend from the following link

```https://vayustack.slack.com/archives/D02E2MWS31D/p1654232915774389```

4. Add the private and public key in backend repo from the follwoing link

```https://vayustack.slack.com/archives/D02E2MWS31D/p1654233159372709```

5. Run the following commands to create docker images 

``` docker build ./projfrontend -t shop-mern/frontend ```

``` docker build ./projbackend -t shop-mern/backend ```

6. Run the following commands to run the containers for the frontend and backend server

```  docker run -p 80:3000 -d --restart=always --name=shop-mern-frontend shop-mern/frontend:latest ```

``` docker run -p 8000:8000 -d --restart=always --name=shop-mern-backend shop-mern/backend:latest ```

7. Then go to godaddy DNS manager and link the public IP of local instance to shop subdomain to access the app at 


- http://shop.vayuteja.co.in


## Steps To deploy the server on an AWS Linux instance.

1. Create an AWS linux instance
2. Install docker and git on the instance
3. Checkout the shop-mern repository on the system
4. Add the .env files for frontend and backend from the following link

```https://vayustack.slack.com/archives/D02E2MWS31D/p1654232915774389```

5. Add the private and public key in backend repo from the follwoing link

```https://vayustack.slack.com/archives/D02E2MWS31D/p1654233159372709```

6. Run the following commands to create docker images 

``` docker build ./projfrontend -t shop-mern/frontend ```

``` docker build ./projbackend -t shop-mern/backend ```

7. Run the following commands to run the containers for the frontend and backend server

``` docker run --net=host -d shop-mern/frontend:latest ```

``` docker run --net=host -d shop-mern/backend:latest ```

8. Then go to godaddy DNS manager and link the public IP of AWS instance to shop subdomain to access the app at 


- http://shop.vayuteja.co.in:3000/
