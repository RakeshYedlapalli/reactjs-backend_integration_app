#clean up the existing images

#docker stop e-commerce-product-catalog-service-spring-ecommerce-catalog-app
#docker rm e-commerce-product-catalog-service-spring-ecommerce-catalog-app
#docker rmi spring-ecommerce-catalog-app
#docker rmi e-commerce-product-catalog-service-spring-ecommerce-catalog-app

# docker build -t my-react-app .
docker build --no-cache -t my-react-app .

docker run -p 3000:80 my-react-app

# http://localhost:3000

