import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import Header from "../Header";
import Sidebar from "../Sidebar";
import StepsIndicator from "../StepsIndicator";
import ContentBox from "../ContentBox";
import ContextMenu from "../ContextMenu";
import ChapterSelectionModal from "../ChapterSelectionModal";
import WritingModal from "../WritingModal";

const TechnicalCatalog = () => {
  const [activeTab, setActiveTab] = useState("技术标目录");
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeSidebarItem, setActiveSidebarItem] = useState("高级配置");
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [contextMenuTarget, setContextMenuTarget] = useState(null);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [showWritingModal, setShowWritingModal] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapters, setChapters] = useState([
    {
      id: "chapter-1",
      type: "chapter",
      number: "第一章",
      title: "章节内容概述",
      status: "completed",
      expanded: true,
      children: [
        {
          id: "section-1-1",
          type: "section",
          number: "第一节",
          title: "章节内容概述",
          status: "completed",
          expanded: true,
          children: [
            {
              id: "subsection-1-1-1",
              type: "subsection",
              number: "一",
              title: "章节内容概述",
              status: "completed",
              content: "",
            },
            {
              id: "subsection-1-1-2",
              type: "subsection",
              number: "二",
              title: "章节内容概述",
              status: "completed",
              content: "",
            },
            {
              id: "subsection-1-1-3",
              type: "subsection",
              number: "三",
              title: "章节内容概述",
              status: "error",
              errorCount: 6,
              content: "",
            },
            {
              id: "subsection-1-1-4",
              type: "subsection",
              number: "四",
              title: "章节内容概述",
              status: "completed",
              content: "",
            },
            {
              id: "subsection-1-1-5",
              type: "subsection",
              number: "五",
              title: "章节内容概述",
              status: "completed",
              content: "",
            },
          ],
        },
      ],
    },
    {
      id: "chapter-2",
      type: "chapter",
      number: "第二章",
      title: "章节内容概述",
      status: "completed",
      expanded: true,
      children: [
        {
          id: "section-2-1",
          type: "section",
          number: "第一节",
          title: "章节内容概述",
          status: "completed",
          expanded: true,
          children: [
            {
              id: "subsection-2-1-1",
              type: "subsection",
              number: "一",
              title: "章节内容概述",
              status: "completed",
              content: "",
            },
            {
              id: "subsection-2-1-2",
              type: "subsection",
              number: "二",
              title: "章节内容概述",
              status: "completed",
              content: "",
            },
          ],
        },
      ],
    },
  ]);

  // 初始化时设置第一个章节为激活状态
  useEffect(() => {
    if (chapters.length > 0 && !activeChapter) {
      setActiveChapter(chapters[0].id);
    }
  }, [chapters, activeChapter]);

  // 处理侧边栏项目点击
  const handleSidebarItemClick = (item) => {
    setActiveSidebarItem(item.label);
    console.log(`点击了侧边栏项目: ${item.label}`, item);
    // 在这里可以添加更多的逻辑，比如路由跳转等
  };

  // 处理章节点击
  const handleChapterClick = (chapterId) => {
    setActiveChapter(chapterId);
  };

  // 处理更多选项点击
  const handleMoreOptions = (event, chapterId) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setContextMenuPosition({
      x: rect.left - 80,
      y: rect.bottom + 5,
    });
    setContextMenuTarget(chapterId);
    setContextMenuVisible(true);
  };

  // 处理上下文菜单操作
  const handleContextMenuAction = (action) => {
    switch (action) {
      case "delete":
        handleDeleteChapter(contextMenuTarget);
        break;
      case "settings":
        alert("章节设置");
        break;
      case "addSubChapter":
        handleAddSubChapter(contextMenuTarget);
        break;
      default:
        break;
    }
    setContextMenuVisible(false);
  };

  // 删除章节
  const handleDeleteChapter = (chapterId) => {
    if (window.confirm("确定要删除此章节吗？")) {
      const deleteChapterRecursive = (chapters) => {
        return chapters.filter((chapter) => {
          if (chapter.id === chapterId) {
            return false;
          }
          if (chapter.children) {
            chapter.children = deleteChapterRecursive(chapter.children);
          }
          return true;
        });
      };
      setChapters(deleteChapterRecursive(chapters));
    }
  };

  // 添加子章节
  const handleAddSubChapter = (parentId) => {
    const addSubChapterRecursive = (chapters) => {
      return chapters.map((chapter) => {
        if (chapter.id === parentId) {
          const newSubChapter = {
            id: `${parentId}-new-${Date.now()}`,
            type: chapter.type === "chapter" ? "section" : "subsection",
            number: generateChapterNumber(chapter),
            title: "章节内容概述",
            status: "completed",
            content: "",
          };

          if (!chapter.children) {
            chapter.children = [];
          }
          chapter.children.push(newSubChapter);
        } else if (chapter.children) {
          chapter.children = addSubChapterRecursive(chapter.children);
        }
        return chapter;
      });
    };
    setChapters(addSubChapterRecursive(chapters));
  };

  // 生成章节编号
  const generateChapterNumber = (parentChapter) => {
    const chineseNumbers = [
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九",
      "十",
    ];
    if (parentChapter.type === "chapter") {
      const count = parentChapter.children ? parentChapter.children.length : 0;
      return `第${chineseNumbers[count] || count + 1}节`;
    } else if (parentChapter.type === "section") {
      const count = parentChapter.children ? parentChapter.children.length : 0;
      return chineseNumbers[count] || `${count + 1}`;
    }
    return "";
  };

  // 切换章节展开/折叠
  const toggleChapterExpand = (chapterId) => {
    const toggleExpand = (chapters) => {
      return chapters.map((chapter) => {
        if (chapter.id === chapterId) {
          chapter.expanded = !chapter.expanded;
        } else if (chapter.children) {
          chapter.children = toggleExpand(chapter.children);
        }
        return chapter;
      });
    };
    setChapters(toggleExpand(chapters));
  };

  // 处理编写按钮点击
  const handleWriteChapter = () => {
    if (activeChapter) {
      const findChapter = (chapters, id) => {
        for (let chapter of chapters) {
          if (chapter.id === id) return chapter;
          if (chapter.children) {
            const found = findChapter(chapter.children, id);
            if (found) return found;
          }
        }
        return null;
      };
      const chapter = findChapter(chapters, activeChapter);
      if (chapter) {
        setSelectedChapter(chapter);
        setShowWritingModal(true);
      }
    } else {
      alert("请先选择要编写的章节");
    }
  };

  // 保存章节内容
  const handleSaveChapterContent = (chapterId, content, isDraft) => {
    const updateChapterContent = (chapters) => {
      return chapters.map((chapter) => {
        if (chapter.id === chapterId) {
          chapter.content = content;
          chapter.status = isDraft ? "draft" : "completed";
        } else if (chapter.children) {
          chapter.children = updateChapterContent(chapter.children);
        }
        return chapter;
      });
    };
    setChapters(updateChapterContent(chapters));

    // 保存到 localStorage
    const storageKey = `chapter_${chapterId}_${isDraft ? "draft" : "final"}`;
    localStorage.setItem(storageKey, content);
  };

  // 关闭上下文菜单
  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenuVisible(false);
    };

    if (contextMenuVisible) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [contextMenuVisible]);

  return (
    <div className="container">
      <Header />
      <Sidebar
        activeItem={activeSidebarItem}
        onItemClick={handleSidebarItemClick}
      />
      <main className="main-content">
        <StepsIndicator activeStep={3} />
        <ContentBox
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          chapters={chapters}
          activeChapter={activeChapter}
          onChapterClick={handleChapterClick}
          onMoreOptions={handleMoreOptions}
          onToggleExpand={toggleChapterExpand}
          onWriteChapter={handleWriteChapter}
        />
      </main>

      {contextMenuVisible && (
        <ContextMenu
          position={contextMenuPosition}
          onAction={handleContextMenuAction}
        />
      )}

      {showChapterModal && (
        <ChapterSelectionModal
          chapters={chapters}
          onSelect={(chapter) => {
            setSelectedChapter(chapter);
            setShowChapterModal(false);
            setShowWritingModal(true);
          }}
          onClose={() => setShowChapterModal(false)}
        />
      )}

      {showWritingModal && selectedChapter && (
        <WritingModal
          chapter={selectedChapter}
          onSave={(content, isDraft) => {
            handleSaveChapterContent(selectedChapter.id, content, isDraft);
            if (!isDraft) {
              setShowWritingModal(false);
            }
          }}
          onClose={() => setShowWritingModal(false)}
        />
      )}
    </div>
  );
};

export default TechnicalCatalog;
