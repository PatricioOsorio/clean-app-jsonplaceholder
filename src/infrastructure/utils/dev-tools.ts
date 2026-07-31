import { DomainError, NetworkError } from '@domain/errors';
import { DEFAULT_DELAY, withDelay } from './delay';

export const getQueryParam = (key: string): string | null =>
  new URLSearchParams(window.location.search).get(key);

/**
 * Dev-only: response delay override via `?delay=<ms>` (default 500).
 * e.g. /posts?delay=2000 to test slow loading states.
 */
export const resolveDelay = (): number => {
  const raw = getQueryParam('delay');
  const ms = raw ? Number(raw) : NaN;
  return Number.isFinite(ms) && ms >= 0 ? ms : DEFAULT_DELAY;
};

interface IDataCommandHandlers {
  onSeed: () => void;
  onEmpty: () => void;
}

/**
 * Dev-only: one-shot data commands via `?data=`. Runs the matching handler,
 * then strips the param from the URL so it does NOT re-run on every read.
 * Handlers are caller-specific (each repo wires its own seed/clear).
 *
 * - ?data=seed   => handlers.onSeed()
 * - ?data=empty  => handlers.onEmpty()
 */
export const runDataCommand = (handlers: IDataCommandHandlers): void => {
  const cmd = getQueryParam('data');
  if (!cmd) return;

  if (cmd === 'seed') handlers.onSeed();
  else if (cmd === 'empty') handlers.onEmpty();
  else return console.warn(`[dev] unknown data command "${cmd}" — ignoring`);

  const url = new URL(window.location.href);
  url.searchParams.delete('data');
  window.history.replaceState({}, '', url);
};

export type ICustomFaultMapper = (fault: string, resourceId?: number) => Error | undefined;

/**
 * Dev-only: inject errors via `?fault=` to simulate failures.
 * - ?fault=network    => NetworkError
 * - ?fault=server     => DomainError('API Error', 500)
 * - ?fault=...        => feature-specific faults via CustomFaultMapper
 */
export const createFaultSimulator = (customMapper?: ICustomFaultMapper) => {
  return async (operation: string, id?: number): Promise<void> => {
    const fault = getQueryParam('fault');
    if (!fault) return;

    const faultOp = getQueryParam('faultOperation'); // opcional: limita a una operación
    if (faultOp && faultOp !== operation) return;

    await withDelay(null, resolveDelay()); // let the skeleton render before failing

    if (customMapper) {
      const customError = customMapper(fault, id);
      if (customError) throw customError;
    }

    if (fault === 'network') throw new NetworkError();
    if (fault === 'server')
      throw new DomainError('API Error', 'Simulated server error (500)', 'INTERNAL_ERROR');

    console.warn(`[dev] unknown fault "${fault}" — ignoring`);
  };
};
