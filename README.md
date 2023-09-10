# Ojlog
A web app i made for gdsc inductions. It uses node and express for backend, mongo atlas for database (on cloud), ejs for templating and normal css for styling with a lil bit of bootstrap. Please read the setup part if you are new to node and please read the functionality part if you face any issues while using the website or want to know the web apps full functionality.

## Setup:
Step by step guide to run the server from the repository on your device.
    
1. Open the folder you want the website to be in and open the terminal or gitbash.
2. Type ```git clone https://github.com/Ojus132/Ojlog.git``` in terminal to clone the repository locally.
3. Make sure you have node.js installed on your system. If you don't, check out the official [website of nodeJS](https://nodejs.org/en/download).
4. Open terminal for the cloned repository or cd to the directory and type ```npm i``` or ```npm install``` to install all the necessary node modules.
5. Then type ```node index.js``` to run the server through the terminal.
6. Finally open any browser on your device and open ```localhost:3000```.
7. This opens the website on your local server.

## Functionality:
**NOTE: You need to have an internet connection to run the website even locally, because the database is on cloud.**
* The user can signup for an account. The account should have an unique username and email and a password with atleast 8 characters.
* The user can also login to an account with the unique username they created.
* I tried integrating google login into the website but couldnt get it to work because it needs to be hosted online for it to work.(Theres still a button for google sign in but it wont take u anywhere neither register you as an user).
* Once you've reached the homepage, you have an option to checkout the admin page via logging in as an admin.
* **The admin password is: "lemmebecomeanadminpls"** which you can use with your respective username to access the admin page.(This will convert your account to admin type)
* Sometimes the login to admin page may show an error but you can just refresh the page and it gets fixed.
* The admin page will show you the list of all users on the website with their email and whether they are an admin or not.
* That is all the functionality for now.Have fun!
* **(NOTE: I have removed .env from .gitignore to save some steps for setup, just for the sake of convenience of the user. Please dont use the data in there.)**


