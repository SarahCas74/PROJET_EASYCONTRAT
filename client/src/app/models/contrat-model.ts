export class ContratModel {
    id_contrat!: number
    type_!: string
    is_fullTime!: boolean
    date_debut!: Date
    date_fin!: Date
    periode_fin_essai!: Date
    remuneration!: number
    motif!: string
    fonction!: string
    statut!: string
    fk_entreprise!: number
    fk_salarie!: number
    nom_remplacement!: string
    fonction_remplacement!: string
    motif_surcroit!: string
    lundi!: number
    mardi!: number
    mercredi!: number
    jeudi!: number
    vendredi!: number
    samedi!: number
    dimanche!: number
    total_heure!: number

}
