export interface UserDTO {
    id: number;
    nickName: string;
    email: string;
    isPremium: boolean;
    premiumStartedAt: Date;
    premiumExpiresAt: Date;
    CreatedAt: Date;
    NativeLanguage: string;
    SelectedRegion: string;
}
