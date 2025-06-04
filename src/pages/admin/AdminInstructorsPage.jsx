import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react'
import { INSTRUCTOR_ROUTE } from '../../utils/consts';
import { fetchCategories, fetchGroups, fetchInstructors, fetchUsers } from '../../http/adminAPI';
import InformationTable from '../../components/InformationTable';
import MultipleFilterButtons from '../../components/UI/MultipleFilterButtons/MultipleFilterButtons';
import SingleFilterButtons from '../../components/UI/SingleFilterButtons/SingleFilterButtons';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/Modal';
import CreateInstructor from '../../components/admin/CreateInstructor';

const AdminInstructorsPage = observer(() => {

  const [createInstructorModal, setCreateInstructorModal] = useState(false)

  const [instructors, setInstructors] = useState([])
  const [groups, setGroups] = useState([])
  const [categories, setCategories] = useState([])

  const [selectedRow, setSelectedRow] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedInstructor, setSelectedInstructor] = useState([])

  const statuses = [
    {id: 1, value: 'Активен'},
    {id: 2, value: 'Не активен'},
  ]

  const [selectedStatus, setSelectedStatus] = useState(statuses[0])

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructors = await fetchInstructors();
        setInstructors(instructors);
        const groups = await fetchGroups();
        setGroups(groups);
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log('instructors: ', instructors)
  console.log('selectedCategory: ', selectedCategory)

  const filteredInstructors = instructors.filter(instructor => {
    const matchesCategory = Array.isArray(selectedCategory) && selectedCategory.length > 0
      ? instructor.categories.some(category => 
          selectedCategory.some(selected => selected.value === category.value)
        )
      : true;
  
    const matchesStatus = selectedStatus 
      ? instructor.status === selectedStatus.value 
      : true;
  
    return matchesCategory && matchesStatus;
  });
  
  console.log(filteredInstructors)

  const columns = [
    { key: "user.fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${INSTRUCTOR_ROUTE}/${row.id}`},
    { key: "user.phoneNumber", label: "Номер телефона", isLink: false },
    { key: "categories", label: "Категории", isLink: false },
    { key: "dateOfEmployment", label: "Дата приёма на работу", isLink: false },
  ];

  const transformedInstructors = filteredInstructors.map(instructor => ({
    ...instructor,
      categories: instructor.categories.map(category => category.value)
    
  }))

  const updateInstructors = async () => {
    const data = await fetchUsers();
    setInstructors(data);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="filter-container">
      <p className="heading-text-2">Инструкторы</p>
      <Modal
        children={<CreateInstructor onClose={() => {
          setCreateInstructorModal(false)
          updateInstructors()
        }}/>}
        isOpen={createInstructorModal}
        onClose={() => setCreateInstructorModal(false)}
      />
      
      <SingleFilterButtons 
        filters={statuses}
        selected={selectedStatus}
        setSelected={setSelectedStatus}
      />
      <div className='horizontal-container'>
          <InformationTable 
            style={{width: '100%'}}
            numbered={true}
            columns={columns}
            data={transformedInstructors}
          />
          <div className="content-container" style={{width: '200px'}}>
            <MultipleFilterButtons 
              title='Категория'
              filters={categories.map(elem => ({id: elem.id, value: elem.value}))}
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
          </div>
        <div className="button-container">
          <Button className='outline' onClick={() => setCreateInstructorModal(true)}>Добавить инструктора</Button>
        </div>
      </div>
    </div>
  )
})

export default AdminInstructorsPage;
