export interface CatxPost {
  id: string;
  created: string;
  description: string;
  user: {
    id: string;
    username: string;
    profilePic: string;
  };
}
