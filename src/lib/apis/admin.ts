import { instance } from "./axios";

export const getAdminBins = async (data: string) => {
  const filter =
    data === "전체" ? "ENTIRE" : data === "처리 전" ? "PENDING" : "FINISHED";
  try {
    const res = await instance.get(
      `/admin/bins/registrations?filter=${filter}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
export const getAdminBinsFix = async (data: string) => {
  const filter =
    data === "전체" ? "ENTIRE" : data === "처리 전" ? "PENDING" : "FINISHED";
  try {
    const res = await instance.get(
      `/admin/bins/modifications?filter=${filter}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
export const getAdminBinsReport = async (data: string) => {
  const filter =
    data === "전체" ? "ENTIRE" : data === "처리 전" ? "PENDING" : "FINISHED";
  try {
    const res = await instance.get(`/admin/bins/complaints?filter=${filter}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
