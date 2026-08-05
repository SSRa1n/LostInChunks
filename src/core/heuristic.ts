export interface Heuristic<State> {

    estimate(
        state: State
    ): number;
}