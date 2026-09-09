import type { SearchResult } from '../../core/search_result';

import styles from './metrics_card.module.css';

type MetricsCardProps<State, Action> = {
  title: string;
  searchResult: SearchResult<State, Action>;
};

export default function MetricsCard<State, Action>({
  title,
  searchResult,
}: MetricsCardProps<State, Action>) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.label}>Status</span>
          <span className={styles.value}>
            {searchResult.found ? 'Path Found' : 'No Path'}
          </span>
        </div>

        <div className={styles.metric}>
          <span className={styles.label}>Path Cost</span>
          <span className={styles.value}>
            {searchResult.cost}
          </span>
        </div>

        <div className={styles.metric}>
          <span className={styles.label}>Time</span>
          <span className={styles.value}>
            {searchResult.timeMs.toFixed(2)} ms
          </span>
        </div>

        <div className={styles.metric}>
          <span className={styles.label}>Nodes Generated</span>
          <span className={styles.value}>
            {searchResult.nodesGenerated}
          </span>
        </div>

        <div className={styles.metric}>
          <span className={styles.label}>Nodes Expanded</span>
          <span className={styles.value}>
            {searchResult.nodesExpanded}
          </span>
        </div>

        <div className={styles.metric}>
          <span className={styles.label}>Max Frontier</span>
          <span className={styles.value}>
            {searchResult.maxFrontierSize}
          </span>
        </div>
      </div>
    </div>
  );
}
