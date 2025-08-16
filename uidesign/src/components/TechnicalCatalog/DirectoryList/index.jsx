import React from "react";
import "./index.css";

const DirectoryList = ({
  chapters,
  activeChapter,
  onChapterClick,
  onMoreOptions,
  onToggleExpand,
}) => {
  const renderChapter = (chapter, level = 0) => {
    const isActive = chapter.id === activeChapter;
    const hasChildren = chapter.children && chapter.children.length > 0;
    const isExpanded = chapter.expanded !== false;

    const getItemClass = () => {
      switch (chapter.type) {
        case "chapter":
          return "chapter-item";
        case "section":
          return "section-item";
        case "subsection":
          return "subsection-item";
        case "item":
          return "item-item";
        default:
          return "chapter-item";
      }
    };

    const getTitleClass = () => {
      switch (chapter.type) {
        case "chapter":
          return "chapter-title";
        case "section":
          return "section-title";
        case "subsection":
          return "subsection-title";
        case "item":
          return "item-title";
        default:
          return "chapter-title";
      }
    };

    const getNumberClass = () => {
      switch (chapter.type) {
        case "chapter":
          return "chapter-number";
        case "section":
          return "section-number";
        case "subsection":
          return "subsection-number";
        case "item":
          return "item-number";
        default:
          return "chapter-number";
      }
    };

    const getDescClass = () => {
      switch (chapter.type) {
        case "chapter":
          return "chapter-desc";
        case "section":
          return "section-desc";
        case "subsection":
          return "subsection-desc";
        case "item":
          return "item-desc";
        default:
          return "chapter-desc";
      }
    };

    return (
      <React.Fragment key={chapter.id}>
        <div
          className={`${getItemClass()} ${isActive ? "active-chapter" : ""}`}
        >
          <div
            className={getTitleClass()}
            onClick={() => hasChildren && onToggleExpand(chapter.id)}
          >
            <div className={getNumberClass()}>{chapter.number}</div>
            <div
              className="dropdown-icon"
              style={{
                transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.27618 9.81824C7.31827 9.79394 7.36354 9.77614 7.40075 9.73891C7.40727 9.73079 7.41206 9.72437 7.41857 9.71787C7.42669 9.70818 7.43961 9.70494 7.44766 9.69682L11.8149 5.16619C11.9314 5.04646 11.9897 4.8911 11.9897 4.73576C11.9897 4.57394 11.925 4.4105 11.7987 4.28915C11.5512 4.05129 11.1579 4.05777 10.9201 4.30533L6.98166 8.39261L3.09991 4.28915C2.86366 4.03998 2.47046 4.02861 2.22129 4.26486C1.9721 4.50112 1.96074 4.89431 2.19699 5.14348L6.52216 9.7162C6.71143 9.91685 7.00271 9.95408 7.23896 9.84079C7.25188 9.83601 7.26326 9.82463 7.27618 9.81819V9.81824Z"
                  fill="#8E93A6"
                />
              </svg>
            </div>
          </div>
          <div
            className={getDescClass()}
            onClick={() => onChapterClick(chapter.id)}
          >
            {chapter.title}
          </div>
          {renderStatusIcon(chapter)}
          {chapter.status === "error" && chapter.errorCount ? (
            <div
              className="error-count clickable"
              onClick={(e) => onMoreOptions(e, chapter.id)}
            >
              {chapter.errorCount}项
            </div>
          ) : (
            <div
              className="more-options"
              onClick={(e) => onMoreOptions(e, chapter.id)}
            >
              <svg
                width="12"
                height="4"
                viewBox="0 0 12 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.3336 0.665649C0.6 0.665649 0 1.26565 0 1.99925C0 2.73205 0.6 3.33205 1.3336 3.33205C2.0664 3.33205 2.6664 2.73205 2.6664 1.99925C2.6664 1.26565 2.0664 0.665649 1.3336 0.665649ZM10.6664 0.665649C9.9336 0.665649 9.3336 1.26565 9.3336 1.99925C9.3336 2.73205 9.9336 3.33205 10.6664 3.33205C11.4 3.33205 12 2.73205 12 1.99925C12 1.26565 11.4 0.665649 10.6664 0.665649ZM6 0.665649C5.2664 0.665649 4.6664 1.26565 4.6664 1.99925C4.6664 2.73205 5.2664 3.33205 6 3.33205C6.7336 3.33205 7.3336 2.73205 7.3336 1.99925C7.3336 1.26565 6.7336 0.665649 6 0.665649Z"
                  fill="black"
                />
              </svg>
            </div>
          )}
          {chapter.content && chapter.content.trim() && (
            <div className="chapter-content-preview">
              {chapter.content.length > 120
                ? chapter.content.substring(0, 120) + "..."
                : chapter.content}
            </div>
          )}
        </div>

        {/* 渲染子章节 */}
        {hasChildren && isExpanded && (
          <div
            className={
              chapter.type === "section"
                ? "subsection-list"
                : chapter.type === "subsection"
                ? "item-list"
                : ""
            }
          >
            {chapter.children.map((child) => renderChapter(child, level + 1))}
          </div>
        )}
      </React.Fragment>
    );
  };

  const renderStatusIcon = (chapter) => {
    if (chapter.status === "error") {
      return <div className="status-icon error">!</div>;
    } else if (chapter.status === "completed") {
      return <div className="status-icon completed"></div>;
    } else if (chapter.status === "draft") {
      return <div className="status-icon draft"></div>;
    }
    return null;
  };

  return (
    <div className="directory-list">
      {chapters.map((chapter) => renderChapter(chapter))}
    </div>
  );
};

export default DirectoryList;
