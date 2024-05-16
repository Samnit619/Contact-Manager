# Contact-Manager
Contact Manager App
Description
The Contact Manager App is a simple web application that allows users to manage their contacts. Users can add, view, edit, and delete contacts. This application is built using Node.js and Express.

Features
Add new contacts with details like name, email, and phone number.
View a list of all contacts.
Edit existing contacts.
Delete contacts.
Technologies Used
Node.js
Express.js
MongoDB (optional for persistence)
EJS (for templating)
Body-parser (middleware for handling form submissions)
Installation
Clone the repository:

sh
Copy code
git clone https://github.com/yourusername/contact-manager.git
cd contact-manager
Install dependencies:

sh
Copy code
npm install
Configure environment variables:
Create a .env file in the root of the project and add the following:

env
Copy code
PORT=3000
MONGODB_URI=mongodb://localhost:27017/contactmanager
Start the application:

sh
Copy code
npm start
Visit the application:
Open your browser and go to http://localhost:3000.

API Endpoints
Contacts
GET /contacts: Retrieve a list of all contacts.
GET /contacts/:id: Retrieve a specific contact by ID.
POST /contacts: Add a new contact.
PUT /contacts/:id: Update an existing contact by ID.
DELETE /contacts/:id: Delete a contact by ID.
Project Structure
arduino
Copy code
contact-manager/
│
├── public/
│   └── css/
│       └── styles.css
│
├── views/
│   ├── index.ejs
│   ├── edit.ejs
│   └── new.ejs
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
Usage
Adding a New Contact
Navigate to http://localhost:3000/contacts/new.
Fill in the form with the contact details.
Click the "Add Contact" button.
Viewing Contacts
Navigate to http://localhost:3000/contacts.
View the list of all contacts.
Editing a Contact
Navigate to http://localhost:3000/contacts/:id/edit.
Update the contact details.
Click the "Update Contact" button.
Deleting a Contact
Navigate to http://localhost:3000/contacts.
Click the "Delete" button next to the contact you want to remove.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
