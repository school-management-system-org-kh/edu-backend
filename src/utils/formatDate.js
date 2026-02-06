import dayjs from "dayjs";

export const exportableColumns = (columns) =>
  columns.filter((col) => col.dataIndex);

export const currentMonth = dayjs().format("MMMM"); 