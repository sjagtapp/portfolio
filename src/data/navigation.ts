/** Navbar and footer links. `id` is a section anchor on the home page; `href` is a separate page. */
export interface NavItem {
  label: string;
  id?: string;
  href?: string;
}

export const navigation: NavItem[] = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

/** Resolves a nav item to a link that works from any page. */
export const navHref = (item: NavItem, onHome: boolean) =>
  item.href ?? (onHome ? `#${item.id}` : `/#${item.id}`);
