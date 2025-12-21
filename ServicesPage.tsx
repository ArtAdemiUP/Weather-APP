import { CloudRain, CloudSnow, Sun, Wind, Zap, AlertTriangle } from 'lucide-react';

interface ServicesPageProps {
  onSelectService: (service: string) => void;
}

export default function ServicesPage({ onSelectService }: ServicesPageProps) {
  const services = [
    {
      id: 'realtime',
      icon: Sun,
      title: 'Përshkrimi Real-Time',
      description: 'Merrni kushtet e motit në çastin e mirëfilltë për çdo vend në botë.',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      id: 'forecast',
      icon: CloudRain,
      title: 'Parashikimi 7-Ditor',
      description: 'Planifikoni përpara me parashikime të sakta të motit për javën.',
      color: 'from-blue-400 to-blue-600',
    },
    {
      id: 'wind',
      icon: Wind,
      title: 'Analiza e Erës',
      description: 'Të dhëna të detajuara për shpejtësinë dhe drejtimin e erës.',
      color: 'from-cyan-400 to-teal-500',
    },
    {
      id: 'storm',
      icon: CloudSnow,
      title: 'Ndjekja e Stuhive',
      description: 'Ndjekni modelet e motit të rëndë dhe qëndroni të sigurt.',
      color: 'from-slate-400 to-slate-600',
    },
    {
      id: 'alerts',
      icon: Zap,
      title: 'Paralajmërime Motit',
      description: 'Merrni notiftime të çastit për kushtet e rënda të motit.',
      color: 'from-red-400 to-pink-500',
    },
    {
      id: 'climate',
      icon: AlertTriangle,
      title: 'Të Dhëna të Klimës',
      description: 'Aksesoni të dhënat historike të klimës dhe trendet afatgjata.',
      color: 'from-green-400 to-emerald-500',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Shërbimet Tona</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Shërbime gjithëpërfshirëse të motit për t'ju mbajtur të informuar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => onSelectService(service.id)}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden text-left cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${service.color} p-6 text-white`}>
                  <Icon className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Pse të Zgjidhni WeatherPro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Norma e Saktësisë</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Përditësimet në Kohë Reale</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">195+</div>
              <div className="text-gray-600">Vendet e Mbuluar</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
