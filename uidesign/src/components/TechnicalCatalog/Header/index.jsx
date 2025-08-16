import React from "react";
import "./index.css";
import breadcrumbIcon from "../../../assets/breadcrumb-icon.svg";
import userAvatar from "../../../assets/user-avatar.png";
import dropdownArrow from "../../../assets/dropdown-arrow.svg";

/**
 * Header组件 - 顶部导航栏
 * @param {string} breadcrumbText - 面包屑导航文本，格式："工作台 / 页面名称"
 */
const Header = ({ breadcrumbText = "工作台" }) => {
  // 解析面包屑文本，将最后一部分高亮显示
  const renderBreadcrumb = () => {
    if (breadcrumbText.includes(" / ")) {
      const parts = breadcrumbText.split(" / ");
      const lastPart = parts[parts.length - 1];
      const previousParts = parts.slice(0, -1).join(" / ");

      return (
        <span>
          {previousParts} / <span className="highlight">{lastPart}</span>
        </span>
      );
    }

    return <span className="highlight">{breadcrumbText}</span>;
  };

  return (
    <header className="header">
      <div className="logo">LOGO</div>
      <div className="breadcrumb">
        <div className="breadcrumb-icon">
          <img src={breadcrumbIcon} alt="导航图标" />
        </div>
        {renderBreadcrumb()}
      </div>
      <div className="user-info">
        <div className="user-avatar">
          <img src={userAvatar} alt="用户头像" />
        </div>
        <span className="user-name">用户</span>
        <div className="dropdown-icon">
          <img src={dropdownArrow} alt="下拉箭头" />
        </div>
      </div>
    </header>
  );
};

export default Header;
