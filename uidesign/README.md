# 技术标目录组件

基于原始 HTML、CSS、JavaScript 文件创建的 React 组件集合，实现了技术标目录的完整功能。

## 组件结构

```
TechnicalCatalog/
├── TechnicalCatalog.jsx      # 主组件
├── TechnicalCatalog.css      # 样式文件
├── Header.jsx                # 顶部导航栏
├── Sidebar.jsx               # 侧边栏
├── StepsIndicator.jsx        # 步骤指示器
├── ContentBox.jsx            # 内容容器
├── DirectoryList.jsx         # 目录列表
├── ContextMenu.jsx           # 右键菜单
├── ChapterSelectionModal.jsx # 章节选择弹窗
├── WritingModal.jsx          # 编写界面弹窗
└── README.md                 # 说明文档
```

## 主要功能

### 1. 章节管理

- 支持章节、节、小节的层级结构
- 可展开/折叠章节
- 章节状态显示（完成、草稿、错误）
- 章节内容预览

### 2. 交互功能

- 点击章节描述激活选中状态
- 右键菜单支持删除、设置、新增子章节
- 章节内容编写和保存
- 支持草稿和正式版本保存

### 3. 界面特性

- 响应式设计
- 美观的 UI 界面
- 丰富的交互反馈
- 本地存储支持

## 使用方法

### 基本使用

```jsx
import TechnicalCatalog from "./components/TechnicalCatalog/TechnicalCatalog";

function App() {
  return <TechnicalCatalog />;
}
```

### 数据结构

章节数据结构示例：

```javascript
{
  id: 'chapter-1',
  type: 'chapter', // 'chapter' | 'section' | 'subsection'
  number: '第一章',
  title: '章节内容概述',
  status: 'completed', // 'completed' | 'draft' | 'error'
  expanded: true,
  content: '',
  children: [
    {
      id: 'section-1-1',
      type: 'section',
      number: '第一节',
      title: '章节内容概述',
      status: 'completed',
      expanded: true,
      children: [
        // 小节数据...
      ]
    }
  ]
}
```

## 依赖的资源文件

确保以下图标文件位于 `src/assets/` 目录下：

- `breadcrumb-icon.svg` - 面包屑图标
- `config-icon.svg` - 配置图标
- `dropdown-arrow.svg` - 下拉箭头
- `generate-icon.svg` - 生成图标
- `knowledge-icon.svg` - 知识库图标
- `project-list-icon.svg` - 项目列表图标
- `settings-icon.svg` - 设置图标
- `user-avatar.png` - 用户头像

## 特性说明

### 章节操作

- **点击章节描述**：激活/选中章节
- **点击章节/节标题**：展开/折叠子章节
- **右键更多选项**：显示上下文菜单

### 数据持久化

- 章节内容自动保存到 localStorage
- 支持草稿和正式版本分别保存
- 页面刷新后内容不丢失

### 编写界面

- 富文本编辑器
- 支持基本格式化（粗体、斜体、下划线、列表）
- 实时内容保存
- 未保存提醒

## 样式定制

组件使用独立的 CSS 文件，可以通过修改 `TechnicalCatalog.css` 来自定义样式。主要颜色变量：

- 主色调：`#2563eb`
- 背景色：`#e0ebff`
- 文字颜色：`#000000`
- 辅助文字：`#8e93a6`

## 注意事项

1. 组件需要完整的视口尺寸（100vw × 100vh）
2. 确保所有图标文件都正确放置
3. 建议在 App.css 中设置根元素样式
4. 组件内部使用 localStorage 进行数据持久化
