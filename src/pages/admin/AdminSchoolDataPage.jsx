import { observer } from 'mobx-react-lite'
import React, { useState, useEffect } from 'react'
import CreateCategory from '../../components/admin/CreateCategory'
import CreateTransport from '../../components/admin/CreateTransport'
import CreateDrivingPlace from '../../components/admin/CreateDrivingPlace'
import CreateTest from '../../components/admin/CreateTest'
import Modal from '../../components/Modal'
import Separator from '../../components/UI/Separator/Separator'
import { fetchCategories, fetchDrivingPlaces, fetchTests, fetchTransports, deleteCategory, deleteTransport, deleteDrivingPlace, deleteTest, fetchScheduleGroups } from '../../http/adminAPI'
import SelectableInformationTable from '../../components/SelectableInformationTable'
import DeleteButton from '../../components/UI/FunctionButton/DeleteButton'
import CreateButton from '../../components/UI/FunctionButton/CreateButton'
import CreateScheduleGroup from '../../components/admin/CreateScheduleGroup'
import { INSTRUCTOR_ROUTE } from '../../utils/consts'

const AdminSchoolDataPage = observer(() => {
  const [createCategoryModal, setCreateCategoryModal] = useState(false)
  const [createTransportModal, setCreateTransportModal] = useState(false)
  const [createPlaceModal, setCreatePlaceModal] = useState(false)
  const [createTestModal, setCreateTestModal] = useState(false)
  const [createScheduleGroupModal, setCreateScheduleGroupModal] = useState(false)

  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedTransports, setSelectedTransports] = useState([])
  const [selectedDrivingPlaces, setSelectedDrivingPlaces] = useState([])
  const [selectedTests, setSelectedTests] = useState([])
  const [selectedScheduleGroup, setSelectedScheduleGroup] = useState([])

  const [categories, setCategories] = useState([])
  const [transports, setTransports] = useState([])
  const [drivingPlaces, setDrivingPlaces] = useState([])
  const [tests, setTests] = useState([])
  const [scheduleGroup, setScheduleGroup] = useState([])

  const [loading, setLoading] = useState(true);
  
  const updateCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  const updateTransport = async () => {
    const data = await fetchTransports();
    setTransports(data);
  };

  const updatePlaces = async () => {
    const data = await fetchDrivingPlaces();
    setDrivingPlaces(data);
  };

  const updateTests = async () => {
    const data = await fetchTests();
    setTests(data);
  };

  const updateScheduleGroups = async () => {
    const data = await fetchScheduleGroups();
    setScheduleGroup(data);
  };

  useEffect(() => {
      try {
        updateCategories();
        updateTransport();
        updatePlaces();
        updateTests();
        updateScheduleGroups();
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false);
      }
    
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  const categoryColumns = [
    {key: 'id', label: 'ID'},
    { key: "value", label: "Название", isLink: false},
    { key: "description", label: "Описание", isLink: false},
  ]

  const transportColumns = [
    {key: 'id', label: 'ID'},
    { key: "name", label: "Название", isLink: false},
    { key: "sign", label: "Номерной знак", isLink: false},
    { key: "color", label: "Цвет", isLink: false},
    { key: "category.value", label: "Категория", isLink: false},
    { key: "instructor.user.fullName", label: 'Инструктор', isLink: true , navigateTo: (row) => `${INSTRUCTOR_ROUTE}/${row.instructorId}`},
  ]

  const drivingPlaceColumns = [
    {key: 'id', label: 'ID'},
    { key: "value", label: "Название", isLink: false},
    { key: "description", label: "Описание", isLink: false},
  ]

  const testColumns = [
    {key: 'id', label: 'ID'},
    { key: "name", label: "Название", isLink: false},
    { key: "description", label: "Описание", isLink: false},
  ]

  const scheduleGroupColumns = [
    {key: 'id', label: 'ID'},
    { key: "name", label: "Название", isLink: false},
  ]

  const handleDeleteCategory = async () => {
    if (selectedCategories.length !== 0){
      await Promise.all(selectedCategories.map(async (id) => {
        await deleteCategory(id)
      }))
      updateCategories()
    }
    else alert('Категория не выбрана')
  }

  const handleDeleteTransport = async () => {
    if (selectedTransports.length !== 0){
      await Promise.all(selectedTransports.map(async (id) => {
        await deleteTransport(id)
      }))
      updateTransport();
    }
    else alert('Транспорт не выбран')
  }

  const handleDeleteDrivingPlace = async () => {
    if (selectedDrivingPlaces.length !== 0){
      await Promise.all(selectedDrivingPlaces.map(async (id) => {
        await deleteDrivingPlace(id)
      }))
      updatePlaces();
    }
    else alert('Локация не выбрана')
  }

  const handleDeleteTest = async () => {
    if (selectedTests.length !== 0){
      await Promise.all(selectedTests.map(async (id) => {
        await deleteTest(id)
      }))
      updateTests();
    }
    else alert('Зачёт/экзамен не выбран')
  }

  const handleDeleteScheduleGroup = async () => {
    if (selectedScheduleGroup.length !== 0){
      await Promise.all(selectedScheduleGroup.map(async (id) => {
        await deleteTest(id)
      }))
      updateTests();
    }
    else alert('Расписание не выбрано')
  }

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
        <Modal
          children={<CreateScheduleGroup onClose={() => setCreateScheduleGroupModal(false)}/>}
          isOpen={createScheduleGroupModal}
          onClose={() => setCreateScheduleGroupModal(false)}
        />

        <p className="heading-text-2">Категории</p>
        <div className="horizontal-container" style={{justifyContent: 'space-between', marginBottom: '20px'}}>
          <SelectableInformationTable 
            columns={categoryColumns}
            data={categories}
            setSelectedRow={setSelectedCategories}
          />
          <div className="button-container">
            <CreateButton onClick={() => setCreateCategoryModal(true)}/>
            <DeleteButton onClick={handleDeleteCategory}/>
          </div>
        </div>
        <Separator />

        <p className="heading-text-2">Автопарк</p>
        <div className="horizontal-container" style={{justifyContent: 'space-between', marginBottom: '20px'}}>
          <SelectableInformationTable 
            columns={transportColumns}
            data={transports}
            setSelectedRow={setSelectedTransports}
          />
          <div className="button-container">
            <CreateButton onClick={() => setCreateTransportModal(true)}/>
            <DeleteButton onClick={handleDeleteTransport}/>
          </div>
        </div>
        <Separator />

        <p className="heading-text-2">Локации вождения</p>
        <div className="horizontal-container" style={{justifyContent: 'space-between', marginBottom: '20px'}}>
          <SelectableInformationTable 
            columns={drivingPlaceColumns}
            data={drivingPlaces}
            setSelectedRow={setSelectedDrivingPlaces}
          />
          <div className="button-container">
            <CreateButton onClick={() => setCreatePlaceModal(true)}/>
            <DeleteButton onClick={handleDeleteDrivingPlace}/>
          </div>
        </div>
        <Separator />
        
        <p className="heading-text-2">Тесты</p>
        <div className="horizontal-container" style={{justifyContent: 'space-between', marginBottom: '20px'}}>
          <SelectableInformationTable 
            columns={testColumns}
            data={tests}
            setSelectedRow={setSelectedTests}
          />
          <div className="button-container">
            <CreateButton onClick={() => setCreateTestModal(true)}/>
            <DeleteButton onClick={handleDeleteTest}/>
          </div>
        </div>
        <Separator/>

        <p className="heading-text-2">Расписание групп</p>
        <div className="horizontal-container" style={{justifyContent: 'space-between', marginBottom: '20px'}}>
          <SelectableInformationTable 
            columns={scheduleGroupColumns}
            data={scheduleGroup}
            setSelectedRow={setSelectedScheduleGroup}
          />
          <div className="button-container">
            <CreateButton onClick={() => setCreateScheduleGroupModal(true)}/>
            <DeleteButton onClick={handleDeleteScheduleGroup}/>
          </div>
        </div>
      </div>
    )
})

export default AdminSchoolDataPage;