import type { IModule } from "./IModule"

export interface ContactModule extends IModule {
    results: Contact[]
}
export interface Contact {
    id: number
    code: string
    full_name: string
    entity_name: string
    portfolio_name: string
    base_name: string
    phones: string[]
    emails: string[]
    document_number: string|null
    channels: ContactChannel[]
    queues: string[]
    last_management_date: string|null
    last_interaction_date: string|null
    best_management_group_month: string|null
    best_management_result_month: string|null
    best_management_motive_month:string|null
    best_management_submotive_month: string|null
    last_group: string|null
    last_result: string|null
    last_motive: string|null
    last_submotive: string|null
    last_management_user: string|null
    portfolio: number
    created_at: string|null
    updated_at: string|null
    total_accounts: number
    user_assigned: string|null
}

export interface ContactChannel {
    id: number
    name: string
    icon: string
}