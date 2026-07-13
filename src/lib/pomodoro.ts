export type PomodoroPrefs = {
  focusMinutes: number;
  breakMinutes: number;
};

export type PomodoroPageVisit = {
  href: string;
  title: string;
  path: string;
};

export type PomodoroHistoryEntry = {
  id: string;
  date: number;
  focusMinutes: number;
  breakMinutes: number;
  pagesVisited: PomodoroPageVisit[];
  completed: boolean;
  cancelled: boolean;
  endedPhase: 'focus' | 'break';
};

export type PomodoroDialog =
  | {
      kind: 'setup';
      mode: 'start' | 'settings';
      focusMinutes: number;
      breakMinutes: number;
    }
  | {
      kind: 'completion';
      phase: 'focus' | 'break';
    }
  | null;

export type PomodoroSession = {
  id: string;
  startedAt: number;
  phase: 'focus' | 'break';
  phaseStartedAt: number;
  phaseEndsAt: number;
  pausedRemainingMs: number | null;
  pagesVisited: PomodoroPageVisit[];
  focusMinutes: number;
  breakMinutes: number;
};

export type PomodoroState = {
  prefs: PomodoroPrefs;
  session: PomodoroSession | null;
  dialog: PomodoroDialog;
  history: PomodoroHistoryEntry[];
};

export const POMODORO_STORAGE_KEY = 'robotics-pomodoro-v1';
export const POMODORO_HISTORY_LIMIT = 100;

export const defaultPomodoroPrefs: PomodoroPrefs = {
  focusMinutes: 25,
  breakMinutes: 5,
};

export function createDefaultPomodoroState(): PomodoroState {
  return {
    prefs: { ...defaultPomodoroPrefs },
    session: null,
    dialog: null,
    history: [],
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object';
}

function toPositiveNumber(value: unknown, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : fallback;
}

export function normalizePomodoroState(raw: unknown): PomodoroState {
  if (!isObject(raw)) {
    return createDefaultPomodoroState();
  }

  const prefs = isObject(raw.prefs) ? raw.prefs : {};
  const session = isObject(raw.session) ? raw.session : null;
  const dialog = isObject(raw.dialog) ? raw.dialog : null;
  const history = Array.isArray(raw.history) ? raw.history : [];

  return {
    prefs: {
      focusMinutes: toPositiveNumber(prefs.focusMinutes, defaultPomodoroPrefs.focusMinutes),
      breakMinutes: toPositiveNumber(prefs.breakMinutes, defaultPomodoroPrefs.breakMinutes),
    },
    session:
      session && typeof session.id === 'string'
        ? {
            id: session.id,
            startedAt: toPositiveNumber(session.startedAt, Date.now()),
            phase: session.phase === 'break' ? 'break' : 'focus',
            phaseStartedAt: toPositiveNumber(session.phaseStartedAt, Date.now()),
            phaseEndsAt: toPositiveNumber(session.phaseEndsAt, Date.now()),
            pausedRemainingMs:
              typeof session.pausedRemainingMs === 'number' && session.pausedRemainingMs >= 0
                ? session.pausedRemainingMs
                : null,
            pagesVisited: Array.isArray(session.pagesVisited)
              ? session.pagesVisited.filter(
                  (page): page is PomodoroPageVisit =>
                    isObject(page) &&
                    typeof page.href === 'string' &&
                    typeof page.title === 'string' &&
                    typeof page.path === 'string',
                )
              : [],
            focusMinutes: toPositiveNumber(session.focusMinutes, defaultPomodoroPrefs.focusMinutes),
            breakMinutes: toPositiveNumber(session.breakMinutes, defaultPomodoroPrefs.breakMinutes),
          }
        : null,
    dialog:
      dialog && dialog.kind === 'setup'
        ? {
            kind: 'setup',
            mode: dialog.mode === 'settings' ? 'settings' : 'start',
            focusMinutes: toPositiveNumber(dialog.focusMinutes, defaultPomodoroPrefs.focusMinutes),
            breakMinutes: toPositiveNumber(dialog.breakMinutes, defaultPomodoroPrefs.breakMinutes),
          }
        : dialog && dialog.kind === 'completion'
          ? {
              kind: 'completion',
              phase: dialog.phase === 'break' ? 'break' : 'focus',
            }
          : null,
    history: history
      .filter((entry): entry is PomodoroHistoryEntry => {
        return (
          isObject(entry) &&
          typeof entry.id === 'string' &&
          typeof entry.date === 'number' &&
          typeof entry.focusMinutes === 'number' &&
          typeof entry.breakMinutes === 'number'
        );
      })
      .slice(0, POMODORO_HISTORY_LIMIT)
      .map((entry) => ({
        id: entry.id,
        date: entry.date,
        focusMinutes: entry.focusMinutes,
        breakMinutes: entry.breakMinutes,
        pagesVisited: Array.isArray(entry.pagesVisited)
          ? entry.pagesVisited.filter(
              (page): page is PomodoroPageVisit =>
                isObject(page) &&
                typeof page.href === 'string' &&
                typeof page.title === 'string' &&
                typeof page.path === 'string',
            )
          : [],
        completed: Boolean(entry.completed),
        cancelled: Boolean(entry.cancelled),
        endedPhase: entry.endedPhase === 'break' ? 'break' : 'focus',
      })),
  };
}

export function readPomodoroState(): PomodoroState {
  if (typeof localStorage === 'undefined') return createDefaultPomodoroState();

  try {
    const raw = localStorage.getItem(POMODORO_STORAGE_KEY);
    if (!raw) return createDefaultPomodoroState();
    return normalizePomodoroState(JSON.parse(raw));
  } catch {
    return createDefaultPomodoroState();
  }
}

export function writePomodoroState(state: PomodoroState) {
  try {
    localStorage.setItem(POMODORO_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage failures.
  }
}

export function formatPomodoroCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes)}:${String(seconds).padStart(2, '0')}`;
}

export function formatPomodoroRelativeTime(timestamp: number) {
  const diff = Math.max(0, Date.now() - timestamp);
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return 'Just now';
  if (diff < 45 * minute) return `${Math.round(diff / minute)} min ago`;
  if (diff < 90 * minute) return '1 hr ago';
  if (diff < 24 * hour) return `${Math.round(diff / hour)} hr ago`;
  if (diff < 48 * hour) return 'Yesterday';
  if (diff < 7 * day) return `${Math.round(diff / day)} days ago`;

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
  }).format(timestamp);
}

export function createPomodoroHistoryEntry(params: {
  date: number;
  focusMinutes: number;
  breakMinutes: number;
  pagesVisited: PomodoroPageVisit[];
  completed: boolean;
  cancelled: boolean;
  endedPhase: 'focus' | 'break';
}): PomodoroHistoryEntry {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${params.date}-${Math.random().toString(16).slice(2)}`,
    date: params.date,
    focusMinutes: params.focusMinutes,
    breakMinutes: params.breakMinutes,
    pagesVisited: params.pagesVisited,
    completed: params.completed,
    cancelled: params.cancelled,
    endedPhase: params.endedPhase,
  };
}

export function trimPomodoroHistory(history: PomodoroHistoryEntry[]) {
  return history.slice(0, POMODORO_HISTORY_LIMIT);
}

export function buildPomodoroPageVisit(input: {
  href: string;
  title: string;
  path?: string;
}): PomodoroPageVisit {
  return {
    href: input.href,
    title: input.title,
    path: input.path ?? '',
  };
}
