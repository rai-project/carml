import GetApiHelper from "../../../../../helpers/api";
import Uppy from '@uppy/core';
import AwsS3Multipart from "@uppy/aws-s3-multipart";
import {useEffect, useMemo, useState} from "react";

import fileTypeChecker from "file-type-checker";

import { audioToText, image_classification, image_enhancement, object_detection, semantic_segmentation } from '../../../../../helpers/TaskIDs';
import UppyFileTypeCheckerPlugin from "../../../../../helpers/UppyFileTypeCheckerPlugin";

export const getAllowedFileTypes = (task) => {
  switch (task) {
    case audioToText:
      return {
        fileTypes: ['aac', 'amr', 'flac', 'mp3', 'mp4', 'm4a', 'wav', 'webm'],
        mimeTypes: ['audio/*', 'video/*'],
      };
    case image_classification:
    case image_enhancement:
    case object_detection:
    case semantic_segmentation:
      return {
        fileTypes: ['bmp', 'gif', 'ico', 'jpeg', 'pdf', 'png', 'psd'],
        mimeTypes: ['image/*']
      };
    default:
      // Allow all file types? Or disallow all file types?
      return {
        fileTypes: ['*'],
        mimeTypes: '*/*'
      };
  }
}

const checkFileType = (file, allowedFileTypes) => {
  console.log('--non async check--')
  console.log('FILE DATA: ', file);
  const reader = new FileReader();
  reader.onload = function(completionEvent) {
    // console.log(completionEvent)

    const result = completionEvent.currentTarget.result;
    // console.log(result)

    const fileCheckerResult = fileTypeChecker.detectFile(result)
    // Note: Sometimes a renamed file seems to just return undefined?
    if (fileCheckerResult === undefined) {
      console.log('xxxxx undefined xxxxx')
      // how do we throw an uppy error?
      // return false;
    }

    console.log('fileCheckerResult', fileCheckerResult)
    
    const validation = fileTypeChecker.validateFileType(result, allowedFileTypes);
    console.log('validation: ', validation)    
    return validation;
  }

  reader.readAsArrayBuffer(file);

}

const confirmFileType = async (file, allowedFileTypes) => {
  const blob = new Blob([file])
  const bufferResult = await blob.arrayBuffer()
  console.log(bufferResult)

  const fileCheckerResult = fileTypeChecker.detectFile(bufferResult)
  console.log(fileCheckerResult)

  const validation = fileTypeChecker.validateFileType(bufferResult, allowedFileTypes);
  console.log('validation: ', validation)  

  return validation;

}

export const useUploadInputControl = (props) => {
  // console.log('useUploadInputControl props', props)
  const [activeUser, setActiveUser] = useState("anonymous");

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
    const urls = result.successful.map(x => x.uploadURL);
    if (typeof (props.inputSelected) === 'function') {
      let values = Array.from(props.values);
      if (values.length === 0 || values[0] === "")
        values = urls;
      else
        values = [...values, ...urls];
      props.inputSelected(values);

    }
  }


  const api = GetApiHelper();
  const uppy = useMemo(() => {
    let u = Uppy({
      autoProceed: true,
      restrictions: {
        allowedFileTypes: props.allowedFileTypes.mimeTypes,
        maxNumberOfFiles: props.multiple ? 99 : 1,
      },
      // onBeforeFileAdded: async (file) => {
      //   // In the event that a user has deliberately changed a file extension to upload a "bad" file,
      //   // we'll confirm the file type via file signature here
      //   console.log('on before file added');
      //   console.log(file)

      //   // Check file validity
      //   const isValidFile = checkFileType(file.data, props.allowedFileTypes.fileTypes);  // Non async version

      //   // const isValidFile = await confirmFileType(file.data, props.allowedFileTypes.fileTypes);
      //   console.log('isValidFile', isValidFile)

      //   if (!isValidFile) {
      //     // Show error message to user
      //     u.info(`Something went wrong while adding "${file.data.name}".
      //     Please check that the the file extension is correct, or try a different file.`, 'error', 10000);
      //   }
      
      //   // Return t/f 
      //   return isValidFile;
      // },
      onBeforeUpload: onBeforeUpload
    });

    u.use(AwsS3Multipart, {
      limit: 5,
      companionUrl: process.env.REACT_APP_COMPANION_URL
    });

    u.use(UppyFileTypeCheckerPlugin, {allowedFileTypes: props.allowedFileTypes.fileTypes})

    // u.on('file-added', async (file) => {
    //   console.log(file);
    //   const isValidFile = await confirmFileType(file.data, props.allowedFileTypes.fileTypes);
    //   console.log(isValidFile)
    //   if (!isValidFile) {
    //     u.setFileState(file.id, 0)
    //     // u.removeFile(file.id);
    //     u.cancelAll();
    //     u.setState({
    //       files: {}
    //     })
    //     return false
    //   } else {
    //     return true;
    //   }
    // });

    u.on('restriction-failed', (file, error) => {
      // This is thrown if the user attempts to upload an unallowed file type
      console.log('*** this file is not allowed ***')

      // TODO: do some customized logic like showing system notice to users
    });    

    u.on("complete", onComplete);
    
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
