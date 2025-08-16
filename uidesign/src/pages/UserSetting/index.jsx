import React, { useState } from "react";
import "./index.css";

/**
 * 用户设置页面
 * 管理用户个人信息、偏好设置、安全设置等
 */
const UserSetting = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userInfo, setUserInfo] = useState({
    username: "用户",
    email: "user@example.com",
    phone: "138****8888",
    avatar: "/src/assets/user-avatar.png",
    bio: "热爱技术，专注于文档编写和知识分享",
  });

  const [preferences, setPreferences] = useState({
    language: "zh-CN",
    theme: "light",
    notifications: {
      email: true,
      push: false,
      sms: true,
    },
    autoSave: true,
    defaultTemplate: "api-doc",
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordLastChanged: "2024-01-15",
  });

  // 标签页配置
  const tabs = [
    { id: "profile", name: "个人信息", icon: "👤" },
    { id: "preferences", name: "偏好设置", icon: "⚙️" },
    { id: "security", name: "安全设置", icon: "🔒" },
    { id: "notifications", name: "通知设置", icon: "🔔" },
  ];

  // 处理用户信息更新
  const handleUserInfoChange = (field, value) => {
    setUserInfo({
      ...userInfo,
      [field]: value,
    });
  };

  // 处理偏好设置更新
  const handlePreferenceChange = (field, value) => {
    setPreferences({
      ...preferences,
      [field]: value,
    });
  };

  // 处理通知设置更新
  const handleNotificationChange = (type, value) => {
    setPreferences({
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [type]: value,
      },
    });
  };

  // 处理安全设置更新
  const handleSecurityChange = (field, value) => {
    setSecurity({
      ...security,
      [field]: value,
    });
  };

  // 保存设置
  const handleSave = () => {
    // 这里可以调用API保存设置
    alert("设置已保存");
  };

  // 渲染个人信息标签页
  const renderProfileTab = () => (
    <div className="settings-section">
      <h3>个人信息</h3>
      <div className="profile-form">
        <div className="avatar-section">
          <div className="avatar">
            <img src={userInfo.avatar} alt="用户头像" />
          </div>
          <button className="change-avatar-btn">更换头像</button>
        </div>

        <div className="form-fields">
          <div className="form-group">
            <label>用户名</label>
            <input
              type="text"
              value={userInfo.username}
              onChange={(e) => handleUserInfoChange("username", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>邮箱地址</label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => handleUserInfoChange("email", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>手机号码</label>
            <input
              type="tel"
              value={userInfo.phone}
              onChange={(e) => handleUserInfoChange("phone", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>个人简介</label>
            <textarea
              rows="3"
              value={userInfo.bio}
              onChange={(e) => handleUserInfoChange("bio", e.target.value)}
              placeholder="介绍一下您自己..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  // 渲染偏好设置标签页
  const renderPreferencesTab = () => (
    <div className="settings-section">
      <h3>偏好设置</h3>
      <div className="preferences-form">
        <div className="form-group">
          <label>界面语言</label>
          <select
            value={preferences.language}
            onChange={(e) => handlePreferenceChange("language", e.target.value)}
          >
            <option value="zh-CN">中文简体</option>
            <option value="zh-TW">中文繁体</option>
            <option value="en-US">English</option>
          </select>
        </div>

        <div className="form-group">
          <label>主题模式</label>
          <div className="radio-group">
            <label className="radio-item">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={preferences.theme === "light"}
                onChange={(e) =>
                  handlePreferenceChange("theme", e.target.value)
                }
              />
              <span>浅色模式</span>
            </label>
            <label className="radio-item">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={preferences.theme === "dark"}
                onChange={(e) =>
                  handlePreferenceChange("theme", e.target.value)
                }
              />
              <span>深色模式</span>
            </label>
            <label className="radio-item">
              <input
                type="radio"
                name="theme"
                value="auto"
                checked={preferences.theme === "auto"}
                onChange={(e) =>
                  handlePreferenceChange("theme", e.target.value)
                }
              />
              <span>跟随系统</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>默认文档模板</label>
          <select
            value={preferences.defaultTemplate}
            onChange={(e) =>
              handlePreferenceChange("defaultTemplate", e.target.value)
            }
          >
            <option value="api-doc">API接口文档</option>
            <option value="user-manual">用户操作手册</option>
            <option value="tech-spec">技术规范文档</option>
            <option value="quick-guide">快速入门指南</option>
          </select>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={preferences.autoSave}
              onChange={(e) =>
                handlePreferenceChange("autoSave", e.target.checked)
              }
            />
            <span>启用自动保存</span>
          </label>
          <small>文档将每30秒自动保存一次</small>
        </div>
      </div>
    </div>
  );

  // 渲染安全设置标签页
  const renderSecurityTab = () => (
    <div className="settings-section">
      <h3>安全设置</h3>
      <div className="security-form">
        <div className="security-item">
          <div className="item-info">
            <h4>双因素认证</h4>
            <p>为您的账户添加额外的安全保护</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={security.twoFactorAuth}
              onChange={(e) =>
                handleSecurityChange("twoFactorAuth", e.target.checked)
              }
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="form-group">
          <label>会话超时时间</label>
          <select
            value={security.sessionTimeout}
            onChange={(e) =>
              handleSecurityChange("sessionTimeout", e.target.value)
            }
          >
            <option value="15">15分钟</option>
            <option value="30">30分钟</option>
            <option value="60">1小时</option>
            <option value="240">4小时</option>
            <option value="never">永不超时</option>
          </select>
        </div>

        <div className="password-section">
          <div className="password-info">
            <h4>密码管理</h4>
            <p>上次修改时间：{security.passwordLastChanged}</p>
          </div>
          <button className="change-password-btn">修改密码</button>
        </div>

        <div className="danger-zone">
          <h4>危险操作</h4>
          <div className="danger-actions">
            <button className="danger-btn">清除所有会话</button>
            <button className="danger-btn">删除账户</button>
          </div>
        </div>
      </div>
    </div>
  );

  // 渲染通知设置标签页
  const renderNotificationsTab = () => (
    <div className="settings-section">
      <h3>通知设置</h3>
      <div className="notifications-form">
        <div className="notification-item">
          <div className="item-info">
            <h4>邮件通知</h4>
            <p>接收重要更新和系统消息</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={preferences.notifications.email}
              onChange={(e) =>
                handleNotificationChange("email", e.target.checked)
              }
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="item-info">
            <h4>推送通知</h4>
            <p>浏览器推送通知</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={preferences.notifications.push}
              onChange={(e) =>
                handleNotificationChange("push", e.target.checked)
              }
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="item-info">
            <h4>短信通知</h4>
            <p>接收安全提醒和验证码</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={preferences.notifications.sms}
              onChange={(e) =>
                handleNotificationChange("sms", e.target.checked)
              }
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "preferences":
        return renderPreferencesTab();
      case "security":
        return renderSecurityTab();
      case "notifications":
        return renderNotificationsTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="user-setting-container">
      <div className="page-header">
        <h1>用户设置</h1>
        <p>管理您的个人信息和应用偏好</p>
      </div>

      <div className="settings-content">
        {/* 左侧标签导航 */}
        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-name">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* 右侧设置内容 */}
        <div className="settings-panel">
          {renderTabContent()}

          <div className="settings-actions">
            <button className="save-btn" onClick={handleSave}>
              保存设置
            </button>
            <button className="cancel-btn">取消</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
