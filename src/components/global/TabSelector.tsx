interface Tab {
  id: string;
  label: string;
}

export default function TabSelector({
  tabs,
  activeTab,
  setActiveTab = () => {},
}: {
  tabs: Tab[];
  activeTab?: string;
  setActiveTab?: (tabId: string) => void;
}) {
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div
      className="grid rounded-xl border border-black-800/50 p-[6px]"
      style={{
        gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
      }}
      data-id="tab-selector"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            className={`text-sm text-center px-3 py-2 rounded-[6px] transition-[background-color] duration-300 ${
              isActive
                ? "bg-black-800/5 font-semibold outline outline-2 outline-black-800"
                : ""
            }`}
            data-id="tab"
            data-tab-id={tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
