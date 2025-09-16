export interface UserDTO {
    id: string;
    avatarUrl?: string;
    userName: string;
    nickName: string;
    nickNameSlug: string;
    email: string;
    isPremium: boolean;
    premiumStartedAt: string;
    premiumExpiresAt: string;
    createdAt: string;
    nativeLanguage: string;
    selectedRegion: string;
}
