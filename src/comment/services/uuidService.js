import { v4 as uuidv4 } from "uuid";

const animalImages = [
  "https://example.com/animal1.png",
  "https://example.com/animal2.png",
  "https://example.com/animal3.png",
  // ... 17 more images
  "https://example.com/animal20.png",
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
  return animalImages[index];
};

const getMessageDirection = uuid => {
  const storedUserId = getUserId();
  return uuid === storedUserId ? "outgoing" : "incoming";
};

export { getUserId, getAnimalImageFromUUID, getMessageDirection };
