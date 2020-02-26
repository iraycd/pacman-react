import { Machine, interpret } from 'xstate';

export const INITIAL_GHOST_STATE = 'scatter';

interface GhostEventHandler {
  onScatterToChase(): void;
  onChaseToScatter(): void;
  onPacManKilled(): void;
  onDead(): void;
}

type GhostContext = {};

interface GhostStateSchema {
  states: {
    chase: {};
    scatter: {};
    frightened: {};
    dead: {};
  };
}

export type GhostEventType =
  | 'ENERGIZER_EATEN'
  | 'ENERGIZER_TIMED_OUT'
  | 'PHASE_END'
  | 'COLLISION_WITH_PAC_MAN'
  | 'REVIVED';

type GhostEvent = { type: GhostEventType };

const GhostStateChart = Machine<GhostContext, GhostStateSchema, GhostEvent>({
  id: 'ghost',
  initial: INITIAL_GHOST_STATE,
  states: {
    chase: {
      on: {
        ENERGIZER_EATEN: 'frightened',
        PHASE_END: {
          target: 'scatter',
          actions: 'onChaseToScatter',
        },
        COLLISION_WITH_PAC_MAN: {
          actions: 'onPacManKilled',
          target: 'scatter',
        },
      },
    },
    scatter: {
      on: {
        ENERGIZER_EATEN: 'frightened',
        PHASE_END: {
          target: 'chase',
          actions: 'onScatterToChase',
        },
        COLLISION_WITH_PAC_MAN: {
          actions: 'onPacManKilled',
          target: 'scatter',
        },
      },
    },
    frightened: {
      on: {
        ENERGIZER_TIMED_OUT: 'chase',
        COLLISION_WITH_PAC_MAN: {
          target: 'dead',
          actions: 'onDead',
        },
      },
    },
    dead: {
      on: {
        REVIVED: 'scatter',
      },
    },
  },
});

export const makeGhostStateChart = (eventHandler: GhostEventHandler) => {
  const extended = GhostStateChart.withConfig({
    actions: {
      onPacManKilled: eventHandler.onPacManKilled,
      onScatterToChase: eventHandler.onScatterToChase,
      onChaseToScatter: eventHandler.onChaseToScatter,
      onDead: eventHandler.onDead,
    },
  });
  const stateChart = interpret(extended);
  return stateChart;
};
