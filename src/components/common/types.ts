export type OptionType = {
  value: string;
  label: string;
};
export interface Lunch {
  sort?: string;
  name: string;
  type: OptionType | string;
  menu?: string;
  url?: string;
  imageUrl?: string;
  description: string;
  priceRate?: string | number | undefined;
  isDisplayed?: boolean;
}
export const options: OptionType[] = [
  { value: "japanese", label: "일식/회/우동" },
  { value: "asian", label: "아시안 음식" },
  { value: "chinese", label: "중식" },
  { value: "korean", label: "한식" },
  { value: "italian", label: "양식" },
  { value: "coffee", label: "커피/디저트" },
  { value: "sandwich", label: "샌드위치/빵" },
  { value: "wine", label: "와인/바" },
  { value: "burger", label: "버거" },
  { value: "del", label: "삭제요청" },
];
