import GroupsPage from "./pages/GroupsPage"
import AdminPage from "./pages/AdminPage"
import StaffPage from "./pages/StaffPage"
import StudentsPage from "./pages/StudentsPage"
import AuthPage from "./pages/AuthPage"
import GroupPage from "./pages/GroupPage"
import InstructorPage from "./pages/InstructorPage"
import MaterialsPage from "./pages/MaterialsPage"
import SchedulePage from "./pages/SchedulePage"
import StatisticPage from "./pages/StatisticPage"
import StudentPage from "./pages/StudentPage"
import TeacherPage from "./pages/TeacherPage"
import { ADMIN_ROUTE, GROUPS_ROUTE, INSTRUCTOR_ROUTE, LOGIN_ROUTE, MATERIALS_ROUTE, REGISTRATION_ROUTE, SCHEDULE_ROUTE, STAFF_ROUTE, STATISTIC_ROUTE, STUDENT_ROUTE, STUDENTS_ROUTE, TEACHER_ROUTE, CONTACTS_ROUTE, ADMINAUTH_ROUTE, GROUP_ROUTE, LECTURE_ROUTE, DRIVING_ROUTE, TEST_ROUTE, ADMIN_STUDENTS_ROUTE, ERROR_PAGE } from "./utils/consts"
import ContactsPage from "./pages/ContactsPage"
import AdminAuthPage from "./pages/admin/AdminAuthPage"
import LecturePage from "./pages/LecturePage"
import DrivingPage from "./pages/DrivingPage"
import TestPage from "./pages/TestPage"
import AdminStudentsPage from "./pages/admin/AdminStudentsPage"
import ErrorPage from "./pages/ErrorPage"

// Общие маршруты для студентов и преподавателей
const studentStaffRoutes = [
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
    path: ERROR_PAGE,
    Component: ErrorPage
  }
];

// Общие маршруты для преподавателей и администраторов
const staffAdminRoutes = [
  {
    path: GROUPS_ROUTE,
    Component: GroupsPage
  },
  {
    path: STAFF_ROUTE,
    Component: StaffPage
  },
  {
    path: GROUP_ROUTE + '/:id',
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
    path: TEACHER_ROUTE + '/:id',
    Component: TeacherPage
  },
  {
    path: LECTURE_ROUTE + '/:id',
    Component: LecturePage
  },
  {
    path: DRIVING_ROUTE + '/:id',
    Component: DrivingPage
  },
  {
    path: TEST_ROUTE + '/:id',
    Component: TestPage
  },
  {
    path: ERROR_PAGE,
    Component: ErrorPage
  }
];

// Уникальные маршруты для администраторов
const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage
  },
];

// Публичные маршруты
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
];

export const studentRoutes = [
  {
    path: CONTACTS_ROUTE,
    Component: ContactsPage
  },
  {
    path: STUDENT_ROUTE + '/:id',
    Component: StudentPage
  },
  {
    path: INSTRUCTOR_ROUTE + '/:id',
    Component: InstructorPage
  },
  {
    path: TEACHER_ROUTE + '/:id',
    Component: TeacherPage
  },
  {
    path: GROUP_ROUTE + '/:id',
    Component: GroupPage
  },
  {
    path: LECTURE_ROUTE + '/:id',
    Component: LecturePage
  },
  {
    path: DRIVING_ROUTE + '/:id',
    Component: DrivingPage
  },
  {
    path: TEST_ROUTE + '/:id',
    Component: TestPage
  }
]

export const initialRoutes = {
  admin: ADMIN_ROUTE, // Страница по умолчанию для администратора
  teacher: SCHEDULE_ROUTE, // Страница по умолчанию для преподавателя
  student: SCHEDULE_ROUTE, // Страница по умолчанию для студента
  public: LOGIN_ROUTE, // Страница по умолчанию для неавторизованных пользователей
};

// Функция для получения маршрутов в зависимости от роли
export const getRoutesByRole = (role) => {
  switch (role) {
    case 'admin':
      return [...adminRoutes, ...staffAdminRoutes, ...studentStaffRoutes];
    case 'teacher':
      return [...staffAdminRoutes, ...studentStaffRoutes];
    case 'instructor':
      return [...staffAdminRoutes, ...studentStaffRoutes];
    case 'student':
      return [...studentStaffRoutes, ...studentRoutes];
    default:
      return publicRoutes; // Публичные маршруты
  }
};