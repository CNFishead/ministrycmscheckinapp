/**
 * @description - Member Schema Type
 *
 * @author Austin Howard
 * @since 1.0
 * @version 1.0
 * @lastModified - 2023-06-11T16:20:04.000-05:00
 */
export default interface MemberType {
  familyName?: string;
  _id: string;
  firstName: string;
  lastName?: string;
  ministry?: string;
  profileImageUrl?: string;
  sex: string;
  email?: string;
  phoneNumber?: string;
  role: string;
  tags: string[];
  maritalStatus: string;
  checkInLocation: string;
  location?: {
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    address2?: string;
  };
  fullName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  birthday: Date;
  dateLastVisited: Date;
}
