function ActivityTracker() {
  const [count, setCount] = React.useState(0);
  const [timer, setTimer] = React.useState(0);
  const [tracking, setTracking] = React.useState(false);
  const isFirstCount = React.useRef(true);

  // Runs once on mount
  React.useEffect(() => {
    console.log('Page loaded');
  }, []);

  // Runs when `count` changes, but not on initial render
  React.useEffect(() => {
    if (isFirstCount.current) {
      isFirstCount.current = false;
      return;
    }
    console.log('Count updated');
  }, [count]);

  // Update document title whenever `count` changes
  React.useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  // Timer that increments every second; cleaned up on unmount
  React.useEffect(() => {
    const id = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Conditional effect: only logs when tracking is ON
  React.useEffect(() => {
    if (tracking) {
      console.log('Tracking active');
    }
  }, [tracking]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <h1>User Activity Tracker</h1>

      <div>
        <strong>Count:</strong> {count}{' '}
        <button onClick={() => setCount(c => c + 1)}>Increase</button>
      </div>

      <div style={{ marginTop: 10 }}>
        <strong>Timer:</strong> {timer} seconds
      </div>

      <div style={{ marginTop: 10 }}>
        <button onClick={() => setTracking(t => !t)}>
          {tracking ? 'Stop Tracking' : 'Start Tracking'}
        </button>
      </div>
    </div>
  );
}

function App() {
  return <ActivityTracker />;
}

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<App />);