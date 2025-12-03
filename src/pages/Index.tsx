import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const servers = [
  { id: 1, country: 'США', flag: '🇺🇸', city: 'Нью-Йорк', ping: 45, load: 23 },
  { id: 2, country: 'Германия', flag: '🇩🇪', city: 'Берлин', ping: 32, load: 15 },
  { id: 3, country: 'Япония', flag: '🇯🇵', city: 'Токио', ping: 89, load: 42 },
  { id: 4, country: 'Великобритания', flag: '🇬🇧', city: 'Лондон', ping: 38, load: 28 },
  { id: 5, country: 'Франция', flag: '🇫🇷', city: 'Париж', ping: 35, load: 19 },
  { id: 6, country: 'Нидерланды', flag: '🇳🇱', city: 'Амстердам', ping: 30, load: 12 },
  { id: 7, country: 'Сингапур', flag: '🇸🇬', city: 'Сингапур', ping: 102, load: 35 },
  { id: 8, country: 'Канада', flag: '🇨🇦', city: 'Торонто', ping: 56, load: 21 },
];

export default function Index() {
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'servers' | 'stats'>('home');
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const [dataUsed, setDataUsed] = useState({ upload: 2.3, download: 15.7 });

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1625] via-[#2d1b3d] to-[#1a1625] text-white">
      {activeTab === 'home' && (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-between min-h-screen animate-fade-in">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                SecureVPN
              </h1>
              <p className="text-muted-foreground">Ваша приватность защищена</p>
            </div>

            <Card className="bg-card/50 backdrop-blur-lg border-border p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedServer.flag}</span>
                  <div>
                    <p className="font-semibold text-lg">{selectedServer.country}</p>
                    <p className="text-sm text-muted-foreground">{selectedServer.city}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActiveTab('servers')}
                  className="hover:bg-primary/10"
                >
                  <Icon name="ChevronRight" size={20} />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-background/50 rounded-lg p-3">
                  <p className="text-muted-foreground mb-1">Пинг</p>
                  <p className="font-semibold text-green-400">{selectedServer.ping} мс</p>
                </div>
                <div className="bg-background/50 rounded-lg p-3">
                  <p className="text-muted-foreground mb-1">Нагрузка</p>
                  <p className="font-semibold text-blue-400">{selectedServer.load}%</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <div
                className={`w-48 h-48 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  isConnected
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 animate-pulse-glow'
                    : 'bg-gradient-to-br from-purple-600 to-blue-600 hover:scale-105'
                }`}
                onClick={handleConnect}
              >
                <div className="w-40 h-40 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
                  <Icon
                    name={isConnected ? 'ShieldCheck' : 'Shield'}
                    size={64}
                    className="text-white"
                  />
                </div>
              </div>
              {isConnected && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-green-500 text-white animate-fade-in">
                    <Icon name="Check" size={12} className="mr-1" />
                    Активно
                  </Badge>
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold mb-2">
              {isConnected ? 'Соединение защищено' : 'Нажмите для подключения'}
            </h2>
            <p className="text-muted-foreground text-center max-w-sm">
              {isConnected
                ? 'Ваш трафик зашифрован и защищён от слежки'
                : 'Защитите своё соединение одним касанием'}
            </p>
          </div>

          <div className="w-full max-w-md">
            {isConnected && (
              <Card className="bg-card/50 backdrop-blur-lg border-border p-4 mb-6 animate-slide-up">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Icon name="ArrowUp" size={20} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Отправлено</p>
                      <p className="font-semibold">{dataUsed.upload.toFixed(1)} ГБ</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Icon name="ArrowDown" size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Получено</p>
                      <p className="font-semibold">{dataUsed.download.toFixed(1)} ГБ</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}

      {activeTab === 'servers' && (
        <div className="container mx-auto px-4 py-8 max-w-2xl animate-fade-in">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveTab('home')}
              className="mr-3"
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h2 className="text-2xl font-bold">Выбор сервера</h2>
          </div>

          <div className="space-y-3">
            {servers.map((server) => (
              <Card
                key={server.id}
                className={`bg-card/50 backdrop-blur-lg border-border p-4 cursor-pointer transition-all hover:scale-[1.02] ${
                  selectedServer.id === server.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => {
                  setSelectedServer(server);
                  setActiveTab('home');
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{server.flag}</span>
                    <div>
                      <p className="font-semibold text-lg">{server.country}</p>
                      <p className="text-sm text-muted-foreground">{server.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Пинг</p>
                      <p className="font-semibold text-green-400">{server.ping} мс</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Нагрузка</p>
                      <p className="font-semibold text-blue-400">{server.load}%</p>
                    </div>
                    {selectedServer.id === server.id && (
                      <Icon name="CheckCircle2" size={24} className="text-primary" />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="container mx-auto px-4 py-8 max-w-2xl animate-fade-in">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveTab('home')}
              className="mr-3"
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h2 className="text-2xl font-bold">Статистика</h2>
          </div>

          <div className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-lg border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Icon name="Activity" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Общий трафик</h3>
                  <p className="text-sm text-muted-foreground">За текущий месяц</p>
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">
                {(dataUsed.upload + dataUsed.download).toFixed(1)} ГБ
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-background/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name="ArrowUp" size={16} className="text-green-400" />
                    <p className="text-sm text-muted-foreground">Отправлено</p>
                  </div>
                  <p className="font-semibold text-xl">{dataUsed.upload.toFixed(1)} ГБ</p>
                </div>
                <div className="bg-background/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name="ArrowDown" size={16} className="text-blue-400" />
                    <p className="text-sm text-muted-foreground">Получено</p>
                  </div>
                  <p className="font-semibold text-xl">{dataUsed.download.toFixed(1)} ГБ</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card/50 backdrop-blur-lg border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Icon name="Clock" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Время подключения</h3>
                  <p className="text-sm text-muted-foreground">Общее время за месяц</p>
                </div>
              </div>
              <div className="text-3xl font-bold">47 ч 23 мин</div>
            </Card>

            <Card className="bg-card/50 backdrop-blur-lg border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                  <Icon name="Globe" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Популярные серверы</h3>
                  <p className="text-sm text-muted-foreground">Топ-3 за месяц</p>
                </div>
              </div>
              <div className="space-y-3">
                {servers.slice(0, 3).map((server, idx) => (
                  <div
                    key={server.id}
                    className="flex items-center justify-between bg-background/30 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{server.flag}</span>
                      <span className="font-medium">{server.country}</span>
                    </div>
                    <Badge variant="secondary">{(15 - idx * 3).toFixed(1)} ГБ</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border">
        <div className="container mx-auto max-w-2xl">
          <div className="grid grid-cols-3 gap-1 p-2">
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              className="flex flex-col items-center gap-1 h-auto py-3"
              onClick={() => setActiveTab('home')}
            >
              <Icon name="Home" size={24} />
              <span className="text-xs">Главная</span>
            </Button>
            <Button
              variant={activeTab === 'servers' ? 'default' : 'ghost'}
              className="flex flex-col items-center gap-1 h-auto py-3"
              onClick={() => setActiveTab('servers')}
            >
              <Icon name="Server" size={24} />
              <span className="text-xs">Серверы</span>
            </Button>
            <Button
              variant={activeTab === 'stats' ? 'default' : 'ghost'}
              className="flex flex-col items-center gap-1 h-auto py-3"
              onClick={() => setActiveTab('stats')}
            >
              <Icon name="BarChart3" size={24} />
              <span className="text-xs">Статистика</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
