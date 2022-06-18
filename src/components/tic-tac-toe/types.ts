export type IBoardSquareValue = "X" | "O"

export type IBoardState = [
    IBoardSquareValue | null,
    IBoardSquareValue | null,
    IBoardSquareValue | null,
    IBoardSquareValue | null,
    IBoardSquareValue | null,
    IBoardSquareValue | null,
    IBoardSquareValue | null,
    IBoardSquareValue | null,
    IBoardSquareValue | null,
]

export interface IBoardSquareData {
    value: IBoardSquareValue | null
    onClick: () => void
}

export interface IBoardData {
    squares: IBoardState
    onClick: (index: number) => void
}