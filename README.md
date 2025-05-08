## 🔗 Live API (Vercel Deployment)

> **Base URL:** [https://library-management-api-murex.vercel.app/books]

> ⚠️ **Note**: Swagger UI does **not work on Vercel** deployments. Please use the local setup to access Swagger.


🛠️ Local Setup Instructions

1. Clone the Repository

git clone https://github.com/your-username/library-api.git
cd library-api

2.npm install

3.Configure Environment Variables
Create a .env file in the root directory:

MONGODB_URI=URI from mongodb atlas

4. Run the Project Locally
npm run start:dev

5. Access the API
Swagger UI: http://localhost:3000

API Endpoints
Books
Method	Endpoint	Description
POST	/books	Add a new book
GET	/books	List all books 
GET	/books/:id	Get book by ID
PUT	/books/:id	Update a book
DELETE	/books/:id	Delete a book
GET	/books/search?query=pottr	Fuzzy search
