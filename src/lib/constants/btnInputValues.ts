export const btnInputValues: BinItemType[] = [
  { id: "GENERAL", label: "일반쓰레기" },
  { id: "RECYCLE", label: "분리수거함" },
  { id: "BEVERAGE", label: "음료 쓰레기통" },
  { id: "CIGAR", label: "담배꽁초 수거함" },
];

export interface BinItemType {
  id: "GENERAL" | "RECYCLE" | "BEVERAGE" | "CIGAR";
  label: string;
}
