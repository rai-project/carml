export default class AudioVerifier {
    constructor(url) {
        this.url = url;
    }

    _timer;
    _timeout;

    async Verify(timeoutOverride) {
        this._timeout = timeoutOverride || 5000;

        return await this._testAudio();
    }

    async _testAudio() {
        return await new Promise((res) => {
            let audio = new Audio();

            const errorHandler = this._errorHandler.bind(this, res);
            const loadHandler = this._loadHandler.bind(this, res);

            audio.onerror = errorHandler;
            audio.onabort = errorHandler;
            audio.oncanplaythrough = loadHandler;

            audio.src = this.url;

            this._timer = this._timeoutHandler(audio, res);
        });
    }

    _loadHandler(resolve) {
        clearTimeout(this._timer);
        resolve(true);
    }

    _errorHandler(resolve) {
        clearTimeout(this._timer);
        resolve(false);
    }

    _timeoutHandler(audio, resolve) {
        return setTimeout(() => {
            audio.src = "";
            resolve(false);
        }, this._timeout);
    }
}
