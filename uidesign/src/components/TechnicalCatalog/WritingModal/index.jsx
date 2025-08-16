import React, { useState, useRef } from "react";
import "./index.css";

const WritingModal = ({ chapter, onSave, onClose }) => {
  const [content, setContent] = useState(chapter.content || "");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const editorRef = useRef(null);

  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      setHasUnsavedChanges(newContent !== (chapter.content || ""));
    }
  };

  const handleToolbarAction = (action) => {
    document.execCommand(action, false, null);
    editorRef.current?.focus();
    handleContentChange();
  };

  const handleSave = (isDraft = false) => {
    const finalContent = editorRef.current?.innerHTML || content;
    onSave(finalContent, isDraft);
    if (!isDraft) {
      setHasUnsavedChanges(false);
    }
  };

  const handleClose = () => {
    if (hasUnsavedChanges) {
      if (window.confirm("有未保存的更改，确定要关闭吗？")) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const toolbarButtons = [
    { action: "bold", label: "粗体" },
    { action: "italic", label: "斜体" },
    { action: "underline", label: "下划线" },
    { action: "insertUnorderedList", label: "列表" },
  ];

  return (
    <div className="writing-modal-overlay">
      <div className="writing-modal-container">
        <div className="writing-modal-header">
          <h3>
            编写章节：{chapter.number} {chapter.title}
          </h3>
          <button className="writing-modal-close" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="writing-modal-body">
          <div className="writing-toolbar">
            {toolbarButtons.map((btn) => (
              <button
                key={btn.action}
                className="toolbar-btn"
                onClick={() => handleToolbarAction(btn.action)}
              >
                {btn.label}
              </button>
            ))}
          </div>
          <div className="writing-content">
            <div
              ref={editorRef}
              className="content-editor"
              contentEditable="true"
              suppressContentEditableWarning={true}
              onInput={handleContentChange}
              onBlur={handleContentChange}
              placeholder="请输入章节内容..."
              dangerouslySetInnerHTML={{
                __html:
                  content || `<p>开始编写 ${chapter.number} 的内容...</p>`,
              }}
            />
          </div>
        </div>
        <div className="writing-modal-footer">
          <button className="btn-save-draft" onClick={() => handleSave(true)}>
            保存草稿
          </button>
          <button className="btn-cancel" onClick={handleClose}>
            取消
          </button>
          <button className="btn-save" onClick={() => handleSave(false)}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritingModal;
