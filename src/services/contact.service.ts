import { api } from "@/api"
import type { ContactModule, ContactDetail, ContactFormState } from "@/interfaces/IContact"

interface ContactFilterParams {
    entity_id?: number
    portfolio_id?: number
}

const SERVICE_PREFIX = 'contacts/'

export class ContactService {
    public async getContacts(params?: ContactFilterParams){
        const { data } = await api.get<ContactModule>(`${SERVICE_PREFIX}clients`, {
            params
        })
        return data
    }
    public async getContactDetail(id: number){
        const { data } = await api.get<ContactDetail>(`${SERVICE_PREFIX}clients/${id}`)
        return data
    }
    public async deleteContact(id: number){
        try {
            await api.delete(`${SERVICE_PREFIX}clients/${id}`)
            return true
        } catch (error) {
            console.error('error in service: deleteContact')
            return false
        }
    }
    public async createContact(data: ContactFormState){
        try {
            const response = await api.post(`${SERVICE_PREFIX}clients/`, data)
            return response
        } catch (error) {
            console.error('error in service: createContact')
        }
    }
}