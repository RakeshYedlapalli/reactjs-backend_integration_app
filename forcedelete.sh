docker stop $(docker ps -q)
docker rm -f $(docker ps -aq)
docker rmi -f $(docker images -aq)
docker volume rm $(docker volume ls -q)
docker volume prune -f
docker network rm $(docker network ls -q)
docker system prune -a --volumes -f

#Verifying
echo "Verifying"
docker images
docker ps -a
docker volume ls