import { useState } from 'react';
import { Search, MapPin, Wind, Droplets, Gauge, ThermometerSun } from 'lucide-react';
import type { WeatherData } from '../types/weather';

export default function HomePage() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'f00c38e0279b7bc85480c3fe775d518c';

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div
      className="min-h-[calc(100vh-64px)] bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('shiu.gif')`
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Parashikimi i motit</h1>
          <p className="text-blue-100 text-lg">Merr të dhëna në kohë reale mbi motin</p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="w-full px-6 py-4 rounded-full text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 pr-14"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors disabled:bg-gray-400 shadow-lg"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>

        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
            {error}
          </div>
        )}

        {weather && !loading && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-6 w-6 text-blue-600" />
                    <h2 className="text-4xl font-bold text-gray-800">
                      {weather.name}, {weather.sys.country}
                    </h2>
                  </div>
                  <p className="text-gray-600 text-lg capitalize ml-8">
                    {weather.weather[0].description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-6xl font-bold text-gray-800">
                    {Math.round(weather.main.temp)}°C
                  </div>
                  <div className="text-gray-600 text-lg">
                    Duket sikur {Math.round(weather.main.feels_like)}°C
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                  <Wind className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-800">{weather.wind.speed} m/s</div>
                  <div className="text-gray-600 text-sm">Shpejtësia e erës</div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 text-center">
                  <Droplets className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-800">{weather.main.humidity}%</div>
                  <div className="text-gray-600 text-sm">Lagështia</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                  <Gauge className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-800">{weather.main.pressure} hPa</div>
                  <div className="text-gray-600 text-sm">Shtypja</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center">
                  <ThermometerSun className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-800">{weather.weather[0].main}</div>
                  <div className="text-gray-600 text-sm">Kushtet</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!weather && !loading && !error && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-12">
              <Search className="h-20 w-20 text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Fillo kërkimin</h3>
              <p className="text-gray-600">
                Shkruaj emrin e një qyteti dhe merr të dhënat e motit për të.
              </p>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
