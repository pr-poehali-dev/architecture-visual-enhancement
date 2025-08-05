import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  const metrics = [
    {
      title: 'Всего звонков',
      value: '1,247',
      change: '+12% за неделю',
      changeType: 'positive',
      icon: 'Phone'
    },
    {
      title: 'Средняя оценка',
      value: '8.4',
      change: '+0.3 балла',
      changeType: 'positive',
      icon: 'Star'
    },
    {
      title: 'Время обработки',
      value: '4.2 мин',
      change: '+15 сек',
      changeType: 'negative',
      icon: 'Clock'
    },
    {
      title: 'Удовлетворенность',
      value: '92%',
      change: '+2%',
      changeType: 'positive',
      icon: 'Heart'
    }
  ];

  const calls = [
    {
      id: 1,
      date: '05.08.2025',
      time: '14:32',
      operator: 'Елена Синожевская',
      client: '+7 906 123 45**',
      duration: '4:23',
      rating: 9.2,
      status: 'Обработан',
      sentiment: 'Позитивное',
      tags: ['Благодарность', 'Поддержка']
    },
    {
      id: 2,
      date: '05.08.2025',
      time: '14:28',
      operator: 'Олег Морозов',
      client: '+7 916 887 23**',
      duration: '8:45',
      rating: 7.8,
      status: 'Проверка',
      sentiment: 'Нейтральное',
      tags: ['Продажи', 'Консультация']
    },
    {
      id: 3,
      date: '05.08.2025',
      time: '14:25',
      operator: 'Мария Петрова',
      client: '+7 499 123 78**',
      duration: '12:14',
      rating: 6.1,
      status: 'Требует',
      sentiment: 'Негативное',
      tags: ['Жалоба', 'Возврат']
    }
  ];

  const chartData = [
    { name: 'Пн', calls: 45, quality: 8.2 },
    { name: 'Вт', calls: 52, quality: 8.5 },
    { name: 'Ср', calls: 48, quality: 8.1 },
    { name: 'Чт', calls: 61, quality: 8.7 },
    { name: 'Пт', calls: 55, quality: 8.4 },
    { name: 'Сб', calls: 32, quality: 8.9 },
    { name: 'Вс', calls: 28, quality: 9.1 }
  ];

  return (
    <div className="min-h-screen bg-analytics-gray font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Icon name="Phone" className="text-analytics-blue" size={24} />
                <h1 className="text-xl font-semibold text-gray-900">Речевая аналитика</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Button>
              <Button className="bg-analytics-blue hover:bg-analytics-blue-dark">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex space-x-8">
          {[
            { id: 'analytics', label: 'Аналитика', icon: 'BarChart3' },
            { id: 'calls', label: 'Звонки', icon: 'Phone' },
            { id: 'main', label: 'Главная', icon: 'Home' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-analytics-blue text-white'
                  : 'text-gray-600 hover:text-analytics-blue hover:bg-analytics-blue-light'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fade-in">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {metric.title}
                    </CardTitle>
                    <Icon name={metric.icon} className="text-analytics-blue" size={20} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                    <div className={`text-xs flex items-center mt-2 ${
                      metric.changeType === 'positive' ? 'text-analytics-green' : 'text-analytics-red'
                    }`}>
                      <Icon 
                        name={metric.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                        size={12} 
                        className="mr-1" 
                      />
                      {metric.change}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Фильтры</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Select defaultValue="week">
                    <SelectTrigger>
                      <SelectValue placeholder="Период" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Последние 7 дней</SelectItem>
                      <SelectItem value="month">Последний месяц</SelectItem>
                      <SelectItem value="quarter">Последний квартал</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Оператор" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все операторы</SelectItem>
                      <SelectItem value="elena">Елена</SelectItem>
                      <SelectItem value="oleg">Олег</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger>
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
                    <Button variant="outline" className="flex-1">
                      Сбросить
                    </Button>
                    <Button className="flex-1 bg-analytics-blue hover:bg-analytics-blue-dark">
                      Применить фильтры
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Динамика звонков и качества</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2 px-4">
                  {chartData.map((day, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                      <div className="text-xs text-gray-600 font-medium">{day.calls}</div>
                      <div 
                        className="w-full bg-gradient-to-t from-analytics-blue to-analytics-blue-light rounded-t"
                        style={{ height: `${(day.calls / 61) * 200}px` }}
                      />
                      <div className="text-xs text-gray-500">{day.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'calls' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Список разговоров (347 найдено)</h2>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Icon name="Search" size={16} className="mr-2" />
                  Поиск
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} className="mr-2" />
                  Массовые действия
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr className="text-left">
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Воспроизведение</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Дата/Время</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Оператор</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Клиент</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Длительность</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Оценка AI</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Настроение</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Темы</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Статус</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {calls.map((call) => (
                        <tr key={call.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="sm" className="text-analytics-blue">
                              <Icon name="Play" size={16} />
                            </Button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{call.date}</div>
                            <div className="text-xs text-gray-500">{call.time}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-analytics-blue text-white rounded-full flex items-center justify-center text-xs font-medium">
                                {call.operator.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-sm text-gray-900">{call.operator}</div>
                                <div className="text-xs text-gray-500">Колл-центр</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{call.client}</div>
                            <div className="text-xs text-gray-500">Постоянный клиент</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{call.duration}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-900">{call.rating}</span>
                              <Progress value={call.rating * 10} className="w-12 h-2" />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant={
                              call.sentiment === 'Позитивное' ? 'default' :
                              call.sentiment === 'Нейтральное' ? 'secondary' : 'destructive'
                            }>
                              {call.sentiment}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {call.tags.map((tag, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant={
                              call.status === 'Обработан' ? 'default' :
                              call.status === 'Проверка' ? 'secondary' : 'destructive'
                            }>
                              {call.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'main' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center py-12">
              <Icon name="Home" size={48} className="text-analytics-blue mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Добро пожаловать в систему речевой аналитики</h2>
              <p className="text-gray-600 mb-6">Анализируйте качество звонков, отслеживайте метрики и улучшайте работу колл-центра</p>
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={() => setActiveTab('analytics')} 
                  className="bg-analytics-blue hover:bg-analytics-blue-dark"
                >
                  Перейти к аналитике
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('calls')}
                >
                  Просмотреть звонки
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;