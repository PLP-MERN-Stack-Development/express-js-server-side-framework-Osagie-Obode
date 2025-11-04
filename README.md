# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install dependencies:
   ```
   npm install
   ```
4. Run the server:
   ```
   npm start
   ```

## Running locally (this repo)

1. Install dependencies (if you haven't already):

```bash
npm install
```

2. Copy `.env.example` to `.env` and set `API_KEY` if you want to override the default:

```bash
cp .env.example .env
# edit .env and set API_KEY
```

3. Start the server:

```bash
npm start
# or: node server.js
```

Server will listen on the port in `process.env.PORT` or 3000 by default.

## API Reference

Base URL: `http://localhost:3000`

- `GET /` — welcome message (public)
- `GET /api/products` — list products. Query params:
   - `category` (string) — filter by category
   - `q` (string) — search by product name (case-insensitive substring)
   - `page` (number) and `limit` (number) — pagination

- `GET /api/products/:id` — get a product by id
- `GET /api/products/stats` — get counts grouped by category
- `POST /api/products` — create product (protected)
- `PUT /api/products/:id` — update product (protected)
- `DELETE /api/products/:id` — delete product (protected)

Protected routes require an API key header `x-api-key` matching `API_KEY` in your `.env` (default `secret-key`).

## Example requests

Create a product (POST /api/products):

Headers:
```
x-api-key: secret-key
Content-Type: application/json
```

Body:

```json
{
   "name": "Mug",
   "description": "Ceramic mug",
   "price": 9.99,
   "category": "kitchen",
   "inStock": true
}
```

Response: 201 Created — created product object with `id` field.

List products with pagination:

`GET /api/products?page=1&limit=2`

Response shape:

```json
{
   "meta": { "total": 10, "page": 1, "limit": 2, "totalPages": 5 },
   "data": [ /* products */ ]
}
```

## Notes

- This project uses an in-memory array (`data/products.js`) as the datastore. Data will reset when the server restarts. For a persistent store, replace with a database (MongoDB, Postgres, etc.).
- Error responses are returned with appropriate HTTP status codes and a JSON `{ error: "message" }` body.


## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## API Endpoints

The API will have the following endpoints:

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 