import { v4 as uuidv4 } from "uuid";

const animalImages = [
  "../comment_assets/userImages/userLogo1.jpg",
  "../comment_assets/userImages/userLogo2.jpg",
  "../comment_assets/userImages/userLogo3.jpg",
  "../comment_assets/userImages/userLogo4.jpg",
  "../comment_assets/userImages/userLogo5.jpg",
  "../comment_assets/userImages/userLogo6.jpg",
  "../comment_assets/userImages/userLogo7.jpg",
  "../comment_assets/userImages/userLogo8.jpg",
  "../comment_assets/userImages/userLogo9.jpg",
  "../comment_assets/userImages/userLogo10.jpg",
];

const hashUuidToIndex = uuid => {
  let hash = 0;
  for (let i = 0; i < uuid.length; i++) {
    hash += uuid.charCodeAt(i);
  }
  return hash % animalImages.length;
};

const getUserId = () => {
  let storedUserId = localStorage.getItem("userId");
  if (!storedUserId) {
    storedUserId = uuidv4();
    localStorage.setItem("userId", storedUserId);
  }
  return storedUserId;
};

const getAnimalImageFromUUID = uuid => {
  const index = hashUuidToIndex(uuid);
  return index + 1;
};

const getMessageDirection = uuid => {
  const storedUserId = getUserId();
  return uuid === storedUserId ? "outgoing" : "incoming";
};

export { getUserId, getAnimalImageFromUUID, getMessageDirection };
