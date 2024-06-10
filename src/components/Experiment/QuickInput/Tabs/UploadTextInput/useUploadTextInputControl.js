import {useMemo} from "react";
import Uppy from "@uppy/core";
import {XHRUpload} from "uppy";
import Task from "../../../../../helpers/Task";

export default function useUploadTextInputControl(props) {
    const task = Task.getStaticTask(props.task);
    const uppy = useMemo(() => {
        let u = new Uppy({
            autoProceed: true, restrictions: {
                maxNumberOfFiles: props.multiple ? 99 : 1,
                allowedFileTypes: ['text/*']
            }, onBeforeUpload: (file) => {
                const reader = new FileReader();

                reader.onloadend = () => {
                    const text = reader.result;
                    if (typeof (props.inputSelected) === "function") props.inputSelected(text);
                };

                reader.readAsText(file[Object.keys(file)[0]].data);
                return false;
            }
        });

        u.use(XHRUpload, {});
        u.on('file-added', (file) => {
            console.log(file);
        });

        return u;
    }, []);

    return {task, uppy};
}