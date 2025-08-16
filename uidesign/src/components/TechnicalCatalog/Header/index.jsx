import React from "react";
import "./index.css";
import breadcrumbIcon from "../../../assets/breadcrumb-icon.svg";
import userAvatar from "../../../assets/user-avatar.png";
import dropdownArrow from "../../../assets/dropdown-arrow.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">LOGO</div>
      <div className="breadcrumb">
        <div className="breadcrumb-icon">
          <img src={breadcrumbIcon} alt="导航图标" />
        </div>
        <span>
          工作台 / <span className="highlight">高级配置</span>
        </span>
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
