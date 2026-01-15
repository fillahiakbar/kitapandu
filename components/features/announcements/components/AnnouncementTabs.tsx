import { AnnouncementCategory } from "../domain/announcement.enum";

interface Props {
  active: AnnouncementCategory;
  onChange: (v: AnnouncementCategory) => void;
}

export function AnnouncementTabs({ active, onChange }: Props) {
  const tabs = [
    { label: "Semua", value: AnnouncementCategory.ALL },
    { label: "Jadwal", value: AnnouncementCategory.JADWAL },
    { label: "Libur", value: AnnouncementCategory.LIBUR },
    { label: "Event", value: AnnouncementCategory.EVENT },
    { label: "Informasi Umum", value: AnnouncementCategory.UMUM },
  ];

  return (
    <div className="mb-10 flex gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition
            ${
              active === tab.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
