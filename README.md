## Software Store project
### How to run project
```
npm install
cd cmd/boostore
npm run dev

```
### Features

1. Browse available software
2. Add to cart / manage purchase
3. Admin dashboard

### Technology stack

**Frontend**: Next.js (React)
**Backend**: NodeJs (Express)
**Database**: MongoDB
**Other**: REST API

### API Documentaion

#### Public Endpoints
These routes are open to the internet and provide the primary entry points for new users and catalog browsing.

POST /auth/signup Facilitates new user registration. It expects a JSON payload containing a unique username, email, and password. The system initializes the user with a default role via the createUserSchema.

POST /auth/login Authenticates credentials and returns a session or token. This is the primary entry point for users to access protected system features.

GET /games Returns a collection of all verified game listings. This endpoint is the primary data source for the frontend "Store" page.

GET /games/:id Provides comprehensive details for a specific game, including embedded publisher, developer, and emulation information.

GET /companies Retrieves a list of all companies (Publishers and Developers) registered on the platform.

GET /companies/verified Critical Route: An optimized endpoint that returns only verified companies to populate frontend selection menus for game creation.

GET /companies/:id Returns specific metadata for a company, including contact information, description, and country of origin.

GET /emulations Lists available emulation environments and cores supported by the software store.

GET /emulations/:id Retrieves detailed technical specifications for a specific emulation core.

GET /reviews/:id Fetches all user-submitted reviews and ratings associated with a specific Game ID.

#### User Endpoints

GET /users/profile Allows an authenticated user to retrieve their own profile information, account status, and settings.

GET /users/:id Provides authenticated access to view a specific user's basic profile details.

PUT /users/:id Enables users to update their personal account information, protected by strict schema validation.

GET /games/my-library Fetches the collection of games owned by the authenticated user, including full metadata for library rendering.

GET /games/my-uploads Allows users to view and manage the specific game listings they have contributed to the platform.

POST /games Facilitates the creation of a new game listing. All submissions are initially set to an unverified state until reviewed.

PUT /games/:id Enables the original uploader to modify game data, such as pricing, description, or system requirements.

DELETE /games/:id Removes a game listing from the database, restricted to the owner of the record.

POST /companies Allows authenticated users to register a new company entity within the system for future game tagging.

PUT /companies/:id Allows for the modification of company profiles, such as updating contact details or official websites.

POST /emulations Enables users to contribute new emulation cores to the platform's technical library.

PUT /emulations/:id Allows for the updating of emulation core configurations and compatibility settings.

POST /purchases Processes a transaction for a game. Data is validated to ensure price and game ID integrity before finalizing the order.

GET /purchases/:id Retrieves the receipt and transaction details for a specific purchase made by the user.

POST /reviews Enables users to submit ratings and text reviews for games they have interacted with.

PUT /reviews/:id Allows users to update or edit their existing reviews.

#### Administrator Endpoints

GET /users/admin/all Retrieves a comprehensive master list of all registered users in the system for moderation purposes.

DELETE /users/admin/:id Grants administrators the authority to permanently remove any user account from the platform.

GET /games/admin Provides a view of all games in the system, including those pending verification.

GET /games/stats Provides high-level system statistics, including revenue metrics and user engagement data.

PATCH /games/:id/verify A specialized route used to toggle the verification status of a game, making it visible on the public store.

PATCH /companies/admin/:id/verify Toggles the is_verified status of a company, allowing it to appear in the public /verified list.

DELETE /companies/:id Allows admins to remove company entities that violate platform guidelines.

DELETE /emulations/admin/:id Facilitates the removal of emulation cores from the system by an administrator.

GET /purchases/admin Provides an administrative master list of every transaction processed through the platform.

GET /reviews/admin Retrieves a list of all reviews across the platform for moderation and sentiment analysis.


### Requirments

Before you begin make sure you have:

Enviromental variables

MONGODB_CONNECT_URL=[YOUR_URI]

JWT_SECRET=[YOUR_SECRET]

### Example
Main page
![](./readme_img/store_page.png)

Profile page
![](./readme_img/profile_page.png)

Admin Page
![](./readme_img/admin_page.png)