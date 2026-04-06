export type MenuVariant = {
  label: string;
  price?: string;
};

export type MenuItem = {
  name: string;
  details?: string;
  subtitle?: string;
  price?: string;
  oldPrice?: string;
  promoPrice?: string;
  variants?: MenuVariant[];
};

export type MenuCategory = {
  title: string;
  subtitle?: string;
  items: MenuItem[];
};
