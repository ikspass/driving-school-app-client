import CreateGroup from "./components/admin/CreateGroup"
import CreateStudent from "./components/admin/CreateStudent"
import GroupsPage from "./pages/GroupsPage"
import AdminPage from "./pages/AdminPage"
import AdminStaffPage from "./pages/StaffPage"
import StudentsPage from "./pages/StudentsPage"
import AuthPage from "./pages/AuthPage"
import GroupPage from "./pages/GroupPage"
import InstructorPage from "./pages/InstructorPage"
import MaterialsPage from "./pages/MaterialsPage"
import SchedulePage from "./pages/SchedulePage"
import StatisticPage from "./pages/StatisticPage"
import StudentPage from "./pages/StudentPage"
import TeacherPage from "./pages/TeacherPage"
import InstructorsPage from "./pages/InstructorsPage"
import TeachersPage from "./pages/TeachersPage"
import HomePage from "./pages/HomePage"
import { ADMIN_ROUTE, HOME_ROUTE, CREATE_GROUP_ROUTE, CREATE_STUDENT_ROUTE, GROUPS_ROUTE, INSTRUCTOR_ROUTE, INSTRUCTORS_ROUTE, LOGIN_ROUTE, MATERIALS_ROUTE, REGISTRATION_ROUTE, SCHEDULE_ROUTE, STAFF_ROUTE, STATISTIC_ROUTE, STUDENT_ROUTE, STUDENTS_ROUTE, TEACHER_ROUTE, TEACHERS_ROUTE, CONTACTS_ROUTE, ADMINAUTH_ROUTE } from "./utils/consts"
import ContactsPage from "./pages/ContactsPage"
import AdminAuthPage from "./pages/admin/AdminAuthPage"

export const authRoutes = [
  {
    path: HOME_ROUTE,
    Component: HomePage
  },
  {
    path: SCHEDULE_ROUTE,
    Component: SchedulePage
  },
  {
    path: MATERIALS_ROUTE,
    Component: MaterialsPage
  },
  {
    path: STATISTIC_ROUTE,
    Component: StatisticPage
  },
  {
    path: CONTACTS_ROUTE,
    Component: ContactsPage
  },
  {
    path: GROUPS_ROUTE,
    Component: GroupsPage
  },
  {
    path: STAFF_ROUTE,
    Component: AdminStaffPage
  },
  {
    path: CREATE_STUDENT_ROUTE,
    Component: CreateStudent
  },
  {
    path: CREATE_GROUP_ROUTE,
    Component: CreateGroup
  },
  {
    path: GROUPS_ROUTE + '/:id',
    Component: GroupPage
  },
  {
    path: STUDENT_ROUTE + '/:id',
    Component: StudentPage
  },
  {
    path: STUDENTS_ROUTE,
    Component: StudentsPage
  },
  {
    path: INSTRUCTOR_ROUTE + '/:id',
    Component: InstructorPage
  },
  {
    path: INSTRUCTORS_ROUTE,
    Component: InstructorsPage
  },
  {
    path: TEACHER_ROUTE + '/:id',
    Component: TeacherPage
  },
  {
    path: TEACHERS_ROUTE,
    Component: TeachersPage
  },
  {
    path: ADMIN_ROUTE,
    Component: AdminPage
  },

]

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: AuthPage
  },
  {
    path: REGISTRATION_ROUTE,
    Component: AuthPage
  },
  {
    path: ADMINAUTH_ROUTE,
    Component: AdminAuthPage
  }
]