Steps to run: In the project directory:

### `npm install`

### `npm start`

## Tech used:

We used redux and typescript in this project and emotion for CSS. The UI is written using vanilla javascript components without the use of external libraries barring the use o a react-modal.

We have extensively used CSS for a better visual appeal. Instead of importing css, CSS styles have een written on the same file. This is done to imprve readability of the styles used along with faster debugging in case of any issues.

## Challenges faced:

This was my first time working on Redux so it was exciting and a great larning oppurtunity.

The data to be displayed was huge, with over 40 pages. This made the pagination component look highly cluttured. I created a custom pagination component without using any external libraries to make it look better and work effectively

Sorting was a challenge. I was able to sort the data however, in an ideal case I would have wanted to sort all 48 or so pages worth of data at nce. Ideally, this should be done by the server but this api does not support sorting. Sorting such a large data set would involve 40+ api calls and be an expensive task that would affect the performance, although there might be work arounds to make the performance better, we still have to make over 40 api calls. I decided to sort the page I was in to showcase my ability to be able to sort wile keeping the application working efficiently

When implementing searching, the api returns a 404 error if no character matches the search input. Had it ust returned an empty array, it would be easier to display that no data was found. I manged the error, and displayed a simple string "No data found" in case user searchs for a string that does not return any value

There was no way to reset the search input based on the requirements, but I decided to add a clear button to return the table to it's initial state
