import React from "react";
import "./index.css";
import projectListIcon from "../../../assets/project-list-icon.svg";
import generateIcon from "../../../assets/generate-icon.svg";
import configIcon from "../../../assets/config-icon.svg";
import knowledgeIcon from "../../../assets/knowledge-icon.svg";
import settingsIcon from "../../../assets/settings-icon.svg";

const Sidebar = ({ activeItem = "高级配置", onItemClick }) => {
  const menuItems = [
    { id: "project-list", label: "项目清单", icon: projectListIcon },
    { id: "generate", label: "一键生成", icon: generateIcon },
    { id: "config", label: "高级配置", icon: configIcon },
    { id: "knowledge", label: "知识库", icon: knowledgeIcon },
    { id: "settings", label: "用户设置", icon: settingsIcon },
  ];

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <aside className="sidebar">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`sidebar-item ${
            item.label === activeItem ? "highlight" : ""
          }`}
          onClick={() => handleItemClick(item)}
        >
          <div className="sidebar-icon">
            <img src={item.icon} alt={`${item.label}图标`} />
          </div>
          <span>{item.label}</span>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
