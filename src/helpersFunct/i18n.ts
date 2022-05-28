import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		debug: true,
		fallbackLng: "en",
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		resources: {
			en: {
				translation: {
					// here we will place our translations...
					here_text: "Current page: ",
					home: "Home",
					title:
						"Manage simple to complex projects and everything in between with Elefant",
					h2: "The project management software that will actually work for your team",
					welcome1:
						"There’s an old quote by Creighton Abrams: “When eating an elephant, take one bite at a time.”  Clearly, no one is encouraging dining on these fantastic animals, but it’s good advice about how to tackle a huge, overwhelming project—like the climb to success. As Taoist philosopher Lao-Tzu says, “The journey of a thousand miles begins with a single step.”",
					welcome2:
						"Understanding that is one of the keys to success. First, I set a goal...",
					welcome3:
						"Easily assign tasks and prioritize what's most important to your team. Set project timeline, milestones and dependencies, and manage your team’s entire workload all in one place.",
					welcome4:
						"Collaborate seamlessly across teams and departments to gain visibility into the progress of your work. Keep everyone aligned with a platform they will enjoy using to ensure a smoother execution.",
					h2_plan: "Plan, execute, and track projects of any size",
					h2_use: "The platform your team will actually love to use",
					h2_made: "This app was made on the course",
					team: "by our team",
					name1: "Julia",
					name2: "Maria",
					name3: "Olena",
					edit: "Edit your profile",
					registerBtn: "Register",
					editBtn: "Edit",
					deleteBtn: "Delete this user permanently",
					name: "Name",
					login: "Login",
					password: "Password",
					show: "Show",
					hide: "Hide",
					alert_delete_user: "Are you sure that you want delete this user?",
					logout: "Logout",
					signin: "Sign in",
					signup: "Sign up",
					add: "Add new board",
					language: "Language",
					boards: "Your boards",
					create_board: "Create new board",
					edit_board: "Edit the board",
					error: "Error",
					h1_signin: "If yuo want to sign in",
					click: "Click here",
					no_account: "Don't have an account?",
					no_internet_connection: "Check your internet connection!",
					register: "If you want to register",
					have_account: "Do you have account?",
					no_register: "Maybe you aren't register yet...",
					logout_component: ", do you want logout?",
					logout_btn: "Logout",
					placeholder_title: "Title",
					placeholder_description: "Description",
					title_task: "Your sample task",
					description_task: "Visualise your elephant",
					add_column: "Add new column",
					add_board: "Add new board",
					add_task: "Add new task",
					add_button: "Add",
					close: "Close",
					create_title: "Create board",
					enter_new_title: "Edit title",
					label_title: "Title",
					cancel: "Cancel",
					save: "Save",
					smt_wrong: "something goes wrong",
					edit_title: "Edit board",
					delete_board: "Delete board",
					save_board: "Save board",
					save_task: "Save task",
					delete_task: "Delete task",
					delete_column: "Delete column",
					delete: "Delete",
					question_delete_board: "Are you sure that you want delete this board?",
					question_delete_column: "Are you sure that you want delete this column?",
					column: "Column",
					will_be_deleted: "will be deleted",
					board_was_saved: "tThe board was saved",
				},
			},
			ru: {
				translation: {
					// here we will place our translations...
					here_text: "Текущая страница: ",
					home: "Главная",
					title:
						"Управляйте простыми и сложными проектами и всем между ними с помощью Elefant",
					h2: "Программное обеспечение для управления проектами, которое действительно работает для вашей команды",
					welcome1:
						'Есть старая цитата Крейтона Абрамса: "Когда ешь слона, откусывай по одному кусочку за раз".  Понятно, что никто не призывает обедать этими фантастическими животными, но это хороший совет о том, как справиться с огромным, непреодолимым проектом - например, с восхождением к успеху. Как сказал даосский философ Лао-Цзы, "путешествие в тысячу миль начинается с одного шага".',
					welcome2:
						"Понимание этого - один из ключей к успеху. Во-первых, я поставил перед собой цель...",
					welcome3:
						"Легко назначайте задачи и определяйте приоритеты, которые наиболее важны для вашей команды. Устанавливайте сроки, этапы и зависимости проекта и управляйте всей рабочей нагрузкой команды в одном месте.",
					welcome4:
						"Обеспечьте беспрепятственное сотрудничество между командами и отделами, чтобы получить представление о ходе работы. Обеспечьте согласованность действий всех сотрудников с помощью платформы, которой им будет приятно пользоваться, чтобы обеспечить более плавное выполнение работы.",
					h2_plan:
						"Планируйте, выполняйте и следите за проектами любого размера",
					h2_use:
						"Платформа, которую ваша команда действительно полюбит использовать",
					h2_made: "Это приложение было сделано на курсе",
					team: " нашей командой",
					name1: "Юлия",
					name2: "Мария",
					name3: "Елена",
					edit: "Редактировать профайл",
					registerBtn: "Зарегистрироваться",
					editBtn: "Редактировать",
					deleteBtn: "Удалить профайл",
					name: "Имя",
					login: "Логин",
					password: "Пароль",
					show: "Показать",
					hide: "Скрыть",
					alert_delete_user: "Ты уверен, что хочешь удалиться навсегда?",
					logout: "Выйти",
					signin: "Войти",
					signup: "Зарегистрироваться",
					add: "Добавить проект",
					language: "Язык",
					boards: "Ваши доски",
					create_board: "Создать доску",
					edit_board: "Редактировать доску",
					error: "Ошибка",
					h1_signin: "Если вы хотите войти",
					click: "Нажмите здесь",
					no_account: "Если у вас нет аккаунта",
					no_internet_connection: "Проверьте интернет соединение",
					register: "Для регистрации, заполните",
					have_account: "Уже есть аккаунт?",
					no_register: "Возможно вы не зарегистрированы еще...",
					logout_component: ", хотите выйти из личного кабинета?",
					logout_btn: "Выйти",
					placeholder_description: "Описание",
					placeholder_title: "Название",
					title_task: "Ваша простая задача",
					description_task: "Визуализируй своего слона",
					add_column: "Добавить колонку",
					add_board: "Добавить доску",
					add_task: "Добавить задачу",
					add_button: "Добавить",
					close: "Закрыть",
					create_title: "Создать доску",
					enter_new_title: "Введите новое значение",
					label_title: "Название",
					cancel: "Отмена",
					save: "Сохранить",
					smt_wrong: "что-то пошло не так",
					edit_title: "Редактировать доску",
					delete_board: "Удалить доску",
					save_board: "Сохранить доску",
					save_task: "Сохранить задачу",
					delete_task: "Удалить задачу",
					delete: "Удалить",
					edite_task: "Редактировать задачу",
					delete_column: "Удалить колонку",
					question_delete_board: "Ты уверен, что хочешь удалить доску",
					question_delete_column: "Ты уверен, что хочешь удалить колонку?",
					column: "Колонка",
					will_be_deleted: "будет удалена",
					board_was_saved: "Доска сохранена",
				},
			},
		},
	});

export default i18n;
