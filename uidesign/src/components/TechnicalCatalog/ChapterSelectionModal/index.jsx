import React, { useState } from "react";
import "./index.css";

const ChapterSelectionModal = ({ chapters, onSelect, onClose }) => {
  const [selectedChapter, setSelectedChapter] = useState(null);

  const flattenChapters = (chapters) => {
    let result = [];
    const traverse = (chapters, level = 0) => {
      chapters.forEach((chapter) => {
        result.push({ ...chapter, level });
        if (chapter.children) {
          traverse(chapter.children, level + 1);
        }
      });
    };
    traverse(chapters);
    return result;
  };

  const flatChapters = flattenChapters(chapters);

  const handleConfirm = () => {
    if (selectedChapter) {
      onSelect(selectedChapter);
    }
  };

  return (
    <div className="chapter-modal-overlay">
      <div className="chapter-modal-container">
        <div className="chapter-modal-header">
          <h3>选择要编写的章节</h3>
          <button className="chapter-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="chapter-modal-body">
          <div className="chapter-selection-list">
            {flatChapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className="chapter-selection-item"
                style={{ marginLeft: `${chapter.level * 20}px` }}
              >
                <input
                  type="radio"
                  name="selectedChapter"
                  value={index}
                  id={`chapter_${index}`}
                  onChange={() => setSelectedChapter(chapter)}
                />
                <label htmlFor={`chapter_${index}`}>
                  <span className="chapter-number">{chapter.number}</span>
                  <span className="chapter-title">{chapter.title}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="chapter-modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            取消
          </button>
          <button
            className="btn-confirm"
            disabled={!selectedChapter}
            onClick={handleConfirm}
          >
            开始编写
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChapterSelectionModal;
