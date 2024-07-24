import React from "react";
import ModelList from "./ModelList";
import Task from "../../helpers/Task";
import {
    getFrameworkFromQueryString,
    getMachineFromQueryString,
    getTaskFromQueryString
} from "../../helpers/QueryParsers";
import {FilterGroupNames} from "../../helpers/FilterGroupNames";
import useModelListSelection from "./useModelListSelection";
import useModelListWithFilters from "./useModelListWithFilters";

export const getDefaultGroups = (frameworkOptions = [], machineOptions = []) => {
    const isFrameworkInQueryString = (id) => getFrameworkFromQueryString(window.location.search) === id;
    const isMachineInQueryString = (id) => getMachineFromQueryString(window.location.search) === id;
    const isTaskInQueryString = (id) => getTaskFromQueryString(window.location.search) === id;

    const taskOptions = Task.getStaticTasks().map(task => ({
        name: task.id,
        label: task.name,
        isActive: isTaskInQueryString(task.id)
    }));

    return [
        {
            header: FilterGroupNames.tasks,
            description: "What the model is trained to do (select one)",
            select: "single",
            dataPath: ["output", "type"],
            options: taskOptions,
            id: "task"
        },
        {
            header: FilterGroupNames.frameworks,
            description: "What the model is running on (select one)",
            select: "single",
            dataPath: ["framework", "name"],
            options: frameworkOptions.map(framework => ({
                ...framework,
                isActive: isFrameworkInQueryString(framework.name)
            })),
            id: "framework"
        },
        {
            header: FilterGroupNames.machines,
            description: "Hardware that processes the model's functions",
            select: "single",
            dataPath: ["framework", "architectures", "0", "name"],
            options: machineOptions.map(machine => ({
                ...machine,
                isActive: isMachineInQueryString(machine.name)
            })),
            id: "machine"
        }
    ];
}

const defaultProps = {
    add: false,
    runModels: () => {
    },
    selectedModels: []
}

export default function ModelListWithFilters(givenProps) {
    const props = {...defaultProps, ...givenProps};

    const selection = useModelListSelection();
    // console.log(props.frameworkOptions)
    const filtering = useModelListWithFilters(props.frameworkOptions, props.models, props.machineOptions, selection.selectedModels);

    return (
        <ModelList
            {...props}
            {...selection}
            {...filtering}
            models={filtering.filteredModels}
        />
    )
}
