import { AntDesignOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Avatar, Button, Cascader, DatePicker, Form, Input, Layout, Modal, Space, Typography, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { addMovie } from '../../api/adminPage'
import { getMovieById, updateMovieById } from '../../api/editMovie'

const dayjs = require('dayjs')

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

const EditMovie = () => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])
  const [genresList, setGenresList] = useState()
  const [title, setTitle] = useState('Title')
  const [posterImageUrl, setPosterImageUrl] = useState('')
  const formRef = React.useRef(null)

  const params = useParams()
  const movieId = params.id

  const onFinish = async (values) => {
    try {
      const releaseDate = `${values?.releaseDate.year()} ${values?.releaseDate.month()} ${values?.releaseDate.date()}`
      const genres = values?.genres
      const data = {
        ...values,
        genres: genres.map((genre) => genre[0]),
        releaseDate,
        poster: posterImageUrl,
        backdrops: fileList.map((file) => file.url),
      }
      const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
      await updateMovieById({ ...data, id: movieId }, accessToken)
    } catch (error) {
      console.log(error)
    }
  }
  const onCancel = () => {
    return <Navigate to='/admin' />
  }

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await getMovieById(movieId)
        const movie = res.data
        formRef.current?.setFieldValue('title', movie.title)
        formRef.current?.setFieldValue('poster', movie.poster)
        formRef.current?.setFieldValue('releaseDate', dayjs(movie.releaseDate + ' 00:00'))
        formRef.current?.setFieldValue(
          'genres',
          movie.genres.map((genre) => [genre])
        )
        formRef.current?.setFieldValue('backdrops', movie?.backdrops)
        formRef.current?.setFieldValue('trailerLink', movie?.trailerLink)

        setFileList(
          movie?.backdrops.map((backdrop) => ({
            url: backdrop,
          }))
        )
        setPosterImageUrl(movie.poster)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMovie()
  }, [])

  const onGenresChange = (value) => {
    console.log(value)
    setGenresList(value)
  }

  const genresFilter = (inputValue, path) =>
    path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)

  const handleTitleChange = (e) => {
    formRef.current?.setFieldValue('title', e)
  }

  const handleImageUpload = (e) => {
    setPosterImageUrl(e)
  }
  const handleCancel = () => setPreviewOpen(false)
  const handleBackdropPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }
  const handleBackdropChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
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

  return (
    <Layout
      style={{
        padding: '24px 0',
      }}
    >
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
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Typography.Title
            editable={{
              tooltip: 'click to edit text',
              onChange: handleTitleChange,
              triggerType: ['icon', 'text'],
            }}
            level={2}
            value={title}
            style={{ margin: 0 }}
          >
            {formRef.current?.getFieldValue('title')}
          </Typography.Title>
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
          <Avatar
            src={posterImageUrl && posterImageUrl}
            icon={<AntDesignOutlined />}
            size={150}
            shape='square'
            style={{ backgroundColor: '#fde3cf', color: '#f56a00', fontSize: 50 }}
          />
          <Upload name='file' action={handleImageUpload} showUploadList={false}>
            <Button type='ghost' icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>
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
        <Form.Item name='trailerLink' label='Trailer Link'>
          <Input />
        </Form.Item>
        <Form.Item name='backdrops' label='Backdrops'>
          <>
            <Upload
              action='http://localhost:8080/api/v1/images'
              listType='picture-card'
              fileList={fileList}
              onPreview={handleBackdropPreview}
              onChange={handleBackdropChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                alt='Preview'
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>
          </>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <Button htmlType='button' onClick={onCancel}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Layout>
  )
}
export default EditMovie
