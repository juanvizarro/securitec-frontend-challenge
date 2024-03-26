import { api } from "@/api"
import type { EntityModule  } from "@/interfaces/IEntity"

const SERVICE_PREFIX = 'users/'

export class UserService {
    public async getUsers(){
        const { data } = await api.get<EntityModule>(`${SERVICE_PREFIX}`)
        return data.results
    }
}