import { useState } from 'react'
import { Layout, Typography, Button, Space, Avatar, Modal } from 'antd'
import { PlusOutlined, EyeOutlined, CalendarOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import TaskCalendar from './components/TaskCalendar'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskCharts from './components/TaskCharts'
import './App.css'

const { Sider, Content } = Layout
const { Title, Text } = Typography

function App() {
  const [showModal, setShowModal] = useState(false)
  const [showDateOptions, setShowDateOptions] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [clickedDate, setClickedDate] = useState(null)

  const { selectedDate, tasks } = useSelector(state => state.tasks)

  const handleDateSelect = (date) => {
    setClickedDate(date)
    setShowDateOptions(true)
  }

  const handleAddTaskForDate = () => {
    setShowDateOptions(false)
    setEditTask(null)
    setShowModal(true)
  }

  const handleViewTasksForDate = () => {
    setShowDateOptions(false)
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

  const today = dayjs().format('YYYY-MM-DD')
  const todayTasks = tasks.filter(task => task.date === today)
  const upcomingTasks = tasks.filter(task => task.date > today)

  return (
    <Layout className="app-layout">
      <Sider 
        width={280} 
        className="app-sidebar"
        breakpoint="lg"
        collapsedWidth={0}
      >
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">TM</div>
            <span className="logo-text">Task Manager</span>
          </div>
        </div>
        
        <div className="menu-section">
          <div className="menu-item active">
            <CalendarOutlined />
            <span>Calendar</span>
          </div>
        </div>
      </Sider>

      <Layout className="main-layout">
        <div className="main-header">
          <Title level={2} style={{ margin: 0 }}>Daily Task Manager</Title>
        </div>

        <Content className="main-content">
          <div className="content-grid">
            <div className="calendar-section">
              <TaskCalendar onDateSelect={handleDateSelect} />
              <div className="charts-section">
                <TaskCharts />
              </div>
            </div>
            
            <div className="tasks-section">
              <div className="section-header">
                <Title level={4} style={{ margin: 0 }}>Today's Tasks</Title>
              </div>
              
              <div className="today-tasks">
                {todayTasks.length > 0 ? todayTasks.map((task) => (
                  <div key={task.id} className="simple-task">
                    <Text strong>{task.title}</Text>
                    <Text style={{ color: '#666', fontSize: '12px' }}>({task.category})</Text>
                  </div>
                )) : (
                  <Text style={{ color: '#999' }}>No tasks today</Text>
                )}
              </div>
              
              <div className="section-header" style={{ marginTop: '20px' }}>
                <Title level={4} style={{ margin: 0 }}>Upcoming</Title>
              </div>
              
              <div className="upcoming-tasks">
                {upcomingTasks.length > 0 ? upcomingTasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="simple-task">
                    <Text strong>{task.title}</Text>
                    <Text style={{ color: '#666', fontSize: '12px' }}>{task.date}</Text>
                  </div>
                )) : (
                  <Text style={{ color: '#999' }}>No upcoming tasks</Text>
                )}
              </div>
              
              <Space style={{ width: '100%', justifyContent: 'space-between', marginTop: '16px' }}>
                <Title level={5} style={{ margin: 0 }}>Tasks for {selectedDate}</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTask} size="small">
                  Add
                </Button>
              </Space>
              <TaskList selectedDate={selectedDate} onEditTask={handleEditTask} />
            </div>
          </div>
        </Content>
      </Layout>
      
      <Modal
        title={`Options for ${clickedDate}`}
        open={showDateOptions}
        onCancel={() => setShowDateOptions(false)}
        footer={null}
        width={400}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px 0' }}>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAddTaskForDate}
            size="large"
          >
            Add New Task
          </Button>
          <Button 
            icon={<EyeOutlined />} 
            onClick={handleViewTasksForDate}
            size="large"
          >
            View Tasks (Check Sidebar)
          </Button>
        </div>
      </Modal>

      <TaskForm 
        open={showModal}
        onClose={handleCloseModal}
        selectedDate={clickedDate || selectedDate}
        editTask={editTask}
      />
    </Layout>
  )
}



export default App
