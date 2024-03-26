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
    status: number
}

export interface ContactDetail extends Omit<Contact,'channels'> {
    channels: ContactChannelDetail[]
    operation_type: number
    last_interaction: {
        channel: ContactChannel
        identifier: string
    }
    last_interaction_date: string
    created_at: string
    updated_at: string
}

export interface ContactChannelDetail {
    id: number
    identifier: string
    type_interaction: number
    channel_customer: {
        id: number
        indentifier: string
        alias: string
        data_parameters: {
            city: number
            email: string
            apikey: string
            app_id: string
            address: string
            country: number
            sc_user: {
                id: number
                fullname: string
            }
            website: string
            app_name: string
            code_phone: number
            description: string
            picture_src: string
            company_name: string
            phone_number: string
            url_callback: string
            type_industry: number
            company_language: string
            facebook_page_whatsapp: string
        }
    },
    channel: ContactChannel
    state: number
    code_country: string
    queue: number
    blocked?: boolean
    call_duration?: number
    contact_date?: string
}
export interface ContactFormState {
    name: string
    paternal_surname: string
    maternal_surname: string
    type_document: number
    document_number: string
    address: string
    email: string
    phone: string
    code_phone: string
    portfolio: number|null
}
export interface ContactAdvancedFilters {
    last_management_date_start?: string
    last_management_date_end?: string
    groups_id?: number[]
    results_id?: number[]
}