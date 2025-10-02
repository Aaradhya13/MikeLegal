import { useState } from 'react'
import { Card, Select, Button, Space, Row, Col } from 'antd'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useSelector } from 'react-redux'

const { Option } = Select

const COLORS = {
  success: '#52c41a',
  warning: '#faad14', 
  issue: '#ff4d4f',
  info: '#1890ff'
}

const TaskCharts = () => {
  const { tasks } = useSelector(state => state.tasks)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [appliedCategory, setAppliedCategory] = useState('all')
  const [chartType, setChartType] = useState('bar')

  const getFilteredData = () => {
    const filteredTasks = appliedCategory === 'all' 
      ? tasks 
      : tasks.filter(task => task.category === appliedCategory)

    const categoryCount = {}
    filteredTasks.forEach(task => {
      categoryCount[task.category] = (categoryCount[task.category] || 0) + 1
    })

    return Object.entries(categoryCount).map(([category, count]) => ({
      category,
      count,
      color: COLORS[category]
    }))
  }

  const handleApply = () => {
    console.log('Applying filter:', selectedCategory) // for debugging
    setAppliedCategory(selectedCategory)
  }

  const handleReset = () => {
    console.log('Resetting filters') // for debugging
    setSelectedCategory('all')
    setAppliedCategory('all')
  }

  const chartData = getFilteredData()

  return (
    <Card title="Task Count by Category">
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Select
          value={selectedCategory}
          onChange={setSelectedCategory}
          style={{ width: 150 }}
        >
          <Option value="all">All Categories</Option>
          <Option value="success">Success</Option>
          <Option value="warning">Warning</Option>
          <Option value="issue">Issue</Option>
          <Option value="info">Info</Option>
        </Select>
        <Select
          value={chartType}
          onChange={setChartType}
          style={{ width: 120 }}
        >
          <Option value="bar">Bar Chart</Option>
          <Option value="pie">Pie Chart</Option>
        </Select>
        <Button type="primary" onClick={handleApply}>Apply</Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>

      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height={300}>
          {chartType === 'bar' ? (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="category" 
              />
              <YAxis 
                allowDecimals={false}
                label={{ value: 'Number of Tasks', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Bar dataKey="count" fill="#1890ff">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="count"
                label={({ category, count }) => `${category}: ${count}`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default TaskCharts