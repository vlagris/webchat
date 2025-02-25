import {useLayoutEffect, useState, ReactNode} from "react";
import {getAuth, onAuthStateChanged, User} from "firebase/auth";
import {UserType} from "@/types";
import {AuthContext} from "@/context/AuthContext.ts";
import {updateUserOnConnection} from "@/services/presenceService.ts";
import userService from "@/services/userService.ts";



interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useLayoutEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setIsLoading(false);
    });
    return () => unsub()
  }, [])


  useLayoutEffect(() => {
    if  (!currentUser) {
      return;
    }
    const userId = currentUser.uid;
    const unsubConnect = updateUserOnConnection({userId})
    const unsubUser = userService.subscribeToUser(userId, setUserInfo);
    return () => {
      unsubConnect()
      unsubUser()
    }
  }, [currentUser])


  return (
    <AuthContext.Provider value={{
      isLoading,
      currentUser,
      userInfo,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;