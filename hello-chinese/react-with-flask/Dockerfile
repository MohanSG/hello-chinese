FROM node:24

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build production bundle (Vite)
RUN npm run build

# Install static server
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Serve built files
CMD ["serve", "-s", "dist", "-l", "3000"]