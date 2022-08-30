# shop-mern

this is repo for frontend and backend of SHOP using MERN stack


The deployed Site can be found at 

- http://shop.vayuteja.co.in:3000/


## Steps To deploy the server on an AWS instance.

1. Create an AWS linux instance
2. Install docker and git on the instance
3. Checkout the shop-mern repository on the system
4. Add the .env files for frontend and backend from the following link

```https://vayustack.slack.com/archives/D02E2MWS31D/p1654232915774389```

5. Add the private and public key in backend repo from the follwoing link

```https://vayustack.slack.com/archives/D02E2MWS31D/p1654233159372709```

6. Run the following commands to create docker images in repective folders

``` docker build . -t shop-mern/frontend ```

``` docker build . -t shop-mern/backend ```

7. Run the following commands to run the containers for the frontend and backend server

``` docker run --net=host -d shop-mern/frontend:latest ```

``` docker run --net=host -d shop-mern/backend:latest ```

8. Then go to godaddy DNS manager and link the public IP of AWS instance to shop subdomain to access the app at 


- http://shop.vayuteja.co.in:3000/
