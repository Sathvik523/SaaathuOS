"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  File,
  FileCode,
  FileText,
  Folder,
  Grid,
  Info,
  ExternalLink,
  List,
  Search,
  Tag,
  Laptop,
  FolderKanban,
  Download,
} from "lucide-react";
import { EXPLORER_FILES, FileItem, PROJECTS } from "@/content/portfolioData";
import { useWindowManager } from "@/system/window-manager";

export default function ExplorerApp() {
  const { openWindow } = useWindowManager();
  const [currentFolderId, setCurrentFolderId] = useState<string | null>("folder-desktop");
  const [selectedFileId, setSelectedFileId] = useState<string | null>("file-welcome");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [folderHistory, setFolderHistory] = useState<(string | null)[]>(["folder-desktop"]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Active folder object
  const activeFolder = useMemo(() => {
    if (!currentFolderId) return null;
    return EXPLORER_FILES.find((f) => f.id === currentFolderId && f.type === "folder") || null;
  }, [currentFolderId]);

  // Active file object for inspector
  const activeFile = useMemo(() => {
    if (!selectedFileId) return null;
    return EXPLORER_FILES.find((f) => f.id === selectedFileId) || null;
  }, [selectedFileId]);

  // Linked project object if file has projectRefId
  const linkedProject = useMemo(() => {
    if (!activeFile || !activeFile.projectRefId) return null;
    return PROJECTS.find((p) => p.id === activeFile.projectRefId) || null;
  }, [activeFile]);

  // Filtered file list
  const displayedFiles = useMemo(() => {
    let files = EXPLORER_FILES;

    if (selectedTag) {
      return files.filter((f) => f.tags?.includes(selectedTag));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return files.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.content?.toLowerCase().includes(q) ||
          f.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    return files.filter((f) => f.parentId === currentFolderId);
  }, [currentFolderId, selectedTag, searchQuery]);

  const navigateToFolder = (folderId: string | null) => {
    setSelectedTag(null);
    setCurrentFolderId(folderId);
    const newHistory = folderHistory.slice(0, historyIndex + 1);
    newHistory.push(folderId);
    setFolderHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prev = historyIndex - 1;
      setHistoryIndex(prev);
      setCurrentFolderId(folderHistory[prev]);
    }
  };

  const handleForward = () => {
    if (historyIndex < folderHistory.length - 1) {
      const next = historyIndex + 1;
      setHistoryIndex(next);
      setCurrentFolderId(folderHistory[next]);
    }
  };

  const getFileIcon = (file: FileItem) => {
    if (file.type === "folder") return <Folder className="h-10 w-10 text-sky-400 fill-sky-400/20" />;
    if (file.extension === "ts" || file.extension === "tsx" || file.extension === "py")
      return <FileCode className="h-10 w-10 text-emerald-400" />;
    if (file.extension === "pdf") return <FileText className="h-10 w-10 text-rose-400" />;
    if (file.extension === "json") return <Code2 className="h-10 w-10 text-amber-400" />;
    return <File className="h-10 w-10 text-indigo-300" />;
  };

  return (
    <div className="flex h-full w-full bg-[#141518] text-white select-none">
      {/* Finder Sidebar */}
      <aside className="w-52 flex-shrink-0 border-r border-white/[0.06] bg-[#101114]/90 p-3 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Favorites Group */}
          <div>
            <span className="px-2 text-[11px] font-semibold tracking-wider text-white/40 uppercase">
              Favorites
            </span>
            <nav className="mt-1.5 space-y-0.5">
              <button
                onClick={() => navigateToFolder("folder-desktop")}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                  currentFolderId === "folder-desktop" && !selectedTag
                    ? "bg-[#007AFF] text-white"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                <Laptop size={16} />
                Desktop
              </button>
              <button
                onClick={() => navigateToFolder("folder-projects")}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                  currentFolderId === "folder-projects" && !selectedTag
                    ? "bg-[#007AFF] text-white"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                <FolderKanban size={16} />
                Projects
              </button>
              <button
                onClick={() => navigateToFolder("folder-documents")}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                  currentFolderId === "folder-documents" && !selectedTag
                    ? "bg-[#007AFF] text-white"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                <FileText size={16} />
                Documents
              </button>
              <button
                onClick={() => navigateToFolder("folder-downloads")}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                  currentFolderId === "folder-downloads" && !selectedTag
                    ? "bg-[#007AFF] text-white"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                <Download size={16} />
                Downloads
              </button>
            </nav>
          </div>

          {/* Tags Filter Group */}
          <div>
            <span className="px-2 text-[11px] font-semibold tracking-wider text-white/40 uppercase">
              Tags
            </span>
            <nav className="mt-1.5 space-y-0.5">
              {[
                { name: "Important", color: "bg-red-500" },
                { name: "Work", color: "bg-amber-500" },
                { name: "Featured", color: "bg-emerald-500" },
                { name: "Personal", color: "bg-indigo-500" },
              ].map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => setSelectedTag(tag.name)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                    selectedTag === tag.name ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${tag.color}`} />
                  {tag.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* System Applications Quick Launcher */}
        <div className="pt-3 border-t border-white/[0.06]">
          <button
            onClick={() => openWindow("terminal")}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-emerald-400 hover:bg-white/10"
          >
            <Code2 size={16} />
            Open Terminal
          </button>
        </div>
      </aside>

      {/* Finder Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Finder Toolbar */}
        <header className="flex h-11 items-center justify-between border-b border-white/[0.06] bg-[#18191D]/80 px-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <button
                onClick={handleBack}
                disabled={historyIndex === 0}
                className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/10 disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleForward}
                disabled={historyIndex >= folderHistory.length - 1}
                className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/10 disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Breadcrumb Path */}
            <span className="text-[13px] font-medium text-white/80">
              {selectedTag
                ? `Tag: ${selectedTag}`
                : activeFolder
                ? activeFolder.path
                : "/Desktop"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher */}
            <div className="flex items-center rounded-lg bg-white/5 p-0.5 border border-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1 rounded ${viewMode === "grid" ? "bg-white/20 text-white" : "text-white/50"}`}
              >
                <Grid size={15} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1 rounded ${viewMode === "list" ? "bg-white/20 text-white" : "text-white/50"}`}
              >
                <List size={15} />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-7 w-40 rounded-lg bg-white/10 pl-8 pr-3 text-[12px] text-white placeholder-white/40 border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
              />
            </div>
          </div>
        </header>

        {/* Content Body & Inspector Grid */}
        <div className="flex flex-1 overflow-hidden">
          {/* File View Area */}
          <main className="flex-1 overflow-auto p-4">
            {displayedFiles.length === 0 ? (
              <div className="flex h-full items-center justify-center text-white/40 text-sm">
                No items found
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-4 gap-4">
                {displayedFiles.map((file) => {
                  const isSelected = selectedFileId === file.id;
                  return (
                    <div
                      key={file.id}
                      onClick={() => setSelectedFileId(file.id)}
                      onDoubleClick={() => {
                        if (file.type === "folder") {
                          navigateToFolder(file.id);
                        } else if (file.projectRefId) {
                          openWindow("projects");
                        }
                      }}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#007AFF]/30 border border-[#007AFF] shadow-lg"
                          : "hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="mb-2 flex h-14 w-14 items-center justify-center">
                        {getFileIcon(file)}
                      </div>
                      <span className="text-[12px] font-medium text-center text-white/90 truncate max-w-full">
                        {file.name}
                      </span>
                      <span className="text-[10px] text-white/40 mt-0.5">
                        {file.size || (file.type === "folder" ? "Folder" : "Document")}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-1">
                <div className="grid grid-cols-12 px-3 py-1.5 text-[11px] font-semibold text-white/40 border-b border-white/[0.06]">
                  <span className="col-span-6">Name</span>
                  <span className="col-span-3">Date Modified</span>
                  <span className="col-span-3">Size</span>
                </div>
                {displayedFiles.map((file) => {
                  const isSelected = selectedFileId === file.id;
                  return (
                    <div
                      key={file.id}
                      onClick={() => setSelectedFileId(file.id)}
                      onDoubleClick={() => {
                        if (file.type === "folder") {
                          navigateToFolder(file.id);
                        } else if (file.projectRefId) {
                          openWindow("projects");
                        }
                      }}
                      className={`grid grid-cols-12 items-center px-3 py-2 rounded-lg cursor-pointer text-[13px] transition-colors ${
                        isSelected ? "bg-[#007AFF] text-white" : "hover:bg-white/5 text-white/80"
                      }`}
                    >
                      <div className="col-span-6 flex items-center gap-2 truncate">
                        <span className="h-4 w-4">{getFileIcon(file)}</span>
                        <span>{file.name}</span>
                      </div>
                      <span className="col-span-3 text-[11px] text-white/50">{file.updatedAt}</span>
                      <span className="col-span-3 text-[11px] text-white/50">{file.size || "--"}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </main>

          {/* Right Inspector Preview Panel */}
          {activeFile && (
            <aside className="w-72 flex-shrink-0 border-l border-white/[0.06] bg-[#111215] p-4 flex flex-col overflow-auto">
              <div className="flex flex-col items-center text-center pb-4 border-b border-white/[0.06]">
                <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 shadow-inner">
                  {getFileIcon(activeFile)}
                </div>
                <h3 className="text-[14px] font-semibold text-white truncate max-w-full">
                  {activeFile.name}
                </h3>
                <span className="text-[11px] text-white/40 mt-1">
                  {activeFile.type.toUpperCase()} • {activeFile.size || "Folder"}
                </span>
              </div>

              <div className="py-4 space-y-3 flex-1 overflow-auto">
                <div>
                  <span className="text-[11px] font-semibold text-white/40 uppercase">Information</span>
                  <div className="mt-2 space-y-1.5 text-[12px]">
                    <div className="flex justify-between text-white/60">
                      <span>Kind:</span>
                      <span className="text-white/90 capitalize">{activeFile.type}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Modified:</span>
                      <span className="text-white/90">{activeFile.updatedAt}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Path:</span>
                      <span className="text-white/90 truncate max-w-[120px]">{activeFile.path}</span>
                    </div>
                  </div>
                </div>

                {/* File Preview Content */}
                {activeFile.content && (
                  <div>
                    <span className="text-[11px] font-semibold text-white/40 uppercase">Preview</span>
                    <div className="mt-2 rounded-xl bg-black/40 p-3 text-[11px] font-mono text-white/80 leading-relaxed border border-white/5 max-h-48 overflow-auto">
                      {activeFile.content}
                    </div>
                  </div>
                )}

                {/* Linked Project CTA */}
                {linkedProject && (
                  <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-3">
                    <span className="text-[11px] font-semibold text-indigo-400">Linked Portfolio Project</span>
                    <p className="text-[12px] text-white/80 mt-1">{linkedProject.description}</p>
                    <button
                      onClick={() => openWindow("projects")}
                      className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-[12px] font-medium text-white shadow hover:bg-indigo-500"
                    >
                      View Project Demo
                      <ExternalLink size={13} />
                    </button>
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}