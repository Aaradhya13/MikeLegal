import { useState } from 'react'
import { Layout, Typography, Row, Col } from 'antd'
import TaskCalendar from './components/TaskCalendar'
import './App.css'

const { Header, Content } = Layout
const { Title } = Typography

function App() {
  const [selectedDate, setSelectedDate] = useState(null)

  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Title level={2} style={{ margin: '16px 0', color: '#1890ff' }}>
          Daily Task Manager
        </Title>
      </Header>
      <Content style={{ padding: '24px' }}>
        <Row gutter={24}>
          <Col span={16}>
            <TaskCalendar onDateSelect={handleDateSelect} />
          </Col>
          <Col span={8}>
            <div style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
              <Title level={4}>Tasks for {selectedDate || 'Select a date'}</Title>
              {/* Task list will go here */}
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default App
