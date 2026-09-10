export interface SearchResult<State, Action> {

    found: boolean;

    path: State[];

    actions: Action[];

    explored: State[];
    
    cost: number;

    timeMs: number;

    nodesGenerated: number;

    nodesExpanded: number;
    
    maxFrontierSize: number;
}