import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../api/user';
import { User } from '../../types'; // Import the User type

/**
 * The user's profile page component.
 */
const MyPage = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  /**
   * Fetches the user's information from the API.
   */
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  // If user info is not loaded yet, show a loading message
  if (!userInfo) return <div>Loading...</div>;

  return (
    <div>
      <h1>My Page</h1>
      <p>Username: {userInfo.username}</p>
      <p>Email: {userInfo.email}</p>
      <p>FirstName: {userInfo.firstName}</p>
      <p>LastName: {userInfo.lastName}</p>
      <p>DisplayName: {userInfo.displayName}</p>

      {/* Add more user info fields as needed */}
    </div>
  );
};

export default MyPage;
