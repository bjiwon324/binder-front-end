import { instance } from "./axios";

export const getAdminBins = async (data: string) => {
  const filter =
    data === "전체" ? "ENTIRE" : data === "처리 전" ? "PENDING" : "FINISHED";
  try {
    const res = await instance.get(`/admin/bins/registrations?sort=${filter}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
export const getAdminBinsFix = async (data: string) => {
  const filter =
    data === "전체" ? "ENTIRE" : data === "처리 전" ? "PENDING" : "FINISHED";
  try {
    const res = await instance.get(`/admin/bins/modifications?sort=${filter}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
