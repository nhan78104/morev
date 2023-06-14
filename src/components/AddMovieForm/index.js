import { PlusOutlined } from '@ant-design/icons'
import { Button, Cascader, DatePicker, Form, Input, Modal, Space, Upload } from 'antd'
import React, { useState } from 'react'

import { addMovie } from '../../api/adminPage'

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 64,
  },
}

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 24,
  },
}

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

const options = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Music',
  'Mystery',
  'Romance',
  'Science Fiction',
  'TV Movie',
  'Thriller',
  'War',
  'Western',
].map((genre) => ({
  label: genre,
  value: genre,
}))

const AddMovieForm = () => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [posterImage, setPosterImage] = useState(null)
  const [genresList, setGenresList] = useState()
  const [title, setTitle] = useState('')
  const formRef = React.useRef(null)

  const onFinish = async (values) => {
    try {
      const releaseDate = `${values?.releaseDate.year()} ${values?.releaseDate.month()} ${values?.releaseDate.date()}`
      const genres = values?.genres.map((genre) => genre[0])
      values.releaseDate = releaseDate
      values.genres = genres
      const data = { ...values, poster: posterImage[0]?.response?.url }

      const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
      await addMovie(accessToken, data)
    } catch (error) {
      console.log(error)
    }
  }
  const onReset = () => {
    formRef.current?.resetFields()
    setPosterImage([])
  }
  const handleUploadingCancel = () => setPreviewOpen(false)
  const handleUploadingPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }
  const handleFileChange = ({ fileList: image }) => {
    setPosterImage(image)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )

  const onGenresChange = (value) => {
    setGenresList(value)
  }

  const genresFilter = (inputValue, path) =>
    path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)

  const handleTitleChange = (e) => setTitle(e)

  return (
    <Form
      {...layout}
      size='large'
      ref={formRef}
      name='control-ref'
      onFinish={onFinish}
      style={{
        paddingInline: '2rem',
        maxWidth: 1080,
        minWidth: 560,
      }}
    >
      <Form.Item
        name='title'
        label='Title'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input value={title} onChange={handleTitleChange} />
      </Form.Item>
      <Form.Item
        name='releaseDate'
        label='Release Date'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        label='Poster'
        valuePropName='fileList'
        getValueFromEvent={normFile}
      >
        <>
          <Upload
            action='http://localhost:8080/api/v1/images'
            listType='picture-card'
            fileList={posterImage}
            onPreview={handleUploadingPreview}
            onChange={handleFileChange}
          >
            {posterImage?.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleUploadingCancel}>
            <img
              alt='example'
              style={{
                width: '100%',
              }}
              src={previewImage}
            />
          </Modal>
        </>
      </Form.Item>
      <Form.Item
        name='genres'
        label='Genres'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Cascader
          style={{
            width: '100%',
          }}
          options={options}
          onChange={onGenresChange}
          multiple
          maxTagCount='responsive'
          showSearch={{
            genresFilter,
          }}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
          <Button htmlType='button' onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
export default AddMovieForm
