export type User = {
  id: string;
  email: string;
  name?: string;
};

export type SessionResponse = {
  data?: {
    user?: User;
  };
};
