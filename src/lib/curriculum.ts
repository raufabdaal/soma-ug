/**
 * Soma Curriculum Structure - S1 Compulsory Subjects
 *
 * Built from official NCDC Lower Secondary syllabi.
 * Source: ncdc.go.ug/resource/
 */

export interface SubjectInfo {
  id: string;
  name: string;
  accentColor: string;
  accentColorDk: string;
  softBg: string;
  icon: string;
  totalLessons: number;
  status: "available" | "coming-soon";
}

export const subjects: SubjectInfo[] = [
  {
    id: "mathematics",
    name: "Mathematics",
    accentColor: "#C06A4B",
    accentColorDk: "#A65638",
    softBg: "rgba(192,106,75,0.14)",
    icon: "M",
    totalLessons: 14,
    status: "available",
  },
  {
    id: "biology",
    name: "Biology",
    accentColor: "#7E8E63",
    accentColorDk: "#5F6C46",
    softBg: "rgba(126,142,99,0.16)",
    icon: "B",
    totalLessons: 5,
    status: "available",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    accentColor: "#6E8AA6",
    accentColorDk: "#536E89",
    softBg: "rgba(110,138,166,0.16)",
    icon: "C",
    totalLessons: 5,
    status: "available",
  },
  {
    id: "physics",
    name: "Physics",
    accentColor: "#9B7BB8",
    accentColorDk: "#7A5E94",
    softBg: "rgba(155,123,184,0.16)",
    icon: "P",
    totalLessons: 4,
    status: "available",
  },
  {
    id: "english",
    name: "English",
    accentColor: "#D4A04C",
    accentColorDk: "#B8862F",
    softBg: "rgba(212,160,76,0.16)",
    icon: "E",
    totalLessons: 0,
    status: "coming-soon",
  },
  {
    id: "geography",
    name: "Geography",
    accentColor: "#5B9B7E",
    accentColorDk: "#3D7A60",
    softBg: "rgba(91,155,126,0.16)",
    icon: "G",
    totalLessons: 0,
    status: "coming-soon",
  },
  {
    id: "history",
    name: "History",
    accentColor: "#B85C5C",
    accentColorDk: "#964040",
    softBg: "rgba(184,92,92,0.16)",
    icon: "H",
    totalLessons: 0,
    status: "coming-soon",
  },
];

export function getSubjectById(id: string): SubjectInfo | undefined {
  return subjects.find((s) => s.id === id);
}
