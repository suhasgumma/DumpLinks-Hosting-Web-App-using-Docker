# DumpLinks -- Running Web Application Inside A Container

### The focus of this project is to build Docker Image for Web Application and Run the web app inside a container & Run Docker container in Cloud (AWS)

### Link to Image in Dockerhub repository: https://hub.docker.com/repository/docker/suhasgumma/dumplinks

### To get the image using shell, use the following command:
```
docker pull suhasgumma/dumplinks
```

## Flow of the Project

- Develop A Web Application
- Write Dockerfile 
- Build Docker Image using the Dockerfile
- Write docker-compose.yml file 
- Run the App inside the containers using Docker Compose
- Push Docker Image to Dockerhub repository
- Run on AWS' EC2 Instance


## Summary of what the web app does

### It takes a Unique Key and stores multiple links and text associated with that key. Users could access the links and text stored associated with that U Unique Key later from any device.Used reactJs for our application logic & backend.Used firebase for storing data. 



### Snippets of the website
![First Dumplinks Website Image](https://github.com/suhasgumma/DumpLinks-Web-App-as-Container/blob/master/ReadMe%20Images/Dumplinks2.png)
![First Dumplinks Website Image](https://github.com/suhasgumma/DumpLinks-Web-App-as-Container/blob/master/ReadMe%20Images/Dumplinks1.png)


## Writing a Dockerfile

- Since the Web App uses nodeJs, I used official "node" image as base Image available in dockerhub
- Set the working directory to /app
- Copied package.json
- Ran 'npm install' to get the node modules
- Copied all the other code

## Building a Docker Image

Building an image is quite simple after writing the Dockerfile. Just run the command..
```
docker build . -t dumplinks
```

## Writing docker-compose.yml file
The only use for docker-compose file in the application is to bind host machine port to container port.
In the case of this application, I binded the port 3000 of container to port 3000 of host machine. This means all traffic hitting port 3000 of host will be directed to port 3000 of container.

## Running the web application inside the container

### Using docker run
```
docker run -p 3000:3000 -d dumplinks
```
### Using Docker Compose

```
docker-compose up
```

### List all running Containers
```
docker ps
```
![ps](https://github.com/suhasgumma/DumpLinks-Web-App-as-Container/blob/master/ReadMe%20Images/docker%20ps.png)

### Opening bash shell inside a running container

```
docker exec -it <container> bash
```

![](https://github.com/suhasgumma/DumpLinks-Web-App-as-Container/blob/master/ReadMe%20Images/inside%20the%20container.png)


## Push Docker Image to Docker Hub Repository

Login using docker hub credentials and run the following command

```
docker push <imageName>:<image Tag>
```


## Run on AWS' EC2 instance
- Launch any EC2 instance on AWS. Now, ypu have a VM which is similar to your local machine in your hands.
- Connect to EC2 instance using SSH
- Install Docker and run in the same way you did in your machine







