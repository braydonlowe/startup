# Startup
Startup application for BYU CS 260


## Specification Deliverable
➡️ The following is part of my specification deliverable.

### Elevator Pitch:

At Cozy Mae Floral, we specialize in personal, handcrafted arrangements that not only suit the occasion but also embody your vision. Unlike many companies that rely on templates and a 'cookie-cutter' process, we focus on creating unique and heartfelt designs that bring warmth and individuality to every event. It’s not just about selling flowers; it’s about delivering a personal touch that makes each moment unforgettable.


### Design:
[//]: # (Include at least 1 photo of the design here)
![Home Page](./Pictures/HomePage.png)
![Contract Page](./Pictures/ContractsPage.png)
![Calendar Page](./Pictures/CalendarPage.png)


### Key Features:
[//]: # (Just a description of the features we will add)

- Secure login over HTTPS
- Ability to see scheduled availability, set by the admin, on a calendar.
- Admin ability to send PDF contracts through a third party service.
- User ability to sign contracts through a third party service.
- Ability to see upcoming appointments.
- Admin ability to see progress of contracts.


### Technologies:

The following technologies will be used in the following ways:

- **HTML** - Structure of the web pages. The skeleton the login page, calendar views and contract pages.
- **CSS** - Styling for the entire we application. Both for desktop and mobile use.
- **React** - User interface for secure login, viewing scheduled availability, displaying appointments, and interacting with the contract system.
- **Service** - Backend service with endpoints for:
  - Loging in
  - Managing ppointments
  - Contract viewing
  - Admin functionalities for sending contracts and tracking their progress.
  - Managing schedule availibility.
- **DB/Login** - Store users, appointments, and PDF contracts. Register and login users. Credentials securely stored in database. Can't view appointment or see contracts unless authenticated.
- **WebSocket** - Real-time updates to the calendar when the schedule is modified by the admin, automatically reflecting changes for all users.



## HTML Deliverable
➡️ The following is part of my HTML Deliverable.


- [x] **Deployed Simon HTML** - Deployed Simon to simon.cozymaefloral.com as part of the prerequisite.
- [x] **GitHub Link** - GitHub link is displayed on the home page.
- [x] **Header and Footer** - Header and footers completed for every page except for the login and register pages.
- [x] **Login Page** - A place to log in.
- [x] **Register Page** - A place to register a new user.
- [x] **Placeholder Elements** - Placeholders for contracts and calendar.
- [x] **Home Page (index.html)** - Created an index.html serving as the homepage with navigation and welcome message.
- [x] **Home Page (image)** - Added the only image in the application on the homepage.
- [x] **CSS Styling** - Implemented CSS for overall styling, ensuring responsiveness for desktop and mobile.
- [x] **Service Layer** - Backend service endpoints for login, appointment management, contract viewing, and schedule availability.
- [x] **Database Integration** - Set up a database structure to store users, appointments, and contracts, with secure login functionality.
- [x] **WebSocket Setup** - Included placeholders for WebSocket functionality to provide real-time updates on the calendar.
- [x] **HTML Structure** - Ensured proper use of HTML tags including BODY, NAV, MAIN, HEADER, and FOOTER across all pages.
- [x] **Interactivity** - Added JavaScript placeholders for future interactivity and service integration.


## CSS Deliverable
➡️ The following is part of my CSS Deliverable.


- [x] **Deployed Simon CSS** - Deployed Simon to simon.cozymaefloral.com as part of the prerequisite.
- [x] **Github Link** - Github link is still on the page and fulfills the pre-requisit requirement for this deliverable.
- [x] **Added Company Submark as Icon** - Added a picture of a flower to act as the icon for the tab in the browser.
- [x] **Added Conditional Visibility Of Logo** - If the CozyMae Floral logo fails to load. The alternate text will load. This was added as a condition through the CSS, image-alt class.
- [x] **Responsive Sizing** - Text stays centered on the page as the page changes size.
- [x] **Login Register Button** - Login/Register button was created on the home page. It is styled appropriately, and has it's position fixed using CSS.
- [x] **Login/Register Page CSS** - Login and register pages now have their own CSS. I liked it better without the footer so that was removed. It now is a centered box on the middle of the page. It also responds to resizing.


## React Deliverable
➡️ The following is part of my React Deliverable.


- [x] **Clone the Simon React** - Cloned the Simon React package to my dev enviornment.
- [x] **Deploy Simon React** - Deployed Simon to simon.cozymaefloral.com as part of the prerequisite.
- [x] **App.jsx Implemented** - app.jsx was created to help navigate the react app.
- [x] **home.jsx Implemented** - The file previously known as index.html was converted to home.jsx.
- [x] **Header/Footer Implemented** - The header and footer components were converted into their own seperate react elements.
- [x] **Navigation Change** - The navigation was changed to display dynamically depending on what role a user has. The changing of said role, has not been implemented yet. Implementation can be found in header.jsx.
- [x] **Dashboard Implemnted** - The dashboard page was implemented in dashboard.jsx. Pages that were previously known as: appointments, contracts, and profile now display there dynamically through the use of tabs. Note: To re-iterate, those pages will no longer display through the normal navigation.
- [x] **Login Register Implemented** - Login and register pages were implemented in react. The css was altered from the origional.
- [x] **Login actually works** - You can actually go to a page using the login screen. 


## Service Deliverable
➡️ The following is part of my Service Deliverable.

-[x] **Deploy Simon** - Simon service was successfully deployed to simon.cozymaefloral.com.
- [x] **Successfully Connected MongoDB** - Database set up with MongoDB.
- [x] **Get Calendar Availability** - Availability is gotten from the db and displayed on the calendar page.
- [x] **Post Calendar Availability** - A user can post to calendar availability.
- [x] **Appointments Page Pulls Calendar Availability** - Selected dates by the user are pulled in to display as appointments for the user.
- [x] **Contracts Information Displayed** - Contract information can be sent using a 3rd party API. Specifically on the dashboard page, the contracts tab, a PDF service provided by adobe is called. This API can only be called in production, but there are some cookies that are required to operate it. So I did add it but it doesn't actually work. However, on the appointments tab I have a backup! I call the chuck norris jokes here.
- [x] **Login Register** - The paths for login and register were added as well.



## Login Deliverable

- [x] **Deploy Simon** - Simon login was successfully deployed to simon.cozymaefloral.com.
- [x] **MongoDB Added** - App uses MongoDB for a database.
- [x] **Register Fully Functional** - Reigister functionality added to the app.
- [x] **Login Fully Functional** - Login functionality added to the app.
- [x] **Logout Mostly Functional** - Logout functionality added to the app. You can log out, but the display says you're logged in when you're not. But hey, better than nothing.