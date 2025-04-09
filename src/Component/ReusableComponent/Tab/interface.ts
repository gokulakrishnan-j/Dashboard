interface Menu {
  id: number;
  text: string;
}

export interface TabProps {
  menu: Array<Menu>;
  setSelectedMenu: (value: number) => void;
}
