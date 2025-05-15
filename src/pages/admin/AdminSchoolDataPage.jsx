import { observer } from 'mobx-react-lite'
import React, { useState, useContext, useEffect } from 'react'
import Button from '../../components/UI/Button/Button'
import CreateCategory from '../../components/admin/CreateCategory'
import CreateTransport from '../../components/admin/CreateTransport'
import CreateDrivingPlace from '../../components/admin/CreateDrivingPlace'
import CreateTest from '../../components/admin/CreateTest'
import Modal from '../../components/Modal'
import InformationTable from '../../components/InformationTable'
import { Context } from '../..'
import { fetchCars, fetchCategories, fetchDrivingPlaces, fetchTransports } from '../../http/adminAPI'

const AdminSchoolDataPage = observer(() => {
  const [createCategoryModal, setCreateCategoryModal] = useState(false)
  const [createTransportModal, setCreateTransportModal] = useState(false)
  const [createPlaceModal, setCreatePlaceModal] = useState(false)
  const [createChapterModal, setCreateChapterModal] = useState(false)
  const [createTopicModal, setCreateTopicModal] = useState(false)
  const [createTestModal, setCreateTestModal] = useState(false)
  
  const {schoolStore} = useContext(Context)

  useEffect(() => {
    fetchCategories().then(data => schoolStore.setCategories(data))
    fetchTransports().then(data => schoolStore.setTransports(data))
    fetchDrivingPlaces().then(data => schoolStore.setDrivingPlaces(data))
  }, [])

  const categoryColumns = [
    { key: "id", label: "ID", isLink: false},
    { key: "value", label: "Название", isLink: false},
    { key: "description", label: "Описание", isLink: false},
  ]

  const transportColumns = [
    { key: "id", label: "ID", isLink: false},
    { key: "name", label: "Название", isLink: false},
    { key: "sign", label: "Номерной знак", isLink: false},
    { key: "color", label: "Цвет", isLink: false},
    { key: "category.value", label: "Категория", isLink: false},
    { key: "instructor.user.fullName", label: 'Инструктор', isLink: true },
    { key: "status", label: 'Статус', isLink: false }
  ]

  const drivingPlaceColumns = [
    { key: "id", label: "ID", isLink: false},
    { key: "value", label: "Название", isLink: false},
    { key: "description", label: "Описание", isLink: false},
  ]

  const chapterColumns = [
    { key: "id", label: "ID", isLink: false},
    { key: "name", label: "Название", isLink: false},
    { key: "topic", label: "Тема", isLink: false},
    { key: "test", label: "Описание", isLink: false},
  ]

  const topicColumns = [
    { key: "id", label: "ID", isLink: false},
    { key: "name", label: "Название", isLink: false},
  ]

  const testColumns = [
    { key: "id", label: "ID", isLink: false},
    { key: "name", label: "Название", isLink: false},
    { key: "description", label: "Описание", isLink: false},
  ]

  const updateCategories = async () => {
    const data = await fetchCategories();
    schoolStore.setCategories(data);
  };

  const updateTransport = async () => {
    const data = await fetchTransports();
    schoolStore.setTransports(data);
  };

  const updatePlaces = async () => {
    const data = await fetchDrivingPlaces();
    schoolStore.setDrivingPlaces(data);
  };

  return (
      <div className="filter-container">

        <Modal
          children={<CreateCategory onClose={() => {
            setCreateCategoryModal(false);
            updateCategories();
          }} />}  
          isOpen={createCategoryModal}
          onClose={() => setCreateCategoryModal(false)}
        />
        <Modal
          children={<CreateTransport onClose={() => {
            setCreateTransportModal(false)
            updateTransport();
          }}/>}
          isOpen={createTransportModal}
          onClose={() => setCreateTransportModal(false)}
        />
        <Modal
          children={<CreateDrivingPlace onClose={() => {
            setCreatePlaceModal(false)
            updatePlaces();
          }}/>}
          isOpen={createPlaceModal}
          onClose={() => setCreatePlaceModal(false)}
        />
        <Modal
          children={<CreateTest onClose={() => setCreateTestModal(false)}/>}
          isOpen={createTestModal}
          onClose={() => setCreateTestModal(false)}
        />

        <p className="heading-text-2">Категории</p>
        <div className="horizontal-container" style={{justifyContent: 'space-between', marginBottom: '20px'}}>
          <InformationTable 
            columns={categoryColumns}
            data={schoolStore.categories}
          />
          <Button className='outline' onClick={() => setCreateCategoryModal(true)}>Добавить категорию</Button>
        </div>

        <p className="heading-text-2">Автопарк</p>
        <div className="horizontal-container" style={{justifyContent: 'space-between', marginBottom: '20px'}}>
          <InformationTable 
            columns={transportColumns}
            data={schoolStore.transports}
          />
          <Button className='outline' onClick={() => setCreateTransportModal(true)}>Добавить автомобиль</Button>
        </div>

        <p className="heading-text-2">Локации вождения</p>
        <div className="horizontal-container" style={{justifyContent: 'space-between', marginBottom: '20px'}}>
          <InformationTable 
            columns={drivingPlaceColumns}
            data={schoolStore.drivingPlaces}
          />
          <Button className='outline' onClick={() => setCreatePlaceModal(true)}>Добавить локацию</Button>
        </div>

        <p className="heading-text-2">Материалы</p>
        <div className="horizontal-container" style={{justifyContent: 'space-between', marginBottom: '20px'}}>
          <InformationTable 
            columns={chapterColumns}
            data={schoolStore.chapters}
          />
          <Button className='outline'>Добавить главу</Button>
        </div>

        <p className="heading-text-2">Темы</p>
        <div className="horizontal-container" style={{justifyContent: 'space-between', marginBottom: '20px'}}>
          <InformationTable 
            columns={topicColumns}
            data={schoolStore.topics}
          />
          <Button className='outline'>Добавить тему</Button>
        </div>

        <p className="heading-text-2">Тесты</p>
        <div className="horizontal-container" style={{justifyContent: 'space-between', marginBottom: '20px'}}>
          <InformationTable 
            columns={testColumns}
            data={schoolStore.tests}
          />
          <Button className='outline' onClick={() => setCreateTestModal(true)}>Добавить зачёт/экзамен</Button>
        </div>

      </div>
    )
})

export default AdminSchoolDataPage;