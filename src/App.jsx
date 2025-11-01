import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CustomerList } from './components/CustomerList';
import { initDB, isDatabasePopulated, bulkInsert } from './services/indexedDB';
import { generateBatch } from './services/dataGenerator';
import { TOTAL_RECORDS, BATCH_SIZE } from './utils/constants';
import './styles/index.css';
import './styles/components.css';
import './styles/table.css';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  // Initialize database and generate data if needed
  const initializeApp = async () => {
    try {
      await initDB();
      const isPopulated = await isDatabasePopulated();

      if (!isPopulated) {
        await generateData();
      }

      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  };

  // Generate 1 million records in batches
  const generateData = async () => {
    setIsGenerating(true);
    const totalBatches = Math.ceil(TOTAL_RECORDS / BATCH_SIZE);

    for (let i = 0; i < totalBatches; i++) {
      const startId = i * BATCH_SIZE;
      const count = Math.min(BATCH_SIZE, TOTAL_RECORDS - startId);
      const batch = generateBatch(startId, count);

      await bulkInsert(batch);

      const currentProgress = ((i + 1) / totalBatches) * 100;
      setProgress(currentProgress);
    }

    setIsGenerating(false);
  };

  // Show loading screen during data generation
  if (isGenerating) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">
          Generating {TOTAL_RECORDS.toLocaleString()} customer records...
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar__fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="loading-text">{Math.round(progress)}%</div>
      </div>
    );
  }

  // Show loading screen during initialization
  if (!isInitialized) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">Initializing...</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <CustomerList />
    </>
  );
}

export default App;
