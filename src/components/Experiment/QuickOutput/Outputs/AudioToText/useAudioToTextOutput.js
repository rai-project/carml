import { useState } from "react";

export default function useAudioToTextOutput(trial) {
  const getInputAudio = () => {
    if (!trial?.inputs) return "";

    return trial?.inputs[0] ?? "";
  };

  const [input, setInput] = useState(getInputAudio());

  const getOutput = () => {
    if (!trial?.results?.responses || !trial?.results?.responses[0].features)
      return "";

    let type = trial?.results?.responses[0]?.features[0]?.type;

    switch (type) {
      case "GENERATEDTOKENS":
        return trial.results.responses[0].features[0].generated_tokens
          .map((token) => token.token)
          .join(" ");

      case "TEXT":
      default:
        return trial?.results?.responses[0]?.features[0]?.text ?? "";
    }
  };

  const getInferenceDuration = () => {
    return trial?.results?.duration_for_inference ?? "0s";
  };

  return {
    output: getOutput(),
    input,
    setInput,
    inferenceDuration: getInferenceDuration(),
  };
}
