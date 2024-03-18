// import BasePlugin from '@uppy/core/lib/BasePlugin.js';
import Uppy from '@uppy/core';

import fileTypeChecker from "file-type-checker";


export default class UppyFileTypeCheckerPlugin extends Uppy.Plugin {
	constructor(uppy, opts) {
		super(uppy, opts);
        console.log('opts', opts)
		this.id = opts.id || 'UppyFileTypeCheckerPlugin';
        // A type can be anything—some plugins use types to decide whether to do something to some other plugin.
		// https://uppy.io/docs/guides/building-plugins/
        this.type = 'upload-preprocessor';

        this.allowedFileTypes = opts.allowedFileTypes;

        this.prepareUpload = this.prepareUpload.bind(this); // ← this!

        this.confirmFileType = this.confirmFileType.bind(this);
	}

    confirmFileType = async (fileIDs) => {
        const file = this.uppy.getFile(fileIDs[0]);
        // console.log('file', file)
        const blob = new Blob([file.data])
        // console.log('blob', blob)
        const bufferResult = await blob.arrayBuffer()
        // console.log(bufferResult)
        const fileCheckerResult = fileTypeChecker.detectFile(bufferResult)
        // console.log(fileCheckerResult)
        console.log('allowed file types', this.allowedFileTypes)

        const validation = fileTypeChecker.validateFileType(bufferResult, this.allowedFileTypes);
        console.log('validation: ', validation)  

        if (validation) {
            return Promise.resolve()
        } else {
            this.uppy.cancelAll();
            // Show error message to user
            this.uppy.info(`Something went wrong while adding "${file.data.name}". ` + 
            `Please check that the file extension is correct, or try a different file.`, 'error', 10000);  

            return Promise.reject(new Error(`"${file.data.name}" failed validation by file-type-checker. ` + 
            `Confirm the extension is correct and that it is in the list of allowed file types.`));
        }



        // return Promise.resolve();        
    }    

    async prepareUpload(fileIDs) {
        console.log(fileIDs)
		console.log(this); // `this` refers to the `MyPlugin` instance.


		return Promise.resolve();
	}
	install() {
		this.uppy.addPreProcessor(this.prepareUpload);

        this.uppy.addPreProcessor(this.confirmFileType);
	}

	uninstall() {
		this.uppy.removePreProcessor(this.prepareUpload);

        this.uppy.removePreProcessor(this.confirmFileType);
	}    
}