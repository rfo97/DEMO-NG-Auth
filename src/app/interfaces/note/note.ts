export interface Note {
  __id?: string;
  topic: string[];
  title: string;
  body: string;
  user: {
    _id: string;
    name: string;
    email: string;
    image: string;
    __v: number;
  };
  __v?: number;
}
