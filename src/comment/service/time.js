const convertToLocalTime = (isoString) => {
  // ISO 문자열을 Date 객체로 변환
  const date = new Date(isoString);

  // 로컬 시간 문자열로 변환
  const localTimeString = date.toLocaleString();

  return localTimeString;
};

const extractDatePart = (localTimeString) => {
  const parts = localTimeString.split(" ");

  // 필요한 부분인 연도, 월, 일을 결합하여 반환
  return `${parts[0]} ${parts[1]} ${parts[2]}`;
};

const isNewDay = (currentMessageDate, previousMessageDate) => {
  const currentDate = new Date(currentMessageDate).toDateString();
  const previousDate = new Date(previousMessageDate).toDateString();
  return currentDate !== previousDate;
};

const getLastActiveTime = (lastActive) => {
  if (!lastActive) {
    return "Not yet active"; // 아직 활성화되지 않았을 때의 메시지
  }

  const now = new Date();
  const minutesAgo = Math.floor((now - lastActive) / (1000 * 60));

  if (minutesAgo === 0) {
    return "Active now";
  }

  return `Active ${minutesAgo} mins ago`;
};

export { convertToLocalTime, isNewDay, extractDatePart, getLastActiveTime };
