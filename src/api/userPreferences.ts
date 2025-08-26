import { useAuth } from "@/context/authContext";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { User } from "firebase/auth";

export interface LikedSynth {
  synthId: string;
  notificationsEnabled: boolean;
}

export interface UserProfile {
  likedSynths: LikedSynth[];
  compareList: string[];
}

const getUserProfile = async (idToken: string): Promise<UserProfile> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
    headers: { Authorization: `Bearer ${idToken}` },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  return response.json();
};

const toggleLikeRequest = async (synthId: string, idToken: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/user/likes/toggle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ synthId }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to toggle like status");
  }
  return response.json();
};

const toggleCompareRequest = async (synthId: string, idToken: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/user/compare/toggle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ synthId }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to toggle compare status");
  }
  return response.json();
};

const toggleNotificationRequest = async (
  synthId: string,
  enable: boolean,
  idToken: string
) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/user/notifications/toggle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ synthId, enable }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to toggle notification status");
  }
  return response.json();
};

export const useGetUserProfile = (
  currentUser: User | null
): UseQueryResult<UserProfile> => {
  return useQuery({
    queryKey: ["userProfile", currentUser?.uid],
    queryFn: async () => {
      if (!currentUser) return { likedSynths: [], compareList: [] };
      const idToken = await currentUser.getIdToken();
      return getUserProfile(idToken);
    },
    enabled: !!currentUser,
    staleTime: 1000 * 60 * 5,
  });
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: (vars: { synthId: string; idToken: string }) =>
      toggleLikeRequest(vars.synthId, vars.idToken),
    onMutate: async (variables) => {
      const { synthId } = variables;
      const queryKey = ["userProfile", currentUser?.uid];
      await queryClient.cancelQueries({ queryKey });
      const previousProfile = queryClient.getQueryData<UserProfile>(queryKey);
      queryClient.setQueryData<UserProfile>(queryKey, (oldProfile) => {
        if (!oldProfile) return { likedSynths: [], compareList: [] };
        const isLiked = oldProfile.likedSynths.some(
          (s) => s.synthId === synthId
        );
        const newLikedSynths = isLiked
          ? oldProfile.likedSynths.filter((s) => s.synthId !== synthId)
          : [
              ...oldProfile.likedSynths,
              { synthId, notificationsEnabled: false },
            ];
        return { ...oldProfile, likedSynths: newLikedSynths };
      });
      return { previousProfile };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(
          ["userProfile", currentUser?.uid],
          context.previousProfile
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile", currentUser?.uid],
      });
    },
  });
};

export const useToggleCompare = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: (variables: { synthId: string; idToken: string }) =>
      toggleCompareRequest(variables.synthId, variables.idToken),
    onMutate: async (variables) => {
      if (!currentUser) return;
      const { synthId } = variables;
      const queryKey = ["userProfile", currentUser?.uid];
      await queryClient.cancelQueries({ queryKey });
      const previousProfile = queryClient.getQueryData<UserProfile>(queryKey);
      queryClient.setQueryData<UserProfile>(queryKey, (oldProfile) => {
        if (!oldProfile) return { likedSynths: [], compareList: [] };
        const isInCompare = oldProfile.compareList.includes(synthId);
        const newCompareList = isInCompare
          ? oldProfile.compareList.filter((id) => id !== synthId)
          : [...oldProfile.compareList, synthId];
        return { ...oldProfile, compareList: newCompareList };
      });
      return { previousProfile };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(
          ["userProfile", currentUser?.uid],
          context.previousProfile
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile", currentUser?.uid],
      });
    },
  });
};

export const useToggleNotification = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: (vars: { synthId: string; enable: boolean; idToken: string }) =>
      toggleNotificationRequest(vars.synthId, vars.enable, vars.idToken),
    onMutate: async (variables) => {
      const { synthId, enable } = variables;
      const queryKey = ["userProfile", currentUser?.uid];
      await queryClient.cancelQueries({ queryKey });
      const previousProfile = queryClient.getQueryData<UserProfile>(queryKey);
      queryClient.setQueryData<UserProfile>(queryKey, (oldProfile) => {
        if (!oldProfile) return { likedSynths: [], compareList: [] };
        const newLikedSynths = oldProfile.likedSynths.map((synth) =>
          synth.synthId === synthId
            ? { ...synth, notificationsEnabled: enable }
            : synth
        );
        return { ...oldProfile, likedSynths: newLikedSynths };
      });
      return { previousProfile };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(
          ["userProfile", currentUser?.uid],
          context.previousProfile
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile", currentUser?.uid],
      });
    },
  });
};
