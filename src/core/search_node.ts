export interface SearchNode<State, Action> {

    state: State;

    parent?: SearchNode<State, Action>;

    action?: Action;
    
    cost: number;

    depth: number;
}