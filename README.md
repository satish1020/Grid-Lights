# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


Question:

Build a 3x3 grid of light cells (omitting the center cell) where you can click on the cells to activate them, turning them green. When all the cells have been activated, they will be deactivated one by one in the reverse order they were activated with a 300ms interval in between.



Solution:

Solution
The question can be split into two parts: (1) Rendering, (2) State, and (3) Deactivation.

Rendering
Since we're required to render a 3x3 grid of cells, CSS Grid is literally the best tool for the job. We can definitely use other approaches but CSS Grid is a forward-looking technology we should master. If you're unfamiliar with CSS Grids, Grid Garden is an interactive game for you to learn about it.

The following CSS will render a 3x3 grid with 20px of padding and spacing between the cells.

.grid {
  --spacing: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: var(--spacing);
  gap: var(--spacing);
}

To create cells that are perfect squares, we can set the height of the cells to be 0 and make one of the vertical paddings 100% (padding-bottom: 100%), which sets the total height of the cell to be the same as the width.

Remember that we have an odd requirement of the middle cell to be omitted? We can create a declarative and flexible rendering approach where we define a 2D array of 1s and 0s (config) and the grid will be rendered according to the configuration. Because of this, we have to define the grid-template-columns as an inline style that uses the config's number of columns when rendering the CSS grid.

Activating/deactivating the cells can be done by adding a new class for the activated state which adds background-color: green and toggling that class.

State
Only one state is needed, order, which is the order that the cells were clicked. Assuming we flatten the 2D config array into a single dimension, each cell will correspond to an index. We can store this list of indices in the order array, adding to it when a cell is clicked.

Whether the cell is lit up can be determined by whether the cell's index exists in the order array.

Deactivation
Deactivation happens when all the cells have been activated. We know this has happened by comparing the number of items in the order array vs the number of 1s in the config; when they are the same, we can start deactivating the cells.

We can use setInterval with a duration of 300ms and remove the last value of the order array by using order.pop() each time the interval callback is invoked. Note that we need to use the callback form of setOrder, which receives the updated order value as the parameter. This is necessary because the setInterval callback's closure will be referencing a stale version of order and the callback form of setOrder will provide us with the most updated order value.

In idiomatic React, we avoid mutation as much as possible, so we make a copy of the order array first before calling pop() on it to remove the last item.

When the order array is empty, we can clear the interval timer.

Test Cases
Click on a cell, it should turn green.
Clicking on cells that are already green should not have any effect.
After clicking all 8 cells, the cells should be deactivated in reverse.
Accessibility
While a11y is not the focus of this question, there are some things we can do to improve both the a11y and user experience of this app.

Use <button>s to render the grid cells so that they are focusable via Tab and activated via Space and Enter. With this, we can activate the grid entirely using the keyboard.
All buttons should have labels, so we add aria-label with the index to describe the cell. The label can be further improved by calling out the column and row numbers instead.
It also helps to disable the button for activated cells and while deactivating, so that the cells can no longer be focused or respond to clicks.