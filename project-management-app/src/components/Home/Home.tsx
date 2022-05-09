import './Home.scss';

type TitleProps = {
  title: string;
  children?: string;
};

export const Title = ({ title = '' }: TitleProps) => <h1>{title}</h1>;

export function Home() {  
   return (
    <div className="main">
      <Title title="Welcome page" />
      <div className='welcome-page'>
        <img src={require('../../img/Julia.jpg')} alt="Julia" />
        <img src={require('../../img/Maria.jpg')} alt="Maria" />
         <img src={require("../../img/Lena.jpg")} alt="Olena" />
      </div>
    </div>
  );
}
