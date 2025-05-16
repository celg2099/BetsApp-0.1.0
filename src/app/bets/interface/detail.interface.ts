

// MARK: - Welcome
export interface Detail {
    scoresByPeriod: [ScoresByPeriod]
}

// MARK: - ScoresByPeriod
export interface ScoresByPeriod {
    label: String
    home: Away
    away: Away
    shouldDisplayFirst: boolean
}

// MARK: - Away
export interface Away {
    score: number
}
