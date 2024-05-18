# Base image
FROM openjdk:17

# Expose the desired port
EXPOSE 8020

#Copying Jar File
ADD ./target/imagecaptioning-0.0.1-SNAPSHOT.jar ./

#Setting Working Directory in container
WORKDIR ./

#Run Jar File
CMD ["java", "-jar", "imagecaptioning-0.0.1-SNAPSHOT.jar"]
