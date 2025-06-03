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
import MultipleFilterButtons from '../../components/UI/MultipleFilterButtons/MultipleFilterButtons'
import Separator from '../../components/UI/Separator/Separator'
import { fetchCategories, fetchDrivingPlaces, fetchEventsCount, fetchTests, fetchTransports, deleteCategory, deleteTransport, deleteDrivingPlace, deleteTest, fetchScheduleGroups } from '../../http/adminAPI'
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

  const [selectedTestCategory, setSelectedTestCategory] = useState([])

  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedTransports, setSelectedTransports] = useState([])
  const [selectedDrivingPlaces, setSelectedDrivingPlaces] = useState([])
  const [selectedTests, setSelectedTests] = useState([])


  const {schoolStore} = useContext(Context)
  const [loading, setLoading] = useState(true);

  console.log(schoolStore.scheduleGroups)

  // const filteredTests = schoolStore.tests.filter(test => {
  //   const matchesStatus = selectedStatus ? test.status == selectedStatus.value : true;
  //   const matchesTeacher = selectedTeacher.length > 0 ? selectedTeacher.some(teacher => teacher.id === test.teacherId) : true;
  //   return matchesStatus && matchesCategory && matchesTeacher;
  // });  
  
  useEffect(() => {
    fetchCategories()
      .then(data => {
        schoolStore.setCategories(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });

    fetchTransports()
      .then(data => {
        schoolStore.setTransports(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
      
    fetchDrivingPlaces()
      .then(data => {
        schoolStore.setDrivingPlaces(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
      
    fetchTests()
      .then(data => {
        schoolStore.setTests(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });

      fetchScheduleGroups()
      .then(data => {
        schoolStore.setScheduleGroups(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [schoolStore]);
  
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
    { key: "status", label: 'Статус', isLink: false }
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
    { key: "category.value", label: "Категория", isLink: false},
  ]

  const scheduleGroupColumns = [
    {key: 'id', label: 'ID'},
    { key: "name", label: "Название", isLink: false},
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

  const updateTests = async () => {
    // const data = await fetchDrivingPlaces();
    // schoolStore.setDrivingPlaces(data);
  };

  const handleDeleteCategory = async () => {
    if (selectedCategories.length !== 0){
      selectedCategories.map(id => {
        deleteCategory(id);
      })
    }
    else alert('Категория не выбрана')
  }

  const handleDeleteTransport = async () => {
    if (selectedTransports.length !== 0){
      selectedTransports.map(id => {
        deleteTransport(id);
      })
    }
    else alert('Транспорт не выбран')
  }

  const handleDeleteDrivingPlace = async () => {
    if (selectedDrivingPlaces.length !== 0){
      selectedDrivingPlaces.map(id => {
        deleteDrivingPlace(id);
      })
    }
    else alert('Локация не выбрана')
  }

  const handleDeleteTest = async () => {
    if (selectedTests.length !== 0){
      selectedTests.map(id => {
        deleteTest(id);
      })
    }
    else alert('Зачёт/экзамен не выбран')
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
            data={schoolStore.categories}
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
            data={schoolStore.transports}
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
            data={schoolStore.drivingPlaces}
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
            data={schoolStore.tests}
            setSelectedRow={setSelectedTests}
          />
          <div className="filter-container">
            <MultipleFilterButtons 
              title='Категория'
              filters={schoolStore.categories.map(elem => ({id: elem.id, value: elem.value}))}
              selected={selectedTestCategory}
              setSelected={setSelectedTestCategory}
            />     
          </div>
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
            data={schoolStore.scheduleGroups}
            // setSelectedRow={}
          />
          <div className="button-container">
            <CreateButton onClick={() => setCreateScheduleGroupModal(true)}/>
            <DeleteButton onClick={'handleDeleteSchedu'}/>
          </div>
        </div>
      </div>
    )
})

export default AdminSchoolDataPage;