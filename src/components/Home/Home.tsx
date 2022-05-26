//import elephant from '../../../assets/elephant.svg';
import { useTranslation} from 'react-i18next';
import "./Home.scss";

export const Elefant = () => {
  return ( <img className="elephant" src={process.env.PUBLIC_URL + "/assets/icons/elephant.svg" } alt="elephant" /> );
};

type TitleProps = {
	title: string;
	children?: string;
};

export const Title = ({ title = "" }: TitleProps) => <h1>{title}</h1>;

export function Home() {
	const { t } = useTranslation();
	return (
		<div className="main">
			<Title title={t('title')}/>
			<Elefant />
			<div className="main_container">
				<div className="advantage">
					<h2>{t('h2')}</h2>
					<p className='welcome'>{t('welcome1')}</p>
					<p className='welcome'>{t('welcome2')}</p>
				</div>
				<div className="advantage">
					<h2>{t('h2_plan')}</h2>
					<p className='welcome'>{t('welcome3')}</p>
			  </div>
				<div className="advantage">
					<h2>{t('h2_use')}</h2>
					<p className='welcome'>{t('welcome4')}</p>
				</div>
			</div>
			<h2>{t('h2_made')} React 2022 Q1 in <a href="https://rs.school" className="rsschool">
        The Rolling Scopes School
      </a> {t('team')}</h2>
			<div className="welcome-team">
				<div className='developer'>
					<img src={process.env.PUBLIC_URL + "/assets/img/Julia.jpg"} alt="Julia" />
					<span>{t('name1')}</span>
				</div>
				<div className='developer'>
					<img src={process.env.PUBLIC_URL + "/assets/img/Maria.jpg"} alt="Maria" />
					<span>{t('name2')}</span>
				</div>
				<div className='developer'>
					<img src={process.env.PUBLIC_URL + "/assets/img/Lena.jpg"} alt="Olena" />
					<span>{t('name3')}</span>
				</div>
			</div>
		</div>
	);
}
