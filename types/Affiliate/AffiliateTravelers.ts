export interface Guide {
  firstname: string;
  lastname: string;
  username: string;
}
export interface AffiliateTour {
  share: number;
  photo: string;
  name: string;
  date: string;
  id: string;
  guide: Guide | string;
}
