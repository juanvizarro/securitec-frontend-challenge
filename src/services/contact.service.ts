import { api } from "@/api"
import { ContactModule } from "@/interfaces/IContact"

const SERVICE_PREFIX = 'contacts/'

export class ContactService {
    public async getContacts(){
        const { data } = await api.get<ContactModule>(`${SERVICE_PREFIX}clients`)
        return data
    }
}