import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react'
import { Context } from '..';
import { fetchUsers, fetchCategories, fetchGroupsByTeacher, fetchTeacherById, fetchUserById} from '../http/adminAPI';
import Button from '../components/UI/Button/Button';
import { GROUP_ROUTE, TEACHER_ROUTE } from '../utils/consts';
import Modal from '../components/Modal';
import CreateGroup from '../components/admin/CreateGroup';
import InformationTable from '../components/InformationTable';
import MultipleFilterButtons from '../components/UI/MultipleFilterButtons/MultipleFilterButtons';
import SingleFilterButtons from '../components/UI/SingleFilterButtons/SingleFilterButtons';

const GroupsPage = observer(() => {
  const {userStore} = useContext(Context);
  const role = userStore.user.role.value;

  const [categories, setCategories] = useState([])
  const [groups, setGroups] = useState([])

  const [loading, setLoading] = useState(true);

  useEffect(() => {

      const fetchData = async () => {
        try {
          const user = await fetchUserById(userStore.user.id);
          const teacher = user.teacher;
          const categoriesData = await fetchCategories();
          setCategories(categoriesData);

          setGroups(teacher.groups)
  
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
  }, []);

  const statuses = [
    {id: 1, value: 'Активна'},
    {id: 2, value: 'Обучение окончено'},
  ]

  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedStatus, setSelectedStatus] = useState(statuses[0])

  const filteredGroups = groups.filter(group => {
    const matchesStatus = selectedStatus ? group.status == selectedStatus.value : true;
    const matchesCategory = selectedCategory.length > 0 ? selectedCategory.some(cat => cat.id === group.categoryId) : true;
    return matchesStatus && matchesCategory;
  });

  const columns = [
    { key: "name", label: "Номер", isLink: true , navigateTo: (row) => `${GROUP_ROUTE}/${row.id}`},
    { key: "category.value", label: "Категория", isLink: false },
    { key: "scheduleGroup.name", label: "Время", isLink: false },
    { key: "dateOfStart", label: "Дата начала обучения", isLink: false},
    { key: "status", label: "Статус", isLink: false },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="filter-container">
      <SingleFilterButtons 
        filters={statuses}
        selected={selectedStatus}
        setSelected={setSelectedStatus}
      />
      <div className='horizontal-container' style={{ width: '100%', justifyContent: 'space-between'}}>
        <div className="horizontal-container">
          <InformationTable 
            columns={columns}
            data={filteredGroups}
            numbered = {true}
          />
          <div className="filter-container">
            <MultipleFilterButtons 
              title='Категория'
              filters={categories.map(elem => ({id: elem.id, value: elem.value}))}
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
          </div>
        </div>
        
      </div>
    </div>
  )
})

export default GroupsPage;
