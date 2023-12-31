
interface User {
  id?: number;
  publicKey?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  username?: string;
  isVerified?: boolean;
  created_at?: string;
  updated_at?: string;
  role?: string;
  talent?: boolean;
  company?: boolean;
  isTalentFilled?: boolean;
  bio?: string;
  location?: string;
  photo?: string;
  experience?: string;
  currentEmployer?: string;
  interests?: string;
  skills?: string;
  subSkills?: string;
  workPrefernce?: string;
  discord?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  telegram?: string;
  pow?: string;
  totalEarned?: number;
  currentCompanyId?: string;
}
export default User;