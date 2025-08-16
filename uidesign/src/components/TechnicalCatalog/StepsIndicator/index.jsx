import React from "react";
import "./index.css";

const StepsIndicator = ({ activeStep = 3 }) => {
  const steps = [
    {
      number: 1,
      title: "解析文件",
      desc: "解析招标文件信息",
    },
    {
      number: 2,
      title: "编写标书目录结构",
      desc: "确认目录框架细节",
    },
    {
      number: 3,
      title: "生成投标文件",
      desc: "生成投标文件校验和下载",
    },
  ];

  return (
    <div className="steps-container">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`step ${step.number === activeStep ? "active" : ""}`}
        >
          <div className="step-number">{step.number}</div>
          <div className="step-info">
            <div className="step-title">{step.title}</div>
            <div className="step-desc">{step.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepsIndicator;
