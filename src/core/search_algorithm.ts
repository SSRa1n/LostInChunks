import type { SearchProblem } from "./search_problem";
import type { SearchResult } from "./search_result";

export interface SearchAlgorithm<State, Action> {
    search(
        problem: SearchProblem<State, Action>
    ): SearchResult<State, Action>;
}