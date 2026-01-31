# use an official maven image to build the spring boot app
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set the working directory inside container [ where all subsequent commands will be executed ]
WORKDIR /app

# Copy the pom.xml from local m/c to /app in container
COPY pom.xml .

# Maven should download all dependencies mentioned in pom.xml so that they are available offline
RUN mvn dependency:go-offline

# Copy the source code to /app/src
COPY src ./src

# Maven to clean the project and compile the sourcecode and packages to jar also skip tests
RUN mvn clean package -DskipTests


# Use an Official Image for OpenJDK binaries built by Eclipse Temurin to run the application
FROM eclipse-temurin:21-jre-jammy

# Set the working directory inside container [ where all subsequent commands will be executed ]
WORKDIR /app

# Copy the build JAR file from the build stage /app/target
COPY --from=build /app/target/Chefsphere-UMS-0.0.1.jar .

# Expose port 9091
EXPOSE 9091

# Specify the command to run the application i.e run the jar file in the container
ENTRYPOINT ["java","-jar","/app/Chefsphere-UMS-0.0.1.jar"]
