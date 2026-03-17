export type SponsorTier = 'ouro' | 'prata' | 'bronze'

export interface Sponsor {
  id: string
  name: string
  logo_url?: string
  website?: string
  tier: SponsorTier
}

export interface Championship {
  id: string
  name: string
  year: number
  location?: string
  result?: string
  image_url?: string
}

export interface Athlete {
  id: string
  name: string
  position?: string
  number?: number
  photo_url?: string
  loaned_to?: string
  is_loaned?: boolean
}

export type BoardMemberRole
  = 'Presidente'
    | 'Vice-Presidente'
    | 'Diretor Financeiro'
    | 'Diretor Esportivo'
    | 'Diretor de Comunicação'

export interface BoardMember {
  id: string
  name: string
  role: BoardMemberRole
  photo_url?: string
  order?: number
}

export type JerseyStatus = 'disponivel' | 'pre_venda' | 'esgotada' | 'em_producao'

export interface Jersey {
  id: string
  name: string
  image_url?: string
  price: number
  status?: JerseyStatus
  description?: string
  sizes_available?: string[]
  created_date?: string
}

export interface JerseyOrder {
  id?: string
  jersey_id: string
  jersey_name: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  size: string
  quantity: number
  name_on_jersey?: string
  number_on_jersey?: number
  notes?: string
  status?: string
  created_at?: string
}
