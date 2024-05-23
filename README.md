Repository Name: React Image Gallery

Description:
This repository contains a React application for displaying a gallery of images fetched from an API. The application allows users to search for images, view them in a paginated format, and click on individual images to open them in a new tab. This README file provides detailed information on the project structure, dependencies, implementation details, and testing process.

Table of Contents:

Installation
Project Structure
Dependencies
Implementation Details
Testing Process
Acknowledgements
1. Installation:
To run this project locally, follow these steps:

Clone the repository to your local machine using git clone https://github.com/Taiolamz/React-Image-Gallery.git
Navigate to the project directory using cd react-image-gallery
Install dependencies using npm install
Start the development server using npm start
Open your browser and visit http://localhost:3000 to view the application
2. Project Structure:
The project structure is as follows:

public/: Contains the HTML file and other static assets.
src/: Contains the React application code.
App.js: Main component that renders the image gallery and handles user interactions.
redux/: Contains Redux-related files for managing application state.
components/: Contains reusable React components.
App.css: CSS file for styling the application.
package.json: Contains metadata and dependencies for the project.
3. Dependencies:
The project relies on the following dependencies:

React: JavaScript library for building user interfaces.
Redux: State management library for managing application state.
react-redux: Official React bindings for Redux.
react-icons: Library for adding icons to React applications.
react-spinners: Library for displaying loading spinners in React applications.
react-infinite-scroll-component: Library for implementing infinite scrolling in React applications.
react-paginate: Library for implementing pagination in React applications.
4. Implementation Details:
The application fetches images from an API using Redux. It uses React hooks such as useState and useEffect for managing state and side effects. The image gallery is displayed using a combination of CSS grid and flexbox for layout. Pagination and infinite scrolling features are implemented to improve user experience.

5. Testing Process:
The application was tested using both unit tests and manual testing. Unit tests were written using Jest and React Testing Library to test individual components and Redux actions. Manual testing was performed to ensure the application functions correctly across different devices and browsers. Additionally, edge cases such as empty search results and API errors were tested to ensure robustness.

6. Acknowledgements:
Special thanks to the creators of the API used in this project for providing access to high-quality images. Thanks also to the open-source community for the various libraries and tools used in this project.

Feel free to reach out if you have any questions or feedback about this project!
