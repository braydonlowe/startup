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


- [x] **Deployed Simon HTML** - Deployed simon to simon.cozymaefloral.com as part of the prerequisite.
