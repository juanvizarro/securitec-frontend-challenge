import { api } from "@/api"
import type { EntityModule  } from "@/interfaces/IEntity"

const SERVICE_PREFIX = 'entities/'

export class EntityService {
    public async getEntities(){
        const { data } = await api.get<EntityModule>(`${SERVICE_PREFIX}`)
        return data.results
    }
}