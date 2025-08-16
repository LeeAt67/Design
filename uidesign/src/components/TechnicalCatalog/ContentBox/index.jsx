import React from "react";
import "./index.css";
import DirectoryList from "../DirectoryList";

const ContentBox = ({
  activeTab,
  setActiveTab,
  chapters,
  activeChapter,
  onChapterClick,
  onMoreOptions,
  onToggleExpand,
  onWriteChapter,
}) => {
  const tabs = ["商务标目录", "技术标目录"];

  return (
    <div className="content-box">
      {/* 标签页 */}
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
        <div className="one-click-btn">一键编写全文</div>
      </div>

      {/* 表头 */}
      <div className="table-header">
        <div className="header-item">返回</div>
        <div className="header-item">项目名称</div>
        <div className="header-item">编辑</div>
      </div>

      {/* 内容区域 */}
      <div className="content-area">
        <DirectoryList
          chapters={chapters}
          activeChapter={activeChapter}
          onChapterClick={onChapterClick}
          onMoreOptions={onMoreOptions}
          onToggleExpand={onToggleExpand}
        />

        {/* 未编写章节 */}
        <div className="empty-chapter">
          <h3>本章节未编写</h3>
          <p>点击下方"编写本章节"或右上角"一键编写全文"开始编写</p>
          <button className="write-btn" onClick={onWriteChapter}>
            编写本章节
          </button>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="footer-buttons">
        <button className="prev-btn">上一步</button>
        <button className="next-btn">下一步</button>
      </div>
    </div>
  );
};

export default ContentBox;
