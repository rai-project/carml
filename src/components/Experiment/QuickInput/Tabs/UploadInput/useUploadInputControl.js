import GetApiHelper from "../../../../../helpers/api";
import Uppy from '@uppy/core';
import AwsS3Multipart from "@uppy/aws-s3-multipart";
import {useEffect, useMemo, useState} from "react";

import UppyFileTypeCheckerPlugin from "../../../../../helpers/UppyFileTypeCheckerPlugin";
import Task from "../../../../../helpers/Task";

export const useUploadInputControl = (props) => {
  const task = Task.getStaticTask(props.task);

  const [activeUser, setActiveUser] = useState("anonymous");
  const [initialUppy, setInitialUppy] = useState(null);

  useEffect(() => {
    // Note: useMemo only saves the value once, during the inital render, 
    // but we need onComplete to update with new values for multiInput tasks
    initialUppy.on("complete", onComplete);
  }, [props.values])

  const onBeforeUpload = (files) => {
    Object.keys(files).forEach(key => {
        let file = files[key];
        files[key] = {
          ...file,
          name: `${activeUser}/${file.name}`,
        }
      });

    return files;
  }

  const onComplete = (result) => {
    // COMMENT THIS OUT BEFORE COMMITTING
    // Note: Uncomment in order to test w/o server, adding a fake uploadURL:
    // result.successful.map(x => x.uploadURL = `test_${props.inputIndex}.com`)

    const urls = result.successful.map(x => x.uploadURL);  // Response on staging seems to be { location: "https...." }, not uploadUrl?

    if (!task.useMultiInput) {
      if (typeof (props.inputSelected) === 'function') {
        let values = Array.from(props.values);
        if (values.length === 0 || values[0] === "")
          values = urls;
        else
          values = [...values, ...urls];
        
        props.inputSelected(values);
      }      
    } else {
      if (typeof (props.inputSelected) === 'function') {
        props.inputSelected(urls[0], props.inputIndex);
      }
    }
  }

  const api = GetApiHelper();
  const uppy = useMemo(() => {
    let u = new Uppy({
      autoProceed: true,
      restrictions: {
        // Note: Uppy file-type restrictions will default the upload pop-up to the 
        // allowed file types and reject any other types, but the user can intentionally
        // still force the selection of other/bad file types
        allowedFileTypes: props.allowedFileTypes.mimeTypes,
        maxNumberOfFiles: props.multiple ? 99 : 1,
      },
      onBeforeUpload: onBeforeUpload
    });

    // UNCOMMENT THIS BEFORE COMMITTING
    // Note: Comment this out in order to test w/o server
    u.use(AwsS3Multipart, {
      limit: 5,
      companionUrl: process.env.REACT_APP_COMPANION_URL
    });

    // Adding extra type-checking to prevent against files with renamed 
    // extentions from being maliciously uploaded
    u.use(UppyFileTypeCheckerPlugin, {allowedFileTypes: props.allowedFileTypes.fileTypes});

    setInitialUppy(u);
    
    return u;
  }, [])

  useEffect(() => {
    api.ActiveUser.subscribe({
      next: (user) => {
        setActiveUser(user.id);
      }
    });


  }, [])

  return {
    uppy
  }
}
