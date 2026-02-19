import type { ExecutionEvent } from '../types';

const WS_URL =
  import.meta.env.MODE === 'production'
    ? 'wss://js-visualizer-9000-server.herokuapp.com'
    : 'ws://localhost:8080';

export const fetchEventsForCode = (code: string): Promise<ExecutionEvent[]> =>
  new Promise((resolve, reject) => {
    try {
      const ws = new WebSocket(WS_URL);

      ws.addEventListener('open', () => {
        ws.send(JSON.stringify({ type: 'RunCode', payload: code }));
      });

      ws.addEventListener('message', (event) => {
        const events: ExecutionEvent[] = JSON.parse(event.data as string);
        console.log('Events:', events);

        const didError =
          !events || !events[0] || events[0].type === 'UncaughtError';

        if (didError) {
          const isSyntaxError =
            events?.[0]?.payload?.error?.name === 'SyntaxError';
          reject(
            new Error(
              isSyntaxError
                ? 'Failed to run script due to syntax error.'
                : 'Failed to run script.'
            )
          );
        } else {
          resolve(events);
        }

        ws.close();
      });

      ws.addEventListener('error', () => {
        reject(new Error('Failed to connect to backend.'));
      });
    } catch (e) {
      const err = e as Error;
      reject(new Error(`Failed to connect to backend: ${err.message}`));
    }
  });
