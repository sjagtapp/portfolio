/** Section anchors used by the navbar, mobile menu, and active-section tracking. */
export interface NavItem {
  id: string;
  label: string;
}

export const navigation: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
];
