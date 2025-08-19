export interface UserDTO {
    id: string;
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
