
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { TransactionContent } from './components/TransactionSteps';
import SmartOneDashboard from './components/SmartOneDashboard';
import ChatWidget from './components/ChatWidget';
import { TransactionStep, BrandConfig } from './types';
import { WCT_BRAND, MOCK_AGENT, REAL_PROPERTY_MOCK } from './constants';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<TransactionStep>(TransactionStep.STARTED);
  const [brand] = useState<BrandConfig>(WCT_BRAND);
  const [inDashboard, setInDashboard] = useState(false);
  const [simulatedDays, setSimulatedDays] = useState(90);
  
  // Seller Opt-ins
  const [optInSmartOne, setOptInSmartOne] = useState(false);

  // Automatic Scroll to Top on Step Change
  useEffect(() => {
    // Target the specific scrollable main container defined in Layout
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [currentStep, inDashboard]);

  const handleNext = () => {
    if (currentStep === TransactionStep.CLOSED) {
      setInDashboard(true);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, TransactionStep.CLOSED) as TransactionStep);
    }
  };

  const handleBack = () => {
    if (inDashboard) {
      setInDashboard(false);
      setCurrentStep(TransactionStep.CLOSED);
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, TransactionStep.STARTED) as TransactionStep);
    }
  };

  return (
    <Layout 
      brand={brand} 
      agent={MOCK_AGENT} 
      propertyAddress={`${REAL_PROPERTY_MOCK.address} | ${REAL_PROPERTY_MOCK.cityStateZip}`}
    >
      {!inDashboard ? (
        <TransactionContent 
          step={currentStep} 
          brand={brand} 
          onNext={handleNext} 
          onBack={handleBack}
          optInSmartOne={optInSmartOne}
          setOptInSmartOne={setOptInSmartOne}
        />
      ) : (
        <SmartOneDashboard 
          brand={brand} 
          agent={MOCK_AGENT} 
          daysRemaining={simulatedDays}
        />
      )}

      <ChatWidget brand={brand} />
    </Layout>
  );
};

export default App;
