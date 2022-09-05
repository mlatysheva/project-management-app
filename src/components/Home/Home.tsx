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
        <h2>{t('h2')}</h2>
        <div className="quote_container">
          <div className="quote">{t('quote')}</div>
          <div className="author">{t('author')}</div>
        </div>        
        <div className="advantages_container">
          <div className="advantage">
            <p className='welcome'>{t('welcome1')}</p>
          </div>
          <div className="advantage">
            <p className='welcome'>{t('welcome3')}</p>
          </div>
          <div className="advantage">
            <p className='welcome'>{t('welcome4')}</p>
          </div>
        </div>
        <div className="instructions-container">
          <h2>{t('h2_instructions')}</h2>
          <div className='instructions'>
            <div className='instruction'>
              <img className="instruction-icon" src={process.env.PUBLIC_URL + "/assets/icons/number1.png" } alt="step 1" />
              <p className='instruction-text'>{t('instruction1')}</p>
              <img className="instruction-image" src={process.env.PUBLIC_URL + "/assets/instructions/signin.jpg"} alt="signup" />
            </div>
            <div className='instruction'>
              <img className="instruction-icon" src={process.env.PUBLIC_URL + "/assets/icons/number2.png" } alt="step 2" />
              <p className='instruction-text'>{t('instruction2')}</p>
              <img className="instruction-image" src={process.env.PUBLIC_URL + "/assets/instructions/addboard.jpg"} alt="create a board" />
            </div>
            <div className='instruction'>
              <img className="instruction-icon" src={process.env.PUBLIC_URL + "/assets/icons/number3.png" } alt="step 3" />
              <p className='instruction-text'>{t('instruction3')}</p>
              <img className="instruction-image" src={process.env.PUBLIC_URL + "/assets/instructions/yourboards.jpg"} alt="your boards" />
            </div>
          </div>
        </div>
        <h2>{t('h2_made')} React 2022 Q1 <a href="https://rs.school" className="rsschool">
          Rolling Scopes School
        </a> </h2>
        <div className="welcome-team">
          <div className='developer'>
            <img src={process.env.PUBLIC_URL + "/assets/img/Maria.jpg"} alt="Maria" />
            <p>{t('developer1')}, {t('role1')}</p>
          </div>
          <div className='developer'>
            <img src={process.env.PUBLIC_URL + "/assets/img/Lena.jpg"} alt="Olena" />
            <p>{t('developer2')}, {t('role2')}</p>
          </div>
          <div className='developer'>
            <img src={process.env.PUBLIC_URL + "/assets/img/Julia.jpg"} alt="Julia" />
            <p>{t('developer3')}, {t('role2')}</p>
          </div>				
        </div>
      </div>
		</div>
	);
}
