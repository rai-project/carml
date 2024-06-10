import HomePage from "../components/HomePage/HomePage";
import ModelDetailContainer from "../routes/ModelDetailContainer";
import ModelListContainer from "../routes/ModelListContainer";
import ExperimentDetailContainer from "../routes/ExperimentDetailContainer";
import AddModelListContainer from "../routes/AddModelListContainer";
import NewExperimentContainer from "../routes/NewExperimentContainer";
import IntroTutorial from "../components/Tutorials/IntroTutorial/IntroTutorial";

const routes = [
  {
    path: "/",
    component: <HomePage/>,
  },
  {
    path: "/models",
    component: <ModelListContainer/>,
  },
  {
    path: "/model/:modelId/experiment/:experimentId",
    component: <ModelDetailContainer/>,
    exact: false,
  },
  {
    path: "/model/:modelId",
    component: <ModelDetailContainer/>,
    exact: false,
  },
  {
    path: "/experiment/:experimentId/add-models",
    component: <AddModelListContainer/>,
    exact: false,
  },
  {
    path: "/experiment/new",
    component: <NewExperimentContainer/>,
    exact: false
  },
  {
    path: "/experiment/:experimentId",
    component: <ExperimentDetailContainer/>,
    exact: false,
  },
  {
    path: "/intro-tutorial",
    component: <IntroTutorial/>,
    exact: false
  }
];

export default routes;
