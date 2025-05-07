# Stage 1: Build the application
FROM node:20 as build

# Set working directory in container
WORKDIR /app

# Copy package.json and package.lock.json
COPY package*.json ./

# Install dependencies
RUN npm Install

# Copy rest of application code
COPY . .

# Build Typescript project
RUN npm run build

# Stage 2: Run the application
FROM node:20-slim

# Set working directory in container
WORKDIR /app

# Copy only package and dist files from build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Install production dependencies
RUN npm install --onit=dev

# expose port 
EXPOSE 3000

# Specify starter command
CMD [ "node","dist/index.js" ]