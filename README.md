
# Wanderlust -Inspired By Airbnb
This is a Full-Stack Web Application 🚀

<p align="center">
  <b style="color: blue;  ">Visitor count</b>
  <br>
  <a style="" href="https://github.com/ShanedraSingh">
  <img src="https://profile-counter.glitch.me/wanderlust/count.svg" />
  </a>
</p>

---

## Table of Contents

-   [Project Overview](#project-overview)
-   [Technologies & Packages Used](#technologies--packages-used)
-   [Key Features](#key-features)
-   [How to Install](#how-to-install)
-   [Challenges & Solutions](#challenges--solutions)
-   [Special Thanks](#special-thanks)
-   [Author](#author)
-   [Project Link](#project-link)
-   [Thank You](#thank-you)

## Project Overview

Excited to share my journey of developing a feature-rich full-stack web application inspired by Airbnb. The project is built using MongoDB, Express.js, and Node.js.

## Technologies & Packages Used

### Backend

-   **MongoDB**: NoSQL database for flexible and scalable data storage.
-   **Express.js**: Web application framework for Node.js, providing robust features for web and mobile applications.
-   **Node.js**: JavaScript runtime for server-side development.

### Authentication

-   **Passport.js**: Middleware for user authentication, supporting various strategies.
-   **Dotenv**: Environment variable management for secure configuration.

### Image Storage

-   **Cloudinary**: Cloud-based image and video management solution.

### Maps

-   **Mapbox**: Platform for custom maps and location-based experiences.

### Frontend

-   **EJS**: Embedded JavaScript templates for dynamic content rendering.

### Session Management

-   **Connect Flash**: Middleware for flash messages.
-   **Connect Mongo**: MongoDB session store for Express.js.
-   **Cookie Parser**: Middleware for parsing cookies.

### Validation

-   **Joi**: Library for data validation.

### Object Modeling

-   **Mongoose**: MongoDB object modeling for Node.js.

### File Uploads

-   **Multer**: Middleware for handling file uploads.

### Social Authentication

-   **Passport Local**: Local authentication strategy.
-   **Passport Facebook**: Facebook authentication strategy.
-   **Passport Google OAuth20**: Google OAuth2.0 authentication strategy.
-   **Passport Local Mongoose**: Mongoose-specific authentication strategy.
    Authentication

## Key Features

-   **User Authentication:** Login, Logout, and User Profile Section
-   **CRUD Operations:** Add, Edit, and Delete Listings
-   **Review System:** Add and Delete Reviews
-   **Account Management:** Update User Account and Password
-   **User Data Security:** Password Hashing and Encryption
-   **Interactive Maps:** Leveraging Mapbox for Location Visualization
-   **Login with Google:** Authenticate with your Google account for a seamless experience
-   **Login with Facebook:** Easily log in using your Facebook credentials
-   **Login with Email:** Traditional email login for user convenience

## How to Install

Follow these steps to set up and run the project locally:

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/ShanedraSingh/wanderlust.git
    cd Airbnb_Project
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Set Up Environment Variables:**

    Configure the following environment variables by creating a .env file in the root of your project:

    Example :-

    ```bash
    #https://cloudinary.com/  (Cloudinary) (Change key)
    CLOUD_NAME=kjkdmckdhjks
    CLOUD_API_KEY=89340593499490394
    CLOUD_API_SECRET=jdskLKJlklkdlsdfkKKdsdkkd

    #https://www.mapbox.com/ (Mapbox)
    MAP_TOKEN=pk.eyJ1IjoiZGVsdGEtc3R1ZHVlbnQiLCJhIjoiY2xvMDk0MTVhMTJ3ZDJrcGR5ZDFkaHl4ciJ9.Gj2VU1wvxc7rFVt5E4KLOQ

    #https://www.mongodb.com/ (MongoDb Atlas) (Change key)
    ATLASDB_URL=mongodb+srv://demo:kLKJFKOEMNDDOI9089dndd@cluster0.kkdnvkdkds.mongodb.net/?retryWrites=true&w=majority

    #Add Random Secret Key
    SECRET=ckcdenlksufoifafknddsoiddfkadsfafd

    #https://console.developers.google.com/ (Google Developer Console) (Change key)
    GOOGLE_CLIENT_ID=89038948394-kjfdkcmckdmckdfsid94jkkknd9sd4.apps.googleusercontent.com
    GOOGLE_CLIENT_SECRET=KDJKDF-4KJDF894NF-DFKEF9MN-NFKEJD

    #https://developers.facebook.com/ (Facebook Developer Console) (Change key)
    FACEBOOK_APP_ID=94383859383287
    FACEBOOK_APP_SECRET=89diodfjd9r98ddfjsodwj9df8d

    #Add redirect URL in Google Developer Console
    GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback

    #Add redirect URL in Facebook Developer Console
    FACEBOOK_CALLBACK_URL=http://localhost:8080/auth/facebook/callback

    ```

    Replace the values with your specific configurations.

4.  **Run the Application:**

    ```bash
    node app.js
    ```

5.  **Open in Your Browser:**

    Open `http://localhost:8080/listings` in your web browser.

## Challenges & Solutions

Encountered challenges, especially with data handling, but implemented efficient solutions. Overcame scalability issues with a well-architected backend.

## Special Thanks

A heartfelt thank you to Shradha Khapra didi and AMAN DHATTARWAL bhaiya at #ApnaCollege for their invaluable support and collaboration. As mentors and teachers, your guidance has been instrumental in shaping the success of this project. Your dedication to fostering learning and innovation has made a lasting impact, and I'm grateful for the opportunity to learn and grow under your mentorship.

## Author

Shanedra Singh \
LinkedIn : https://www.linkedin.com/in/shanedra-singh-47342821a/

## Thank You

Thank you for exploring Wanderlust! Your feedback is valuable. If you have any suggestions or thoughts, feel free to share them with us. 😊

---

