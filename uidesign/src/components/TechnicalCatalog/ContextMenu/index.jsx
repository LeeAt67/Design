import React from "react";
import "./index.css";

const ContextMenu = ({ position, onAction }) => {
  const menuItems = [
    { id: "delete", label: "删除" },
    { id: "settings", label: "章节设置" },
    { id: "addSubChapter", label: "新增子章节" },
  ];

  return (
    <div
      className="context-menu"
      style={{
        display: "block",
        left: position.x + "px",
        top: position.y + "px",
      }}
    >
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="menu-item"
          onClick={() => onAction(item.id)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
