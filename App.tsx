import { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import SevenDayForecastPage from './pages/services/SevenDayForecastPage';
import WindAnalysisPage from './pages/services/WindAnalysisPage';
import StormTrackingPage from './pages/services/StormTrackingPage';
import WeatherAlertsPage from './pages/services/WeatherAlertsPage';
import ClimateDataPage from './pages/services/ClimateData';
import RealTimeWeatherPage from './pages/services/RealTimeWeatherPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [servicePage, setServicePage] = useState<string | null>(null);

  const navigateToService = (service: string) => {
    setServicePage(service);
    setCurrentPage('service-detail');
  };

  const renderPage = () => {
    if (currentPage === 'service-detail' && servicePage) {
      switch (servicePage) {
        case 'forecast':
          return <SevenDayForecastPage onBack={() => setCurrentPage('services')} />;
        case 'wind':
          return <WindAnalysisPage onBack={() => setCurrentPage('services')} />;
        case 'storm':
          return <StormTrackingPage onBack={() => setCurrentPage('services')} />;
        case 'alerts':
          return <WeatherAlertsPage onBack={() => setCurrentPage('services')} />;
        case 'climate':
          return <ClimateDataPage onBack={() => setCurrentPage('services')} />;
        case 'realtime':
          return <RealTimeWeatherPage onBack={() => setCurrentPage('services')} />;
        default:
          return <ServicesPage onSelectService={navigateToService} />;
      }
    }

    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'services':
        return <ServicesPage onSelectService={navigateToService} />;
      case 'products':
        return <ProductsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;
