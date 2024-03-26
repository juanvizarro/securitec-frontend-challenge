import type { IModule } from "./IModule"

export interface EntityModule extends IModule {
    results: Entity[]
}
export interface Entity {
    id: number
    name: string
    ruc: string
    phone: string
    email: string
    logo: string|null
    code_phone: object // TODO: refactor in interface
    type_industry: number
    type_industry_name: string
    country: object // TODO: refactor in interface
    contact: string
    status: number
    description: string
    num_portfolios: number
    portfolios: {
        id: number
        name: string
    }[] // TODO: refactor in interface
    is_owner: boolean
    keywords: string[]|null
}