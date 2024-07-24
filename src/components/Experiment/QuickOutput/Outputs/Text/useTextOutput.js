import { useState } from "react";

export default function useTextOutput(trial) {

  const getInput = () => {
    let type = trial?.inputs[0]?.inputType;
    switch (type) {
      case "TEXT":
        return trial?.inputs[0]["src"] ?? "";
      default:
        return trial?.inputs[0];
    }
  };

  const getInferenceDuration = () => {
    return trial?.results?.duration_for_inference ?? "0s";
  };

  const [input, setInput] = useState(getInput());
  const [inferenceDuration, setInferenceDuration] = useState(getInferenceDuration());

  const getOutput = () => {
    if (!trial?.results?.responses || !trial?.results?.responses[0].features)
      return "";

    let type = trial?.results?.responses[0]?.features[0]?.type;

    switch (type) {
      case "GENERATEDTOKENS":
        return trial.results.responses[0].features[0].generated_tokens
          .map((token) => token.token)
          .join(" ");
      case "AUDIO":
      case "3D_MODEL":
        return trial?.results?.responses[0]?.features[0] ?? "";
      case "TEXT":
      default:
        return trial?.results?.responses[0]?.features[0]?.text ?? "";
    }
  };

  return {
    output: getOutput(),
    input,
    setInput,
    inferenceDuration,
    setInferenceDuration
  };
}