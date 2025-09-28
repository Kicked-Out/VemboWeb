export interface QuestDefinitionDTO {
    id: number;
    title: string;
    description: string;
    questTypeId: number;
    requirementType: string;
    requirement: number;
    rewardType: string;
    rewardAmount: number;
}
