export interface SearchSuccessor<State, Action> {
    state: State;
    action: Action;
}

export interface SearchProblem<State, Action> {

    initialState(): State;

    goalState(): State;

    isGoal(state: State): boolean;

    getSuccessors(
        state: State
    ): SearchSuccessor<State, Action>[];

    stepCost(
        from: State,
        to: State,
        action: Action
    ): number;

    stateKey(state: State): string;
}