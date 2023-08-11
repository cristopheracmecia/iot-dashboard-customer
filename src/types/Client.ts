

export type Client = {
    id: number
    businessName: string
    ruc: string
    address?: string
    postalCode?: string
    subdomain: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    endAt?: Date
}