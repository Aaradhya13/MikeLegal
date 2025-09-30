import { Modal, Form, Input, Select, DatePicker, Button } from 'antd'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { addTask, updateTask } from '../store/taskSlice'
import dayjs from 'dayjs'

const { TextArea } = Input
const { Option } = Select

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  category: Yup.string().required('Category is required')
})

const TaskForm = ({ visible, onClose, selectedDate, editTask = null }) => {
  const dispatch = useDispatch()

  const initialValues = {
    title: editTask?.title || '',
    description: editTask?.description || '',
    date: editTask?.date || selectedDate,
    category: editTask?.category || 'default'
  }

  const handleSubmit = (values) => {
    if (editTask) {
      dispatch(updateTask({ ...editTask, ...values }))
    } else {
      dispatch(addTask(values))
    }
    onClose()
  }

  return (
    <Modal
      title={editTask ? 'Edit Task' : 'Add New Task'}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={500}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item 
              label="Title" 
              validateStatus={errors.title && touched.title ? 'error' : ''}
              help={errors.title && touched.title ? errors.title : ''}
            >
              <Input
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Enter task title"
              />
            </Form.Item>

            <Form.Item label="Description">
              <TextArea
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Enter task description (optional)"
                rows={3}
              />
            </Form.Item>

            <Form.Item label="Date">
              <DatePicker
                value={dayjs(values.date)}
                onChange={(date) => setFieldValue('date', date.format('YYYY-MM-DD'))}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item 
              label="Category"
              validateStatus={errors.category && touched.category ? 'error' : ''}
              help={errors.category && touched.category ? errors.category : ''}
            >
              <Select
                value={values.category}
                onChange={(value) => setFieldValue('category', value)}
              >
                <Option value="success">Success</Option>
                <Option value="warning">Warning</Option>
                <Option value="error">Issue</Option>
                <Option value="default">Info</Option>
              </Select>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editTask ? 'Update' : 'Add'} Task
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default TaskForm