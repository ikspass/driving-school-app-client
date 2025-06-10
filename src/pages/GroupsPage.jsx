import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react'
import { Context } from '..';
import { fetchCategories, fetchUserById} from '../http/adminAPI';
import { GROUP_ROUTE } from '../utils/consts';
import InformationTable from '../components/InformationTable';
import MultipleFilterButtons from '../components/UI/MultipleFilterButtons/MultipleFilterButtons';

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

  const [selectedCategory, setSelectedCategory] = useState([])

  const filteredGroups = groups.filter(group => {
    const matchesCategory = selectedCategory.length > 0 ? selectedCategory.some(cat => cat.id === group.categoryId) : true;
    return matchesCategory;
  });

  const columns = [
    { key: "name", label: "Номер", isLink: true , navigateTo: (row) => `${GROUP_ROUTE}/${row.id}`},
    { key: "category.value", label: "Категория", isLink: false },
    { key: "scheduleGroup.name", label: "Время", isLink: false },
    { key: "dateOfStart", label: "Дата начала обучения", isLink: false},
  ];

  if (loading) {
    return <div className="small-text">Загрузка...</div>;
  }

  return (
    <div className="filter-container">
      <p className="heading-text-2">Группы</p>
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
