import commonMessage from "../messages/common";

// Tạo một object map ngược từ giá trị sang key
const reverseCommonMessage = Object.fromEntries(
  Object.entries(commonMessage).map(([key, value]) => [value, key])
);

export const getMessageKey = (value: string) =>
  reverseCommonMessage[value] || value;
