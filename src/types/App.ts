
export type ActivityData<T, B = {} > = {
    data: T
    activity: {
        reason: string
    }
} & B