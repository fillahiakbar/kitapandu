import {
  IconAperture,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconUserPlus,
  IconSpeakerphone,
  IconUsers,
  IconSchool,
  IconReportMoney,
  IconChalkboardTeacher,
  IconApps,
  IconCalendarCog,
  IconFlare,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "HOME",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    navlabel: true,
    subheader: "MENU",
  },
  {
    id: uniqueId(),
    title: "Pengumuman",
    icon: IconSpeakerphone,
    href: "/dashboard/announcements",
  },
  {
    id: uniqueId(),
    title: "User",
    icon: IconUsers,
    href: "/dashboard/users",
  },
  {
    id: uniqueId(),
    title: "Kelas",
    icon: IconApps,
    href: "/dashboard/classes",
  },
  {
    id: uniqueId(),
    title: "Donasi",
    icon: IconReportMoney,
    href: "/dashboard/donations",
  },
  {
    id: uniqueId(),
    title: "Mentor",
    icon: IconChalkboardTeacher,
    href: "/dashboard/mentors",
  },
  {
    id: uniqueId(),
    title: "Program",
    icon: IconFlare,
    href: "/dashboard/programs",
  },
  {
    id: uniqueId(),
    title: "Jadwal",
    icon: IconCalendarCog,
    href: "/dashboard/schedules",
  },
  {
    id: uniqueId(),
    title: "Siswa",
    icon: IconSchool,
    href: "/dashboard/students",
  },
];

export default Menuitems;


