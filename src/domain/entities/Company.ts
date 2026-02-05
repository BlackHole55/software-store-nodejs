export interface Company {
  id?: string;            
  name: string;
  description: string;
  country: string;
  contacts: IContacts;
  is_verified: boolean;   
  created_at: Date;
  updated_at: Date | null; 
}

export interface IContacts {
  email: string;
  phone: string;
  website: string;
}