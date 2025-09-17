export interface UserExerciseMistakeDTO {
    id: number;
    userId: string;
    exerciseId: number;
    userAnswer: string;
}

export interface CreateUserExerciseMistakeDTO {
    userId: string;
    exerciseId: number;
    userAnswer: string;
}
