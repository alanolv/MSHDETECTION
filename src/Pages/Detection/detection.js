import React, { useEffect, useRef } from "react";
import * as tmImage from "@teachablemachine/image";
import Logo from "../../Assets/Images/LogoMSH.png";
import "./detection.css";

const TeachableMachine = () => {
  const URL = "https://teachablemachine.withgoogle.com/models/ZzrUz1pCU/";
  let model, webcam, labelContainer, maxPredictions;
  const webcamRef = useRef(null);
  const labelContainerRef = useRef(null);
  const lastSpokenLabelRef = useRef("");
  let frameCount = 0;

  const init = async () => {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(300, 300, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    if (webcamRef.current && !webcamRef.current.hasChildNodes()) {
      webcamRef.current.appendChild(webcam.canvas);
    }
    labelContainer = labelContainerRef.current;
    if (labelContainer && labelContainer.childNodes.length === 0) {
      labelContainer.appendChild(document.createElement("div"));
    }
  };

  const loop = async () => {
    webcam.update();
    frameCount++;
    if (frameCount % 80 === 0) { // Analyze every 10 frames
      await predict();
    }
    window.requestAnimationFrame(loop);
  };

  const predict = async () => {
    if (!webcam.canvas) return; // Ensure webcam canvas is available
    const prediction = await model.predict(webcam.canvas);
    let highestPrediction = prediction[0];
    for (let i = 1; i < maxPredictions; i++) {
      if (prediction[i].probability > highestPrediction.probability) {
        highestPrediction = prediction[i];
      }
    }

    if (highestPrediction.probability >= 0.9) { // Only render if probability is >= 90%
      const classPrediction =
        highestPrediction.className + ": " + highestPrediction.probability.toFixed(2);
      labelContainer.childNodes[0].innerHTML = classPrediction;

      if (highestPrediction.className !== lastSpokenLabelRef.current) {
        speak(highestPrediction.className);
        lastSpokenLabelRef.current = highestPrediction.className;
      }
    } else {
      labelContainer.childNodes[0].innerHTML = ""; // Clear the label if probability is < 90%
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="detection-container">
      <div className="navbar">
        <img src={Logo} alt="Logo" width={60} height={50} />
      </div>
      <div className="detection-card">
        <h2>MSHDETECTION</h2>
        <div id="webcam-container" ref={webcamRef}></div>
        <div id="label-container" ref={labelContainerRef} className="label-container"></div>
      </div>
    </div>
  );
};

export default TeachableMachine;