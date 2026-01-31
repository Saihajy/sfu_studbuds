# Build the Spring Boot app (creates the jar)
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn -q -DskipTests package

# Run the jar
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Default local port. Render will override PORT automatically.
ENV PORT=8080
EXPOSE 8080

# Start Spring Boot and bind to PORT
CMD ["sh", "-c", "java -Dserver.port=$PORT -jar app.jar"]
