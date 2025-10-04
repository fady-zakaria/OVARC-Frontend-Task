# Project Review

## Code Structure
1) Separate logic from rendering JSX files, and make it in separate factory files.
2) Use a generic functions to promote reusability.
3) Make the page routing paths in a constant file to avoid spelling mistakes while navigating between pages.
4) i18next setup from day 1:  to be able to add more than one language to the website more easily.

## UI/UX
1) Make the drawer responsible.
2) Replace scrolling with a carousel.
3) Replace basic alerts and notifications with custom alert pop-ups for failure and success.
4) Make a custom component for every component (button, input, ...) to make the change easier.
5) Make a form component with Formik and yup to be able to render many forms without redundancy in the code 
6) Separate the page into small components to make the page more readable.
7) Make the Theme Provider use the colour code.

## Data-handling
1) Use an HTTP interceptor to make an error interceptor for error handling.
2) Use React Query to cache the data instead of recalling it every time.
3) Use Redux for state management.

