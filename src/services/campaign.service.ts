import { api } from "@/api"
import type { CampaignModule } from "@/interfaces/ICampaign"

const SERVICE_PREFIX = 'portfolios/'

export class CampaginService {
    public async getCampaigns(){
        const { data } = await api.get<CampaignModule>(`${SERVICE_PREFIX}`)
        return data.results
    }
}