export default class VideoVerifier {
  constructor(url) {
    this.url = url;
  }

  _timer;
  _timeout;

  async Verify(timeoutOverride) {
    this._timeout = timeoutOverride || 5000;

    return await this._testVideo();
  }

  async _testVideo() {
    return await new Promise((resolve) => {
      const video = document.createElement('video');

      const errorHandler = this._errorHandler.bind(this, resolve);
      const loadedDataHandler = this._loadedDataHandler.bind(this, resolve);

      video.onerror = errorHandler;
      video.onabort = errorHandler;
      video.onloadeddata = loadedDataHandler;

      video.src = this.url;

      this._timer = this._timeoutHandler(video, resolve);
    });
  }

  _loadedDataHandler(resolve) {
    clearTimeout(this._timer);
    resolve(true);
  }

  _errorHandler(resolve) {
    clearTimeout(this._timer);
    resolve(false);
  }

  _timeoutHandler(video, resolve) {
    return setTimeout(() => {
      video.src = ""; // Set an invalid source to trigger error
      resolve(false);
    }, this._timeout);
  }
}
