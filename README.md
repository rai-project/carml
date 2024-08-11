# MLModelScope Frontend

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (== 14.21.3 is the confirmed working version)
    - It is recommended to use [nvm](https://github.com/nvm-sh/nvm#intro) to manage your Node.js versions across
      multiple projects
- [Docker](https://docs.docker.com/get-docker/) (latest version)
  and [Docker Compose](https://docs.docker.com/compose/install/) (latest version)
    - Docker is used to run the backend services (e.g. database, MLModelScope server) locally
    - Run the compose file found in the corresponding API repository in order to start the backend services for use in
      local development (https://github.com/c3sr/mlmodelscope-api)

### First-time setup

1. Install dependencies

    ```bash
    npm install
    ```

2. Copy `.env.example` to `.env`. The default values in `.env.example` should be suitable for local development.

    ```bash
    cp .env.example .env
    ```

### Running the app

In order to run the app completely, make sure the backend services are running (see Prerequisites above), then run the
following command:

```bash
npm start
```

This will start the frontend app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in
the browser.

### Running storybook

Storybook is a tool for developing UI components in isolation. It is useful for developing and testing components.
Additionally, there is a storybook deployment that is automatically updated when the `develop` branch is updated. The
storybook deployment can be found [here](http://storybook.mlmodelscope.org).

To run storybook locally, run the following command:

```bash
npm run storybook
```

This will start storybook in development mode. Open [http://localhost:6006](http://localhost:6006) to view it in the
browser.

### Running tests

To run the unit tests inside the terminal, run the following command:

```bash
npm test
```

In addition, most IDEs have a way to run tests from within the IDE. Refer to your IDE's documentation for more
information on how to run Jest tests.

## Project Structure

The project is structured as follows:

- `src/` - Contains the source code for the frontend app
    - `components/` - Where the components for each of the pages reside. Subfolders within this folder are grouped by
      individual pages that are displayed on the website. Note that the React component (.js[x]), styles (.scss), and
      associated React hooks (use[*].js) will always be found within the same directory.
    - `resources/` - Contains the resources (e.g. images, icons, etc.) used by the frontend app
    - `/router/` - Contains page routes. Any new pages to the website are added through the routes array
      in `router/config.js`
    - `/routes/` - Contains any wrapper components for specific page routes (for example, different wrappers for the
      model listing page for whether it is in "add mode" or "list mode"
    - `/helpers/` - Contains helper functions and classes that are used throughout the frontend app
- `/public/` - Contains the public assets for the frontend app (e.g. favicon, index.html, etc.)
- `/.storybook/` - Contains the configuration for storybook
- `/scripts/` - Contains scripts that are used for development and deployment

## Recommended Workflow for creating new Tasks (WIP)
- Add the task name to `TaskIDs.js`. Use camelcase for the variable and snakecase for the string

- Create a new `Task` in `Task.js`
  - Search svgrepo.com for a suitable icon and add it to the `icons` folder (see below for more instructions)
  - Add the new task to:
    - `getStaticTasks`
    - `getDefaultModel`
      -  Open `DefaultModels.js` and copy/paste one of the existing models (editing where appropriate)
    - `getSampleOutput` 
      - Return the `Test[Task Name]Output` that you created in `testData` (see next bullet point)  

- Make a new directory in `Outputs` and create:
  - `testData` subdirectory
    - `testTaskNameOutput.js`
  - `TaskNameOutput.js`
  - `TaskName.stories.js`
  - `TaskName.scss`

- Create a new story for the task in `QuickInput.stories.js`

- If the task requires new input type(s), you will need to add those:
  - Add the new input type to `TaskInputTypes` and `QuickInputType`
  - Update `SampleInputsTab`:
    - Open `sampleImages.js` and add `Sample[TaskName]Inputs`. If your task is using `useMultiInput` then you will need to make a parent array, and then for each input type another array of sample input objects.
    - Add the new input type to `makeSampleInput`
    - Create a `makeSample[input type]Input` function
    - Add the new input type with appropriate text to `makeTaskTitle`
    - Update the `SampleInputsTab.scss` file with styling for what the selected/unselected states of the new input type should look like
  - Update `UploadInputsTab` as necessary
    - If the user is able to upload files for this task, add the task ID to `UppyFileTypeCheckerPlugin` so that Uppy will only allow the correct file types to be selected/sent to the server  
    - WIP...
  - Update `URLInputsTab` as necessary
    - Be sure to read the `IMPORTANT` comment before editing the inputs
    - WIP...



- Add the new task to `ModelDetailPage` in `getSampleInputs` and `getInputType`

- ...to be continued
- Additional Notes:
  - To test the upload dashboard in storybook, open `useUploadInputControl` and:
    - Find the text `COMMENT THIS OUT BEFORE COMMITTING` and uncomment it.
    - Find the text `UNCOMMENT THIS BEFORE COMMITTING` and comment it out.
    - Be sure to reset these when you are finished. These changes are necessary to avoid making a call to S3 (which will not work) as well as to make a fake `uploadURL` so that our code will continue to execute as if the S3 call was successful.
  - To see what your currently-selected inputs, and the current state of the data that will be sent to the API (prior to clicking the "Run Model" button), go to `useQuickInputControl.js` and uncomment the useEffect with `console.log`s in it.
  - To check the array of inputs that you are submitting to the API, add an `onRunModelClicked` function to your task in `QuickInput.stories.js` (it takes the inputs as a param). Because of how Storybook works, the component you're building won't be passed the real method, but you can make a mock in the stories file to test behavior.
    - See `TextConversationOutput.stories.js` for an example of how to test api requests in this way

## Adding new Task icons
- Go to svgrepo.com, search for a suitable icon, download it, and drag the file into the `src/resources/icons` directory
- Rename the file to follow the `icon-taskNameInCamelCase.svg` structure that all of the other Task icons use
- Import the file to `Task.js` and finish Task setup as usual.
- You can view the icon in the `Home` -> `Splash Page` Storybook.
- After deploying to Staging (or locally if you have the React app running), the icon is also visible on the `All Models` page, in the "Filter Models by Tasks" menu on the left.
- The icon colors should be white and blue. If you notice black lines, you'll need to use css to adjust those.
  - Open the svg file, and if the file isn't already formatted, from the main VS Code menu, select `View` and then `Command Pallet`, and then type `Format document` into the search bar (you may need to install XML Tools)
  - Now open the `Header.scss` and `_FilterGroup.scss` files and find the related styling (Search for this text: `// Styling for .svg Task icons to make sure they are $white and $azul`)
  - Compare the xml tags against the styling here, and update as necessary
  
## Recommended Workflow for creating new components

Create a new folder in `src/components/` with the name of the component, and create the following files as needed:

- `[ComponentName].jsx` - The main React component
- `[ComponentName].scss` - The styles for the component
    - Note that any new stylesheets should also be imported into `src/Stopgap.scss`
- `use[*].js` - Any React hooks that are used by the component
- `[ComponentName].stories.jsx` - The storybook stories for the component
- `[ComponentName].test.jsx` - The unit tests for the component
- `use[*].test.js` - The unit tests for the React hooks

## Creating multi-image sample images:
- Some tasks, such as `ImageTo3D`, use a collection of images rather than a single image on the sample tab
- In order to easily display and select them as a group while preserving current functionality, we can use an image-editing tool to combine the images. You are welcome to use any tool you wish, but here are the steps to do so with Figma (free to sign up):
1. Drag any images you want from your folder to the Figma canvas & line them up in a row.
2. Select the "square" tool from the upper-left corner, and draw a square on the canvas, around one of the images. Then, on the right side menu, click the `-` button in the `Fill` row. This should make your square transparent except for its outer border.
3. Copy and paste the square until you have one for each image, and move them to frame each image (to give the appearance that the images are separate, rather than one large image).
4. Click on the canvas and drag to select all of the images+squares, then right-click on them and select `Group selection` to combine them.
  - On the right menu you'll also see the option to adjust the dimensions of your new Group. You can shrink them down to a smaller number, but be sure to click the `Constrain Proportions` button to link X and Y and the dimensions the same (it is the small button next to the `W` and `H` values).
5. At the bottom of the right menu, you'll see the `Export` option. Use that to export your image as a `.png`, and add it to the project.
6. Update the `tasksWithLargeImages` array in `SampleInputsTab.js` with the task that you are adding.

### Writing tests for UI components
Note: Enzyme is no longer supported by React
This project uses [Enzyme](https://enzymejs.github.io/enzyme/) for testing React components. Enzyme is a testing utility
for React that makes it easier to test React components. It is recommended to use Enzyme's shallow rendering API to test
components. Shallow rendering is useful for testing components in isolation, and it is recommended to use shallow
rendering for unit tests. For more information on shallow rendering, refer to
the [Enzyme documentation](https://enzymejs.github.io/enzyme/docs/api/shallow.html). Note that due to some shortcomings
in Enzyme's ability to test React hooks, it is recommended to use
the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing React hooks.

### Project Wiki

https://wiki.mlmodelscope.org
