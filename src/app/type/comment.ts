export interface Comment {
  id: string;
  catxId: string;
  userId: string;
  text: string;
  created: Date;
  user: {
    id: string;
    username: string;
    profilePic: string;
  };
}

export interface CreateComment {
  catxId: string;
  text: string;
}
