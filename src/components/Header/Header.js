import React from 'react';
import "./Header.scss"
import {HeaderMenu} from "./HeaderMenu";
import {useHeaderControl} from "./useHeaderControl";
import {LinkItem} from "./LinkItem";
import {ReactComponent as ChevDown} from "../../resources/icons/chevron-down-white.svg";
import Task from "../../helpers/Task";


export default function Header({splash=false, ...props}) {
  const {
    showMenu,
    toggleMenu,
    getElement,
    getHeaderClassNames,
    toggleComparison,
    showModelComparison,
    setSelectedTask,
    selectedTask,
    containerRef,
    btnRef,
    headerRef
  } = useHeaderControl(props);


  const tasks = Task.getStaticTasks();

  const getExperimentLink = () => {
    let task = Task.getStaticTask(selectedTask);
    return `/experiment/new?task=${task.id}`;
  }


  return (
    <>
      {!props.splash &&
        <div className={getElement("placeholder")}>

        </div>
      }
      <div ref={headerRef} className={getHeaderClassNames()}>
        <div className={getElement("row")}>

          <div className={getElement("logo-container")}>
            <span className={getElement("beta")}>Beta</span>
            <a className={getElement("logotype")} href="/">
              <span className={getElement("logotype__ml")}>ML</span>
              <span className={getElement("logotype__modelscope")}>Modelscope</span>
            </a>
          </div>
          <div hidden={showMenu} aria-hidden={showMenu} className={getElement("menu")}>
            <LinkItem {...props} getElement={getElement} display={"Intro to MLModelscope"}
                      link={"/intro-tutorial"}/>
            <LinkItem {...props} getElement={getElement} display={"All models"} link={"/models"}/>
            <div className={getElement("compare-models")}>
              <button ref={btnRef} onClick={toggleComparison}
                      className={getElement(`compare-models-btn ${showModelComparison && "compare-models-btn-active"}`)}>
                Start a model comparison <ChevDown
                className={getElement(`compare-models-btn-icon ${showModelComparison && "compare-models-btn-icon-active"}`)}/>
              </button>


              <div ref={containerRef} style={{display: showModelComparison ? "flex" : "none"}}
                   hidden={!showModelComparison}
                   className={getElement("compare-models-container")}>
                <p className={getElement("compare-models-title")}>Choose task to use for your comparison</p>
                <div className={getElement("compare-models-tasks")}>
                  {tasks.map(task => <button onClick={() => setSelectedTask(task.id)}
                                             key={`task${task.id}`}
                                             className={getElement(`compare-models-task ${task.id === selectedTask && "compare-models-task-selected"}`)}
                                      >
                    <task.Icon className={getElement("compare-models-task-icon")}/>
                    {task.name} </button>)}
                </div>

                <a href={getExperimentLink()} className={getElement("compare-models-next")}>
                  Next
                </a>
              </div>
            </div>

          </div>
          <button onClick={toggleMenu}
                  className={getElement(`responsive-menu-icon ${showMenu && "responsive-menu-icon-open"}`)}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div aria-hidden={!showMenu} className={getElement(`responsive-menu ${showMenu && "responsive-menu-open"}`)}>
          <HeaderMenu getElement={getElement} isResponsiveMenu testMenus={props.testMenus}/>
        </div>
      </div>
    </>

  );
}