import type { IModule } from "./IModule"

export interface CampaignModule extends IModule {
    results: Campaign[]
}
export interface Campaign {
    id: number
    name: string
    entity: {
        id: number
        logo: string|null
        name: string
    }
    operation_type: string
    num_clients: number
    num_products: number
    managment_type: string
    num_agents: number
    num_bases: number
}
