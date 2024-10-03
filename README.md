# omnipilote-assignement

## How to Use

### With Docker Compose
```sh
docker-compose up
```

### Without Docker
```sh
cd client
npm i
npm run dev
```
> **Note:** Requires Node.js version 22.6

## Specifications

### Technologies
- Docker
- ReactJS
- TailwindCSS
- ChakraUI
- Vite

### Features
- Basic authentication (credentials are hard coded in `/public/data/auth.json`)
- No input validation yet
- CRUD operations for the product
- Unauthorized page
- Not found page