import {
  createContext,
  useContext,
  useCallback,
  ReactNode,
  FunctionComponent,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useAuth } from "./authContext";
import {
  useGetUserProfile,
  useToggleLike,
  useToggleCompare,
  useToggleNotification,
  LikedSynth,
} from "@/api/userPreferences";

interface UserPreferencesContextProps {
  likedSynths: LikedSynth[];
  compareList: string[];
  likedSynthIds: Set<string>;
  compareSynthIds: Set<string>;
  toggleLike: (synthId: string) => void;
  toggleCompare: (synthId: string) => void;
  toggleNotification: (synthId: string, enable: boolean) => void;
  isLoading: boolean;
}

const UserPreferencesContext = createContext<
  UserPreferencesContextProps | undefined
>(undefined);

const getGuestCompareList = (): string[] => {
  try {
    const item = window.localStorage.getItem("guestCompareList");
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return [];
  }
};

export const UserPreferencesProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const { currentUser } = useAuth();
  const { data: profile, isLoading: isLoadingProfile } =
    useGetUserProfile(currentUser);

  const [guestCompareList, setGuestCompareList] =
    useState<string[]>(getGuestCompareList);

  const likeMutation = useToggleLike();
  const compareMutation = useToggleCompare();
  const notificationMutation = useToggleNotification();

  useEffect(() => {
    if (!currentUser) {
      try {
        window.localStorage.setItem(
          "guestCompareList",
          JSON.stringify(guestCompareList)
        );
      } catch (error) {
        console.error("Error writing to localStorage", error);
      }
    }
  }, [guestCompareList, currentUser]);

  const likedSynths = useMemo(() => profile?.likedSynths || [], [profile]);
  const compareList = useMemo(
    () => (currentUser ? profile?.compareList || [] : guestCompareList),
    [currentUser, profile, guestCompareList]
  );

  const likedSynthIds = useMemo(
    () => new Set(likedSynths.map((s) => s.synthId)),
    [likedSynths]
  );
  const compareSynthIds = useMemo(() => new Set(compareList), [compareList]);

  const toggleLike = useCallback(
    async (synthId: string) => {
      if (!currentUser) {
        alert("Please log in to like synths.");
        return;
      }
      const idToken = await currentUser.getIdToken();
      likeMutation.mutate({ synthId, idToken });
    },
    [currentUser, likeMutation]
  );

  const toggleCompare = useCallback(
    async (synthId: string) => {
      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        compareMutation.mutate({ synthId, idToken });
      } else {
        setGuestCompareList((prevList) => {
          const listSet = new Set(prevList);
          if (listSet.has(synthId)) {
            listSet.delete(synthId);
          } else {
            listSet.add(synthId);
          }
          return Array.from(listSet);
        });
      }
    },
    [currentUser, compareMutation]
  );

  const toggleNotification = useCallback(
    async (synthId: string, enable: boolean) => {
      if (!currentUser) return;
      const idToken = await currentUser.getIdToken();
      notificationMutation.mutate({ synthId, enable, idToken });
    },
    [currentUser, notificationMutation]
  );

  return (
    <UserPreferencesContext.Provider
      value={{
        likedSynths,
        compareList,
        likedSynthIds,
        compareSynthIds,
        toggleLike,
        toggleCompare,
        toggleNotification,
        isLoading: isLoadingProfile,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = (): UserPreferencesContextProps => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error(
      "useUserPreferences must be used within a UserPreferencesProvider"
    );
  }
  return context;
};
