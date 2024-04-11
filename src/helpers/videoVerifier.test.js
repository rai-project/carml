import VideoVerifier from "./videoVerifier";
import expect from "expect";

describe("VideoVerifier", () => {
  let verifier;
  const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC';
  const LOAD_SUCCESS_SRC = 'http://example.com/video1.mp4';

  beforeAll(() => {
    // Mocking video.src to call the appropriate callbacks
    Object.defineProperty(HTMLVideoElement.prototype, 'src', {
      set(src) {
        if (src === LOAD_FAILURE_SRC) {
          // Simulate error with timeout
          setTimeout(() => this.onerror(new Error('mocked error')));
        } else if (src === LOAD_SUCCESS_SRC) {
          // Simulate successful loading with timeout
          setTimeout(() => this.onloadeddata());
        } else {
          // Set empty source for invalid src handling
          this.src = "";
        }
      },
    });
  });

  it("Can verify a video that exists", async () => {
    verifier = new VideoVerifier(LOAD_SUCCESS_SRC);
    let result = await verifier.Verify();

    expect(result).toEqual(true);
  });

  it("Fails a video that does not exist", async () => {
    verifier = new VideoVerifier(LOAD_FAILURE_SRC);
    let result = await verifier.Verify();

    expect(result).toEqual(false);
  });

  // Add a test for invalid URL handling
  it("Fails verification with an invalid URL", async () => {
    verifier = new VideoVerifier("invalid_url");
    let result = await verifier.Verify();

    expect(result).toEqual(false);
  });
});
