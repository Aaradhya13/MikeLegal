import { useState } from 'react'
import { Layout, Typography, Row, Col, Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import TaskCalendar from './components/TaskCalendar'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

const { Header, Content } = Layout
const { Title } = Typography

function App() {
  const [showModal, setShowModal] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const { selectedDate } = useSelector(state => state.tasks)

  const handleDateSelect = (date) => {
    setShowModal(true)
  }

  const handleAddTask = () => {
    setEditTask(null)
    setShowModal(true)
  }

  const handleEditTask = (task) => {
    setEditTask(task)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditTask(null)
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
              <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: '16px' }}>
                <Title level={4} style={{ margin: 0 }}>Tasks for {selectedDate}</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTask}>
                  Add Task
                </Button>
              </Space>
              <TaskList selectedDate={selectedDate} onEditTask={handleEditTask} />
            </div>
          </Col>
        </Row>
      </Content>
      
      <TaskForm 
        visible={showModal}
        onClose={handleCloseModal}
        selectedDate={selectedDate}
        editTask={editTask}
      />
    </Layout>
  )
}

export default App
