# Use an official Nginx image as a base image
FROM nginx:latest

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy all static files (HTML, CSS, JS, images, fonts, etc.)
COPY . .

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

