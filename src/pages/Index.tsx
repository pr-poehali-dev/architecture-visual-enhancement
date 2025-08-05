import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedOperator, setSelectedOperator] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');

  const metrics = [
    {
      title: 'Всего звонков',
      value: '1,247',
      change: '+12%',
      changeValue: '+134',
      changeType: 'positive',
      icon: 'Phone',
      color: 'blue'
    },
    {
      title: 'Средняя оценка',
      value: '8.4',
      change: '+3.6%',
      changeValue: '+0.3',
      changeType: 'positive',
      icon: 'Star',
      color: 'yellow'
    },
    {
      title: 'Время обработки',
      value: '4:23',
      change: '+5.8%',
      changeValue: '+15сек',
      changeType: 'negative',
      icon: 'Clock',
      color: 'orange'
    },
    {
      title: 'Удовлетворенность',
      value: '92%',
      change: '+2.2%',
      changeValue: '+2%',
      changeType: 'positive',
      icon: 'Heart',
      color: 'green'
    }
  ];

  const calls = [
    {
      id: 1,
      date: '05.08.2025',
      time: '14:32',
      operator: { name: 'Елена Синожевская', avatar: 'ЕС', status: 'online' },
      client: '+7 906 123 45**',
      clientType: 'VIP клиент',
      duration: '4:23',
      rating: 9.2,
      status: 'completed',
      sentiment: 'positive',
      tags: ['Благодарность', 'Поддержка'],
      priority: 'high'
    },
    {
      id: 2,
      date: '05.08.2025',
      time: '14:28',
      operator: { name: 'Олег Морозов', avatar: 'ОМ', status: 'online' },
      client: '+7 916 887 23**',
      clientType: 'Новый клиент',
      duration: '8:45',
      rating: 7.8,
      status: 'review',
      sentiment: 'neutral',
      tags: ['Продажи', 'Консультация'],
      priority: 'medium'
    },
    {
      id: 3,
      date: '05.08.2025',
      time: '14:25',
      operator: { name: 'Мария Петрова', avatar: 'МП', status: 'away' },
      client: '+7 499 123 78**',
      clientType: 'Проблемный',
      duration: '12:14',
      rating: 6.1,
      status: 'action_required',
      sentiment: 'negative',
      tags: ['Жалоба', 'Возврат'],
      priority: 'high'
    }
  ];

  const filteredCalls = useMemo(() => {
    return calls.filter(call => {
      const matchesSearch = call.operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           call.client.includes(searchTerm) ||
                           call.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesOperator = selectedOperator === 'all' || call.operator.name.includes(selectedOperator);
      const matchesRating = selectedRating === 'all' || 
                           (selectedRating === 'high' && call.rating >= 8) ||
                           (selectedRating === 'medium' && call.rating >= 5 && call.rating < 8) ||
                           (selectedRating === 'low' && call.rating < 5);
      
      return matchesSearch && matchesOperator && matchesRating;
    });
  }, [searchTerm, selectedOperator, selectedRating, calls]);

  const chartData = [
    { name: 'Пн', calls: 45, quality: 8.2, satisfaction: 89 },
    { name: 'Вт', calls: 52, quality: 8.5, satisfaction: 91 },
    { name: 'Ср', calls: 48, quality: 8.1, satisfaction: 87 },
    { name: 'Чт', calls: 61, quality: 8.7, satisfaction: 94 },
    { name: 'Пт', calls: 55, quality: 8.4, satisfaction: 92 },
    { name: 'Сб', calls: 32, quality: 8.9, satisfaction: 96 },
    { name: 'Вс', calls: 28, quality: 9.1, satisfaction: 98 }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Обзор', icon: 'Layout' },
    { id: 'analytics', label: 'Аналитика', icon: 'BarChart3' },
    { id: 'calls', label: 'Звонки', icon: 'Phone' },
    { id: 'operators', label: 'Операторы', icon: 'Users' },
    { id: 'reports', label: 'Отчеты', icon: 'FileText' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' }
  ];

  const getMetricColor = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      yellow: 'from-yellow-500 to-yellow-600',
      orange: 'from-orange-500 to-orange-600',
      green: 'from-green-500 to-green-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: 'Обработан', variant: 'default' },
      review: { label: 'На проверке', variant: 'secondary' },
      action_required: { label: 'Требует внимания', variant: 'destructive' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return config || { label: status, variant: 'secondary' };
  };

  const getSentimentColor = (sentiment: string) => {
    const colors = {
      positive: 'text-green-600 bg-green-50',
      neutral: 'text-yellow-600 bg-yellow-50',
      negative: 'text-red-600 bg-red-50'
    };
    return colors[sentiment as keyof typeof colors] || colors.neutral;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Icon name="Phone" className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Речевая аналитика</h1>
              <p className="text-xs text-gray-500">v2.0.1</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
              АИ
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Администратор</p>
              <p className="text-xs text-gray-500">admin@company.ru</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {navigationItems.find(item => item.id === activeTab)?.label}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {activeTab === 'dashboard' && 'Общий обзор показателей'}
                  {activeTab === 'analytics' && 'Детальная аналитика и метрики'}
                  {activeTab === 'calls' && `Управление звонками • ${filteredCalls.length} из ${calls.length}`}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} className="mr-2" />
                  Экспорт
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать отчет
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                  <Card key={index} className="metric-card border-0 shadow-sm hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 mb-2">{metric.title}</p>
                          <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                          <div className={`flex items-center text-xs font-medium ${
                            metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            <Icon 
                              name={metric.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                              size={14} 
                              className="mr-1" 
                            />
                            {metric.change} • {metric.changeValue}
                          </div>
                        </div>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getMetricColor(metric.color)} flex items-center justify-center`}>
                          <Icon name={metric.icon} className="text-white" size={20} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Activity Chart */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Активность по дням</CardTitle>
                    <p className="text-sm text-gray-500">Количество звонков и средняя оценка</p>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {chartData.map((day, index) => (
                        <div key={index} className="flex flex-col items-center space-y-3 flex-1">
                          <div className="text-xs font-medium text-gray-600">{day.calls}</div>
                          <div 
                            className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md relative group cursor-pointer hover:from-blue-600 hover:to-blue-500 transition-colors"
                            style={{ height: `${(day.calls / 61) * 180}px` }}
                          >
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              {day.quality}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 font-medium">{day.name}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Satisfaction Trends */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Тренд удовлетворенности</CardTitle>
                    <p className="text-sm text-gray-500">Процент довольных клиентов</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {chartData.slice(0, 4).map((day, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-600">{day.name}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Progress value={day.satisfaction} className="w-24 h-2" />
                            <span className="text-sm font-medium text-gray-900 w-10">{day.satisfaction}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fade-in">
              {/* Filters */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Период" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Последние 7 дней</SelectItem>
                        <SelectItem value="month">Последний месяц</SelectItem>
                        <SelectItem value="quarter">Последний квартал</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedOperator} onValueChange={setSelectedOperator}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Оператор" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все операторы</SelectItem>
                        <SelectItem value="elena">Елена</SelectItem>
                        <SelectItem value="oleg">Олег</SelectItem>
                        <SelectItem value="maria">Мария</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedRating} onValueChange={setSelectedRating}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Оценка" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все оценки</SelectItem>
                        <SelectItem value="high">Высокие (8-10)</SelectItem>
                        <SelectItem value="medium">Средние (5-7)</SelectItem>
                        <SelectItem value="low">Низкие (1-4)</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 h-10"
                        onClick={() => {
                          setSelectedPeriod('week');
                          setSelectedOperator('all');
                          setSelectedRating('all');
                        }}
                      >
                        Сбросить
                      </Button>
                      <Button size="sm" className="flex-1 h-10 bg-blue-600 hover:bg-blue-700">
                        Применить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Icon name={metric.icon} className="text-gray-400" size={20} />
                        <Badge variant="outline" className="text-xs">
                          {selectedPeriod === 'week' ? '7д' : selectedPeriod === 'month' ? '30д' : '90д'}
                        </Badge>
                      </div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">{metric.title}</h3>
                      <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
                      <div className={`text-xs font-medium ${
                        metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change} за период
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Calls */}
          {activeTab === 'calls' && (
            <div className="space-y-6 animate-fade-in">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder="Поиск по оператору, клиенту или тегам..."
                    className="pl-10 h-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedOperator} onValueChange={setSelectedOperator}>
                  <SelectTrigger className="w-full sm:w-40 h-10">
                    <SelectValue placeholder="Оператор" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все операторы</SelectItem>
                    <SelectItem value="Елена">Елена</SelectItem>
                    <SelectItem value="Олег">Олег</SelectItem>
                    <SelectItem value="Мария">Мария</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-10">
                  <Icon name="Filter" size={16} className="mr-2" />
                  Фильтры
                </Button>
              </div>

              {/* Results Info */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Найдено <span className="font-medium">{filteredCalls.length}</span> из <span className="font-medium">{calls.length}</span> записей
                </p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Download" size={16} className="mr-2" />
                    Экспорт
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="MoreHorizontal" size={16} />
                  </Button>
                </div>
              </div>

              {/* Calls Table */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Воспроизведение
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Время
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Оператор
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Клиент
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Длительность
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Оценка
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Настроение
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Статус
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Действия
                          </th>
                        </tr>
                      </thead>
                      <tbody className="data-table bg-white">
                        {filteredCalls.map((call) => {
                          const statusConfig = getStatusBadge(call.status);
                          return (
                            <tr key={call.id}>
                              <td className="px-6 py-4">
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                  <Icon name="Play" size={16} />
                                </Button>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900">{call.date}</div>
                                <div className="text-xs text-gray-500">{call.time}</div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-3">
                                  <div className="relative">
                                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                                      {call.operator.avatar}
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                      call.operator.status === 'online' ? 'bg-green-400' : 
                                      call.operator.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                                    }`}></div>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">{call.operator.name}</div>
                                    <div className="text-xs text-gray-500">Колл-центр</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900">{call.client}</div>
                                <Badge variant={call.clientType === 'VIP клиент' ? 'default' : 'outline'} className="text-xs mt-1">
                                  {call.clientType}
                                </Badge>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900">{call.duration}</div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium text-gray-900">{call.rating}</span>
                                  <Progress value={call.rating * 10} className="w-16 h-2" />
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <Badge className={`text-xs ${getSentimentColor(call.sentiment)}`}>
                                  {call.sentiment === 'positive' ? 'Позитивное' :
                                   call.sentiment === 'neutral' ? 'Нейтральное' : 'Негативное'}
                                </Badge>
                              </td>
                              <td className="px-6 py-4">
                                <Badge variant={statusConfig.variant as any} className="text-xs">
                                  {statusConfig.label}
                                </Badge>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                                    <Icon name="Eye" size={14} />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                                    <Icon name="MoreHorizontal" size={14} />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Other Tabs Placeholder */}
          {!['dashboard', 'analytics', 'calls'].includes(activeTab) && (
            <div className="text-center py-12 animate-fade-in">
              <Icon name="Construction" size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Раздел &quot;{navigationItems.find(item => item.id === activeTab)?.label}&quot; в разработке
              </h3>
              <p className="text-gray-500">Этот функционал будет доступен в следующих версиях</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;