# DumpLinks -- Running Web Application Inside A Container

### The focus of this project is to build Docker Image for Web Application and Run the web app inside a container using the image.

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




